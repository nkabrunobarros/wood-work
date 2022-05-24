//  Nodes
import React from 'react'

//  PropTypes
import PropTypes from 'prop-types'

//  Styling
import '../styles/globals.css'
//  Components
import Layout from '../components/layout/layout'

const App = ({ Component, pageProps }) => {
  return (
    <Layout {...pageProps} >
      <Component {...pageProps} />
    </Layout>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
