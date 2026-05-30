import './StatGrid.css'

import { SectionHead } from '../SectionHead'
import type { StatGridBlockData } from './types'

export function StatGridBlock({ eyebrow, heading, subheading, columns, items }: StatGridBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className={`stat-grid cols-${columns ?? '4'}`}>
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="stat-cell">
            {item.kicker ? <div className="stat-kicker">{item.kicker}</div> : null}
            <div className="stat-term">{item.term}</div>
            {item.body ? <p>{item.body}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
