//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'

const HomeScreen = () => {
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.home}`
    }
  ]

  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
    </Grid>
  )
}
export default HomeScreen
