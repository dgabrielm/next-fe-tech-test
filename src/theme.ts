import { createTheme, type ThemeOptions } from '@mui/material/styles'

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

export { darkTheme }
