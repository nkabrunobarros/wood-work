//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'
import InfoCard from '../../cards/infoCard'
import { AlertOctagon, Layers, LayoutTemplate, PackageCheck } from 'lucide-react'

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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 0
      }}>
        <InfoCard amount={2} color={'var(--primary)'} icon={<PackageCheck size={40} />} title={'Em Orçamentação'} />
        <InfoCard amount={1} color={'var(--green)'} icon={<LayoutTemplate size={40} />} title={'Em Desenho'} />
        <InfoCard amount={3} color={'var(--orange)'} icon={<Layers size={40} />} title={'Em Produção'} />
        <InfoCard amount={7} color={'var(--babyblue)'} icon={<AlertOctagon size={40} />} title={'Concluidas'} />
      </div>
    </Grid>
  )
}
export default HomeScreen
