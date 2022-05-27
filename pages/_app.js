//  Nodes
import React from 'react'

//  PropTypes
import PropTypes from 'prop-types'

//  Styling
import '../styles/globals.css'
//  Components
import Layout from '../components/layout/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'

const theme = createTheme({
  palette: {
    primary: {
      main: '#225EE8'
    },
    default: {
      main: '#000000'
    }
  }
})

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />    </Head>
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
