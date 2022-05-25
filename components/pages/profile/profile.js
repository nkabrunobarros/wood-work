//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'

const Profile = () => {
  const breadcrumbsPath = [
    {
      title: 'Utilizador',
      href: `${routes.private.profile}`
    }
  ]

  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
    </Grid>
  )
}
export default Profile
