# Production Deploy — Progress Log (2026-05-30)

**Branch:** `feat/deploy`

**Goal:** Get arduwyn.com live in production. Postgres → Supabase, media →
Supabase Storage, app → Docker container on a DigitalOcean Droplet, managed by
Kamal.

## Target architecture

```
Visitor ──HTTPS──▶ kamal-proxy ──▶ Next.js + Payload container (Droplet)
                                          │
                                          ├──▶ Supabase Postgres (Session pooler)
                                          └──▶ Supabase Storage (S3-compatible)
```

## Phases

| # | Phase | Status |
|---|---|---|
| 1 | Supabase Postgres + initial migration | ✅ done — `20260530_154939` applied, ~30 tables created |
| 2 | Swap Media storage from disk → Supabase Storage | ✅ done — smoke test passed end-to-end |
| 3 | Dockerfile (multi-stage, standalone output) | ✅ written, awaiting first build |
| 4 | Kamal config (`config/deploy.yml` + secrets) | ✅ written, awaiting `kamal setup` |
| 5 | DigitalOcean Droplet provisioned, first `kamal deploy` | 🟡 Droplet up (162.243.224.84), Kamal not yet run |
| 6 | Domain + TLS (Let's Encrypt via kamal-proxy) | ⏳ pending |

## Decisions

- **Supabase region:** `us-west-2` (Oregon). Picked at project creation.
- **Connection mode:** Session pooler (port 5432) — Transaction pooler (6543)
  breaks Drizzle's prepared statements.
- **Migrations strategy:** versioned migration files in `/migrations`,
  committed to repo. `pnpm payload migrate` applies them.
- **Storage:** Supabase Storage via S3-compatible adapter (not local disk in
  prod — Droplet rolls containers and would lose uploads on every deploy).
- **Deploy tool:** Kamal (user has Rails Kamal experience; one CLI to
  deploy + manage TLS + zero-downtime swaps).
- **DB password handling:** lives only in `.env.production` (gitignored)
  + Kamal secret. URL-encoded in DATABASE_URI because the password contains
  `$` and `&`.

## Log

### 2026-05-30 — Phase 1: Supabase + initial migration

- **Supabase project created** by user (`jwreblumtvpifnflovni`, us-west-2, Free tier).
- Set up `.env.production` with the Session pooler URI + a fresh
  `PAYLOAD_SECRET` (different from local dev). Password URL-encoded.
- `.env.production.example` committed as a template; real file gitignored
  via `.env*` rule.
- **Generated initial migration:** `pnpm payload migrate:create --name initial`
  → `migrations/20260530_154939.{ts,json}` — 1,065 lines of SQL covering 12
  enum types and ~30 tables (users, media, pages, every `pages_blocks_*`).
- **Wrote `docs/supabase.md`** — full reference for the production DB:
  access, connection, querying, migrations, RLS, backups, cookbook, runbook.
- Added `:prod` package.json scripts (`migrate:prod`, `migrate:prod:status`,
  `seed:prod`, `console:prod`) — each one auto-loads `.env.production` into
  a subshell so the prod creds are scoped to the single command.
- **Migration applied to Supabase** via `pnpm migrate:prod`. Confirmed:
  `20260530_154939` shows `Batch 1, Ran: Yes`. ~30 tables created in
  `public` schema (users, media, pages, all `pages_blocks_*`).

### 2026-05-30 — Phase 2: Supabase Storage

- User created `media` bucket in Supabase Storage: public read, 5 MB
  per-file limit, MIME allowlist (jpeg/png/webp/svg).
- Generated S3 access key pair (`arduwyn-media-prod`), added `S3_*` vars
  to `.env.production`.
- Installed `@payloadcms/storage-s3@3.84.1` (matched existing Payload
  version — 3.85 caused a version-mismatch crash; pinned downward).
- Wired plugin in `payload.config.ts`:
  - Gated on `S3_*` env vars so local dev still uses local-disk storage
  - `disablePayloadAccessControl: true` — bypass Payload's proxy URL
  - Custom `generateFileURL` to build the **public-read** URL
    (`/storage/v1/object/public/...`) instead of the S3 API URL
    (`/storage/v1/s3/...`) which returns 403 to unauthenticated callers.
- Updated `next.config.ts` `remotePatterns` to allow `*.supabase.co/storage/v1/object/public/**`
  so `next/image` can serve the Supabase URLs.
- New `pnpm test:storage:prod` smoke test (`scripts/test-storage.ts`):
  uploads a 1×1 PNG, verifies Postgres row + public URL fetch
  (200 + image/png), cleans up. All checks passed.

### 2026-05-30 — Phases 3 + 4: Dockerfile + Kamal config

- **`Dockerfile`** — multi-stage: deps → builder → runner. Final image is
  the Next standalone bundle (~150 MB) running as non-root user `nextjs`.
  Includes `openssl` + `ca-certificates` for sharp/postgres SSL; pins
  `node:22-slim`. Build-time env placeholder for `DATABASE_URI` +
  `PAYLOAD_SECRET` so anything that validates env vars doesn't crash —
  real values come at runtime via Kamal.
- **`.dockerignore`** — excludes `node_modules`, `.next`, `.env*`, `.kamal/secrets`,
  `.git`, `media/`, tests, docs. Keeps build context small + zero leak risk.
- **`next.config.ts`** — added `output: 'standalone'`.
- **`config/deploy.yml`** — Kamal config: image at `ghcr.io/arduwyn/arduwyn`,
  Droplet `162.243.224.84`, `arch: amd64` (so Apple Silicon builds for the
  Droplet's Intel CPU), kamal-proxy with `ssl: false` initially (no
  domain yet — visit via http://IP). When the domain lands, flip ssl to
  true + set host, and kamal-proxy provisions Let's Encrypt.
- **`.kamal/secrets`** — reads each secret from `.env.production` via
  `grep | cut`, plus the GHCR PAT from `~/.ghcr-token`. **Gitignored.**
- **`.gitignore`** — added `.kamal/secrets` entries.

## Open follow-ups (within this branch)

- [x] ~~Apply initial migration to Supabase~~ ✅ done
- [x] ~~Wire Supabase Storage adapter for Media~~ ✅ done
- [ ] Install Kamal CLI (`brew tap basecamp/kamal && brew install kamal`)
- [ ] Create GitHub Container Registry PAT, save to `~/.ghcr-token`
- [ ] Smoke-test the Dockerfile locally (`docker build` + `docker run`)
- [ ] `kamal setup` — first deploy
- [ ] Verify tables in Supabase dashboard (eyeball check, optional)
- [ ] Enable RLS on Payload tables for defense-in-depth (SQL snippet in
      `docs/supabase.md`) — recommended before going live
- [ ] Seed production content (`pnpm seed:prod`) — when ready to launch
- [ ] Create first admin user in production (`/admin` once deployed, or
      via Local API)

## Out of scope (for now)

- Real contact form (currently mailto: — works in prod without changes)
- Email delivery service (Resend/SendGrid)
- Analytics
- Custom error pages
