import { accentText } from './blocks/accent'

/** The shared eyebrow + heading + subheading header used by most blocks (.section-head). */
export function SectionHead({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow?: string | null
  heading?: string | null
  subheading?: string | null
}) {
  if (!eyebrow && !heading && !subheading) return null
  return (
    <div className="section-head">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      {heading ? <h2>{accentText(heading)}</h2> : null}
      {subheading ? <p>{accentText(subheading)}</p> : null}
    </div>
  )
}
