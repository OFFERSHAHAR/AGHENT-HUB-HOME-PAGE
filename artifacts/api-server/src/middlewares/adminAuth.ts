import { createHash, timingSafeEqual } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;
const BLOCK_MS = 15 * 60 * 1000;

type Attempt = { failures: number; windowStart: number; blockedUntil: number };
const attempts = new Map<string, Attempt>();

function clientKey(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

function recordFailure(key: string, now: number): void {
  const entry = attempts.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(key, { failures: 1, windowStart: now, blockedUntil: 0 });
    return;
  }
  entry.failures += 1;
  if (entry.failures >= MAX_FAILURES) {
    entry.blockedUntil = now + BLOCK_MS;
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    req.log.error("ADMIN_PASSWORD is not configured; denying admin request");
    res.status(503).json({ error: "Admin access not configured" });
    return;
  }

  const key = clientKey(req);
  const now = Date.now();

  const header = req.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();

  // Validate the credential first so a correct password always succeeds and
  // resets the counter — this prevents an attacker (who shares the proxy IP)
  // from locking out the legitimate admin via repeated wrong guesses.
  if (token && safeEqual(token, expected)) {
    attempts.delete(key);
    next();
    return;
  }

  // Wrong/missing credential: throttle to slow down brute-force attempts.
  const entry = attempts.get(key);
  if (entry && entry.blockedUntil > now) {
    res.setHeader("Retry-After", Math.ceil((entry.blockedUntil - now) / 1000));
    res.status(429).json({ error: "Too many attempts. Try again later." });
    return;
  }

  recordFailure(key, now);
  res.status(401).json({ error: "Unauthorized" });
}
