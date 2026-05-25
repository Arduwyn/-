import Link from 'next/link'

import type { CTABlockData } from './types'

export function CTABlock({ heading, text, button }: CTABlockData) {
  return (
    <section className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="cta-band">
        <h2>{heading}</h2>
        {text ? <p>{text}</p> : null}
        {button?.label && button?.href ? (
          <Link className="btn btn-primary" href={button.href}>
            {button.label}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
