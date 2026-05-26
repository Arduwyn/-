import { Fragment, type ReactNode } from 'react'

/**
 * Renders text with *asterisk-wrapped* portions as the design's accent-italic span,
 * e.g. accentText('Industry *Focus*') → Industry <span class="accent-i">Focus</span>.
 */
export function accentText(text?: string | null): ReactNode {
  if (!text) return null
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <span key={i} className="accent-i">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** Splits a textarea into <p> paragraphs (blank-line separated), each with accent parsing. */
export function paragraphs(text?: string | null): ReactNode {
  if (!text) return null
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => <p key={i}>{accentText(p)}</p>)
}

/** Like accentText, but also wraps `backtick` portions in <code> (for inline code in bullets). */
export function codeText(text?: string | null): ReactNode {
  if (!text) return null
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <Fragment key={i}>{accentText(part)}</Fragment>
    ),
  )
}
