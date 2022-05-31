//  Nodes
import React from 'react'

import PropTypes from 'prop-types'

import styles from '../../styles/components/primaryBtn.module.css'

const PrimaryBtn = ({ text, icon, light, onClick, disabled, noBorder }) => {
  const style = {
    color: light ? 'var(--primary)' : 'var(--white)',
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? '0.5' : '1',
    backgroundColor: light ? 'var(--white)' : 'var(--primary)',
    border: noBorder ? 'none' : null

  }
  return (
    <a className={styles.main} onClick={onClick} title={text} style={style}>
        {icon}
        {text}
    </a>
  )
}
PrimaryBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  light: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.any,
  disabled: PropTypes.boolean,
  noBorder: PropTypes.boolean
}
export default PrimaryBtn
