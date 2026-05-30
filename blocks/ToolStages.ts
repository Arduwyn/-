import type { Block } from 'payload'

/** Stages, each with a header and a grid of tool cards (mod path, lede, how-it-works
 * bullets, tags), plus an optional wide card with a guardrails sub-panel. */
export const ToolStages: Block = {
  slug: 'toolStages',
  labels: { singular: 'Tool Stages', plural: 'Tool Stages' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', admin: { description: '*accent* supported.' } },
    { name: 'subheading', type: 'text' },
    {
      name: 'stages',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Stage', plural: 'Stages' },
      fields: [
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text', required: true, admin: { description: '*accent* supported.' } },
        { name: 'blurb', type: 'textarea' },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '2',
          options: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
          ],
        },
        {
          name: 'tools',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Tool', plural: 'Tools' },
          fields: [
            { name: 'modPath', type: 'text', admin: { description: 'Monospace path label.' } },
            { name: 'title', type: 'text', required: true },
            { name: 'lede', type: 'textarea' },
            {
              name: 'bullets',
              type: 'array',
              labels: { singular: 'Bullet', plural: 'Bullets' },
              fields: [{ name: 'text', type: 'textarea', required: true, admin: { description: 'Inline `code` supported.' } }],
            },
            {
              name: 'tags',
              type: 'array',
              labels: { singular: 'Tag', plural: 'Tags' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'wide', type: 'checkbox', label: 'Wide (with guardrails panel)' },
            { name: 'guardTitle', type: 'text' },
            {
              name: 'guardBullets',
              type: 'array',
              labels: { singular: 'Guardrail', plural: 'Guardrails' },
              fields: [{ name: 'text', type: 'textarea', required: true, admin: { description: 'Inline `code` supported.' } }],
            },
          ],
        },
      ],
    },
  ],
}
