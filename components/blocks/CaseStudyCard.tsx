'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { accentText } from './accent'
import type { CaseStudiesBlockData } from './types'

type Item = NonNullable<CaseStudiesBlockData['items']>[number]

/**
 * A single case-study card + its detail modal.
 *
 * Card is keyboard-activatable (Enter/Space). Modal uses the native <dialog>
 * element via showModal() — that gives us a free focus trap, ESC-to-close,
 * scroll lock via ::backdrop, and centered positioning. The local `open`
 * React state mirrors the dialog's actual open/closed state so the trigger
 * stays consistent if the user closes via ESC or backdrop click.
 */
export function CaseStudyCard({
  item,
  briefingHref,
}: {
  item: Item
  briefingHref?: string | null
}) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const image = item.image && typeof item.image === 'object' ? item.image : null

  // Drive the <dialog> from React state.
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  // Sync state back when the dialog closes via ESC or backdrop click.
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    const handleClose = () => setOpen(false)
    d.addEventListener('close', handleClose)
    return () => d.removeEventListener('close', handleClose)
  }, [])

  // Click anywhere on the ::backdrop closes the modal.
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  const onCardKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  const titleId = `cs-modal-${item.id ?? item.title}-title`

  return (
    <>
      <article
        className="cs-card"
        onClick={() => setOpen(true)}
        onKeyDown={onCardKey}
        role="button"
        tabIndex={0}
        aria-label={`Open ${item.title} case study`}
      >
        <div className="cs-thumb" aria-hidden={image ? undefined : true}>
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || ''}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 920px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="6" y="9" width="36" height="30" rx="3" />
              <circle cx="17" cy="19" r="3.5" />
              <path d="M9 35l11-11 7 7 6-6 9 9" />
            </svg>
          )}
        </div>
        {item.vertical ? <span className="vertical">{item.vertical}</span> : null}
        <h3>{accentText(item.title)}</h3>
        {item.summary ? <p>{item.summary}</p> : null}
        {item.ctaLabel ? <span className="cs-cta">{item.ctaLabel}</span> : null}
      </article>

      <dialog ref={dialogRef} className="cs-modal" aria-labelledby={titleId} onClick={onDialogClick}>
        {/* Inner wrapper so the click-to-close pattern (target === currentTarget)
            triggers on backdrop only, not on the modal content. */}
        <div className="cs-modal-inner">
          <button
            type="button"
            className="cs-modal-close"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <h3 id={titleId}>{accentText(item.title)}</h3>
          {item.lede ? <p className="cs-modal-lede">{item.lede}</p> : null}
          {item.stats?.length ? (
            <div className="cs-modal-stat-row">
              {item.stats.map((s, i) => (
                <div key={s.id ?? i} className="cs-modal-stat">
                  <div className="value">{accentText(s.value)}</div>
                  <div className="label">{s.label}</div>
                </div>
              ))}
            </div>
          ) : null}
          {item.situation ? (
            <>
              <h4>Situation</h4>
              <p className="cs-modal-note">{item.situation}</p>
            </>
          ) : null}
          {item.approach?.length ? (
            <>
              <h4>Approach</h4>
              <ul>
                {item.approach.map((a, i) => (
                  <li key={a.id ?? i}>
                    {/* Wrap in <span> so the li's flex layout sees one inline child
                        — same pattern fix we used in ToolStages bullets. */}
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {item.outcome ? (
            <>
              <h4>Outcome</h4>
              <p className="cs-modal-note">{item.outcome}</p>
            </>
          ) : null}
          {briefingHref ? (
            <a className="cs-modal-cta" href={briefingHref} onClick={() => setOpen(false)}>
              Request a full briefing →
            </a>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
