import './LaneCards.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { LaneCardsBlockData } from './types'

export function LaneCardsBlock({ eyebrow, heading, subheading, items, note }: LaneCardsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="lanes">
        {items?.map((item, i) => (
          <div key={item.id ?? i} className="lane">
            {item.tag ? <span className="lt">{item.tag}</span> : null}
            <h3>{accentText(item.title)}</h3>
            {item.forText ? <p className="lane-for">{item.forText}</p> : null}
            {item.receiveLabel ? <p className="lk">{item.receiveLabel}</p> : null}
            {item.receive ? <p className="lv">{item.receive}</p> : null}
            {item.duration ? <div className="llen">{item.duration}</div> : null}
          </div>
        ))}
      </div>
      {note ? <p className="engage-note">{accentText(note)}</p> : null}
    </section>
  )
}
