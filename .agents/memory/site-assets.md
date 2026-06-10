---
name: Site image assets pattern
description: How to reference user-attached images in artifacts/site without TS errors
---

The `@assets` Vite alias (→ `attached_assets/`) exists in `artifacts/site/vite.config.ts`, but there is NO matching `@assets/*` mapping in tsconfig paths, so `import x from "@assets/..."` fails typecheck.

**Rule:** copy needed images into `artifacts/site/public/` and reference them at runtime with the base-path prefix: `src={`${import.meta.env.BASE_URL}name.png`}` (BASE_URL ends with a slash).

**Why:** plain root-relative `/name.png` breaks under non-root subpath deploys; the BASE_URL prefix keeps assets correct in both dev and production. The home page's older `/hero-bg.png` style is the legacy exception — prefer BASE_URL for new assets.
