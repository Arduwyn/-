import './LabeledRows.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { LabeledRowsBlockData } from './types'

export function LabeledRowsBlock({ eyebrow, heading, subheading, layout, items }: LabeledRowsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className={`labeled-rows ${layout === 'stack' ? 'stack' : 'grid'}`}>
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="lr-row">
            <h4>{accentText(item.title)}</h4>
            {item.description ? <p className="lr-desc">{item.description}</p> : null}
            {item.tags?.length ? (
              <div className="lr-tags">
                {item.tags.map((tag, j) => (
                  <span key={j} className="tech">
                    {tag.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
