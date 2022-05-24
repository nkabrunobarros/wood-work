// Node modules
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

// Pages without layout (sidebar + navbar + footer)
function Copyright (props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {' Desenvolvido por  NKA - '}
      <Link color='inherit' href='https://nka.pt/' target='#'>
        New Knowledge Advice Lda.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
const Footer = ({ section }) => {
  return (
    <Grid container>
      <Grid item xs style={{ padding: '1rem' }}>
        {section === 'client' ? 'WW4.0' : <Copyright />}
      </Grid>
      <Grid style={{ padding: '1rem' }}>
        {section === 'client' ? <Copyright /> : 'WW4.0'}
      </Grid>
    </Grid>
  )
}
Footer.propTypes = {
  page: PropTypes.string,
  section: PropTypes.string
}

export default Footer
