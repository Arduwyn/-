import type { Block } from 'payload'

/** Horizontal cross-link bar: a line of text + a ghost button, in a dark panel. */
export const CalloutBar: Block = {
  slug: 'calloutBar',
  labels: { singular: 'Callout Bar', plural: 'Callout Bars' },
  fields: [
    { name: 'body', type: 'textarea', required: true, admin: { description: '*accent* supported.' } },
    {
      name: 'button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
