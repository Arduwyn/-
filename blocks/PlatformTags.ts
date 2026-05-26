import type { Block } from 'payload'

/** Centered pill row of platform names, with an optional intro line and placeholder note. */
export const PlatformTags: Block = {
  slug: 'platformTags',
  labels: { singular: 'Platform Tags', plural: 'Platform Tags' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'tags',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'placeholder', type: 'checkbox', label: 'Placeholder (dashed style)' },
      ],
    },
    {
      name: 'note',
      type: 'group',
      admin: { description: 'Optional dashed placeholder note shown below the tags.' },
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
