//  Nodes
import React from 'react'

//  PropTypes
import PropTypes from 'prop-types'

//  Styling
import '../styles/globals.css'
//  Components
import Layout from '../components/layout/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#225EE8'
    }
  }
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
