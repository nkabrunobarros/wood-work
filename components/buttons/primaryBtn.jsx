//  Nodes
import React from 'react'

import PropTypes from 'prop-types'

import styles from '../../styles/components/primaryBtn.module.css'
import { Button, Tooltip } from '@mui/material'

const PrimaryBtn = ({ text, icon, light, onClick, disabled, noBorder, children, title }) => {
  const style = {
    color: light ? 'var(--primary)' : 'var(--white)',
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? '0.5' : '1',
    backgroundColor: light ? 'var(--white)' : 'var(--primary)',
    border: noBorder ? 'none' : null,
    maxHeight: '20px'
  }
  return (
    <Tooltip title={title || ''}>
      <Button className={styles.main} onClick={onClick} style={style} component='label'>
        {icon}
        {text}
        {/* Children is for file Inputs */}
        {children}
      </Button>
    </Tooltip>
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
  title: PropTypes.string,
}
export default PrimaryBtn
