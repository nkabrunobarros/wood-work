import { Autocomplete, Box, ButtonGroup, Grid, IconButton, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

//  PropTypes
import { RefreshCw, User, UserPlus } from 'lucide-react';
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
//  Page Component Styles
import styles from '../../../../styles/NewOrder.module.css';

//  Actions
import * as ClientsActions from '../../../../pages/api/actions/client';

const ClientTab = (props) => {
  const {
    pageProps,
    client,
    onClientChange,
    onProcessing,
  } = props;

  const [clients, setClients] = useState(props.clients);

  async function getClients () {
    onProcessing(true);

    await ClientsActions.clients()
      .then((res) => setClients(res.data.payload.data))
      .catch(err => console.log(err));

    onProcessing(false);
  }

  return (
    <Grid container>
      <Grid container md={12} sm={12} xs={12} >
        <Grid bgcolor={'lightGray.main'} className={styles.clientContainer} spacing={1} p={2}>
          <Grid container item md={12} sm={12} xs={12} >
            <Grid container md={9} sm={9} xs={9}>
              <Typography id='align' className='headerTitleSm'>
                <User size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} /> Cliente
              </Typography>
            </Grid>
            <Grid container md={3} sm={3} xs={3}>
              <ButtonGroup>
                <Tooltip title='Atualizar lista de Clientes'>
                  <IconButton onClick={() => getClients()}>
                    <RefreshCw size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Novo Cliente'>
                  <IconButton href={routes.private.internal.newClient} target='#'>
                    <UserPlus size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid container item md={12} sm={12} xs={12} >
            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <Autocomplete
              name='client'
              id='client'
              fullWidth
              disablePortal
              options={clients}
              getOptionLabel={(option) => option.legalName?.value || option.name?.value}
              getOptionValue={(option) => option.id}
              onChange={(e, value) => onClientChange({ value: value?.id || '', name: 'client' })}
              renderOption={(props, option) => {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.legalName?.value || option.name?.value }
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  label={client.error}
                  error={client.error}
                  value={client.value}
                  {...params}
                  placeholder="Escrever Nome Cliente"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid var(--white)' }}>
            {clients.find(ele => ele.id === client.value) &&
                <Grid container md={12} sm={12} xs={12} sx={{ height: 'fit-content' }}>
                  <Grid item md={12} sm={12} xs={12} p={1}>
                    <Typography id='align' item color='lightTextSm.main'>Dados Gerais</Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6} p={1}>
                    <Typography color='lightTextSm.main'>Tipo cliente</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.isCompany?.value ? 'Empresa' : 'Particular'}</Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6} p={1}>
                    <Typography color='lightTextSm.main'>Morada fiscal</Typography>
                    <Typography color='lightTextSm.black' display={!clients.find(ele => ele.id === client.value)?.address?.value?.addressCountry && 'none'}>
                      {clients.find(ele => ele.id === client.value)?.address?.value?.streetAddress + ', '}
                      {clients.find(ele => ele.id === client.value)?.address?.value?.postalCode + ', '}
                      {clients.find(ele => ele.id === client.value)?.address?.value?.addressLocality + ', '}
                      {clients.find(ele => ele.id === client.value)?.address?.value?.addressRegion + ', '}
                      {clients.find(ele => ele.id === client.value)?.address?.value?.addressCountry}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6} p={1}>
                    <Typography color='lightTextSm.main'>Morada entrega</Typography>
                    <Typography color='lightTextSm.black' display={!clients.find(ele => ele.id === client.value)?.delivery_address?.value?.addressCountry && 'none'} >
                      {clients.find(ele => ele.id === client.value)?.delivery_address?.value?.streetAddress + ', '}
                      {clients.find(ele => ele.id === client.value)?.delivery_address?.value?.postalCode + ', '}
                      {clients.find(ele => ele.id === client.value)?.delivery_address?.value?.addressLocality + ', '}
                      {clients.find(ele => ele.id === client.value)?.delivery_address?.value?.addressRegion + ', '}
                      {clients.find(ele => ele.id === client.value)?.delivery_address?.value?.addressCountry}
                    </Typography>
                  </Grid>
                </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ClientTab.propTypes = {
  pageProps: PropTypes.any,
  props: PropTypes.any,
  clients: PropTypes.any,
  client: PropTypes.any,
  startAt: PropTypes.any,
  endAt: PropTypes.any,
  obs: PropTypes.string,
  onClientChange: PropTypes.func,
  onStartAtChange: PropTypes.func,
  onEndAtChange: PropTypes.func,
  onObsChange: PropTypes.func,
  onProcessing: PropTypes.func,
  noDetail: PropTypes.bool,
};

export default ClientTab;
