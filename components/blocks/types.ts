import type { Page } from '@/payload-types'

// Derive block data shapes from the generated Page type so they stay in sync
// with the Payload config automatically.
export type LayoutBlock = NonNullable<Page['layout']>[number]
export type HeroBlockData = Extract<LayoutBlock, { blockType: 'hero' }>
export type RichTextBlockData = Extract<LayoutBlock, { blockType: 'richText' }>
export type CTABlockData = Extract<LayoutBlock, { blockType: 'cta' }>
