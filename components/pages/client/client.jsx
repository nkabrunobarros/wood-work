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
import { useDispatch } from 'react-redux';
import * as ClientsActionsRedux from '../../../store/actions/client';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, editRoute, pageProps, client } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const updateClient = (data) => dispatch(ClientsActionsRedux.updateClient(data));

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
                    <Typography item color='lightTextSm.black' >{client?.user.email}</Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12} pb={1} pt={1}>
                    <Typography item color='lightTextSm.main'>Tipo cliente </Typography>
                    <Typography item color='lightTextSm.black' >{client?.isCompany ? 'Empresarial' : 'Particular'}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'>Observações </Typography>
                    <Typography item color='lightTextSm.black' >{client?.obs?.value}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Grid container p={2} bgcolor={'lightGray.main'} className={styles.clientContainer}>
                <Grid container item p={1}>
                  <Grid container item xs={12}>
                    <Typography id='align' item color='lightTextSm.main'>
                      <PackagePlus
                        strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                        size={pageProps?.globalVars?.iconSize}
                      />
                      Dados de Faturação
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item p={1}>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography item color='lightTextSm.main'> Número de Identificação Fiscal (Nif)</Typography>
                    <Typography item color='lightTextSm.black' >{client?.vat?.value}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                  </Grid>
                </Grid>
                <Grid container item p={1}>
                  <Grid container item md={6} sm={6} xs={12} >
                    <Grid item xs={12} md={12} sm={12}>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ p: 0.5 }} >Morada</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ p: 0.5 }} justifyContent='center' ><Typography item color='lightTextSm.main'>Fiscal</Typography></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} >Codigo Postal</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.address?.postalCode}</Typography></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} >Rua</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.address?.streetAddress}</Typography></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} >Localidade</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.address?.addressLocality}</Typography></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} >Região</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.address?.addressRegion}</Typography></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid container md={4} sm={4} xs={4} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} >Pais</Grid>
                        <Grid container md={8} sm={8} xs={8} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.address?.addressCountry}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ p: 0.5 }} justifyContent='center' > <Typography item color='lightTextSm.main'>Entrega</Typography></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.delivery_address?.postalCode}</Typography></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.delivery_address?.streetAddress}</Typography></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.delivery_address?.addressLocality}</Typography></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.delivery_address?.addressRegion}</Typography></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid', p: 0.5, borderColor: 'divider' }} ><Typography item color='lightTextSm.black'>{client.delivery_address?.addressCountry}</Typography></Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item>
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
