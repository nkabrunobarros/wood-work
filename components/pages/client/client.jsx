//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Material UI
import { Box, ButtonGroup, Typography } from '@mui/material';
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
  const { breadcrumbsPath, editRoute, pageProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const client = { ...props.client };

  async function onDelete () {
    const builtClient = {
      id: client?.id,
      type: client?.type,
      active: false,
    };

    builtClient['@context'] = [
      'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
      'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
    ];

    try {
      await ClientsActions.updateClient([builtClient]).then(() => Router.push(routes.private.internal.clients));
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
            <Typography variant='title'>{breadcrumbsPath[1].title}</Typography>
            <Box sx={{ marginLeft: 'auto' }}>
              <ButtonGroup>
                <PrimaryBtn
                  text='Editar'
                  icon={
                    <Edit
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                      size={pageProps?.globalVars?.iconSize}
                    />
                  }
                  onClick={() => Router.push(`${editRoute}${client?.id}`)}
                />
                <PrimaryBtn
                  text='Apagar'
                  onClick={() => setDialogOpen(true)}
                  icon={
                    <Trash
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                      size={pageProps?.globalVars?.iconSize}
                    />
                  }
                  light
                />
              </ButtonGroup>
            </Box>
          </Box>
          <Grid id='clientPanel' container sx={{ padding: '24px' }}>
            <Grid item xs={12} md={6} sm={6}>
              <Grid container spacing={3} >
                <Grid container item>
                  <Typography id='align' item color='lightTextSm.main'><User
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />  Dados Gerais</Typography>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6} sm={6} sx={{ overflow: 'hidden' }}>
                    <Typography item color='lightTextSm.main'>Email</Typography>
                    <Typography item color='lightTextSm.black' >{client?.email?.value}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Telefone </Typography>
                    <Typography item color='lightTextSm.black' >{client?.telephone?.value}</Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Pessoa de Contacto </Typography>
                    <Typography item color='lightTextSm.black' >{client?.contact?.value}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Contacto </Typography>
                    <Typography item color='lightTextSm.black' >{client?.telephone?.value}</Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Observações </Typography>
                    <Typography item color='lightTextSm.black' >{client?.obs?.value}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Grid container spacing={3} bgcolor={'lightGray.main'} className={styles.clientContainer}>
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography id='align' item color='lightTextSm.main'>
                      <PackagePlus
                        strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                        size={pageProps?.globalVars?.iconSize}
                      />
                      Dados de Faturação
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Morada Fiscal</Typography>
                    <Typography item color='lightTextSm.black'>
                      {client.address?.value?.streetAddress + ', '}
                      {client.address?.value?.postalCode + ', '}
                      {client.address?.value?.addressLocality + ', '}
                      {client.address?.value?.addressRegion + ', '}
                      {client.address?.value?.addressCountry}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Codigo Postal</Typography>
                    <Typography item color='lightTextSm.black' >
                      {client?.address?.value?.postalCode}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'> Número de Identificação Fiscal (Nif)</Typography>
                    <Typography item color='lightTextSm.black' >{client?.taxId?.value}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Outros Dados</Typography>
                    <Typography item color='lightTextSm.black' >{client?.otherData?.value}</Typography>
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
