import './PlatformTags.css'

import { SectionHead } from '../SectionHead'
import type { PlatformTagsBlockData } from './types'

export function PlatformTagsBlock({
  eyebrow,
  heading,
  subheading,
  intro,
  tags,
  note,
}: PlatformTagsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div>
        {intro ? <p className="plat-intro">{intro}</p> : null}
        <div className="plat-tags">
          {tags?.map((tag, i) => (
            <span key={i} className={tag.placeholder ? 'ph' : undefined}>
              {tag.label}
            </span>
          ))}
        </div>
        {note?.body ? (
          <div className="placeholder">
            {note.tag ? <span className="ph-tag">{note.tag}</span> : null}
            <p>{note.body}</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
