import type { Block } from 'payload'

/** Vertical numbered steps (lifecycle / playbook / phases). Boxed panel or bare. */
export const NumberedTimeline: Block = {
  slug: 'numberedTimeline',
  labels: { singular: 'Numbered Timeline', plural: 'Numbered Timelines' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'panelStyle',
      type: 'select',
      defaultValue: 'boxed',
      options: [
        { label: 'Boxed panel', value: 'boxed' },
        { label: 'Bare', value: 'bare' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 01. Blank = auto-number.' } },
        { name: 'meta', type: 'text', admin: { description: 'Optional small kicker (e.g. a date).' } },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}
