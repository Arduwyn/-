import type { Block } from 'payload'

/** Centered interior-page hero with image background (used on all subpages). */
export const PageHero: Block = {
  slug: 'pageHero',
  labels: { singular: 'Page Hero', plural: 'Page Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Wrap accent words in *asterisks*, e.g. Industry *Focus*.' },
    },
    { name: 'subheading', type: 'textarea' },
  ],
}
