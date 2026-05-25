import Link from 'next/link'

import type { HeroBlockData } from './types'

export function HeroBlock({ eyebrow, heading, subheading, buttons }: HeroBlockData) {
  return (
    <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="section-head">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{heading}</h1>
        {subheading ? <p>{subheading}</p> : null}
      </div>
      {buttons?.length ? (
        <div className="btn-row">
          {buttons.map((button, i) => (
            <Link
              key={button.id ?? `${button.href}-${i}`}
              className={`btn btn-${button.style ?? 'primary'}`}
              href={button.href}
            >
              {button.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
