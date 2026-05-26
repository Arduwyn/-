import './ToolStages.css'

import { SectionHead } from '../SectionHead'
import { accentText, codeText } from './accent'
import type { ToolStagesBlockData } from './types'

type Stage = NonNullable<ToolStagesBlockData['stages']>[number]
type Tool = NonNullable<Stage['tools']>[number]

function Bullets({ items }: { items?: { text: string; id?: string | null }[] | null }) {
  if (!items?.length) return null
  return (
    <ul>
      {items.map((bullet, i) => (
        <li key={bullet.id ?? i}>{codeText(bullet.text)}</li>
      ))}
    </ul>
  )
}

function Stack({ tags }: { tags?: { label: string; id?: string | null }[] | null }) {
  if (!tags?.length) return null
  return (
    <div className="stack">
      {tags.map((tag, i) => (
        <span key={tag.id ?? i}>{tag.label}</span>
      ))}
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  if (tool.wide) {
    return (
      <div className="tool wide">
        {tool.modPath ? <span className="mod">{tool.modPath}</span> : null}
        <h4>{tool.title}</h4>
        <div className="wide-body">
          <div>
            {tool.lede ? <p className="lede">{tool.lede}</p> : null}
            <p className="mh">How it works</p>
            <Bullets items={tool.bullets} />
            <Stack tags={tool.tags} />
          </div>
          <div className="guard">
            <p className="mh">{tool.guardTitle || 'Guardrails'}</p>
            <Bullets items={tool.guardBullets} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="tool">
      {tool.modPath ? <span className="mod">{tool.modPath}</span> : null}
      <h4>{tool.title}</h4>
      {tool.lede ? <p className="lede">{tool.lede}</p> : null}
      <p className="mh">How it works</p>
      <Bullets items={tool.bullets} />
      <Stack tags={tool.tags} />
    </div>
  )
}

export function ToolStagesBlock({ eyebrow, heading, subheading, stages }: ToolStagesBlockData) {
  return (
    <section className="container">
      <SectionHead eyebrow={eyebrow} heading={heading} subheading={subheading} />
      {stages?.map((stage, i) => (
        <div key={stage.id ?? i} className="stage">
          <div className="stage-head">
            {stage.number ? <span className="sn">{stage.number}</span> : null}
            <h3>{accentText(stage.title)}</h3>
            {stage.blurb ? <p>{stage.blurb}</p> : null}
          </div>
          <div className={`tool-grid ${stage.columns === '1' ? 'single' : ''}`}>
            {stage.tools?.map((tool, j) => (
              <ToolCard key={tool.id ?? j} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
