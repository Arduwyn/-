import type { Block } from 'payload'

/** Call-to-action band: eyebrow + heading + supporting text + up to two buttons. */
export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'CTA Band', plural: 'CTA Bands' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Engage' },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: '*accent* supported.' },
    },
    { name: 'body', type: 'textarea' },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
      ],
    },
  ],
}
