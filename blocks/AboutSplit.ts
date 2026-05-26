import type { Block } from 'payload'

/** About section: prose story + a credentials side-panel, then a row of differentiator cards. */
export const AboutSplit: Block = {
  slug: 'aboutSplit',
  labels: { singular: 'About Split', plural: 'About Splits' },
  fields: [
    { name: 'anchor', type: 'text', admin: { description: 'Optional HTML id for in-page links (e.g. "about").' } },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    { name: 'story', type: 'textarea', admin: { description: 'Paragraphs separated by a blank line. *accent* supported.' } },
    {
      name: 'groups',
      type: 'array',
      labels: { singular: 'Panel Group', plural: 'Panel Groups' },
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
    { name: 'focusLabel', type: 'text' },
    { name: 'focus', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
    {
      name: 'differentiators',
      type: 'array',
      labels: { singular: 'Differentiator', plural: 'Differentiators' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Icon key (see components/Icon.tsx).' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
