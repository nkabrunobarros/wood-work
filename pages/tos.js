//  Nodes
import React from 'react'
import TermsScreen from '../components/pages/terms/terms'
import PropTypes from 'prop-types'

const Terms = () => {
  const readOnly = true
  const props = {
    readOnly
  }

  return <TermsScreen {...props} />
}

Terms.propTypes = {
  readOnly: PropTypes.boolean
}
export default Terms
