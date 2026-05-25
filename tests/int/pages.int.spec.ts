// @vitest-environment node
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

let payload: Payload
const SLUG = 'home-test'

beforeAll(async () => {
  payload = await getPayload({ config: await config })
})

afterAll(async () => {
  await payload.delete({ collection: 'pages', where: { slug: { equals: SLUG } } })
})

describe('pages collection (blocks-based content)', () => {
  it('creates a page with a hero block and reads it back by slug', async () => {
    // Repeatable: clear any leftover from a previous run.
    await payload.delete({ collection: 'pages', where: { slug: { equals: SLUG } } })

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home (test)',
        slug: SLUG,
        layout: [
          {
            blockType: 'hero',
            heading: 'Zero Trust, engineered.',
            subheading: 'Principal-level security architecture.',
          },
        ],
      },
    })

    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: SLUG } },
    })

    expect(docs).toHaveLength(1)
    expect(docs[0]?.title).toBe('Home (test)')

    const firstBlock = docs[0]?.layout?.[0] as { blockType?: string; heading?: string } | undefined
    expect(firstBlock?.blockType).toBe('hero')
    expect(firstBlock?.heading).toBe('Zero Trust, engineered.')
  })
})
