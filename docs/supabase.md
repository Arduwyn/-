# Supabase — Production Database Reference

This is the reference for our production Postgres database. Supabase is just
**managed Postgres** for us — we don't use their auto-API, auth, or edge
functions. Payload talks to it like any other Postgres.

---

## Project basics

| | |
|---|---|
| **Organization** | Arduwyn (Free plan) |
| **Project name** | Arduwyn Website |
| **Project ID** | `jwreblumtvpifnflovni` |
| **Region** | `us-west-2` (West US — Oregon) |
| **Plan** | Free — 500 MB DB + 1 GB Storage (upgrade to Pro when traffic warrants) |
| **Dashboard** | https://supabase.com/dashboard/project/jwreblumtvpifnflovni |

---

## Access

- **Who has access:** the Arduwyn organization owners.
- **Adding teammates:** dashboard → Project Settings → Project access → Manage members → invite by email. New members get organization-wide access.
- **Login:** GitHub auth (Supabase uses your GitHub account).

---

## Connection — where it lives, how it's built

We use the **Session pooler** connection (port 5432, PgBouncer in session mode).
This supports prepared statements that Drizzle needs.

> ⚠️ Do **not** use the Transaction pooler (port 6543) — it breaks prepared
> statements and Drizzle will throw at runtime.

### Connection string format

```
postgresql://postgres.<project-ref>:<password>@aws-1-us-west-2.pooler.supabase.com:5432/postgres
```

For our project specifically:

```
postgresql://postgres.jwreblumtvpifnflovni:<URL-ENCODED-PASSWORD>@aws-1-us-west-2.pooler.supabase.com:5432/postgres
```

### Where credentials live

- **`.env.production`** (in the project root, gitignored via `.env*`)
  - `DATABASE_URI=...` — full Session pooler URI with password embedded
  - `PAYLOAD_SECRET=...` — JWT signing + field encryption key, different from dev
- **`.env.production.example`** (committed) — template showing the shape, no real values
- **Production runtime** (Kamal): same `DATABASE_URI` + `PAYLOAD_SECRET` are passed as Kamal secrets

### Password encoding gotcha

The password can contain special characters (`$`, `&`, `@`, `#`, `:`, `/`, `?`, `%`, `=`).
These **must be URL-encoded** in the connection string or the driver mis-parses:

| Raw | Encoded |
|---|---|
| `$` | `%24` |
| `&` | `%26` |
| `@` | `%40` |
| `#` | `%23` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `%` | `%25` |
| `=` | `%3D` |

### Resetting the password

If lost: Supabase Dashboard → Project Settings → Database → **Reset database password**.

After resetting:
1. Update `DATABASE_URI` in `.env.production` (URL-encode any special chars)
2. Update the Kamal secret (`kamal env push` once deploy is wired up)
3. Restart the production app (`kamal app boot`)

---

## Querying the database — four ways

### 1. Supabase Dashboard SQL Editor (easiest, browser-based)

Dashboard → **SQL Editor** in the left sidebar → write SQL → Run.

Good for: ad-hoc queries, exploring data, running one-off updates.

### 2. psql via terminal

If you have psql installed locally:

```bash
# Sources the URI from .env.production:
psql "$(grep DATABASE_URI .env.production | cut -d= -f2-)"
```

Inside psql:
```sql
\dt              -- list all tables
\d pages         -- describe the pages table
SELECT slug, title FROM pages;
\q               -- quit
```

### 3. GUI clients (TablePlus, DBeaver, Postico, pgAdmin)

Use the same connection string from `.env.production`:

| Field | Value |
|---|---|
| Host | `aws-1-us-west-2.pooler.supabase.com` |
| Port | `5432` |
| Database | `postgres` |
| User | `postgres.jwreblumtvpifnflovni` |
| Password | (your DB password — paste RAW, not URL-encoded) |
| SSL | Required |

**TablePlus** recommended for casual browsing on Mac.

### 4. Payload Local API console (Rails-console equivalent)

For app-level queries (collections, blocks, hooks, validation):

```bash
# Against local Docker Postgres (the default — uses .env):
pnpm console

# Against Supabase (loads .env.production):
pnpm console:prod
```

Then in the REPL:
```js
await payload.find({ collection: 'pages' })
await payload.find({ collection: 'media' })
await payload.update({ collection: 'pages', id: 1, data: { title: 'New' } })
```

See `scripts/console.ts` for the full pattern.

---

## Migrations

We use Payload's migration system (Drizzle under the hood). Migration files
live in `/migrations` and are **committed to the repo** — they're the source
of truth for the production schema.

### Generating a new migration

After making schema changes (new block fields, new collections, etc.):

```bash
pnpm payload migrate:create --name <short-description>
```

This creates `migrations/<timestamp>_<name>.ts` + `.json` files. Commit both.

### Applying migrations

**To Supabase (production):**
```bash
pnpm migrate:prod
```

**To local Docker (dev):** the dev server auto-pushes schema on startup
(Drizzle's `db:push` mode), so no explicit migrate command needed locally.

### Migration status

```bash
pnpm migrate:prod:status
```

Shows which migrations have been applied vs pending. (Good way to confirm
a migration landed without running anything destructive.)

### Rolling back

```bash
( set -a && . ./.env.production && set +a && pnpm payload migrate:down )
```

Reverts the most recent migration. Use with care — migrations should
generally roll forward. (No shortcut script for this — rollback is rare and
deliberate; the long form forces you to think before running it.)

### The `:prod` script pattern

Each `:prod` script loads `.env.production` into a subshell before running
the underlying command, so the prod creds are scoped to that one command
and don't pollute your terminal. See `package.json` `scripts`:

| Script | What it does |
|---|---|
| `pnpm migrate:prod` | Apply pending migrations to Supabase |
| `pnpm migrate:prod:status` | Show migration status (read-only) |
| `pnpm seed:prod` | Seed pages into Supabase (⚠️ destructive — replaces page rows) |
| `pnpm console:prod` | Open Payload Local API REPL against Supabase |

---

## Row Level Security (RLS)

RLS is **enabled by default** on tables created via the Supabase Table Editor
UI. Tables Payload creates via Drizzle migrations may not inherit that
default — but it doesn't matter functionally for us because:

1. **We don't use Supabase's auto-generated REST API or `anon` key.**
2. **Payload connects with the role owner credentials**, which bypass RLS
   anyway. RLS being on or off doesn't affect app behavior.

The reason to keep RLS on is **defense-in-depth**: if the anon key ever
leaks (it's designed to be public), attackers can't read our tables via
PostgREST. To enable RLS retroactively on our Payload tables (recommended
hygiene):

```sql
-- Run in Supabase SQL Editor:
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;
```

No policies are needed — with RLS on and zero policies, the anon role
returns `[]` for everything. The role owner (us) bypasses RLS regardless.

---

## Backups

Supabase Free tier: **daily automated backups** retained for 7 days.

- Dashboard → Project Settings → Database → **Backups** to view + download
- For point-in-time recovery, upgrade to Pro

### Manual SQL dump (anytime, free)

```bash
pg_dump "$(grep DATABASE_URI .env.production | cut -d= -f2-)" \
  --no-owner --no-acl \
  > backup-$(date +%Y%m%d).sql
```

Restore:
```bash
psql "$(grep DATABASE_URI .env.production | cut -d= -f2-)" < backup-YYYYMMDD.sql
```

---

## Storage (uploaded media)

> **Not yet wired** — see `docs/2026-05-30/deploy.md` for status. Currently
> uploads land on local disk (`/media`). Will move to Supabase Storage during
> the deploy phase via the S3-compatible adapter.

When wired up:
- **Bucket:** `media` (private; access via signed URLs from the app)
- **Region:** matches the DB (`us-west-2`)
- **S3 endpoint:** `https://jwreblumtvpifnflovni.supabase.co/storage/v1/s3`
- **Credentials:** `S3_ACCESS_KEY_ID` + `S3_SECRET_ACCESS_KEY` in `.env.production`
  (generate at Dashboard → Storage → S3 Connection)

---

## Cost

| Tier | DB | Storage | Bandwidth | Notes |
|---|---|---|---|---|
| Free (current) | 500 MB | 1 GB | 5 GB egress | Projects pause after 7 days of inactivity |
| Pro | 8 GB | 100 GB | 250 GB | $25/mo, no pause, point-in-time backup |

Upgrade when traffic is consistent or when we need PITR. No action required now.

---

## Common operations — cookbook

### Inspect production data quickly
```bash
pnpm console:prod
# > await payload.find({ collection: 'pages' })
```

### List all pages and their block layouts
```sql
SELECT slug, title FROM pages ORDER BY slug;
```

### See how many Media items are uploaded
```bash
pnpm console:prod
# > await payload.count({ collection: 'media' })
```

### Bulk-seed production from the seed script
> ⚠️ The seed script **deletes + recreates each page**. Only run on initial
> deploy or when you intentionally want to reset content.

```bash
pnpm seed:prod
```

### Drop everything and start over (nuclear)
```bash
( set -a && . ./.env.production && set +a && pnpm payload migrate:fresh )
```
This drops ALL tables and re-runs every migration. **Production data lost.**

---

## Runbook — when things break

### App can't connect to Supabase
1. Check the project isn't paused (Free tier: pauses after 7 days idle) — wake it from the dashboard
2. Verify the password in `DATABASE_URI` matches Supabase (Settings → Database → Reset password if uncertain)
3. Confirm Session pooler URI (port 5432), not Transaction pooler (6543)
4. Check Supabase status: https://status.supabase.com

### Migration fails partway
- Drizzle wraps migrations in transactions — partial changes get rolled back
- Check the error (usually a duplicate name, type conflict, or constraint violation)
- Fix the schema, regenerate the migration: `pnpm payload migrate:create --name <name>`
- Delete the failed migration file if it never applied successfully

### "Too many connections"
Free tier connection limit is 60. Session pooler reuses connections, so this
should rarely happen. If it does: check for connection leaks in code
(unclosed Local API calls) or upgrade to Pro.

---

## Related docs

- `docs/2026-05-30/deploy.md` — deploy phase log
- `docs/editor-guide.md` — content admin reference
- `.env.production.example` — env shape template
