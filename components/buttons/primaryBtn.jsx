//  Nodes
import React from 'react'

import PropTypes from 'prop-types'

import styles from '../../styles/components/primaryBtn.module.css'
import { Button } from '@mui/material'

const PrimaryBtn = ({ text, icon, light, onClick, disabled, noBorder, children }) => {
  const style = {
    color: light ? 'var(--primary)' : 'var(--white)',
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? '0.5' : '1',
    backgroundColor: light ? 'var(--white)' : 'var(--primary)',
    border: noBorder ? 'none' : null,
    maxHeight: '20px'

  }
  return (
    <Button className={styles.main} onClick={onClick} title={text} style={style} component='label'>
        {icon}
        {text}
        {/* Children is for file Inputs */}
        {children}
    </Button>
  )
}
PrimaryBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  light: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.any,
  noBorder: PropTypes.any,

}
export default PrimaryBtn
