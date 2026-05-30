import Image from 'next/image'
import Link from 'next/link'

import './CaseStudies.css'

import { accentText } from './accent'
import type { CaseStudiesBlockData } from './types'

export function CaseStudiesBlock({ heading, subheading, ctaLabel, ctaHref, items }: CaseStudiesBlockData) {
  return (
    <section className="container">
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
        {items?.map((item, i) => {
          // When the editor picked an image, it's populated as a Media doc;
          // when empty, it's null/undefined and we fall back to the placeholder.
          const image = item.image && typeof item.image === 'object' ? item.image : null
          return (
            <article key={item.id ?? i} className="cs-card">
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
          )
        })}
      </div>
    </section>
  )
}
