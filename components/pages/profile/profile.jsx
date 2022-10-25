/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import { Tooltip, Typography } from '@mui/material';
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
import * as UserActions from '../../../pages/api/actions/user';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';

const Profile = ({ ...props }) => {
  const { user, breadcrumbsPath, pageProps } = props;
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function DisableUser() {
    const userCpy = {
      id: user.id,
      email: user.email,
      ativo: true,
      nome: user.nome,
      telemovel: user.telemovel,
      telefone: user.telefone,
      morada: user.morada,
      paisCodigo: user.paisCodigo,
      idPerfil: user.idPerfil,
      obs: user.obs,
    };

    userCpy.ativo = false;

    try {
      await UserActions.saveUser(userCpy).then((res) => console.log(res));
    } catch (err) {

    }
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => DisableUser()}
        message='Está prestes a desativar este Utilizador, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
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
                <PrimaryBtn
                  onClick={() => setDialogOpen(true)}
                  text='Apagar'
                  icon={
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

          <Grid container sx={12}>
            <Grid container sm={12} md={6}>
              <Grid container sx={12}>
                <Grid xs={12} sm={6} container p={2} bgcolor={"lightGray.main"}>

                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Nome </Typography>
                    <Typography item color='lightTextSm.black'>{user.nome}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Perfil de Utilizador </Typography>
                    <Typography item color='lightTextSm.black'>{user.perfil.descricao}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Estado </Typography>
                    <Typography item>
                      <a color='lightTextSm.main' style={{ color: 'var(--primary)' }}>
                        {user.ativo ? 'Ativo' : 'Desativado'}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} sm={6} container p={2} spacing={2}>
                  <Grid container item>
                    <Tooltip title='Email'>
                      <a href={`mailto:${user.email}`}>
                        <Mail className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user.email}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Telemovel'>
                      <a href={`tel:${user.telemovel}`}>
                        <Smartphone className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user.telemovel}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Telefone'>
                      <a href={`tel:${user.telefone}`}>
                        <Phone className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user.telefone}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Morada'>
                      <Map className='primaryIcon' size={22} />
                    </Tooltip>
                    <span>
                      {user.morada}
                    </span>

                  </Grid>
                  <Grid container item>
                    <Tooltip title='Pais'>
                      <Flag className='primaryIcon' size={22} />
                    </Tooltip>
                    <span>
                      {user.pais.descricao}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Only shows when on user detail NOT profile */}
          {Router.route.replace('[Id]', '') === routes.private.internal.user &&
            <Grid container>
              <Grid container item p={2} sm={12} xs={12} md={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Observações </Typography>
                  <Typography item color='lightTextSm.black'>{user.obs}</Typography>
                </Grid>
              </Grid>
            </Grid>
          }

        </div>
      </Content>
    </Grid>
  );
};

export default Profile;
