---
name: Gmail lead notifications
description: How the site sends new-lead notification emails via the Replit Gmail connector
---

# Gmail lead notification emails

New leads (POST /leads in api-server) trigger a notification email to the site owner via the Replit **Gmail connector** (`google-mail`), using `@replit/connectors-sdk` (`connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", ...)`).

**Recipient:** defaults to `agenthubguru@gmail.com`, overridable via `LEADS_NOTIFY_EMAIL` env var.

**Non-obvious details:**
- The Gmail send endpoint wants a base64url-encoded RFC 2822 `raw` message (strip `=` padding, `+`→`-`, `/`→`_`).
- Hebrew is everywhere, so the Subject must be RFC 2047 encoded-word (`=?UTF-8?B?<base64>?=`) and the body uses `Content-Transfer-Encoding: base64` with `charset="UTF-8"`. Plain UTF-8 headers will mojibake.
- `connectors.proxy(...)` returns a raw fetch-style Response, not parsed JSON — check `response.ok` / call `.json()`/`.text()` yourself.

**Why:** email failures must NOT lose a lead. The send is wrapped in try/catch in the route; the lead is persisted first and a 201 is returned regardless, errors logged via `req.log`.
**How to apply:** if changing the email body/recipient, edit `artifacts/api-server/src/lib/mailer.ts`. The SDK lives in the api-server package, not the workspace root.
