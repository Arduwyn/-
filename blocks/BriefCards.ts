import type { Block } from 'payload'

/** Technical-brief teaser cards: tag, title, summary. (Detail modals come later.) */
export const BriefCards: Block = {
  slug: 'briefCards',
  labels: { singular: 'Brief Cards', plural: 'Brief Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Brief', plural: 'Briefs' },
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'summary', type: 'textarea' },
      ],
    },
  ],
}
