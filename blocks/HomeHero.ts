import type { Block } from 'payload'

/** The homepage hero: full-bleed shell with eyebrow, heading, sub, CTAs, and the
 * (static) Zero Trust Exchange diagram. */
export const HomeHero: Block = {
  slug: 'homeHero',
  labels: { singular: 'Home Hero', plural: 'Home Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true, admin: { description: '*accent* supported.' } },
    { name: 'sub', type: 'textarea' },
    {
      name: 'ctas',
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
    {
      name: 'showDiagram',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the Zero Trust Exchange diagram',
    },
  ],
}
