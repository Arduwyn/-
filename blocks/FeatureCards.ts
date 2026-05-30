import type { Block } from 'payload'

/** Grid of cards with an optional icon, number, or tag — the consolidated card block
 * (diff grid, outcomes, "inside the service", lifecycle, principles, etc.). */
export const FeatureCards: Block = {
  slug: 'featureCards',
  labels: { singular: 'Feature Cards', plural: 'Feature Cards' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Icon key (see components/Icon.tsx). Optional.' } },
        { name: 'number', type: 'text', admin: { description: 'Serif number shown instead of an icon. Optional.' } },
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported (wrap the whole title to make it italic-accent).' } },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
