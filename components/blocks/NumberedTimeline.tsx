import './NumberedTimeline.css'

import { SectionHead } from '../SectionHead'
import { accentText } from './accent'
import type { NumberedTimelineBlockData } from './types'

export function NumberedTimelineBlock({
  eyebrow,
  heading,
  subheading,
  panelStyle,
  steps,
}: NumberedTimelineBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      <div className={`timeline ${panelStyle === 'bare' ? 'bare' : 'boxed'}`}>
        {steps?.map((step, i) => (
          <div key={step.id ?? i} className="timeline-step">
            <div className="timeline-n">{step.number || String(i + 1).padStart(2, '0')}</div>
            <div>
              {step.meta ? <div className="timeline-meta">{step.meta}</div> : null}
              <h3>{accentText(step.title)}</h3>
              {step.body ? <p>{step.body}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
