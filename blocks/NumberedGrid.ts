import type { Block } from 'payload'

/** Boxed panel with a heading + big count, an intro line, and a compact numbered grid. */
export const NumberedGrid: Block = {
  slug: 'numberedGrid',
  labels: { singular: 'Numbered Grid', plural: 'Numbered Grids' },
  fields: [
    { name: 'heading', type: 'text', required: true, admin: { description: '*accent* supported.' } },
    { name: 'count', type: 'text', admin: { description: 'Big accent number, e.g. 27.' } },
    { name: 'intro', type: 'textarea' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'number', type: 'text', admin: { description: 'Blank = auto-number.' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
