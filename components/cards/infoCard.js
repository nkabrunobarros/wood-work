//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import PropTypes from 'prop-types'

import styles from '../../styles/components/infoCard.module.css'

const InfoCard = ({ title, icon, amount, color }) => {
  const style = {
    color: `${color}`
  }
  return (
    <div className={styles.card} style={style}>
      <CssBaseline />
      <div className={styles.cardIcon}>{icon}</div>
      <div>
        <a className={styles.cardTitle}>{title}</a>
        <br></br>
        <a>{amount} Encomendas</a>
      </div>
    </div>
  )
}
InfoCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  amount: PropTypes.number,
  color: PropTypes.string
}
export default InfoCard
