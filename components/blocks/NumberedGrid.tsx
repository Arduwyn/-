import './NumberedGrid.css'

import { accentText } from './accent'
import type { NumberedGridBlockData } from './types'

export function NumberedGridBlock({ heading, count, intro, columns, items }: NumberedGridBlockData) {
  return (
    <section className="container">
      <div className="failures-wrap">
        <div className="failures-head">
          <h3>{accentText(heading)}</h3>
          {count ? <div className="count">{count}</div> : null}
        </div>
        {intro ? <p className="failures-intro">{intro}</p> : null}
        <div className={`failures-grid cols-${columns ?? '3'}`}>
          {items?.map((item, i) => (
            <div key={item.id ?? i} className="f">
              <div className="num">{item.number || String(i + 1).padStart(2, '0')}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
