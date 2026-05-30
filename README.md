# Arduwyn

The Arduwyn marketing site, with a self-hosted [Payload CMS](https://payloadcms.com)
admin baked into the same app. One codebase serves both the public site and the
"log in and edit the copy / upload images" admin dashboard.

> **Deeper context lives in [`docs/`](./docs).** Start with
> [`docs/README.md`](./docs/README.md). This file covers setup and day-to-day local dev;
> `docs/` covers *why* things are wired the way they are and what's planned next.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| CMS / admin | Payload 3.84 (self-hosted in-app) |
| Styling | Tailwind CSS 4 (CSS-first) |
| Database | Postgres — Docker container locally · Supabase in production |
| Images | `sharp` + Payload Media uploads |
| Testing | Vitest (unit + integration) · Playwright (e2e) |
| Package manager | pnpm |

## Architecture

One Next.js app serves both the public site and the admin, talking to Postgres through
Payload. The database is the only piece that differs between local and production.

```mermaid
graph TD
    V["Visitors — public site"]
    A["Admins — content editors"]

    subgraph app["Next.js 16 app (single deployment)"]
        F["app/(frontend) — marketing pages"]
        P["app/(payload) — /admin + /api"]
        CFG["payload.config.ts<br/>collections: Users · Media · Pages →"]
        LAPI["Payload Local API"]
    end

    V --> F
    A --> P
    F -->|reads content| LAPI
    LAPI --> CFG
    P --> CFG

    CFG -->|Postgres adapter| DB{{"Postgres"}}
    DB -. "local dev + tests" .-> DOCKER[("Docker Postgres<br/>arduwyn / arduwyn_test")]
    DB -. "production" .-> SUPA[("Supabase Postgres")]

    CFG --> MEDIA["Media uploads<br/>/media (local) → object storage (prod)"]
```

- **Auth** is handled by Payload (admins log in at `/admin`). Supabase is used **only** as the
  database, never as a second login. Auth0 SSO can be layered in later.
- **Verified by tests:** units (`tests/unit`), Payload integration (`tests/int`, against the
  isolated `arduwyn_test` database), and real-browser flows (`tests/e2e`). See
  [`docs/testing.md`](./docs/testing.md).
- **Planned / not built yet:** a blocks-based page builder (so editors compose pages in the
  admin without code), Resend email, optional Auth0 SSO, image optimization.

## How it's structured

```
app/
  (frontend)/        # the public marketing site — its own root layout
    architecture/    # fully ported page
  (payload)/         # Payload admin (/admin) + REST/GraphQL API (/api)
                     # AUTO-GENERATED — do not hand-edit; regenerate via CLI
collections/
  Users.ts           # admin auth (email + password)
  Media.ts           # image uploads -> /media (gitignored)
lib/                 # shared helpers (e.g. site.ts)
payload.config.ts    # main Payload config: db adapter, collections, editor
payload-types.ts     # generated TS types (committed) — regenerate after config changes
next.config.ts       # wraps Next with withPayload
docker-compose.yml   # local Postgres for dev + tests
tests/               # unit (Vitest) · int (Payload) · e2e (Playwright)
docs/                # project working notes (read these!)
```

There is intentionally **no shared `app/layout.tsx`** — the admin renders its own
`<html>` shell and must not inherit the site's header/footer/fonts. See
[`docs/decisions.md`](./docs/decisions.md).

## Prerequisites

- **Node.js 20+** (developed on Node 26)
- **pnpm** (`npm install -g pnpm`)
- **Docker Desktop** — runs the local Postgres database

## Local setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start the local Postgres database (Docker Desktop must be running)
docker compose up -d

# 3. Create your local env file from the template
cp .env.example .env

# 4. Generate a real PAYLOAD_SECRET and put it in .env
openssl rand -hex 32
```

Your `.env` should end up looking like:

```dotenv
DATABASE_URI=postgres://arduwyn:arduwyn@localhost:5432/arduwyn   # local Docker Postgres
PAYLOAD_SECRET=<the hex string from openssl above>
```

`.env` is gitignored; only `.env.example` is committed.

## Run it locally

```bash
docker compose up -d   # ensure the database is running
pnpm dev
```

- Public site → **http://localhost:3000**
- Admin / CMS → **http://localhost:3000/admin**

**On the very first run**, open `/admin` and it will show a "create your first user"
screen — fill that in to make yourself the first admin. Payload pushes its schema into the
Postgres database automatically on first boot.

> Heads-up: the dev log prints `No email adapter provided`. That's expected — password-reset
> emails are written to the **server console** until an email adapter (Resend) is wired up.

### Other scripts

```bash
pnpm build               # production build
pnpm start               # run the production build
pnpm lint                # eslint

pnpm test                # unit + integration tests (Vitest)
pnpm test:watch          # Vitest in watch mode (the red→green loop)
pnpm test:e2e            # Playwright end-to-end tests

pnpm generate:types      # regenerate payload-types.ts after editing collections
pnpm generate:importmap  # regenerate admin import map after adding custom admin components
pnpm payload             # the Payload CLI (migrations, etc.)
```

## Getting into the database console

### Local (Docker Postgres)

The local database runs in the `arduwyn-postgres` container (see `docker-compose.yml`).
Open a `psql` console inside it:

```bash
docker compose exec postgres psql -U arduwyn -d arduwyn
```

Useful `psql` commands once you're in the prompt:

```
\dt                   -- list all tables
\d users              -- describe a table
SELECT * FROM users;  -- query (note: passwords are salted + hashed)
\q                    -- exit
```

> Prefer a GUI? Point TablePlus / DBeaver at `localhost:5432`, database `arduwyn`,
> user `arduwyn`, password `arduwyn`. The isolated test database is `arduwyn_test`.

### Production (Supabase Postgres)

In production, `DATABASE_URI` is the Supabase connection string. Open a console with `psql`:

### pnpm migrate:prod 
## === ( set -a; source .env.production; set +a; pnpm payload migrate )

```bash
psql "$DATABASE_URI"          # if the env var is set in your shell
# or pass the URL directly:
psql "postgres://postgres:pass@db.<ref>.supabase.co:5432/postgres"
```

Common `psql` commands: `\dt` (list tables), `\d users` (describe table), `\q` (quit).

## Where to go next

`docs/progress-log.md` tracks what's done and the recommended next steps — currently:
modeling editable page content as a **blocks-based page builder** in Payload, then wiring the
frontend to read from the CMS instead of hardcoded constants. See
[`docs/payload-cms.md`](./docs/payload-cms.md) for the step-by-step.
