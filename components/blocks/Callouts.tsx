import './Callouts.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { CalloutsBlockData } from './types'

export function CalloutsBlock({ eyebrow, heading, subheading, items }: CalloutsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="callouts">
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="callout">
            {item.tag ? <span className="co-tag">{item.tag}</span> : null}
            <h3>{accentText(item.title)}</h3>
            {item.body ? <p>{item.body}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
