# Security Dependency Update (2026-10-23)

**Branch:** `chore/security-updates`

**Goal:** Clear the `pnpm audit` findings (127 advisories, 10 critical) that had
accumulated since the June deploy, and redeploy.

## What changed

| Package | Before | After | Why |
|---|---|---|---|
| `payload` + all `@payloadcms/*` | 3.84.1 | 3.92.0 | 20 advisories incl. 4 critical (auth / access-control fixes). Peer-requires Next >= 16.3.3. |
| `next` | 16.2.6 | 16.4.2 | 19 advisories incl. 5 critical. 16.4.3 was published today and tripped pnpm's `minimumReleaseAge` guard, so we pinned the 8-day-old 16.4.2 (covers every advisory). |
| `eslint-config-next` | 16.2.6 | 16.4.2 | Match Next. |
| `sharp` | 0.34.5 | 0.35.5 | 3 high advisories. |
| `vite` | (transitive 8.0.14) | 8.3.5 explicit devDep | Nothing declared it directly so `pnpm update` never moved it. |
| `vitest`, `@vitejs/plugin-react`, `eslint`, `sass`, `tsx`, `tailwindcss` | — | latest in-range | Dev tooling refresh via `pnpm update`. |

Result: **`pnpm audit` → No known vulnerabilities found.**

## New migration — must run before deploy

Payload 3.92 adds `users.reset_password_requested_at`. Generated
`migrations/20261023_182038.{ts,json}` (one nullable column; backward
compatible, so the old container keeps working while the new one rolls out).

```bash
pnpm migrate:prod          # applies 20261023_182038 to Supabase
pnpm migrate:prod:status   # expect both migrations "Ran: Yes"
```

## Verification done locally

- `pnpm audit` clean
- `pnpm payload generate:importmap` + `pnpm build` — exit 0, all routes compile
- `tsc --noEmit` clean
- Payload 3.92 boots against local Postgres in ~500 ms and queries `pages`
- `pnpm test:unit` — 8 passed
- `pnpm test:int` — **2 suites time out in `beforeAll` (10 s hook limit)**
  even though a bare `getPayload()` boots in 0.5 s. Harness issue (vitest
  transform of Payload), not a runtime issue. Follow-up: raise `hookTimeout`
  in `vitest.config.mts` or warm the module graph in setup.
- `pnpm lint` — 2 pre-existing errors in `components/admin/BackToSite.tsx`
  (`<a href="/">` should be `<Link>`). Not caused by this upgrade; Next 16
  doesn't lint during `next build`, so it doesn't block deploy.

## Deploy runbook

```bash
git checkout chore/security-updates     # or merge to main first
pnpm migrate:prod                       # 1. schema first (additive)
kamal deploy                            # 2. build amd64 image, push to GHCR, roll container
curl -sI https://arduwyn.com | head -3  # 3. 200 OK
curl -s https://arduwyn.com/admin | grep -c '<!--$-->'   # admin should NOT be empty RSC markers
```

If `kamal deploy` fails at **registry login** (`denied` / `401`), the GHCR PAT
in `~/.ghcr-token` has expired: create a new classic PAT with `write:packages`
+ `read:packages`, overwrite `~/.ghcr-token`, re-run. No other token is needed.

## Droplet audit (read-only, 2026-10-23) — hardening follow-ups

Findings from `ssh arduwyn-prod`:

| Finding | Risk | Suggested fix |
|---|---|---|
| **Reboot pending** since kernel update (`/var/run/reboot-required`); uptime 146 days on 6.8.0-71 | Running an unpatched kernel | `apt update && apt upgrade -y && reboot` during a quiet window. Kamal containers restart automatically (`restart: unless-stopped`). ~1 min downtime. |
| 82 upgradable packages incl. `docker-ce` 29.5 → 29.9, `zlib1g` security | Known CVEs on host | Same `apt upgrade`. `unattended-upgrades` is on, but it only takes *security* pocket and never reboots. |
| **`ufw` inactive** — 22/80/443 open to the world | Origin reachable directly, bypassing Cloudflare | Enable ufw: allow 22 (ideally only from your IP), allow 80/443 **only from Cloudflare IP ranges**. Caveat: Let's Encrypt HTTP-01 renewal through kamal-proxy must still work — with Cloudflare proxying in "Full (strict)" mode the challenge passes through CF, so this is fine. Test renewal after locking down. |
| `PermitRootLogin yes` + single root key | Standard Kamal setup; password auth is already off | Acceptable for now. Hardening: `PermitRootLogin prohibit-password` (explicit), and consider `fail2ban` for SSH noise. |
| `x-powered-by: Next.js, Payload` header leaks stack | Info disclosure (low) | `poweredByHeader: false` in `next.config.ts`; add `headers()` for HSTS / `X-Content-Type-Options` / `Referrer-Policy` / `Permissions-Policy`. |
| No HSTS / CSP / frame headers from origin | Clickjacking / downgrade | Same `headers()` block, or set them at Cloudflare. |
| `last` shows a 10 s root login on **2026-10-20 from 198.211.111.194** (a DigitalOcean IP, not the usual home IP) | Probably the DO web console / recovery agent — verify | Check `journalctl -u ssh --since 2026-10-20` for the key fingerprint used; rotate `id_arduwyn` if unrecognized. |
| No Dependabot / Renovate config in repo | Drift like this recurs silently | Add `.github/dependabot.yml` (pnpm, weekly, grouped) so advisories surface as PRs. |
| pnpm `minimumReleaseAge` is active (global default) | Good — keep it | It blocked a same-day Next release today. Don't add `minimumReleaseAgeExclude` entries to bypass it. |
| Supabase RLS still not enabled on Payload tables (from May follow-ups) | Defense in depth | SQL snippet in `docs/supabase.md`. |
