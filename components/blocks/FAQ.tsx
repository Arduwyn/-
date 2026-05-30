import './FAQ.css'

import type { FAQBlockData } from './types'

export function FAQBlock({ heading, items }: FAQBlockData) {
  return (
    <section className="container">
      <div className="faq-wrap">
        <h2>{heading || 'FAQ'}</h2>
        <div className="faq-list">
          {items?.map((item, i) => (
            <details key={item.id ?? i} className="faq-item">
              <summary className="faq-q">
                <svg className="faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
                {item.question}
              </summary>
              <div className="faq-a">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
