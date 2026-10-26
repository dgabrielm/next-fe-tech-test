import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ChangeEvent } from 'react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('shows its value and forwards changes', () => {
    let changedValue = ''
    const onChange = vi.fn(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        changedValue = event.target.value
      }
    )

    render(<SearchBar value="Shoegaze" onChange={onChange} search={vi.fn()} />)

    const input = screen.getByRole('textbox', { name: 'Search' })
    expect(input).toHaveValue('Shoegaze')

    fireEvent.change(input, { target: { value: 'Jazz' } })

    expect(onChange).toHaveBeenCalled()
    expect(changedValue).toBe('Jazz')
  })

  it('calls search when the button is clicked', () => {
    const search = vi.fn()
    render(<SearchBar value="" onChange={vi.fn()} search={search} />)

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(search).toHaveBeenCalledOnce()
  })

  it('calls search on Enter, but not on other keys', () => {
    const search = vi.fn()
    render(<SearchBar value="" onChange={vi.fn()} search={search} />)

    const input = screen.getByRole('textbox', { name: 'Search' })

    fireEvent.keyDown(input, { key: 'Escape' })
    expect(search).not.toHaveBeenCalled()

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(search).toHaveBeenCalledOnce()
  })
})
