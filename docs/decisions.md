# Architecture Decisions

Lightweight ADR-style record — what was decided, why, and what was rejected.

---

## CMS / admin content editing → Payload (self-hosted)

**Decided 2026-05-25.** Use Payload CMS, self-hosted inside the Next.js app, for admin
login + content editing + image uploads.

**Why:** The requirement ("an admin logs in and edits copy / uploads images") is a
*content-management* need, not just authentication. Payload provides the admin dashboard,
structured content editing, a media library with uploads, and login+roles in one
self-hostable package — which matches the project's "portable hosting" goal. The framework
is free and open-source (MIT); only the optional **Payload Cloud** managed hosting is paid.

**Rejected alternatives:**
- *Auth0 + custom dashboard + DB + blob storage* — would mean hand-building the entire
  editing UI and upload pipeline that Payload provides out of the box. Kept as a future
  option (see next decision).
- *Sanity (SaaS CMS)* — fast to start, but content lives on a third-party service; less
  control and portability than self-hosted Payload.

---

## Auth: Payload built-in now; Auth0 can layer in later

**Decided 2026-05-25.** Use Payload's built-in auth for now (email/password, JWT in
HTTP-only cookies, salted + hashed passwords, configurable login-attempt lockout, CSRF
allow-list).

**Why:** Appropriate and secure for a small set of trusted admins served over HTTPS. This
is **not a one-way door** — Auth0 can be added later as an OAuth/OIDC strategy in Payload.
That becomes worthwhile mainly if the future CRM/client-portal project needs a *shared* login.

**Open question:** Will the future CRM portal share this login? *(Unresolved — this is what
determines whether/when Auth0 gets added.)*

---

## Database: Supabase Postgres (dev + prod)

**Decided 2026-05-25** (revised the same day — initially SQLite-for-dev). Use **Supabase
(managed Postgres)** for both development and production, via Payload's Postgres adapter
(`@payloadcms/db-postgres`).

**Why:** Payload recommends developing on the same database engine you deploy on — SQLite and
Postgres differ (column types, and migrations are adapter-specific and non-portable).
Switching now, while only `Users` + `Media` exist and no migrations are committed, is the
cheapest possible moment.

**Scope:** Supabase is used **only as the database** (and possibly file storage later). Auth
stays with Payload — we do **not** use Supabase Auth, which would be a second, competing auth
system. This is compatible with adding Auth0 later (see the auth decision above).

**Tests:** Integration tests run against an isolated test database (a local/ephemeral Postgres
or a separate Supabase project), never dev/prod.

---

## App structure: dual root layouts via route groups

**Decided 2026-05-25.** `app/(frontend)/` and `app/(payload)/` each own their root layout;
there is no shared `app/layout.tsx`.

**Why:** The Payload admin renders its own `<html>` shell and must not inherit the marketing
site's Header, Footer, or fonts. Separate root layouts per route group is Payload's
recommended pattern for adding it to an existing Next.js app.

---

## The site is now dynamic-capable

**Note (2026-05-25).** Once pages read content from the CMS, the site renders at request
time (ISR/SSR) rather than as a pure static export. This retires the "static-friendly
export" assumption from the original handoff. Still compatible with Vercel or any Node host.
