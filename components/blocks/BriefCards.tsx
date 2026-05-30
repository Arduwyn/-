import './BriefCards.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { BriefCardsBlockData } from './types'

export function BriefCardsBlock({ eyebrow, heading, subheading, items }: BriefCardsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="briefs-grid">
        {items?.map((item, i) => (
          <article key={item.id ?? i} className="brief-card">
            {item.tag ? <span className="tag">{item.tag}</span> : null}
            <h3>{accentText(item.title)}</h3>
            {item.summary ? <p>{item.summary}</p> : null}
            <span className="card-more">Read brief →</span>
          </article>
        ))}
      </div>
    </section>
  )
}
