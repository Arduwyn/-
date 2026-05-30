import type { Page } from '@/payload-types'

import { HeroBlock } from './blocks/Hero'
import { PageHeroBlock } from './blocks/PageHero'
import { RichTextBlock } from './blocks/RichText'
import { LedeBlock } from './blocks/Lede'
import { IndustryTilesBlock } from './blocks/IndustryTiles'
import { CalloutsBlock } from './blocks/Callouts'
import { PlatformTagsBlock } from './blocks/PlatformTags'
import { PlaceholderBlock } from './blocks/Placeholder'
import { NumberedTimelineBlock } from './blocks/NumberedTimeline'
import { FeatureCardsBlock } from './blocks/FeatureCards'
import { CalloutBarBlock } from './blocks/CalloutBar'
import { StatGridBlock } from './blocks/StatGrid'
import { ProductCardsBlock } from './blocks/ProductCards'
import { NumberedGridBlock } from './blocks/NumberedGrid'
import { LabeledRowsBlock } from './blocks/LabeledRows'
import { TagGroupsBlock } from './blocks/TagGroups'
import { TerminalBlock } from './blocks/Terminal'
import { ToolStagesBlock } from './blocks/ToolStages'
import { HomeHeroBlock } from './blocks/HomeHero'
import { AboutSplitBlock } from './blocks/AboutSplit'
import { OutcomesBlock } from './blocks/Outcomes'
import { ServiceCardsBlock } from './blocks/ServiceCards'
import { CaseStudiesBlock } from './blocks/CaseStudies'
import { BriefCardsBlock } from './blocks/BriefCards'
import { LaneCardsBlock } from './blocks/LaneCards'
import { FAQBlock } from './blocks/FAQ'
import { CTABlock } from './blocks/CTA'

/**
 * Renders a page's `layout` (the blocks the editor composed in the admin) into
 * real components. Add a `case` here whenever you add a new block type.
 */
export function RenderBlocks({ blocks }: { blocks: Page['layout'] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? i
        // The first block is typically the hero — already on screen at load,
        // so don't fade it in. Every block after gets the scroll-reveal wrapper
        // (picked up by <ScrollReveal /> via the `.reveal` class).
        const rendered = renderBlock(block, key)
        if (rendered === null) return null
        if (i === 0) return rendered
        return (
          <div key={key} className="reveal">
            {rendered}
          </div>
        )
      })}
    </>
  )
}

function renderBlock(block: NonNullable<Page['layout']>[number], key: string | number) {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock key={key} {...block} />
    case 'pageHero':
      return <PageHeroBlock key={key} {...block} />
    case 'richText':
      return <RichTextBlock key={key} {...block} />
    case 'lede':
      return <LedeBlock key={key} {...block} />
    case 'industryTiles':
      return <IndustryTilesBlock key={key} {...block} />
    case 'callouts':
      return <CalloutsBlock key={key} {...block} />
    case 'platformTags':
      return <PlatformTagsBlock key={key} {...block} />
    case 'placeholder':
      return <PlaceholderBlock key={key} {...block} />
    case 'numberedTimeline':
      return <NumberedTimelineBlock key={key} {...block} />
    case 'featureCards':
      return <FeatureCardsBlock key={key} {...block} />
    case 'calloutBar':
      return <CalloutBarBlock key={key} {...block} />
    case 'statGrid':
      return <StatGridBlock key={key} {...block} />
    case 'productCards':
      return <ProductCardsBlock key={key} {...block} />
    case 'numberedGrid':
      return <NumberedGridBlock key={key} {...block} />
    case 'labeledRows':
      return <LabeledRowsBlock key={key} {...block} />
    case 'tagGroups':
      return <TagGroupsBlock key={key} {...block} />
    case 'terminal':
      return <TerminalBlock key={key} {...block} />
    case 'toolStages':
      return <ToolStagesBlock key={key} {...block} />
    case 'homeHero':
      return <HomeHeroBlock key={key} {...block} />
    case 'aboutSplit':
      return <AboutSplitBlock key={key} {...block} />
    case 'outcomes':
      return <OutcomesBlock key={key} {...block} />
    case 'serviceCards':
      return <ServiceCardsBlock key={key} {...block} />
    case 'caseStudies':
      return <CaseStudiesBlock key={key} {...block} />
    case 'briefCards':
      return <BriefCardsBlock key={key} {...block} />
    case 'laneCards':
      return <LaneCardsBlock key={key} {...block} />
    case 'faq':
      return <FAQBlock key={key} {...block} />
    case 'cta':
      return <CTABlock key={key} {...block} />
    default:
      return null
  }
}
