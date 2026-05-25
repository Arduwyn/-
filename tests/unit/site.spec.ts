import { describe, it, expect } from 'vitest'

import { pageTitle } from '@/lib/site'

describe('pageTitle', () => {
  it('returns the brand name on its own when given no section', () => {
    expect(pageTitle()).toBe('Arduwyn')
  })

  it('puts the section before the brand, separated by an em dash', () => {
    expect(pageTitle('Zero Trust Architecture')).toBe('Zero Trust Architecture — Arduwyn')
  })

  it('ignores empty or whitespace-only sections', () => {
    expect(pageTitle('   ')).toBe('Arduwyn')
  })
})
