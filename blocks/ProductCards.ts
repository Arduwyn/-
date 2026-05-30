import type { Block } from 'payload'

/** 3-up product cards: a code badge, serif title, lede, and a bullet list. */
export const ProductCards: Block = {
  slug: 'productCards',
  labels: { singular: 'Product Cards', plural: 'Product Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Product', plural: 'Products' },
      fields: [
        { name: 'code', type: 'text', admin: { description: 'Short badge, e.g. ZIA.' } },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'lede', type: 'textarea' },
        {
          name: 'bullets',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
