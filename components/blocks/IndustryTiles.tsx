import Link from 'next/link'

import './IndustryTiles.css'

import { Icon } from '../Icon'
import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { IndustryTilesBlockData } from './types'

export function IndustryTilesBlock({ eyebrow, heading, subheading, items }: IndustryTilesBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="ind-row">
        {items?.map((item, i) => (
          <Link key={item.id ?? i} className="ind-card" href={item.href || '#'}>
            <Icon name={item.icon} className="ind-i" />
            <h3>{accentText(item.title)}</h3>
            {item.lede ? <p className="ind-lede">{item.lede}</p> : null}
            {item.bullets?.length ? (
              <ul>
                {item.bullets.map((bullet, j) => (
                  <li key={j} className={bullet.muted ? 'todo' : undefined}>
                    {bullet.text}
                  </li>
                ))}
              </ul>
            ) : null}
            {item.linkLabel ? <span className="ind-go">{item.linkLabel} →</span> : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
