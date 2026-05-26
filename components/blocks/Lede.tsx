import './Lede.css'

import { SectionHead } from '../SectionHead'
import { paragraphs } from './accent'
import type { LedeBlockData } from './types'

export function LedeBlock({ eyebrow, heading, subheading, body }: LedeBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="lede-band">{paragraphs(body)}</div>
    </section>
  )
}
