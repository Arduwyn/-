import type { Block } from 'payload'

/** Call-to-action band: heading + supporting text + a single button. */
export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'CTA Band', plural: 'CTA Bands' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    {
      name: 'button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
