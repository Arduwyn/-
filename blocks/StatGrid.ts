import type { Block } from 'payload'

/** Grid of short stat/term cells (operating cadence, compliance frameworks, etc.). */
export const StatGrid: Block = {
  slug: 'statGrid',
  labels: { singular: 'Stat Grid', plural: 'Stat Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Cell', plural: 'Cells' },
      fields: [
        { name: 'kicker', type: 'text', admin: { description: 'Optional small label above the term.' } },
        { name: 'term', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
