import type { Block } from 'payload'

/** Grouped pill cards: a labeled card per group, each holding a row of tag pills. */
export const TagGroups: Block = {
  slug: 'tagGroups',
  labels: { singular: 'Tag Groups', plural: 'Tag Groups' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '2',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Group', plural: 'Groups' },
      fields: [
        { name: 'label', type: 'text' },
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
