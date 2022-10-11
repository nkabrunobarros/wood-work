//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Material UI
import { Box, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Custom Components
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Icons
import { Edit, PackagePlus, Trash, User } from 'lucide-react';
import routes from '../../../navigation/routes';
import * as ClientsActions from '../../../pages/api/actions/client';
import ConfirmDialog from '../../dialogs/ConfirmDialog';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, client, editRoute, pageProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  async function onDelete() {
    const builtClient = {
      id: client.id,
      email: client.email,
      giveName: client.giveName,
      legalName: client.legalName,
      address: client.address,
      status: false,
      telephone: client.telephone,
      buysTo: client.organization.id,
      otherData: client.otherData,
      obs: client.obs,
      contact: client.contact,
      taxId: client.taxId,
      postalCode: client.postalCode,

    }

    try {
      await ClientsActions.saveClient(builtClient).then(() => Router.push(routes.private.internal.clients))
    } catch (err) { }
  }

  return (
    <>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDelete()}
        message={'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'}
      />
      <Grid component='main'>
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
            <Typography item className='headerTitleXl'>{client.legalName}</Typography>
            <Box sx={{ marginLeft: 'auto' }}>
              <PrimaryBtn
                text='Editar'
                icon={
                  <Edit
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
                onClick={() => Router.push(`${editRoute}${client.id}`)}
              />
              <PrimaryBtn
                text='Apagar'
                onClick={() => setDialogOpen(true)}
                icon={
                  <Trash
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
                light
              />
            </Box>
          </Box>
          <Grid id='clientPanel' container sx={{ padding: '24px' }}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3} >
                <Grid container item>
                  <Typography id='align' item color='lightTextSm.main'><User
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />  Dados Gerais</Typography>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6} sx={{ overflow: 'hidden' }}>
                    <Typography item color='lightTextSm.main'>Email</Typography>
                    <Typography item color='lightTextSm.black' >{client.email}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Telefone </Typography>
                    <Typography item color='lightTextSm.black' >{client.telephone}</Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Pessoa de Contacto </Typography>
                    <Typography item color='lightTextSm.black' >{client.contact}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Contacto </Typography>
                    <Typography item color='lightTextSm.black' >{client.telephone}</Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Observações </Typography>
                    <Typography item color='lightTextSm.black' >{client.obs}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3} bgcolor={"lightGray.main"} className={styles.clientContainer}>
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography id='align' item color='lightTextSm.main'>
                      <PackagePlus
                        strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                      Dados de Faturação
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Morada Fiscal</Typography>
                    <Typography item color='lightTextSm.black' >{client.address}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Codigo Postal</Typography>
                    <Typography item color='lightTextSm.black' >{client.postalCode}</Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'> Número de Indentificação Fiscal (Nif)</Typography>
                    <Typography item color='lightTextSm.black' >{client.taxId}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography item color='lightTextSm.main'>Outros Dados</Typography>
                    <Typography item color='lightTextSm.black' >{client.otherData}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Grid>
    </>
  );
};

EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  editRoute: PropTypes.string,
  pageProps: PropTypes.any,
};

export default EditClient;
