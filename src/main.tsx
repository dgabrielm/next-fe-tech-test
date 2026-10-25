import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, type ThemeOptions } from '@mui/material/styles';
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseLine>
          <App />
        </CssBaseLine>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
