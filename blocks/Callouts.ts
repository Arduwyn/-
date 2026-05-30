import type { Block } from 'payload'

/** 3-up grid of accent-tinted callout cards: tag + title + body. */
export const Callouts: Block = {
  slug: 'callouts',
  labels: { singular: 'Callouts', plural: 'Callouts' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Callout', plural: 'Callouts' },
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
