import { createHash, timingSafeEqual } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
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

  const header = req.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();

  if (!token || !safeEqual(token, expected)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
