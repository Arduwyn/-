import './Placeholder.css'

import { SectionHead } from '../SectionHead'
import type { PlaceholderBlockData } from './types'

export function PlaceholderBlock({ eyebrow, heading, subheading, tag, body }: PlaceholderBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="placeholder">
        {tag ? <span className="ph-tag">{tag}</span> : null}
        <p>{body}</p>
      </div>
    </section>
  )
}
