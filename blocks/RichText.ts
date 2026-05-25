import type { Block } from 'payload'

/** A free-form prose block. Uses the root lexical editor from payload.config.ts. */
export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [{ name: 'content', type: 'richText' }],
}
