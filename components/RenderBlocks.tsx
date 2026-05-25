import type { Page } from '@/payload-types'

import { HeroBlock } from './blocks/Hero'
import { RichTextBlock } from './blocks/RichText'
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
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} {...block} />
          case 'richText':
            return <RichTextBlock key={key} {...block} />
          case 'cta':
            return <CTABlock key={key} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
