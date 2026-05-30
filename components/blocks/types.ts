import type { Page } from '@/payload-types'

// Derive block data shapes from the generated Page type so they stay in sync
// with the Payload config automatically.
export type LayoutBlock = NonNullable<Page['layout']>[number]
export type HeroBlockData = Extract<LayoutBlock, { blockType: 'hero' }>
export type PageHeroBlockData = Extract<LayoutBlock, { blockType: 'pageHero' }>
export type RichTextBlockData = Extract<LayoutBlock, { blockType: 'richText' }>
export type LedeBlockData = Extract<LayoutBlock, { blockType: 'lede' }>
export type IndustryTilesBlockData = Extract<LayoutBlock, { blockType: 'industryTiles' }>
export type CalloutsBlockData = Extract<LayoutBlock, { blockType: 'callouts' }>
export type PlatformTagsBlockData = Extract<LayoutBlock, { blockType: 'platformTags' }>
export type PlaceholderBlockData = Extract<LayoutBlock, { blockType: 'placeholder' }>
export type NumberedTimelineBlockData = Extract<LayoutBlock, { blockType: 'numberedTimeline' }>
export type FeatureCardsBlockData = Extract<LayoutBlock, { blockType: 'featureCards' }>
export type CalloutBarBlockData = Extract<LayoutBlock, { blockType: 'calloutBar' }>
export type StatGridBlockData = Extract<LayoutBlock, { blockType: 'statGrid' }>
export type ProductCardsBlockData = Extract<LayoutBlock, { blockType: 'productCards' }>
export type NumberedGridBlockData = Extract<LayoutBlock, { blockType: 'numberedGrid' }>
export type LabeledRowsBlockData = Extract<LayoutBlock, { blockType: 'labeledRows' }>
export type TagGroupsBlockData = Extract<LayoutBlock, { blockType: 'tagGroups' }>
export type TerminalBlockData = Extract<LayoutBlock, { blockType: 'terminal' }>
export type ToolStagesBlockData = Extract<LayoutBlock, { blockType: 'toolStages' }>
export type HomeHeroBlockData = Extract<LayoutBlock, { blockType: 'homeHero' }>
export type AboutSplitBlockData = Extract<LayoutBlock, { blockType: 'aboutSplit' }>
export type OutcomesBlockData = Extract<LayoutBlock, { blockType: 'outcomes' }>
export type ServiceCardsBlockData = Extract<LayoutBlock, { blockType: 'serviceCards' }>
export type CaseStudiesBlockData = Extract<LayoutBlock, { blockType: 'caseStudies' }>
export type BriefCardsBlockData = Extract<LayoutBlock, { blockType: 'briefCards' }>
export type LaneCardsBlockData = Extract<LayoutBlock, { blockType: 'laneCards' }>
export type FAQBlockData = Extract<LayoutBlock, { blockType: 'faq' }>
export type CTABlockData = Extract<LayoutBlock, { blockType: 'cta' }>
