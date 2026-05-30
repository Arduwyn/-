import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/RenderBlocks'

// CMS-driven catch-all — render at request time so admin edits propagate
// immediately, and so `next build` doesn't need a database connection.
export const dynamic = 'force-dynamic'

/**
 * Renders any CMS page by its slug, e.g. /engineering -> the page with slug "engineering".
 * The homepage (slug "home") is served by ../page.tsx; explicit routes like /architecture
 * take precedence over this catch-all until they're migrated into the CMS.
 */
export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = docs[0]
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} />
}
