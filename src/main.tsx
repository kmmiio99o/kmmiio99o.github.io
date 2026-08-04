import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import './styles.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#071027' }
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 0 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } }
  },
  typography: {
    fontFamily: 'Roboto Mono, "Press Start 2P", monospace'
  }
})

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
