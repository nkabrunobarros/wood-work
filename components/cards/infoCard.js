//  Nodes
import React from 'react'

import PropTypes from 'prop-types'

import { Grid } from '@mui/material'
import styles from '../../styles/components/infoCard.module.css'

const InfoCard = ({ title, icon, amount, color }) => {
  const style = {
    color: `${color}`,
  }

  return (
    <Grid bgcolor={"default.main"} container md={12} className={styles.card} style={style}>
      <Grid container md={2}>{icon}</Grid>
      <Grid container md={10} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid><a className={styles.cardTitle}>{title}</a></Grid>
        <Grid><a >{amount} Encomendas</a></Grid>
      </Grid>
    </Grid>
  )
}

InfoCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  amount: PropTypes.number,
  color: PropTypes.string
}

export default InfoCard
