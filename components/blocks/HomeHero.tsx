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
            {ctas.map((cta, i) => {
              // Hash-only hrefs (e.g. "#portfolio") need a plain <a> — Next's
              // <Link> doesn't reliably trigger anchor scroll in the App Router
              // unless the href includes a path. Real paths still use <Link>.
              const isHashOnly = cta.href.startsWith('#')
              const className = `btn btn-${cta.style ?? 'primary'}`
              if (isHashOnly) {
                return (
                  <a key={cta.id ?? i} className={className} href={cta.href}>
                    {cta.label}
                  </a>
                )
              }
              return (
                <Link key={cta.id ?? i} className={className} href={cta.href}>
                  {cta.label}
                </Link>
              )
            })}
          </div>
        ) : null}
        {showDiagram !== false ? (
          // data-parallax-speed: ZTE diagram drifts at 20% scroll rate, giving
          // subtle depth as you scroll past the hero. Picked up by <Parallax />.
          <div data-parallax-speed="0.2">
            <ZeroTrustExchange />
          </div>
        ) : null}
      </section>
    </div>
  )
}
