import { Autocomplete, Box, ButtonGroup, Grid, IconButton, InputLabel, TextField, TextareaAutosize, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

//  PropTypes
import { RefreshCw, User, UserPlus } from "lucide-react";
import PropTypes from 'prop-types';
import routes from "../../../../navigation/routes";
//  Page Component Styles
import styles from '../../../../styles/NewOrder.module.css';

//  Actions
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as ClientsActions from '../../../../pages/api/actions/client';

const ClientTab = (props) => {
    const { pageProps,
         client, 
         onClientChange,
         startAt, 
         onStartAtChange,
         endAt, 
         onEndAtChange,
         obs, 
         onObsChange,
         onProcessing
         } = props;
         
    const [clients, setClients] = useState(props.clients);

    async function getClients() {
        onProcessing(true);
    
        await ClientsActions.clients()
          .then((res) => setClients(res.data.payload.data))
          .catch(err => console.log(err));
    
          onProcessing(false);
      }

    return (
        <Grid container>
          <Grid container md={3} sm={12}  >
            <Grid bgcolor={"lightGray.main"} className={styles.clientContainer} spacing={1} p={2}>
              <Grid container item sm={12} xs={12} >
                <Grid container md={9}>
                  <Typography id='align' className='headerTitleSm'>
                    <User size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados Cliente
                  </Typography>
                </Grid>
                <Grid container md={3}>
                  <ButtonGroup>
                    <Tooltip title='Atualizar lista de Clientes'>
                      <IconButton onClick={() => getClients()}>
                        <RefreshCw size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Novo Cliente'>
                      <IconButton href={routes.private.internal.newClient} target='#'>
                        <UserPlus size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Grid container item sm={12} xs={12} >
                {/* <MySelect
                  error={client.error}
                  label={'Cliente'}
                  required
                  fullWidth
                  options={clients}
                  //  TODO: fix para aceitar id que nao tem property's abaixo
                  // optionValue={'givenName'}
                  optionLabel={"givenName"}
                  value={client.value}
                  onChange={(e) => {
                    onClientChange(e.target.value);
                  }}
                  adornmentIcon={
                    <Tooltip title='Detalhes Codigo Postal' >
                      <Info color="var(--primary)" strokeWidth={1} />
                    </Tooltip>
                  }
                /> */}

            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <Autocomplete
              fullWidth
              disablePortal
              options={clients}
              getOptionLabel={(option) => option.legalName?.value}
              getOptionValue={(option) => option.id}
              onChange={(e, value) =>{
                onClientChange(value);
              }}
              renderOption={(props, option) => {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.legalName.value}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <>
                <InputLabel htmlFor='email' color='error' sx={{ color: 'var(--red)'}}>{client.error}</InputLabel>
                <TextField
                  error={client.error}
                  value={client.value}
                  {...params}
                  placeholder="Escrever Nome Cliente"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
                  </>
               )}
              />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container item sm={12} xs={12} >
                  <InputLabel htmlFor='email'>Data de criação de orçamento</InputLabel>
                  <DesktopDatePicker
                    required
                    error={true}
                    inputFormat="DD.MM.YYYY"
                    value={startAt}
                    onChange={(newValue) => onStartAtChange(newValue)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </Grid>
                <Grid container item sm={12} xs={12} >
                  <InputLabel htmlFor='email'>Data de entrega de orçamento</InputLabel>
                  <DesktopDatePicker
                    required
                    inputFormat="DD.MM.YYYY"
                    value={endAt}
                    onChange={(newValue) => onEndAtChange(newValue)}
                    renderInput={(params) => <TextField style={{ border: '1px solid red !important' }} label={'hi'} error fullWidth {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid container item sm={12} xs={12} >
                <InputLabel htmlFor='email'>Observações</InputLabel>
                <TextareaAutosize
                  placeholder='Escrever observações'
                  className={styles.textarea}
                  value={obs}
                  onChange={(e) => onObsChange(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container md={9} sm={12} sx={{ border: '1px solid var(--white)' }}>
            {!clients.find(ele => ele.id === client.value) ?
              <Box className='fullCenter' sx={{ width: '100%', border: '1px solid', borderColor: 'divider' }}>
                <Typography>Escolha um cliente</Typography>
              </Box>
              :
              <>
                <Grid container md={6} p={2} sx={{ height: 'fit-content', padding: 3 }}>
                  <Grid item md={12} p={1}>
                    <Typography id='align' item color='lightTextSm.main'><User
                      strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                    />Dados Gerais</Typography>
                  </Grid>
                  <Grid item md={6} p={1}>
                    <Typography color='lightTextSm.main'>Email</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.email?.value}</Typography>
                  </Grid>
                  <Grid item md={6} p={1}>
                    <Typography color='lightTextSm.main'>Telefone</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.telephone?.value}</Typography>
                  </Grid>
                  {/* <Grid item md={6} p={1}>
                    <Typography color='lightTextSm.main'>Pessoa de Contacto</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.contact?.value}</Typography>
                  </Grid> */}
                  <Grid item md={6} p={1}>
                    <Typography color='lightTextSm.main'>Contacto</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.telephone?.value}</Typography>
                  </Grid>
                  <Grid item md={6} p={1}>
                    <Typography color='lightTextSm.main'>Observações sobre o cliente</Typography>
                    <Typography color='lightTextSm.black' >
                      {clients.find(ele => ele.id === client.value)?.obs?.value}</Typography>
                  </Grid>
                </Grid>
                {/* <Grid bgcolor={"lightGray.main"} className={styles.clientContainer} container md={6} sx={{ height: 'fit-content', padding: 3 }} >
                  <Grid container item p={1}>
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

                  <Grid container item p={1}>
                    <Grid item xs={12} md={6} p={1}>
                      <Typography item color='lightTextSm.main'>Morada Fiscal</Typography>
                      {console.log(clients.find(ele => ele.id === client.value))}
                      <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client.value)?.address?.value?.streetAddres}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} p={1}>
                      <Typography item color='lightTextSm.main'>Codigo Postal</Typography>
                      <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client.value)?.postalCode?.value}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item p={1}>
                    <Grid item xs={12} md={6} p={1}>
                      <Typography item color='lightTextSm.main'> Número de Identificação Fiscal (Nif)</Typography>
                      <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client.value)?.taxId?.value}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} p={1}>
                      <Typography item color='lightTextSm.main'>Outros Dados</Typography>
                      <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client.value)?.otherData?.value}</Typography>
                    </Grid>
                  </Grid>
                </Grid> */}
              </>
            }
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
  };

export default ClientTab;