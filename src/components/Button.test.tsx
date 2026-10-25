import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its children as a button', () => {
    render(<Button onClick={vi.fn()}>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
