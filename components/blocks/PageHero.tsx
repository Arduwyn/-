import './PageHero.css'

import { accentText } from './accent'
import type { PageHeroBlockData } from './types'

export function PageHeroBlock({ eyebrow, heading, subheading }: PageHeroBlockData) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow ? <span className="hero-eyebrow">{eyebrow}</span> : null}
        <h1>{accentText(heading)}</h1>
        {subheading ? <p>{accentText(subheading)}</p> : null}
      </div>
    </section>
  )
}
