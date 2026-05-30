import Link from 'next/link'

import './CaseStudies.css'

import { accentText } from './accent'
import { CaseStudyCard } from './CaseStudyCard'
import type { CaseStudiesBlockData } from './types'

export function CaseStudiesBlock({
  anchor,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  items,
}: CaseStudiesBlockData) {
  return (
    <section id={anchor || undefined} className="container">
      <div className="cs-head">
        <div>
          {heading ? <h2>{accentText(heading)}</h2> : null}
          {subheading ? <p>{subheading}</p> : null}
        </div>
        {ctaLabel && ctaHref ? (
          <Link className="btn btn-ghost" href={ctaHref}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
      <div className="cs-grid">
        {items?.map((item, i) => (
          // Each card is its own client component (manages its modal state).
          // We pass the section-level ctaHref so the modal's "Request a full
          // briefing" CTA matches the section header CTA.
          <CaseStudyCard key={item.id ?? i} item={item} briefingHref={ctaHref} />
        ))}
      </div>
    </section>
  )
}
