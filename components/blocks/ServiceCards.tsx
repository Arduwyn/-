import './ServiceCards.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { ServiceCardsBlockData } from './types'

export function ServiceCardsBlock({ anchor, eyebrow, heading, subheading, items }: ServiceCardsBlockData) {
  return (
    <section id={anchor || undefined} className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="services-wrap">
        <div className="svc-grid">
          {items?.map((item, i) => (
            <article key={item.id ?? i} className="svc-card">
              {item.tag ? <span className="tag">{item.tag}</span> : null}
              <h3>{accentText(item.title)}</h3>
              {item.bullets?.length ? (
                <ul>
                  {item.bullets.map((bullet, j) => (
                    <li key={j}>{bullet.text}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
