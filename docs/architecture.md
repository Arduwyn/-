# Architecture — Arduwyn Website

## What this site is

A content-managed marketing website. Editors log in at `/admin` to create and edit pages; visitors see those pages at `/` (and sub-routes). Built to be fast, cheap to run, and easy to update without touching code.

---

## The tools, in plain English

### Next.js + TypeScript
**Next.js** is a framework for building websites with React (the UI library made by Meta). It handles routing, server-side rendering, and packaging everything into a production build. Think of it as the skeleton of the site — it decides what page to show for each URL and how to deliver it to the browser fast.

**TypeScript** is just JavaScript with types — it catches mistakes at write-time ("you're passing a number where this function expects a string") instead of at runtime ("the site just crashed"). It doesn't change how the site runs; it's a developer-safety net.

### Payload CMS
**Payload** is a content management system — the admin panel where you (the editor) log in, create pages, upload images, and publish content. Unlike WordPress or Contentful, Payload runs *inside* the Next.js app as code, not as a separate service. This means:
- One server, one deploy — less moving parts.
- Your content schema (what fields a "Page" has) is defined in TypeScript files you own. It's not locked inside a third-party platform.
- Authentication (login, session tokens, password hashing) is built in — you get a `/admin` login screen for free.

### Supabase
**Supabase** is a managed Postgres database service. Postgres is a battle-tested, open-source relational database — the industry standard for structured data. Supabase hosts it for you so you don't have to run your own database server. It also includes:
- **Supabase Storage** — an S3-compatible file bucket for images and media (so image files don't sit in the database).
- **A dashboard** — browser-based SQL editor, table viewer, security settings.
- Under the hood it's just Postgres. You're not locked in; you could point the app at any Postgres host by changing one env var.

---

## How the pieces connect

```
                    YOU (editor)                     VISITORS
                        │                                │
                  /admin (login)                    / (pages)
                        │                                │
                        ▼                                ▼
        ┌─────────────────────────────────────────────────────┐
        │   DigitalOcean Droplet  (162.243.224.84)             │
        │                                                       │
        │   kamal-proxy  ──HTTPS/TLS──────────────┐            │
        │                  arduwyn.com             ▼            │
        │            ┌──────────────────────────────────┐      │
        │            │  Docker container                 │      │
        │            │  Next.js (public pages)           │      │
        │            │  + Payload CMS (/admin)           │      │
        │            └──────────────────────────────────┘      │
        └───────────────┬───────────────────────┬──────────────┘
                        │ direct Postgres        │ S3 API
                        │ connection             │
                        ▼                        ▼
              ┌──────────────────┐     ┌──────────────────────┐
              │ Supabase Postgres│     │ Supabase Storage      │
              │ pages, users,    │     │ image files           │
              │ media records,   │     │ (served directly to   │
              │ all CMS content  │     │  visitors' browsers)  │
              └──────────────────┘     └──────────────────────┘
```

**Key wiring notes:**

- Next.js and Payload share the same Node.js process — one container, one port (3000), one deploy.
- The app reaches Supabase Postgres via a direct connection string (`DATABASE_URI`). It does **not** use Supabase's auto-generated REST API — that's why we removed `public` from the Data API exposed schemas (it was never used, just a security hole).
- Images are stored in Supabase Storage and served **directly to visitors' browsers** — they never pass through the Droplet. This keeps the Droplet fast and unburdened.
- HTTPS and the `arduwyn.com` domain are handled by **kamal-proxy**, which sits in front of the container and provisions a Let's Encrypt TLS certificate automatically.

---

## How a deploy works

When you run `kamal deploy`:

1. **Kamal packages your committed code** (`git archive HEAD`) — uncommitted changes are not included.
2. **Docker builds a 3-stage image:**
   - *deps* — installs all npm packages (the slow "downloading N packages" step).
   - *builder* — runs `next build` (compiles the app; uses fake placeholder secrets so the build doesn't crash — real ones come at runtime).
   - *runner* — a lean final image (~150 MB) with just the compiled app, running as a non-root user.
3. **Image is pushed to GHCR** (GitHub Container Registry, `ghcr.io/natgitinit/arduwyn`).
4. **Kamal pulls the image onto the Droplet** and injects the real secrets (`DATABASE_URI`, `PAYLOAD_SECRET`, `S3_*`) as environment variables at runtime — they are never baked into the image.
5. **Zero-downtime swap:** kamal-proxy boots the new container and health-checks it (hits `/` every 5s). Only after it passes does proxy cut traffic over from the old container. The live site never goes down during a deploy.

To run database migrations on a new deploy (only needed when Payload collections changed):
```bash
kamal app exec --reuse "pnpm payload migrate"
# or the alias:
kamal migrate
```

---

## Authentication (how login works)

Payload handles this entirely. The `Users` collection has `auth: true`, which tells Payload to:
- Store a **hashed password** (never plaintext) in the `users` Postgres table.
- On login, check the submitted password against the hash.
- Issue a **JWT session token**, signed with `PAYLOAD_SECRET`, stored in a cookie.
- Protect `/admin` — every request checks the cookie; no valid token → login screen.

`PAYLOAD_SECRET` is the signing key. It must stay secret — anyone who had it could forge a login token.

Currently all users are full admins. Role-based permissions (editor vs. admin) can be added later in `collections/Users.ts`.

---

## Why this stack for this type of site

| Need | How this stack covers it |
|---|---|
| Fast public pages | Next.js server-renders pages; no client-side fetch lag |
| Easy content editing | Payload `/admin` — no code required to add/edit pages |
| Reliable database | Postgres (Supabase) — battle-tested, scales easily, fully relational |
| Image handling | Supabase Storage — files served directly from CDN-adjacent URLs, not through your server |
| Simple ops | One container, one Droplet, Kamal handles zero-downtime deploys automatically |
| Low cost | A single $6–12/mo Droplet + Supabase free tier covers a site at this scale |
| No vendor lock-in | Payload schema lives in your code; Supabase is just Postgres; swap any layer independently |

The alternative (e.g. WordPress, Webflow, Contentful) would mean paying per-seat for the CMS, losing code-level control over the schema, or running a heavier server. This stack gives you editorial ease *and* developer control at a fraction of the cost.

---

## Security posture (as of June 2026)

- Supabase Data API (`public` schema) is **removed from exposed schemas** — all 72 tables are inaccessible via the anon REST/GraphQL API. The app connects only via the direct Postgres owner connection, which bypasses this entirely.
- Secrets (`DATABASE_URI`, `PAYLOAD_SECRET`, `S3_*`) are injected at runtime by Kamal, never committed to git or baked into the Docker image.
- The container runs as a **non-root user** (`nextjs`, uid 1001).
- HTTPS enforced site-wide via Let's Encrypt through kamal-proxy.

---

## Key files

| File | Purpose |
|---|---|
| `payload.config.ts` | Payload setup — collections, DB adapter, S3 plugin, admin config |
| `collections/Pages.ts` | Page content schema (fields editors fill in) |
| `collections/Users.ts` | Auth users — `auth: true` enables login/sessions |
| `collections/Media.ts` | Image/file uploads |
| `config/deploy.yml` | Kamal deploy config — server IP, registry, proxy/TLS, secrets list |
| `.kamal/secrets` | Reads secrets from `.env.production` (gitignored, never committed) |
| `Dockerfile` | 3-stage Docker build (deps → builder → runner) |
| `migrations/` | Payload DB migrations — run on schema changes |
| `.env.production` | Production env vars (gitignored — local only, pushed via Kamal) |
| `docs/supabase.md` | Supabase connection details, passwords, SQL access |
