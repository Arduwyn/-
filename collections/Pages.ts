import type { CollectionConfig, FieldHook } from 'payload'

import { Hero } from '../blocks/Hero'
import { RichTextBlock } from '../blocks/RichText'
import { CTA } from '../blocks/CTA'

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')

// Normalize the slug on save: lowercase + hyphenate. Falls back to the title
// if the slug field is left blank.
const formatSlug: FieldHook = ({ value, data }) => {
  if (typeof value === 'string' && value.length > 0) return slugify(value)
  if (typeof data?.title === 'string') return slugify(data.title)
  return value
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // the public site needs to read pages
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL path (auto-lowercased), e.g. "home" or "architecture".' },
      hooks: { beforeValidate: [formatSlug] },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, RichTextBlock, CTA],
      admin: { description: 'Compose the page from reusable blocks.' },
    },
  ],
}
