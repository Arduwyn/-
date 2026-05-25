import { RichText } from '@payloadcms/richtext-lexical/react'

import type { RichTextBlockData } from './types'

export function RichTextBlock({ content }: RichTextBlockData) {
  if (!content) return null

  return (
    <section className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <RichText data={content} />
    </section>
  )
}
