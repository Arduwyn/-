import './Terminal.css'

import type { TerminalBlockData } from './types'

export function TerminalBlock({ label, lines }: TerminalBlockData) {
  return (
    <section className="container">
      <div className="terminal" role="img" aria-label={label || 'Terminal session'}>
        <div className="bar">
          <i />
          <i />
          <i />
          {label ? <span>{label}</span> : null}
        </div>
        <pre>
          {lines?.map((line, i) => {
            if (line.style === 'command') {
              return (
                <div key={i}>
                  <span className="p">$</span> <span className="c">{line.text}</span>
                </div>
              )
            }
            if (line.style === 'success') {
              return (
                <div key={i}>
                  <span className="g">{line.text}</span>
                </div>
              )
            }
            return <div key={i}>{line.text || ' '}</div>
          })}
        </pre>
      </div>
    </section>
  )
}
