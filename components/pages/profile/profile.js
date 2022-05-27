//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'
import Content from '../../content/content'
import PrimaryBtn from '../../buttons/primaryBtn'
import { Edit, Flag, Mail, Map, Phone, Smartphone, Trash, User } from 'lucide-react'

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
      <Content >
        <div id='pad' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <a className='headerTitleXl'>João Magalhães</a>
          </div>
          <div className='flex'>
            <div>
              <PrimaryBtn text='Editar' icon={<Edit />} />
            </div>
            <div>
              <PrimaryBtn text='Apagar' icon={<Trash />} light />
            </div>
          </div>
        </div>
        <div id="pad">
          <a id="align" className='lightText bold' style={{ marginBottom: '1rem' }}><User /> Informações Gerais</a>
          <div className="flex">
            <div id="pad" className='infoBox dark'>
              <div>
                <a className="lightTextSm">Nome</a><br></br>
                <a className="lightTextSm black">Joao</a>
              </div>
              <div>
                <a className="lightTextSm">Perfil de Utilizador</a><br></br>
                <a className="lightTextSm black">Administrador</a>
              </div>
              <div>
                <a className="lightTextSm">Estado</a><br></br>
                <a className="lightTextSm" style={{ color: 'var(--primary)' }}>Joao</a>
              </div>

            </div>
            <div id="pad" className='infoBox'>
              <a id="align" className="lightTextSm"><Mail className='primaryIcon' size={18} /> Informações Gerais</a>
              <a id="align" className="lightTextSm"><Smartphone className='primaryIcon' size={18} /> Informações Gerais</a>
              <a id="align" className="lightTextSm"><Phone className='primaryIcon' size={18} /> Informações Gerais</a>
              <a id="align" className="lightTextSm"><Map className='primaryIcon' size={18} /> Informações Gerais</a>
              <a id="align" className="lightTextSm"><Flag className='primaryIcon' size={18} /> Informações Gerais</a>
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  )
}
export default Profile
