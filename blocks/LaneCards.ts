import type { Block } from 'payload'

/** Engagement-lane cards: tag, title, "for" blurb, a label/value pair, and a duration footer. */
export const LaneCards: Block = {
  slug: 'laneCards',
  labels: { singular: 'Lane Cards', plural: 'Lane Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Lane', plural: 'Lanes' },
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'forText', type: 'textarea', label: 'For (blurb)' },
        { name: 'receiveLabel', type: 'text', defaultValue: 'You receive' },
        { name: 'receive', type: 'textarea' },
        { name: 'duration', type: 'text' },
      ],
    },
    { name: 'note', type: 'textarea', admin: { description: 'Centered note below the lanes. *accent* supported.' } },
  ],
}
