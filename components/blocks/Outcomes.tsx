import './Outcomes.css'

import { Icon } from '../Icon'
import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { OutcomesBlockData } from './types'

export function OutcomesBlock({ eyebrow, heading, subheading, items }: OutcomesBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="outcomes">
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="outcome">
            <div className="oi">
              <Icon name={item.icon} />
            </div>
            <div>
              <h3>{accentText(item.title)}</h3>
              {item.body ? <p>{item.body}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
