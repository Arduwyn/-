import Link from 'next/link'

import './HomeHero.css'

import { ZeroTrustExchange } from '../ZeroTrustExchange'
import { accentText } from './accent'
import type { HomeHeroBlockData } from './types'

export function HomeHeroBlock({ eyebrow, heading, sub, ctas, showDiagram }: HomeHeroBlockData) {
  return (
    <div className="hero-shell">
      <section className="hero container">
        {eyebrow ? <span className="hero-eyebrow">{eyebrow}</span> : null}
        <h1>{accentText(heading)}</h1>
        {sub ? <p className="sub">{sub}</p> : null}
        {ctas?.length ? (
          <div className="hero-cta">
            {ctas.map((cta, i) => (
              <Link key={cta.id ?? i} className={`btn btn-${cta.style ?? 'primary'}`} href={cta.href}>
                {cta.label}
              </Link>
            ))}
          </div>
        ) : null}
        {showDiagram !== false ? <ZeroTrustExchange /> : null}
      </section>
    </div>
  )
}
