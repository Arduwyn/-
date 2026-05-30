import type { Block } from 'payload'

/** Case-study card grid with a left-aligned head + a side CTA. (Images/modals come later.) */
export const CaseStudies: Block = {
  slug: 'caseStudies',
  labels: { singular: 'Case Studies', plural: 'Case Studies' },
  fields: [
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Case Study', plural: 'Case Studies' },
      fields: [
        { name: 'vertical', type: 'text', admin: { description: 'Optional small kicker.' } },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'summary', type: 'textarea' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'View Case Study' },
      ],
    },
  ],
}
