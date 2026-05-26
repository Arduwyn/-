import type { CollectionConfig, FieldHook } from 'payload'

import { Hero } from '../blocks/Hero'
import { PageHero } from '../blocks/PageHero'
import { RichTextBlock } from '../blocks/RichText'
import { Lede } from '../blocks/Lede'
import { IndustryTiles } from '../blocks/IndustryTiles'
import { Callouts } from '../blocks/Callouts'
import { PlatformTags } from '../blocks/PlatformTags'
import { Placeholder } from '../blocks/Placeholder'
import { NumberedTimeline } from '../blocks/NumberedTimeline'
import { FeatureCards } from '../blocks/FeatureCards'
import { CalloutBar } from '../blocks/CalloutBar'
import { StatGrid } from '../blocks/StatGrid'
import { ProductCards } from '../blocks/ProductCards'
import { NumberedGrid } from '../blocks/NumberedGrid'
import { LabeledRows } from '../blocks/LabeledRows'
import { TagGroups } from '../blocks/TagGroups'
import { Terminal } from '../blocks/Terminal'
import { ToolStages } from '../blocks/ToolStages'
import { HomeHero } from '../blocks/HomeHero'
import { AboutSplit } from '../blocks/AboutSplit'
import { Outcomes } from '../blocks/Outcomes'
import { ServiceCards } from '../blocks/ServiceCards'
import { CaseStudies } from '../blocks/CaseStudies'
import { BriefCards } from '../blocks/BriefCards'
import { LaneCards } from '../blocks/LaneCards'
import { FAQ } from '../blocks/FAQ'
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
      blocks: [
        Hero,
        PageHero,
        RichTextBlock,
        Lede,
        IndustryTiles,
        Callouts,
        PlatformTags,
        Placeholder,
        NumberedTimeline,
        FeatureCards,
        CalloutBar,
        StatGrid,
        ProductCards,
        NumberedGrid,
        LabeledRows,
        TagGroups,
        Terminal,
        ToolStages,
        HomeHero,
        AboutSplit,
        Outcomes,
        ServiceCards,
        CaseStudies,
        BriefCards,
        LaneCards,
        FAQ,
        CTA,
      ],
      admin: { description: 'Compose the page from reusable blocks.' },
    },
  ],
}
