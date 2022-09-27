/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import { Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Edit,
  Flag,
  Mail,
  Map,
  Phone,
  Smartphone,
  Trash,
  User
} from 'lucide-react';
import Router, { useRouter } from 'next/router';
import routes from '../../../navigation/routes';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

const Profile = ({ ...props }) => {
  const { user, breadcrumbsPath, pageProps } = props;
  const router = useRouter();

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <a className='headerTitleXl'>{user.nome}</a>
          </div>
          {router.pathname === `${routes.private.profile}[Id]` ? null : (
            <div className='flex'>
              <div>
                <PrimaryBtn text='Editar'
                  onClick={() => Router.push(`${routes.private.internal.editUser}${user.id}`)}
                  icon={
                    <Edit
                      strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                    />
                  } />
              </div>
              <div>
                <PrimaryBtn text='Apagar' icon={
                  <Trash
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize} />
                }
                  light
                />
              </div>
            </div>
          )}
        </div>
        <div id='pad'>
          <a
            id='align'
            className='lightText bold'
            style={{ marginBottom: '1rem' }}
          >
            <User /> Informações Gerais
          </a>
          <div className='flex'>
            <div id='pad' className='infoBox dark'>
              <div>
                <a className='lightTextSm'>Nome</a>
                <br></br>
                <a className='lightTextSm black'>{user.nome}</a>
              </div>
              <br></br>
              <div>
                <a className='lightTextSm'>Perfil de Utilizador</a>
                <br></br>
                <a className='lightTextSm black'> {user.perfil.descricao} </a>
              </div>
              <br></br>
              <div>
                <a className='lightTextSm'>Estado</a>
                <br></br>
                <a className='lightTextSm' style={{ color: 'var(--primary)' }}>
                  {user.ativo ? 'Ativo' : 'Desativado'}
                </a>
              </div>
            </div>
            <div id='pad' className='infoBox'>
              <a id='align' className='lightTextSm'>
                <Tooltip title='Email'>
                  <Mail className='primaryIcon' size={22} />
                </Tooltip>
                <span>
                  {user.email}
                </span>

              </a>
              <a id='align' className='lightTextSm'>
              <Tooltip title='Telemovel'>
                <a href={`tel:${user.telemovel}`}>
                  <Smartphone className='primaryIcon' size={22} />
                </a>
              </Tooltip>
                <span>
                  {user.telemovel}
                </span>
              </a>
              <a id='align' className='lightTextSm'>
                <Tooltip title='Telefone'>
                  <a href={`tel:${user.telefone}`}>
                    <Phone className='primaryIcon' size={22} />
                  </a>
                </Tooltip>
                <span>
                  {user.telefone}
                </span>
              </a>
              <a id='align' className='lightTextSm'>
                <Tooltip title='Morada'>
                  <Map className='primaryIcon' size={22} />
                </Tooltip>
                <span>
                  {user.morada}
                </span>

              </a>
              <a id='align' className='lightTextSm'>
                <Tooltip title='Pais'>
                  <Flag className='primaryIcon' size={22} />
                </Tooltip>
                <span>
                  {user.pais.descricao}
                </span>
              </a>
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  );
};

export default Profile;
