import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthContextProvider } from './context/AuthContext.jsx'


const theme = createTheme({
  palette: {
    primary: {
      main: '#E43D40',
    },
    secondary: {
      main: '#ffffff',
    },
  },

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
