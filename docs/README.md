# Arduwyn — Project Docs

This directory is the working memory for the Arduwyn marketing-site build. It exists so
that anyone — including a fresh Claude Code session — can get full context quickly.

## Read these in order

1. **[progress-log.md](./progress-log.md)** — what's been done (dated) and the current next steps.
2. **[decisions.md](./decisions.md)** — the *why* behind the architecture (locked decisions + rejected alternatives).
3. **[payload-cms.md](./payload-cms.md)** — how the Payload CMS / admin is wired and how to extend it.
4. **[testing.md](./testing.md)** — the test harness (Vitest + Playwright) and the TDD workflow.

## Related context (outside this repo)

- Original handoff doc: `/Users/natgit/Desktop/Work/Arduwyn Industries/code-work/arduwyn-handoff.md`
- Source HTML deliverable (client design): `/Users/natgit/Desktop/Work/Arduwyn Industries/arduwyn-2026/`

## How to keep these docs useful

- Append to `progress-log.md` whenever a meaningful chunk of work lands — **date every entry**.
- Record any non-obvious decision in `decisions.md` (what + why + what was rejected).
- Keep `payload-cms.md` current as the CMS grows (new collections, access rules, production config).
- Prefer updating an existing section over duplicating it.
