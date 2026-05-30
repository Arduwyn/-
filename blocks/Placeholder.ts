import type { Block } from 'payload'

/** A dashed "to be written" note (section heading + placeholder box). Interim content. */
export const Placeholder: Block = {
  slug: 'placeholder',
  labels: { singular: 'Placeholder Note', plural: 'Placeholder Notes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    { name: 'tag', type: 'text', defaultValue: 'Placeholder — to be written' },
    { name: 'body', type: 'textarea', required: true },
  ],
}
