// Node modules
import PropTypes from 'prop-types'
import React from 'react'

// Pages without layout (sidebar + navbar + footer)

const Layout = ({ children }) => {
  return (
       <div >
           {children}
        </div>
  )
}
Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
