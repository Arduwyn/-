import type { Block } from 'payload'

/** Panel of service cards: tag, title, and a bullet list. (Detail modals are a later step.) */
export const ServiceCards: Block = {
  slug: 'serviceCards',
  labels: { singular: 'Service Cards', plural: 'Service Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Service', plural: 'Services' },
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        {
          name: 'bullets',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
