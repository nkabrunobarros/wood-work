/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Edit,
  Trash,
  User
} from 'lucide-react';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import routes from '../../../navigation/routes';
import * as workersActionsRedux from '../../../store/actions/worker';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';

const Profile = ({ ...props }) => {
  const { user, breadcrumbsPath, pageProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const deleteWorker = (data) => dispatch(workersActionsRedux.deleteWorker(data));

  async function DeleteUser () {
    try {
      await deleteWorker(user.id.replace('urn:ngsi-ld:Worker:', '')).then(() => {
        Router.push(routes.private.internal.workers);
        setDialogOpen(false);
      });
    } catch (err) { console.log(err); }
  }

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <ConfirmDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={() => DeleteUser()}
          message='Está prestes a remover este utilizador, tem certeza que quer continuar?'
          icon='AlertOctagon'
        />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Box id='pad' style={{ display: 'flex' }}>
            <Box style={{ flex: 1 }}>
              <Typography variant='title'>{breadcrumbsPath[1].title}</Typography>
            </Box>
            {router.pathname === `${routes.private.profile}[Id]`
              ? null
              : (
                <Box className='flex'>
                  <Box>
                    <PrimaryBtn text='Editar'
                      hidden={!CanDo('change_worker')}
                      onClick={() => Router.push(`${routes.private.internal.editWorker}${user?.id}`)}
                      icon={
                        <Edit
                          strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                          size={pageProps?.globalVars?.iconSize}
                        />
                      } />
                  </Box>
                  <Box>
                    <PrimaryBtn
                      hidden={!CanDo('delete_worker')}
                      onClick={() => setDialogOpen(true)}
                      text='Apagar'
                      icon={
                        <Trash
                          strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                          size={pageProps?.globalVars?.iconSize} />
                      }
                      light
                    />
                  </Box>
                </Box>
              )}
          </Box>
          <Grid id='pad' container md={6} sm={8} xs={12} >
            <Grid container spacing={3} >
              <Grid container item>
                <Typography id='align' item color='lightTextSm.main'><User
                  strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                  size={pageProps?.globalVars?.iconSize}
                />
                <Box pl={1}>Dados Gerais</Box>

                </Typography>
              </Grid>
              <Grid container item>
                {/* <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item variant="subtitle2"color='lightTextSm.main'>Nome Utilizador</Typography>
                    <Typography item variant="subtitle2"color='lightTextSm.black' >{client?.user?.username}</Typography>
                  </Grid> */}
                <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                  <Typography item variant="subtitle2"color='lightTextSm.main'>Primeiro Nome</Typography>
                  <Typography item variant="subtitle2"color='lightTextSm.black' >{user?.user?.first_name}</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                  <Typography item variant="subtitle2"color='lightTextSm.main'>Último Nome</Typography>
                  <Typography item variant="subtitle2"color='lightTextSm.black' >{user?.user?.last_name}</Typography>
                </Grid>

                <Grid item md={6} sm={6} xs={12} pb={1} pt={1} sx={{ overflow: 'hidden' }}>
                  <Typography item variant="subtitle2"color='lightTextSm.main'>Email</Typography>
                  <Typography item variant="subtitle2"color='lightTextSm.black' >{user?.user?.email}</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={12} pb={1} pt={1} sx={{ overflow: 'hidden' }}>
                  <Typography item variant="subtitle2"color='lightTextSm.main'>Perfil</Typography>
                  <Typography item variant="subtitle2"color='lightTextSm.black' >{user.user.orion_groups[0]?.name}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

export default Profile;
