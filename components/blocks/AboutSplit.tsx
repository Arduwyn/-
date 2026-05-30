import { Fragment } from 'react'
import Link from 'next/link'

import './AboutSplit.css'

import { Icon } from '../Icon'
import { SectionHead } from '../SectionHead'
import { paragraphs } from './accent'
import type { AboutSplitBlockData } from './types'

export function AboutSplitBlock({
  anchor,
  eyebrow,
  heading,
  subheading,
  story,
  groups,
  focusLabel,
  focus,
  ctaLabel,
  ctaHref,
  differentiators,
}: AboutSplitBlockData) {
  return (
    <section id={anchor || undefined} className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className="about-grid">
        <div className="about-story">{paragraphs(story)}</div>
        <aside className="about-panel">
          {groups?.map((group, i) => (
            <Fragment key={group.id ?? i}>
              {group.label ? <h4 className={i > 0 ? 'spaced' : undefined}>{group.label}</h4> : null}
              <div className="cred-tags">
                {group.tags?.map((tag, j) => (
                  <span key={j}>{tag.label}</span>
                ))}
              </div>
            </Fragment>
          ))}
          {focusLabel ? <h4 className="spaced">{focusLabel}</h4> : null}
          {focus ? <p className="focus">{focus}</p> : null}
          {ctaLabel && ctaHref ? (
            <Link className="btn btn-primary" href={ctaHref}>
              {ctaLabel}
            </Link>
          ) : null}
        </aside>
      </div>
      {differentiators?.length ? (
        <div className="diff-grid">
          {differentiators.map((diff, i) => (
            <div key={diff.id ?? i} className="diff">
              <Icon name={diff.icon} className="di" />
              <h3>{diff.title}</h3>
              {diff.body ? <p>{diff.body}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
