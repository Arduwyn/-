import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { accentText, paragraphs } from '@/components/blocks/accent'

describe('accentText', () => {
  it('wraps *asterisked* parts in an accent-i span, keeping the plain text', () => {
    const { container } = render(<>{accentText('Industry *Focus*')}</>)
    expect(container.textContent).toBe('Industry Focus')
    expect(container.querySelector('.accent-i')?.textContent).toBe('Focus')
  })

  it('renders plain text with no accent span when there are no markers', () => {
    const { container } = render(<>{accentText('No accent here')}</>)
    expect(container.querySelector('.accent-i')).toBeNull()
    expect(container.textContent).toBe('No accent here')
  })

  it('returns null for empty or missing input', () => {
    expect(accentText('')).toBeNull()
    expect(accentText(null)).toBeNull()
    expect(accentText(undefined)).toBeNull()
  })
})

describe('paragraphs', () => {
  it('splits on blank lines into <p> elements, with accent parsing inside', () => {
    const { container } = render(<>{paragraphs('First *one*.\n\nSecond.')}</>)
    const ps = container.querySelectorAll('p')
    expect(ps).toHaveLength(2)
    expect(ps[0].querySelector('.accent-i')?.textContent).toBe('one')
    expect(ps[1].textContent).toBe('Second.')
  })

  it('ignores empty input', () => {
    expect(paragraphs('')).toBeNull()
    expect(paragraphs(null)).toBeNull()
  })
})
