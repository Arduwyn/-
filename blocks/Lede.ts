import type { Block } from 'payload'

/** A centered section heading + lede paragraph(s). */
export const Lede: Block = {
  slug: 'lede',
  labels: { singular: 'Lede / Prose', plural: 'Lede / Prose' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: 'Optional. *accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: { description: 'Paragraphs separated by a blank line. *accent* supported.' },
    },
  ],
}
