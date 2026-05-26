import type { Block } from 'payload'

/** A faux terminal window: title bar + lines styled as command / output / success. */
export const Terminal: Block = {
  slug: 'terminal',
  labels: { singular: 'Terminal', plural: 'Terminals' },
  fields: [
    { name: 'label', type: 'text', admin: { description: 'Title-bar caption.' } },
    {
      name: 'lines',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Line', plural: 'Lines' },
      fields: [
        { name: 'text', type: 'text' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'output',
          options: [
            { label: 'Command (prefixed with $)', value: 'command' },
            { label: 'Output', value: 'output' },
            { label: 'Success (green)', value: 'success' },
          ],
        },
      ],
    },
  ],
}
