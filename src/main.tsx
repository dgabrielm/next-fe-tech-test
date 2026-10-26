import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles';
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { darkTheme } from './theme'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseLine>
          <App />
        </CssBaseLine>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
