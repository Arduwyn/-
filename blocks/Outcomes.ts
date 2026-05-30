import type { Block } from 'payload'

/** 2-up horizontal cards: an icon chip beside a title + body (the "For the CISO" outcomes). */
export const Outcomes: Block = {
  slug: 'outcomes',
  labels: { singular: 'Outcomes', plural: 'Outcomes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Outcome', plural: 'Outcomes' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Icon key (see components/Icon.tsx).' } },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
