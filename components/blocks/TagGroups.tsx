import './TagGroups.css'

import { SectionHead } from '../SectionHead'
import type { TagGroupsBlockData } from './types'

export function TagGroupsBlock({ eyebrow, heading, subheading, columns, groups }: TagGroupsBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className={`tag-groups cols-${columns ?? '2'}`}>
        {groups?.map((group, i) => (
          <div key={group.id ?? i} className="cov-group">
            {group.label ? <span className="cov-label">{group.label}</span> : null}
            <div className="cov-tags">
              {group.tags?.map((tag, j) => (
                <span key={j}>{tag.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
