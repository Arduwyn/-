import './FeatureCards.css'

import { Icon } from '../Icon'
import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { FeatureCardsBlockData } from './types'

export function FeatureCardsBlock({
  eyebrow,
  heading,
  subheading,
  columns,
  items,
}: FeatureCardsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className={`feature-cards cols-${columns ?? '3'}`}>
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="feature-card">
            {item.number ? (
              <div className="fc-n">{item.number}</div>
            ) : (
              <Icon name={item.icon} className="fc-i" />
            )}
            {item.tag ? <span className="fc-tag">{item.tag}</span> : null}
            <h3>{accentText(item.title)}</h3>
            {item.body ? <p>{item.body}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
