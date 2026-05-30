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
| 5 | DigitalOcean Droplet provisioned, first `kamal deploy` | ✅ done — site live at http://162.243.224.84 |
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

### 2026-05-30 — Phase 5: first production deploy

- **`kamal setup` attempt 1**: failed at build with
  `failed to read dockerfile: open Dockerfile: no such file or directory` —
  Kamal 2.x packages the build context from `git archive HEAD`, so the
  Dockerfile, `.dockerignore`, `migrations/`, and `config/deploy.yml`
  needed to be **committed** (not just present locally). Committed the
  full deploy infra in one local commit on `feat/deploy`. Retried — builder
  picked up everything.
- **`kamal setup` attempt 2**: image built (~3 min), pushed to GHCR, pulled
  on Droplet, container started — but **healthcheck timed out at 30s** and
  Kamal killed the container with SIGTERM (exit 143).
- **Root cause**: `.kamal/secrets` had `../.env.production` (relative paths
  with `../`). Kamal evaluates secrets-file shell substitutions from the
  **repo root**, not from inside `.kamal/`, so every `$(grep ... ../.env.production)`
  silently expanded to empty. `KAMAL_REGISTRY_PASSWORD` used `~/.ghcr-token`
  (absolute path) so the registry login worked, masking the issue during
  build/push — but `PAYLOAD_SECRET`, `DATABASE_URI`, and the `S3_*` vars
  arrived in the container as empty strings. Payload's `init` threw
  `missing secret key. A secret key is needed to secure Payload.` on every
  request → healthcheck failed.
- **Fix**: stripped `../` from the seven grep+cut lines in `.kamal/secrets`
  (the gitignored file — no commit needed). Verified all seven keys resolve.
- **`kamal deploy`**: 🎉 succeeded. Site live at http://162.243.224.84,
  `/admin` reachable.

### Known cosmetic issues to clean up in a follow-up deploy

- `config/deploy.yml` has `image: ghcr.io/natgitinit/arduwyn`. In Kamal 2.x
  the `image:` field should NOT include the registry hostname (it's prepended
  from `registry.server`). The pushed image ends up at
  `ghcr.io/ghcr.io/natgitinit/arduwyn` — GHCR is lenient so it works, but
  it's wrong. Fix in a quiet maintenance deploy: change to
  `image: natgitinit/arduwyn`, then `kamal deploy` (a re-tag, not a full
  rebuild).

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
- [x] ~~Install Kamal CLI~~ ✅ (gem install via RVM, `kamal 2.6.1`)
- [x] ~~Create GitHub Container Registry PAT, save to `~/.ghcr-token`~~ ✅
- [x] ~~`kamal setup` / `kamal deploy` — first deploy~~ ✅ live at http://162.243.224.84
- [ ] Create first admin user at http://162.243.224.84/admin
- [ ] Seed production content (`pnpm seed:prod`) — when ready to launch
- [ ] Enable RLS on Payload tables for defense-in-depth (SQL snippet in
      `docs/supabase.md`) — recommended before going live
- [ ] Phase 6: point domain at the Droplet, flip `proxy.ssl: true` in
      `config/deploy.yml`, set `proxy.host: <domain>`, `kamal deploy`
- [ ] Fix the `image: ghcr.io/...` typo in `config/deploy.yml` (see
      "Known cosmetic issues" above)

## Out of scope (for now)

- Real contact form (currently mailto: — works in prod without changes)
- Email delivery service (Resend/SendGrid)
- Analytics
- Custom error pages
