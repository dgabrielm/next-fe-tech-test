import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App.tsx', () => {
  it('renders the app', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false }
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
