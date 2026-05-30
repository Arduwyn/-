# Editor Guide — Arduwyn Website Admin

Reference for whoever is editing the Arduwyn site via the admin panel.
Lives at `/admin` on production (and on dev: `http://localhost:3000/admin`).

---

## Logging in

Go to `/admin` → sign in with the email + password an admin provisioned for
you. If you don't have an account yet, an admin can create one in
`/admin → Users → Create`.

---

## Editing page content

All public site pages live in the **Pages** collection in the admin sidebar.

`/admin → Pages → click a page → edit the blocks → Save`

The order of the blocks in the form is the order they appear on the page.
Reorder by dragging the handle on the left of each block. Add a block with
the **+ Add Block** button at the bottom of the layout.

Text fields support two small bits of inline formatting:

- **`*accent*`** wraps text in the italic accent style (e.g.
  `Built for *modern* enterprises` → renders "modern" in italic accent).
- **`` `code` ``** (backticks) renders inline code (e.g.
  `` `MANIFEST.json` `` → small monospace pill).

Both are noted in the field's description in the admin form when supported.

---

## Uploading and using images

### Step 1 — upload to the Media library

`/admin → Media → Create`

For every image:

1. Drop the image file in
2. Fill in **alt text** — required. This is what screen readers read aloud
   and what shows if the image fails to load. Describe what's in the image
   in plain language. Example: `"Healthcare clinic Zero Trust architecture diagram"`.
   Avoid filler like "image of" — just describe.
3. Save

The image is now in your library and reusable across the site. You can
search/filter by filename in the Media list view.

### Step 2 — pick the image where you want it

Currently the only block with an image field is **Case Studies**. To use an
uploaded image on a case-study card:

`/admin → Pages → home → scroll to the Case Studies block → expand a case
study item → "Image" field → click to open the Media picker → select your
image → Save the page`

Live site updates on save.

### Recommended image specs by location

| Where | Aspect ratio | Suggested size | Notes |
|---|---|---|---|
| Case-study card thumbnail | 16:10 | ~1200 × 750 | Image is cropped to fill the card thumb. |

If you upload something at a different aspect ratio, it'll be cropped to fit
(centered). Wider or taller than 16:10 = parts will be cut off.

### Removing an image from a card

In the case-study item, the Image field has an **×** to clear it. The card
falls back to the placeholder picture-icon — nothing breaks.

### Deleting an image from the library

`/admin → Media → image → Delete`. **Warning:** if any block references that
image, those cards revert to the placeholder. Check usage before deleting.

---

## Common edits

### Changing nav links
Hardcoded in the site header for now — ask a developer.

### Changing the footer
Hardcoded for now — ask a developer.

### Editing the architecture page
Currently hardcoded (not in the CMS) — ask a developer. All other pages
(home, industries, finance, healthcare, managed-services, engineering,
automation) are editable in the admin.

### Adding a new page
`/admin → Pages → Create new`. Set the slug (the URL path — lowercase, no
spaces; e.g. `case-studies-detail`), then compose blocks in the layout.
The page is live at `/<slug>` once saved.

---

## When something looks off on the site

- **Hard refresh** (Cmd+Shift+R / Ctrl+Shift+R) — admin saves are live
  immediately, but your browser may be caching an old version
- **Check the field** in admin — empty fields hide their part of the design
  (a missing eyebrow, for instance, just doesn't render at all)
- **Still off?** Ping a developer with the page slug + block name. The
  admin URL in your address bar tells us exactly what to look at.
