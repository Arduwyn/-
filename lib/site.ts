const BRAND = 'Arduwyn'

/**
 * Builds a page <title> string: the section name followed by the brand, e.g.
 * `pageTitle('Zero Trust Architecture')` → `'Zero Trust Architecture — Arduwyn'`.
 * With no section (or a blank one), returns just the brand.
 */
export function pageTitle(section?: string): string {
  const trimmed = section?.trim()
  return trimmed ? `${trimmed} — ${BRAND}` : BRAND
}
