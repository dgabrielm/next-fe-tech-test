import { afterEach, describe, expect, it, vi } from 'vitest'
import { createParamsString, movePageToTop } from './helpers'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('movePageToTop', () => {
  it('smoothly scrolls the window to the top', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => { })

    movePageToTop()

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })
})

describe('createParamsString', () => {
  it('converts string and number parameters into an encoded query string', () => {
    expect(
      createParamsString({ term: 'The Beatles & Friends', limit: 25 })
    ).toBe('term=The+Beatles+%26+Friends&limit=25')
  })

  it('returns an empty string when there are no parameters', () => {
    expect(createParamsString({})).toBe('')
  })
})
