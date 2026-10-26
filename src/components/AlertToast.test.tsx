import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AlertToast } from './AlertToast'

describe('AlertToast', () => {
  it('shows its message when open', () => {
    render(
      <AlertToast useIsOpen={[true, vi.fn()]}>
        Saved successfully
      </AlertToast>
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Saved successfully')
  })

  it('does not show its message when closed', () => {
    render(
      <AlertToast useIsOpen={[false, vi.fn()]}>
        Saved successfully
      </AlertToast>
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('asks the parent to close it when the close button is clicked', () => {
    const setIsOpen = vi.fn()

    render(
      <AlertToast useIsOpen={[true, setIsOpen]}>
        Saved successfully
      </AlertToast>
    )

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(setIsOpen).toHaveBeenCalledWith(false)
  })
})
