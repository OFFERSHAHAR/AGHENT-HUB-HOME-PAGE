---
name: Admin auth for leads CRM
description: How the internal lead CRM (/leads + admin API endpoints) is protected
---

# Admin auth for the leads CRM

The `/leads` CRM page and the lead read/update/delete + stats API endpoints are protected by a **single shared admin password** (the owner's explicit choice — not per-user accounts). `POST /leads` stays public (the contact form).

**Mechanism:**
- Server: `requireAdmin` Express middleware checks `Authorization: Bearer <token>` against the `ADMIN_PASSWORD` **secret** using a sha256 + `timingSafeEqual` constant-time compare. Returns 503 if the secret is unset, 401 on mismatch.
- Client: `leads.tsx` has a login gate; the password is kept in `sessionStorage` and attached to every request via the api-client's `setAuthTokenGetter`. A 401 from the dashboard triggers logout + token clear.

**Why the credential is validated BEFORE the rate-limit check:** all traffic arrives through the shared Replit proxy, so every request appears to come from one IP. A naive "block this IP after N failures" lockout would let an attacker lock out the legitimate admin. Validating the password first means a correct login always succeeds and resets the counter; only wrong guesses get throttled (10 failures / 15 min → 429 with Retry-After).

**Gotchas:**
- The password lives only in the `ADMIN_PASSWORD` secret — never hardcode it in code or the client bundle.
- The brute-force throttle is in-memory, so it resets on every api-server restart (fine for dev; acceptable for this low-value target).
- Don't tighten CORS as "brute-force protection" — non-browser attackers ignore CORS, and the app is same-origin through the proxy anyway.
