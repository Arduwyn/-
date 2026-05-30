import type { Block } from 'payload'

/** Grid of large industry cards: icon, title, lede, bullet list, and a "go" link. */
export const IndustryTiles: Block = {
  slug: 'industryTiles',
  labels: { singular: 'Industry Tiles', plural: 'Industry Tiles' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Tile', plural: 'Tiles' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Financial services', value: 'finance' },
            { label: 'Healthcare', value: 'healthcare' },
          ],
        },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'lede', type: 'textarea' },
        {
          name: 'bullets',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'muted', type: 'checkbox', label: 'Muted / in-progress' },
          ],
        },
        { name: 'linkLabel', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
