//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'

const HomeScreen = () => {
  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <CustomBreadcrumbs />
    </Grid>
  )
}
export default HomeScreen
