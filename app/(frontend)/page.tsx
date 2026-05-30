import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/RenderBlocks'

// CMS-driven page — render at request time so admin edits show up live, and so
// `next build` doesn't need a live database connection. Without this, Next
// tries to pre-render the home page at build time and crashes because the
// build container has no Postgres to talk to.
export const dynamic = 'force-dynamic'

async function getHomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  return docs[0] ?? null
}

export default async function HomePage() {
  const page = await getHomePage()

  // Fallback shown until a page with slug "home" is created in the admin.
  if (!page) {
    return (
      <section className="container" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="section-head">
          <span className="eyebrow">Set up</span>
          <h1>No home page yet</h1>
          <p>
            Create a page with the slug <code>home</code> in the{' '}
            <Link href="/admin/collections/pages/create">admin</Link> to populate this page.
          </p>
        </div>
      </section>
    )
  }

  return <RenderBlocks blocks={page.layout} />
}
