import './ProductCards.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { ProductCardsBlockData } from './types'

export function ProductCardsBlock({ eyebrow, heading, subheading, items }: ProductCardsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="products">
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="product">
            {item.code ? <span className="code">{item.code}</span> : null}
            <h3>{accentText(item.title)}</h3>
            {item.lede ? <p className="lede">{item.lede}</p> : null}
            {item.bullets?.length ? (
              <ul>
                {item.bullets.map((bullet, j) => (
                  <li key={j}>{bullet.text}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
