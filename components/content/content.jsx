import React from 'react'
import PropTypes from 'prop-types'

const Content = ({ children }) => (
    <div
      style={{
        background: 'white',
        marginTop: '2rem',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      {children}
    </div>
)
Content.propTypes = {
  children: PropTypes.any
}
export default Content
