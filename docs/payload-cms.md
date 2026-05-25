# Payload CMS — Setup & Working Notes

How Payload is wired into this project, and how to extend it.

## Versions

- **Payload 3.84.1** — `payload`, `@payloadcms/next`, `@payloadcms/richtext-lexical`,
  `@payloadcms/db-postgres`, `@payloadcms/ui`
- **Next.js 16.2.6**, **React 19.2.4** — Payload supports Next **16.2.6+**.
  ⚠️ Next **15.5 – 16.1.x is NOT supported** by Payload; stay on 16.2.6+.
- Supporting: `sharp` (image processing), `graphql`, `sass` (admin panel styles)

## File map

| Path | Purpose |
|---|---|
| `payload.config.ts` (root) | Main config: Postgres adapter, collections, lexical editor, admin user, type output. |
| `collections/Users.ts` | Auth collection (admins). Email + password added automatically by `auth: true`. |
| `collections/Media.ts` | Upload collection for images → files stored in `/media` (gitignored). |
| `collections/Pages.ts` | Editable pages: `title`, unique `slug`, and a blocks-based `layout`. |
| `blocks/` | Block field configs (`Hero`, `RichText`, `CTA`) used by the page `layout`. |
| `components/blocks/` + `components/RenderBlocks.tsx` | React components that render each block on the frontend. |
| `app/(payload)/` | Admin UI (`/admin`) + API (`/api`, `/api/graphql`). **Auto-generated — do not hand-edit;** regenerate via CLI. |
| `app/(frontend)/` | The marketing site (its own root layout). |
| `payload-types.ts` (root) | Generated TS types. **Committed.** Re-run generate after config changes. |
| `.env` | `PAYLOAD_SECRET`, `DATABASE_URI` (gitignored). `.env.example` is the committed template. |

## Running it

```bash
docker compose up -d     # local Postgres must be running
pnpm dev                 # http://localhost:3000  (site)  +  /admin (CMS)
pnpm generate:types      # regenerate payload-types.ts after editing collections
pnpm generate:importmap  # regenerate admin import map after adding custom admin components
pnpm payload             # Payload CLI (migrations, etc.)
```

- **First run:** open `http://localhost:3000/admin` and create the first admin user.
- Local emails (e.g. password reset) are written to the **server console** until an email
  adapter (Resend) is configured.

## The page builder (blocks)

Pages are composed from reusable **blocks** in the admin — no code per page. This is the
"manage it all from the CMS" model.

**How it works:**
- `collections/Pages.ts` defines a `layout` field of type `blocks`, listing the allowed blocks.
- Each block's *fields* live in `blocks/` (e.g. `blocks/Hero.ts`).
- Each block's *rendering* lives in `components/blocks/` (e.g. `components/blocks/Hero.tsx`),
  dispatched by `components/RenderBlocks.tsx`.
- A page renders by fetching it via the Local API and passing `page.layout` to
  `<RenderBlocks>`. See `app/(frontend)/page.tsx` (the homepage reads slug `home`).

**To add a new block type:**
1. Create the field config in `blocks/MyBlock.ts` (a Payload `Block`).
2. Add it to the `blocks: [...]` array in `collections/Pages.ts`.
3. `pnpm generate:types`.
4. Create the render component in `components/blocks/MyBlock.tsx` and add a `case` for its
   `blockType` in `components/RenderBlocks.tsx`.
5. (Test-first) extend `tests/int/pages.int.spec.ts`.

## Production security checklist (before going live)

- Serve over **HTTPS**.
- Strong, unique `PAYLOAD_SECRET` (do **not** reuse the dev value).
- Set production cookie config (`secure`, `sameSite`) and the `serverURL` / `cors` / `csrf`
  allow-list in `payload.config.ts`.
- Point `DATABASE_URI` at the production **Supabase** Postgres; run `payload migrate`.
- Configure an **email adapter (Resend)** so password reset works.
- Keep Payload and Next updated.

## Follow-ups / not done yet

- A catch-all `app/(frontend)/[slug]/page.tsx` route so *any* CMS page renders by its slug.
- Port the existing pages (architecture, etc.) into the blocks model.
- Role-based access control on `Users` (admin vs editor).
- Email adapter (Resend) — shared with the contact-form work.
- Per-page SEO fields (meta title/description) + `generateMetadata`.
- Image optimization: serve Media through `next/image` (`next.config.ts` already allows
  `/api/media/file/**` in `images.localPatterns`).
