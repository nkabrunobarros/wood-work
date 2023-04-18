import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, ButtonGroup, Grid, IconButton, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

//  PropTypes
import { ChevronDown, RefreshCw, User, UserPlus } from 'lucide-react';
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
//  Page Component Styles
import { useDispatch, useSelector } from 'react-redux';
import * as clientsActionsRedux from '../../../../store/actions/client';
import styles from '../../../../styles/NewOrder.module.css';

//  Actions

const ClientTab = (props) => {
  const {
    pageProps,
    client,
    onClientChange,
    onProcessing,
    setClientUser,
    countries
  } = props;

  const [clients, setClients] = useState(props.clients);
  const dispatch = useDispatch();
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const reduxState = useSelector((state) => state);

  async function refreshClients () {
    onProcessing(true);

    await getClients().then(() => setClients([...reduxState.clients?.data ?? []].map((client) => {
      return {
        ...client,
        Nome: client.user.first_name + ' ' + client.user.last_name + ' - ' + client.user.email,
        Email: client.user.email,
      };
    })));

    onProcessing(false);
  }

  const [expanded, setExpanded] = useState(true);

  return (
    <>

      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ width: '100%' }}>
        <AccordionSummary bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
          <Typography>
            <Typography id='align' className='headerTitleSm'>
              <User size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} /> Cliente
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid container md={12} sm={12} xs={12} >
              <Grid container bgcolor={'lightGray.main'} className={styles.clientContainer} spacing={1} p={2}>
                <Grid container md={10} sm={10} xs={10} >
                  <InputLabel htmlFor='email'>Escolher Cliente</InputLabel>
                  <Autocomplete
                    name='client'
                    id='client'
                    fullWidth
                    disablePortal
                    options={clients}
                    getOptionLabel={(option) => option.Nome}
                    getOptionValue={(option) => option.user.id}
                    onChange={(e, value) => {
                      setClientUser(value?.user?.id);
                      onClientChange({ value: value?.id || '', name: 'client' });
                    }}
                    renderOption={(props, option) => {
                      return (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.Nome }
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
                <Grid container md={2} sm={2} xs={2} >
                  <Grid container md={12} sm={12} xs={12} justifyContent={'end'}>
                    <Box>
                      <ButtonGroup>
                        <Tooltip title='Atualizar lista de Clientes'>
                          <IconButton onClick={() => refreshClients()}>
                            <RefreshCw size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Novo Cliente'>
                          <IconButton href={routes.private.internal.newClient} target='#'>
                            <UserPlus size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />
                          </IconButton>
                        </Tooltip>
                      </ButtonGroup>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12} sx={{ border: '1px solid var(--white)' }}>
                  {clients?.find(ele => ele.id === client.value) &&
                    <Grid container md={12} sm={12} xs={12} sx={{ height: 'fit-content' }}>
                      <Grid item md={12} sm={12} xs={12} p={1}>
                        <Typography id='align' item color='lightTextSm.main'>Dados Gerais</Typography>
                      </Grid>
                      <Grid item md={6} sm={6} xs={6} p={1}>
                        <Typography color='lightTextSm.main'>Tipo cliente</Typography>
                        <Typography color='lightTextSm.black' >
                          {clients?.find(ele => ele.id === client.value)?.isCompany?.value ? 'Empresa' : 'Particular'}</Typography>
                      </Grid>
                      <Grid item md={6} sm={6} xs={6} p={1}>
                        <Typography color='lightTextSm.main'></Typography>
                        <Typography color='lightTextSm.black' ></Typography>
                      </Grid>
                      <Grid item md={6} sm={6} xs={6} p={1}>
                        <Typography color='lightTextSm.main'>Morada fiscal</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.address?.streetAddress}</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.address?.postalCode}</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.address?.addressLocality}</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.address?.addressRegion}</Typography>
                        <Typography color='lightTextSm.black'>{countries.find(ele => ele.cca2 === clients?.find(ele => ele.id === client.value)?.address?.addressCountry).name.common}</Typography>

                      </Grid>
                      <Grid item md={6} sm={6} xs={6} p={1}>
                        <Typography color='lightTextSm.main'>Morada entrega</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.delivery_address?.streetAddress }</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.delivery_address?.postalCode }</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.delivery_address?.addressLocality }</Typography>
                        <Typography color='lightTextSm.black'>{clients?.find(ele => ele.id === client.value)?.delivery_address?.addressRegion }</Typography>
                        <Typography color='lightTextSm.black'>{countries.find(ele => ele.cca2 === clients?.find(ele => ele.id === client.value)?.delivery_address?.addressCountry).name.common}</Typography>
                      </Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
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
  setClientUser: PropTypes.func,
  noDetail: PropTypes.bool,
  countries: PropTypes.array,
};

export default ClientTab;
