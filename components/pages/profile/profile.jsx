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
import CanDo from '../../utils/CanDo';

const Profile = ({ ...props }) => {
  const { user, breadcrumbsPath, pageProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();


  async function DisableUser() {
    const userCpy = {
      id: user?.id,
      email: user?.email.value,
      ativo: true,
      nome: user?.nome,
      // telemovel: user?.telemovel.value,
      telefone: user?.telefone,
      morada: user?.morada,
      paisCodigo: user?.paisCodigo,
      idPerfil: user?.idPerfil,
      obs: user?.obs,
    };

    userCpy.ativo = false;

    try {
      await UserActions.saveUser(userCpy).then((res) => console.log(res));
    } catch (err) {
    }
  }

    function displayShift (value) {
      switch (JSON.stringify(value)) {
        case '[1,2]': return 'Manhã';
        case '[2,3]': return 'Tarde';
        case '[3,4]': return 'Noite';
        default: return 'Nenhum';
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
            <a className='headerTitleXl'>{user?.givenName?.value || user?.legalName?.value}</a>
          </div>
          {router.pathname === `${routes.private.profile}[Id]` ? null : (
            <div className='flex'>
              <div>
                <PrimaryBtn text='Editar'
                  onClick={() => Router.push(`${routes.private.internal.editUser}${user?.id}`)}
                  icon={
                    <Edit
                      strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                    />
                  } />
              </div>
              <div>
                <PrimaryBtn
                  hidden={!CanDo(['delete','workers'])}
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
                    <Typography item color='lightTextSm.black'>{user?.givenName?.value || user?.legalName?.value}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Perfil de Utilizador </Typography>
                    <Typography item color='lightTextSm.black'>{user?.profile?.object?.description}</Typography>
                  </Grid>
                  {console.log(user)}
                  {user?.workerShift?.value && <Grid item xs={12}>
                    {/* Only applies to workers */}
                    <Typography item color='lightTextSm.main'>Turno</Typography>
                    <Typography item color='lightTextSm.black'>{displayShift(user?.workerShift?.value)}</Typography>
                  </Grid>}
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Estado </Typography>
                    <Typography item>
                      <a color='lightTextSm.main' style={{ color: 'var(--primary)' }}>
                        {user?.active?.value === 'True' ? 'Ativo' : 'Desativado'}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} sm={6} container p={2} spacing={2}>
                  <Grid container item>
                    <Tooltip title='Email'>
                      <a href={`mailto:${user?.email?.value}`}>
                        <Mail className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user?.email?.value}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='telemovel'>
                      <a href={`tel:${user?.telemovel?.value}`}>
                        <Smartphone className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user?.telemovel?.value}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Telefone'>
                      <a href={`tel:${user?.telefone?.value}`}>
                        <Phone className='primaryIcon' size={22} />
                      </a>
                    </Tooltip>
                    <span>
                      {user?.telefone?.value}
                    </span>
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Morada'>
                      <Map className='primaryIcon' size={22} />
                    </Tooltip>
                    <span>
                      {/* {user?.address} */}
                    </span>
                    {console.log(user)}
                  </Grid>
                  <Grid container item>
                    <Tooltip title='Pais'>
                      <Flag className='primaryIcon' size={22} />
                    </Tooltip>
                    <span>
                      {/* {user?.pais.descricao || ''} */}
                      pais
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
                  <Typography item color='lightTextSm.black'>{user?.obs}</Typography>
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
