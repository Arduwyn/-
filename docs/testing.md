# Testing & TDD

This project is built **test-first**. The harness has two runners:

- **Vitest** — unit tests and Payload integration tests.
- **Playwright** — end-to-end tests in a real Chromium browser.

There is also an invokable Claude Code skill, **`/tdd-feature`**
(`.claude/skills/tdd-feature/SKILL.md`), that encodes the workflow below for AI sessions.

## The TDD loop

1. 🔴 **Red** — write the smallest test that describes the behavior; run it; confirm it fails
   for the right reason.
2. 🟢 **Green** — write the minimum code to pass.
3. 🔧 **Refactor** — clean up with the test as a safety net.

## Layers & layout

| Layer | Location | Runner | Use for |
|---|---|---|---|
| Unit | `tests/unit/**/*.spec.ts` | Vitest | Pure functions / helpers (`lib/`). Fast, no DB. |
| Integration | `tests/int/**/*.int.spec.ts` | Vitest | Payload collections, access control, hooks, content fetching. Boots Payload against an **isolated test DB**. |
| E2E | `tests/e2e/**/*.e2e.spec.ts` | Playwright | Whole user flows (admin login, editing, frontend rendering). |
| Helpers | `tests/helpers/` | — | Shared login/seed utilities for int + e2e. |

## Commands

```bash
pnpm test:unit     # fast unit tests (iterate here)
pnpm test:int      # Payload integration tests (needs test DB)
pnpm test          # unit + integration
pnpm test:watch    # Vitest watch mode — the red→green loop
pnpm test:e2e      # Playwright e2e (auto-starts a dev server)
```

## Config files

- `vitest.config.mts` — jsdom environment, `@/` alias via `vite-tsconfig-paths`, includes
  `tests/unit` + `tests/int`, excludes `tests/e2e`.
- `vitest.setup.ts` — loads `.env` for integration tests.
- `playwright.config.ts` — Chromium project, `baseURL` of `http://localhost:3000`, auto-boots
  `pnpm dev` as its web server.

## The isolated test database (integration tests)

Integration tests boot Payload and **never** touch your dev or production data. They run
against a dedicated `arduwyn_test` database in the local Docker Postgres container (created by
`docker/initdb/01-create-test-db.sql`). `vitest.setup.ts` forces `DATABASE_URI` at that
database before Payload boots; CI can override it with `DATABASE_URI_TEST`. Payload pushes the
schema automatically on the first connection.

**Requires the database to be running:** `docker compose up -d`.

## A worked example (already in the repo)

`lib/site.ts` (the `pageTitle` helper) was built test-first: `tests/unit/site.spec.ts` was
written first and failed, then the helper was added to make it pass. It's the reference for
the unit-test pattern.
