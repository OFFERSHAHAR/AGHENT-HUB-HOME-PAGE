# Agent Hub Guru AI Engineering — מטמיעי AI בארגונים

אתר תדמית בעברית (RTL) למותג **Agent Hub Guru AI Engineering (A.H.G.A.E)** — שני שותפים, עופר שחר ואור מוסה, שממצבים את עצמם כמומחים להטמעת AI בארגונים. האתר אוסף פניות (לידים) דרך טופס יצירת קשר ומאפשר ניהול הפניות במערכת CRM פנימית. כל הניסוחים בלשון רבים ("אנחנו").

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/site/` — public Hebrew (RTL) marketing site at `/`, products showcase at `/products`, and internal lead CRM at `/leads`
- `artifacts/site/src/pages/products.tsx` — "הפיתוחים שלנו" page showing original products in production (Galileo pool-management PWA with real logo/mockup/stats/team; hospitality-venue system as a simpler block). Images live in `artifacts/site/public/galileo-*.png`
- `artifacts/api-server/src/routes/leads.ts` — lead CRUD + `/leads/stats` endpoints
- `artifacts/api-server/src/lib/mailer.ts` — sends a new-lead notification email via the Replit Gmail connector (recipient: `agenthubguru@agenthub.guru`, override with `LEADS_NOTIFY_EMAIL`)
- `artifacts/api-server/src/middlewares/adminAuth.ts` — `requireAdmin` guard protecting all lead read/update/delete + stats endpoints (POST stays public); checks `Authorization: Bearer <ADMIN_PASSWORD secret>` with a constant-time compare + in-memory brute-force throttle
- `lib/api-spec/openapi.yaml` — API contract (source of truth; run codegen after edits)
- `lib/db/src/schema/leads.ts` — `leads` table (Drizzle schema)

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
