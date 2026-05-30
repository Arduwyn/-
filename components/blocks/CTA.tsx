import Link from 'next/link'

import { accentText } from './accent'
import type { CTABlockData } from './types'

export function CTABlock({ eyebrow, heading, body, buttons }: CTABlockData) {
  return (
    <section id="contact" className="container">
      <div className="cta-band">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{accentText(heading)}</h2>
        {body ? <p>{body}</p> : null}
        {buttons?.length ? (
          <div className="btn-row">
            {buttons.map((button, i) => (
              <Link
                key={button.id ?? i}
                className={`btn btn-${button.style ?? 'primary'}`}
                href={button.href}
              >
                {button.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
