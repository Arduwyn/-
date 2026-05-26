# Page Migration — Progress Log (2026-05-25)

**Branch:** `feat/migrate-pages`

**Goal:** Faithfully reproduce the 8 designed HTML pages as editable Payload **blocks**, so they're
managed in the admin dashboard. Visual output matches the designs exactly; content lives in the
CMS (editable) instead of hardcoded.

## Source designs
`/Users/natgit/Desktop/Work/Arduwyn Industries/code-work/arduwyn-2026/`
— index, architecture, engineering, automation, managed-services, industries, finance, healthcare

## Plan
1. **Inventory** the 8 designs → catalog distinct section types → block library.
2. **Catch-all `[slug]` route** so any CMS page renders by its slug.
3. **Block library** — one block per design section, rendered with the existing CSS.
4. **Seed** each page with its exact design copy (pre-built + editable).
5. **Verify** each page matches its design; open a PR to merge into `main`.

## Status
- [x] Inventory designs — surveyed all 8 pages + shared CSS
- [x] Catch-all `[slug]` route — `app/(frontend)/[slug]/page.tsx`
- [x] Block library — **25 blocks** built, all faithful to the designs (adds HomeHero + ZTE diagram,
  AboutSplit, Outcomes, ServiceCards, CaseStudies, BriefCards, LaneCards, FAQ).
- [x] Seed pages — **all 7 CMS pages seeded**: home (full index), industries, finance, healthcare,
  managed-services, engineering, automation. (architecture = code-only.)
- **Decision (2026-05-25):** `architecture` stays **code-only** (hardcoded `app/(frontend)/architecture/`),
  NOT migrated to the CMS. Rationale: the CMS is for pages whose copy gets updated; architecture is
  stable/technical, so the redundant rebuild isn't worth it. The hardcoded `/architecture` route
  keeps taking precedence over the catch-all.
- [~] Verify + merge — all pages seeded & type-check clean; needs a dev-server restart + visual pass, then PR.

## Polish / follow-ups (after this first pass)
- Interactive **card modals** (Service / Case Study / Brief detail dialogs) — incl. the 2 bespoke
  brief modal bodies (Terraform code block, layered-DLP diagram, interactive funnel).
- Section-anchor IDs so in-page nav (`#services`, `#about`, `#portfolio`, `#engagement`) scrolls;
  only `#contact` resolves today (the CTA block).
- Case-study images via a Media field (currently the design's placeholder thumbs).
- Scroll-reveal (`.reveal`) fade-up animations + mobile-nav toggle behaviour.
- Image optimization (`next/image`), assets cleanup, favicon/theme color.

### Patterns established (Wave 1)
- Each block = field config in `blocks/` + render component in `components/blocks/` (+ co-located
  `.css` for page-scoped styles) + a `case` in `components/RenderBlocks.tsx`.
- `*accent*` convention in text fields → renders the design's `.accent-i` italic span
  (`components/blocks/accent.tsx`). `paragraphs()` splits a textarea on blank lines.
- Shared `components/SectionHead.tsx` (eyebrow/heading/subheading) embedded in blocks.
- Icons via `components/Icon.tsx` registry + a `select` field on the block.
- Seeding via `scripts/seed.ts` (Payload Local API, idempotent upsert per page).

## Block library (consolidated from ~25 section types → ~14 blocks)
- **Universal:** `PageHero`, `Prose`/`Lede`, `CtaBand`, `SectionHead` (shared sub-piece)
- **Card families (merged):** `FeatureCards` (diff/outcomes/icon/principles via columns+icon/tag),
  `ServiceCards` (+modal), `ProductCards`, `IndustryTiles` (+bullets), `CaseStudies` (+stats modal)
- **Structured (merged):** `CompareColumns`, `LabeledRows` (ref-stack+matrix), `StepChain`,
  `StatGrid` (compliance+cadence), `NumberedTimeline` (4 phase/playbook variants), `TagGroups`
- **Bespoke → static components (text editable, structure fixed):** Home hero + Zero Trust
  Exchange SVG, automation `Terminal` & `ToolStages`, the 2 technical-brief modal bodies,
  placeholder notes.
- Note: each source page kept its section CSS inline → port page-scoped CSS per block.
  Headings use accent-italic spans → heading/body fields are rich-text.

## Build waves
1. Catch-all `/[slug]` route.
2. Universal blocks + `TagGroups` + `IndustryTiles` → `industries`, `finance`, `healthcare`.
3. Card family → `index`, `engineering`, `managed-services`.
4. Structured blocks → `architecture` + timeline-heavy pages.
5. Automation/bespoke + home hero + modals.
6. Seed each page's real copy as its blocks land.

## Log
- **2026-05-25** — Branched `feat/migrate-pages` off `main` (first commit pushed to GitHub).
- **2026-05-25** — Completed design inventory (all 8 pages + `assets/styles.css`). Defined the
  consolidated block library + build waves above. Added the catch-all `[slug]` route.
- **2026-05-25** — Wave 1: built `PageHero`, `Lede`, `IndustryTiles` blocks + upgraded `CTA`
  (eyebrow/body/buttons) with ported page-scoped CSS; added accent/section-head/icon helpers and
  `scripts/seed.ts`. Seeded the `industries` page. `generate:types` + `tsc` clean. Needs a
  dev-server restart + `pnpm seed` to view at `/industries`.
- **2026-05-25** — Added unit tests for the accent/paragraph helpers (`tests/unit/accent.spec.tsx`,
  8/8 green). Built `Callouts`, `PlatformTags`, `Placeholder` blocks (+ CSS); wired them in.
  Seeded `finance` and `healthcare`. `generate:types` + `tsc` clean. 3 of 8 pages migrated.
- **2026-05-25** — ✅ **Pattern validated:** seeded + rendered `/industries`, `/finance`, `/healthcare`
  (all HTTP 200; accent spans, block CSS, and the CMS→render loop confirmed — user verified
  `/industries` visually). Note: the CTA block schema change required a one-time drizzle
  "create column" answer during push. Proceeding with the 5 complex pages, starting with
  managed-services (builds the reusable NumberedTimeline / StatGrid / FeatureCards blocks).
- **2026-05-25** — Built `NumberedTimeline`, `FeatureCards`, `CalloutBar`, `StatGrid` blocks (+ CSS,
  + 6 icons), wired them in, seeded `managed-services`. Seed ran clean (additive tables, no prompt).
  `generate:types` + `tsc` clean. **4 of 8 pages migrated.** Remaining: architecture, engineering,
  automation, index.
- **2026-05-25** — `architecture` set to **code-only** (decision — not migrated). Built `ProductCards`,
  `NumberedGrid`, `LabeledRows`, `TagGroups` blocks (+ CSS); seeded `engineering` (playbook reuses
  `NumberedTimeline`). `generate:types` + `tsc` clean. **5 of 8 pages migrated** (industries, finance,
  healthcare, managed-services, engineering). Remaining CMS: automation, index. Block library = 15.
