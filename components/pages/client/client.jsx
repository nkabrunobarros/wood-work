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
import { Edit, Map, Trash, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import * as ClientsActionsRedux from '../../../store/actions/client';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, editRoute, pageProps, client } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const updateClient = (data) => dispatch(ClientsActionsRedux.updateClient(data));
  const reduxState = useSelector((state) => state);

  async function onDelete () {
    const data = {
      id: client?.id.replace('urn:ngsi-ld:Owner:', ''),
      is_active: false,
    };

    try {
      await updateClient(data).then((res) => {
        console.log(res);
        // Router.push(routes.private.internal.clients)
      });
    } catch (err) { }
  }

  const tableFirstCell = {
    container: true,
    sx: { borderLeft: '1px solid', borderBottom: '1px solid', borderRight: '1px solid', borderColor: 'divider' },
    md: 2,
    sm: 2,
    xs: 2,
    p: 0.5
  };

  const tableLastCell = {
    container: true,
    sx: { borderRight: '1px solid ', borderColor: 'divider' },
    md: 5,
    sm: 5,
    xs: 5,
    p: 0.5
  };

  const tablemiddleCell = {
    container: true,
    md: 5,
    sm: 5,
    xs: 5,
    p: 0.5
  };

  return (
    <>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDelete()}
        message={'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'}
      />
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
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
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth || 1}
                      size={pageProps?.globalVars?.iconSize || 20}
                    />
                  }
                  onClick={() => Router.push(`${editRoute}${client?.id}`)}
                />
                <PrimaryBtn
                  text='Apagar'
                  onClick={() => setDialogOpen(true)}
                  icon={
                    <Trash
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth || 1}
                      size={pageProps?.globalVars?.iconSize || 20}
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
                  {/* <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item color='lightTextSm.main'>Nome Utilizador</Typography>
                    <Typography item color='lightTextSm.black' >{client?.user?.username}</Typography>
                  </Grid> */}
                  <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item color='lightTextSm.main'>Primeiro Nome</Typography>
                    <Typography item color='lightTextSm.black' >{client?.user?.first_name}</Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item color='lightTextSm.main'>Ultimo Nome</Typography>
                    <Typography item color='lightTextSm.black' >{client?.user?.last_name}</Typography>
                  </Grid>

                  <Grid item md={6} sm={6} xs={12} pb={1} pt={1} sx={{ overflow: 'hidden' }}>
                    <Typography item color='lightTextSm.main'>Email</Typography>
                    <Typography item color='lightTextSm.black' >{client?.user?.email}</Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item color='lightTextSm.main'>Tipo cliente </Typography>
                    <Typography item color='lightTextSm.black' >{client?.isCompany ? 'Empresarial' : 'Particular'}</Typography>
                  </Grid>
                  {/* <Grid item xs={6} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Observações </Typography>
                    <Typography item color='lightTextSm.black' >{client?.obs?.value}</Typography>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Grid container p={2} bgcolor={'lightGray.main'} className={styles.clientContainer}>
                <Grid container item p={1}>
                  <Grid container item xs={12}>
                    <Typography id='align' item color='lightTextSm.main'>
                      <Map
                        strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                        size={pageProps?.globalVars?.iconSize}
                      />
                      Moradas
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container p={1}>
                  <Grid container md={12} sm={12} xs={12} >
                    {/* Headers */}
                    <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', p: 0.5, borderColor: 'divider' }}>
                      <Grid {...tableFirstCell} sx={{ border: 'none' }}>Morada</Grid>
                      <Grid {...tablemiddleCell} justifyContent={'center'}><Typography item color='lightTextSm.main'></Typography>Principal</Grid>
                      <Grid {...tableLastCell} justifyContent={'center'}><Typography item color='lightTextSm.main'></Typography>Entrega</Grid>
                    </Grid>
                    {/* Postal Code */}
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Codigo Postal</Typography></Grid>
                      <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{client.address?.postalCode}</Typography></Grid>
                      <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{client.delivery_address?.postalCode}</Typography></Grid>
                    </Grid>
                    {/* Street */}
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Rua</Typography></Grid>
                      <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{client.address?.streetAddress}</Typography></Grid>
                      <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{client.delivery_address?.streetAddress}</Typography></Grid>
                    </Grid>
                    {/* addressLocality */}
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Localidade</Typography></Grid>
                      <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{client.address?.addressLocality}</Typography></Grid>
                      <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{client.delivery_address?.addressLocality}</Typography></Grid>
                    </Grid>
                    {/* addressRegion */}
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Região</Typography></Grid>
                      <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{client.address?.addressRegion}</Typography></Grid>
                      <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{client.delivery_address?.addressRegion}</Typography></Grid>
                    </Grid>
                    {/* addressCountry */}
                    <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>País</Typography></Grid>
                      <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{reduxState.countries.data.find(ele => ele.cca2 === client.address?.addressCountry).name.common}</Typography></Grid>
                      <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{reduxState.countries.data.find(ele => ele.cca2 === client.delivery_address?.addressCountry).name.common}</Typography></Grid>
                    </Grid>
                  </Grid>
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

EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  editRoute: PropTypes.string,
  pageProps: PropTypes.any,
};

export default EditClient;
