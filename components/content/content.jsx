import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../styles/components/content.module.css'

const Content = ({ children }) => (
    <div className={styles.main}>
      {children}
    </div>
)

Content.propTypes = {
  children: PropTypes.any
}

export default Content
