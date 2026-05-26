import type { Block } from 'payload'

/** Cards/rows with a title, description, and inline tech tags. Grid or stacked layout. */
export const LabeledRows: Block = {
  slug: 'labeledRows',
  labels: { singular: 'Labeled Rows', plural: 'Labeled Rows' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (2-up cards)', value: 'grid' },
        { label: 'Stacked rows', value: 'stack' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Row', plural: 'Rows' },
      fields: [
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'description', type: 'textarea' },
        {
          name: 'tags',
          type: 'array',
          labels: { singular: 'Tag', plural: 'Tags' },
          fields: [{ name: 'label', type: 'text', required: true }],
        },
      ],
    },
  ],
}
