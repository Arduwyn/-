// @vitest-environment node
import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

const TEST_EMAIL = 'integration-tester@arduwyn.test'

let payload: Payload

beforeAll(async () => {
  // Boots Payload against the isolated test DB (set in vitest.setup.ts) and
  // pushes the schema automatically.
  payload = await getPayload({ config: await config })
})

afterAll(async () => {
  await payload.delete({
    collection: 'users',
    where: { email: { equals: TEST_EMAIL } },
  })
})

describe('Payload integration — users collection', () => {
  it('connects to Payload and the users collection is queryable', async () => {
    const result = await payload.find({ collection: 'users' })
    expect(Array.isArray(result.docs)).toBe(true)
  })

  it('creates a user and reads it back', async () => {
    // Clean slate for this email so the test is repeatable.
    await payload.delete({
      collection: 'users',
      where: { email: { equals: TEST_EMAIL } },
    })

    const created = await payload.create({
      collection: 'users',
      data: {
        email: TEST_EMAIL,
        password: 'test-password-123',
        name: 'Integration Tester',
      },
    })
    expect(created.email).toBe(TEST_EMAIL)

    const { docs } = await payload.find({
      collection: 'users',
      where: { email: { equals: TEST_EMAIL } },
    })
    expect(docs).toHaveLength(1)
    expect(docs[0]?.name).toBe('Integration Tester')
  })
})
