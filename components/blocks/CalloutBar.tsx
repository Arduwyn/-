import Link from 'next/link'

import './CalloutBar.css'

import { accentText } from './accent'
import type { CalloutBarBlockData } from './types'

export function CalloutBarBlock({ body, button }: CalloutBarBlockData) {
  return (
    <section className="container">
      <div className="autobar">
        <p>{accentText(body)}</p>
        {button?.label && button?.href ? (
          <Link className="btn btn-ghost" href={button.href}>
            {button.label}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
