# Progress Log

Newest entries at the top. Dates are absolute.

---

## 2026-05-25 — Blocks-based page builder (Pages collection + rendering)

Built the foundation for "manage pages from the CMS, no code per page" — test-first.

- 🔴→🟢 TDD: wrote a failing integration test for a `Pages` collection
  (`tests/int/pages.int.spec.ts`), then built it green.
- `collections/Pages.ts`: `title`, unique indexed `slug`, and a blocks-based `layout`
  (public read access).
- Starter blocks in `blocks/`: `Hero`, `RichText`, `CTA`.
- Frontend rendering: `components/blocks/{Hero,RichText,CTA}.tsx` +
  `components/RenderBlocks.tsx`, typed from the generated `Page` type.
- Wired `app/(frontend)/page.tsx` to fetch the `home` page via the Local API and render its
  layout (with a friendly fallback until a `home` page exists).
- `pnpm generate:types` updated `payload-types.ts`. `tsc --noEmit` clean (only stale
  `.next/types` references to pre-move paths, which clear on dev-server restart).

**Next:** restart dev server → create a `home` page in the admin → confirm it renders.
Then: a catch-all `[slug]` route, port existing pages into blocks, per-page SEO.

---

## 2026-05-25 — Local DB switched to Postgres (Docker); verified

Acted on the "Supabase now" decision, refined to **Postgres everywhere**: a local Docker
container for dev + tests, Supabase for production (deferred until deploy).

- Added `docker-compose.yml` (Postgres 17 → `arduwyn-postgres`, port 5432) + an init script
  that creates an isolated `arduwyn_test` database for the test suite.
- Installed `@payloadcms/db-postgres`; switched `payload.config.ts` from the SQLite adapter to
  `postgresAdapter`. `.env` now points at the local container; `.env.example` updated.
- Verified: dev server boots on Postgres and `/admin` reads/writes the database (schema pushes
  automatically on first boot).
- README rewritten for Postgres/Docker + added a fullstack architecture (Mermaid) diagram.

**Done since:** integration tests are wired to `arduwyn_test` and green (Vitest 5/5, Playwright 3/3).

**Still pending:** first GitHub commit + remote; create the Supabase project at deploy time.
The old SQLite file (`arduwyn-cms.db`) and `@payloadcms/db-sqlite` dep are no longer used and
can be removed.

---

## 2026-05-25 — Test harness (Vitest + Playwright) + TDD skill; DB → Supabase Postgres

Set up a test-first workflow and the testing infrastructure.

- **Vitest** for unit (`tests/unit`) and Payload integration (`tests/int`) tests; **Playwright**
  for e2e (`tests/e2e`). Config: `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts`.
- Scripts added: `test`, `test:unit`, `test:int`, `test:watch`, `test:e2e`.
- Proved the red→green loop: wrote a failing unit test for `lib/site.ts` `pageTitle()`, then
  implemented it (3/3 passing). E2E: 3/3 passing (home, architecture, admin auth screen).
- Added the **`/tdd-feature`** Claude Code skill (`.claude/skills/tdd-feature/`) + `docs/testing.md`.
- **Decision change:** moving dev + prod to **Supabase Postgres** (was SQLite) for dev/prod
  parity, while the schema is still tiny. Installed `@payloadcms/db-postgres`. See `decisions.md`.

**Pending:** Supabase connection string from the user → flip the Payload adapter to Postgres,
push schema, wire an isolated Postgres **test** database, and bring `tests/int` online. The
README's "sqlite3 ... locally" note will also need updating to `psql` once switched.

---

## 2026-05-25 — README rewritten as a real setup guide

Replaced the default `create-next-app` boilerplate `README.md` with a proper guide:
tech stack, project structure, prerequisites (Node 20+, pnpm), local setup (install →
`.env` → `openssl` secret), run instructions (`pnpm dev`, first-admin flow), the script
list, and **database console access** (`sqlite3 arduwyn-cms.db` locally; `psql` for prod
Postgres). Points readers at `docs/` for the deeper context.

---

## 2026-05-25 — Payload CMS integrated

Integrated Payload CMS into the Next.js app so an admin can log in and edit content /
upload images (the "cPanel" requirement). See `decisions.md` for the why, `payload-cms.md`
for how it's wired.

### Done & verified
- Installed **Payload 3.84.1**: `payload`, `@payloadcms/next`, `@payloadcms/richtext-lexical`,
  `@payloadcms/db-sqlite`, `@payloadcms/ui`; plus `sharp`, `graphql`, and `sass` (admin styles).
- Restructured `app/` into two route groups, each with its **own** root layout:
  - `app/(frontend)/` — the marketing site. `layout.tsx`, `page.tsx`, `globals.css`, and
    `architecture/` were moved here **unchanged** (the `@/` alias is root-relative, so imports
    still resolve; CSS is co-located).
  - `app/(payload)/` — the Payload admin (`/admin`) + REST/GraphQL API (`/api`).
  - There is intentionally **no shared `app/layout.tsx`** — the admin must not inherit the
    site's `<html>`, Header, Footer, or fonts.
- Added `payload.config.ts` (repo root): SQLite adapter, `Users` (auth) + `Media` (upload)
  collections, lexical editor, type output.
- Wired `next.config.ts` with `withPayload`; added the `@payload-config` tsconfig path;
  set `"type": "module"`; added `generate:types` / `generate:importmap` / `payload` scripts.
- Env: `.env` holds a generated `PAYLOAD_SECRET` + `DATABASE_URI=file:./arduwyn-cms.db`.
  `.env.example` is committed. `.gitignore` updated for `/media`, `*.db*`, and to keep `.env.example`.

### Verification
- `/admin` → **HTTP 200**, Payload "create your first user" screen.
- `/` and `/architecture` → **HTTP 200**, correct titles — frontend intact under `(frontend)`.
- SQLite DB (`arduwyn-cms.db`) auto-created; tables pushed on first boot.
- Dev server "Ready in 278ms"; no errors.

### Notes
- Only dev-log warning: *"No email adapter provided"* — expected. Needed later for
  password-reset emails; will be covered when **Resend** is added (also powers the contact form).
- The site is now **dynamic-capable** (ISR/SSR) once pages read from the CMS — the original
  "static export" assumption no longer applies.

### Next steps (recommended order)
1. Create the first admin user at `/admin` (one-time, manual).
2. **Model editable content**: pick which page(s)/fields become CMS-editable. Start with the
   homepage or the `architecture` page. Add a `Pages` collection (or globals) whose shape
   mirrors the existing hardcoded `const` content arrays.
3. Wire the frontend to read content from Payload (Local API) instead of hardcoded consts.
4. Add role-based access control to `Users` (admin vs editor) once there's >1 user.
5. Port remaining pages (`engineering` next; `index` is the big one — modals + hero diagram).
6. Contact form via Resend (also satisfies the email-adapter need above).
7. First git commit + Forgejo/Codeberg remote.

---

## (pre-2026-05-25) — Starting point

See the original handoff doc for full detail. Summary: Next.js 16 + TS + App Router scaffold,
Tailwind 4 (CSS-first) over ported Arduwyn CSS, `/architecture` page fully ported, `/` is a
placeholder, design tokens + assets in place. Git initialized (no commits yet).
