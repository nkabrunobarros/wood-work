//  Nodes
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

//  Mui
import {
  Box,
  Button, Grid,
  InputLabel, Paper, Popover, TextareaAutosize,
  Tooltip, Typography, styled
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

//  Custom components
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import MyInput from '../../inputs/myInput';
import Loader from '../../loader/loader';

//  PropTypes
import PropTypes from 'prop-types';

//  Icons
import { Edit2, Info, Save, User, X } from 'lucide-react';
import Router from 'next/router';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Utils
import hasData from '../../utils/hasData';
import EmailValidation from '../../utils/EmailValidation';

//  Actions
import * as ClientService from '../../../pages/api/actions/client';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, detailPage, pageProps } = props;
  const [client, setClient] = useState(props.client)
  const [name, setName] = useState(client.giveName);
  const [legalName, setLegalName] = useState(client.legalName);
  const [email, setEmail] = useState(client.email);
  const [contactName, setContactName] = useState(client.contact);
  const [telefone, setTelefone] = useState(client.telephone);
  const [address, setAddress] = useState(client.address);
  const [postalCode, setPostalCode] = useState(client.postalCode);
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [nif, setNif] = useState(client.taxId);
  const [obs, setObs] = useState(client.obs);
  const [otherData, setOtherData] = useState(client.otherData);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageLegalName, setErrorMessageLegalName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageContact, setErrorMessageContact] = useState('');
  const [errorMessageTelefone, setErrorMessageTelefone] = useState('');
  const [errorMessageAddress, setErrorMessageAddress] = useState('');
  const [errorMessagePostalCode, setErrorMessagePostalCode] = useState('');
  const [errorMessageNif, setErrorMessageNif] = useState('');
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);


  useEffect(() => {
    async function PostalCodeInfo() {
      try {
        const res = await axios.get(`https://geoapi.pt/cp/${postalCode}?json=1`)

        if (res.data) setPostalCodeInfo(res.data)

      } catch (error) {
        setPostalCodeInfo()
      }
    }

    PostalCodeInfo();

  }, [postalCode])

  function handleSave() {
    if (!hasData(name)) setErrorMessageName('Campo Obrigatório');

    if (!hasData(legalName)) setErrorMessageLegalName('Campo Obrigatório');

    if (!hasData(email)) setErrorMessageEmail('Campo Obrigatório');
    else if (!EmailValidation(email)) setErrorMessageEmail('Email invalido *');

    if (!hasData(contactName))
      setErrorMessageContact('Campo Obrigatório');

    if (!hasData(telefone))
      setErrorMessageTelefone('Campo Obrigatório');
    else if (telefone < 100000000)
      setErrorMessageTelefone('Number has to have 9 digits');

    if (!hasData(address)) setErrorMessageAddress('Campo Obrigatório');

    if (!hasData(postalCode)) setErrorMessagePostalCode('Campo Obrigatório');
    else if (!hasData(postalCodeInfo)) setErrorMessagePostalCode('Codigo Postal Invalido');

    if (!hasData(nif)) setErrorMessageNif('Campo Obrigatório');

    if (
      hasData(name) &&
      hasData(legalName) &&
      hasData(email) &&
      EmailValidation(email) &&
      hasData(contactName) &&
      hasData(telefone) &&
      hasData(address) &&
      hasData(postalCodeInfo) &&
      hasData(nif)
    )
      setDialogOpen(!dialogOpen);
  }


  async function onConfirm() {
    setDialogOpen(false)
    setProcessing(true)

    const builtClient = {
      id: client.id,
      giveName: name,
      email,
      legalName,
      address,
      status: client.status,
      taxId: Number(nif),
      telephone: Number(telefone),
      buysTo: client.buysTo,
      otherData,
      contact: contactName,
      postalCode,
      obs
    }


    try {
      await ClientService.saveClient(builtClient).then((response) => {
        if (response.data.success === false && response.data.message === 'registo-ja-existe') toast.warning('Um Cliente ja existe com este email')
        else if (!response.data.success) toast.error('Algo aconteceu')
        else {
          // success here
          setProcessing(false)
          setClient(response.data.payload)
          toast.success('Cliente Atualizado')

          setTimeout(() => {
            Router.push(`${detailPage}${response.data.payload.id}`)
          }, 500);
        }
      })
    } catch (e) { }

  }

  const Item = styled(Paper)(() => ({
    padding: '.5rem',
  }));

  function RestoreData() {
    setName(client.giveName)
    setLegalName(client.legalName)
    setContactName(client.contact)
    setTelefone(client.telephone)
    setAddress(client.address)
    setNif(client.taxId)
    setPostalCode(client.postalCode)
    setOtherData(client.otherData)
    setObs(client.obs)
    setErrorMessageName()
    setErrorMessageLegalName()
    setErrorMessageEmail()
    setErrorMessageContact()
    setErrorMessageTelefone()
    setErrorMessageAddress()
    setErrorMessagePostalCode()
    setErrorMessageNif()
    toast.success('Dados Restaurados.')
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />

      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
        icon='AlertOctagon'
        message={'Está prestes a alterar a informação do cliente, tem certeza que quer continuar?'}
      />
      <Popover
        id={anchorEl ? 'simple-popover' : undefined}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <Grid item xs={6}>
                <Item>Distrito</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{postalCodeInfo?.Distrito}</Item>
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid item xs={6}>
                <Item>Concelho</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{postalCodeInfo?.Concelho}</Item>
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid item xs={6}>
                <Item>{typeof postalCodeInfo?.Localidade === 'object' ? 'Localidades' : 'Localidade'}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item> {typeof postalCodeInfo?.Localidade === 'object' ?
                  <>
                    {postalCodeInfo.Localidade.map((x, i) => <a key={i}>{x}<br></br></a>)}
                  </> : postalCodeInfo?.Localidade}</Item>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popover>
      {processing && <Loader center={true} backdrop />}
      <Content>
        <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Typography item className='headerTitleXl'>{client.giveName}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <PrimaryBtn
              text='Guardar'
              icon={
                <Save
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              onClick={handleSave}
            />
            <PrimaryBtn
              text='Cancelar'
              icon={
                <X
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              light
              onClick={() => Router.back()}
            />
          </Box>
        </Box>
        <Grid container sx={{ padding: '24px' }}>
          <Grid item xs={12} md={8}>
            <Grid container >
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <Typography id='align' item className='lightTextSm'><User
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />  Dados Gerais</Typography>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required
                    label={'Nome'}
                    error={errorMessageName}
                    placeholder='Escrever nome'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMessageName('');
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required
                    label={'Nome Legal'}
                    error={errorMessageLegalName}
                    placeholder='Escrever Nome Legal'
                    value={legalName}
                    onChange={(e) => {
                      setLegalName(e.target.value);
                      setErrorMessageLegalName('');
                    }}
                  />

                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required
                    disabled
                    label={'Email'}
                    error={errorMessageEmail}
                    placeholder='Escrever email'
                    value={email}
                    type='email'
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessageEmail('');
                    }}
                  />

                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required
                    label={'Pessoa de Contacto'}
                    error={errorMessageContact}
                    placeholder='Escrever pessoa de contacto'
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      setErrorMessageContact('');
                    }}
                  />

                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required
                    label={'Telefone'}
                    error={errorMessageTelefone}
                    placeholder='Escrever numero de telefone'
                    value={telefone}
                    type='number'
                    onChange={(e) => {
                      setTelefone(e.target.value);
                      setErrorMessageTelefone('');
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <InputLabel htmlFor='email'>Observações</InputLabel>
                  <TextareaAutosize
                    placeholder='Escrever observações'
                    className={styles.textarea}
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} className={styles.clientContainer}>
            <Grid container>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <Typography id='align' item className='lightTextSm'>
                  <Edit2
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                  Dados de Faturação
                </Typography>
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required
                  label={'Morada Fiscal'}
                  error={errorMessageAddress}
                  placeholder='Escrever Morada Fiscal'
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setErrorMessageAddress('');
                  }}
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required
                  label={'Codigo Postal'}
                  error={errorMessagePostalCode}
                  placeholder='Escrever Codigo Postal'
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    setErrorMessagePostalCode('');
                  }}
                  adornmentIcon={!!postalCodeInfo &&
                    <Tooltip title='Detalhes Codigo Postal' >
                      <Info color="var(--primary)" strokeWidth={1} onClick={(event) => setAnchorEl(event.currentTarget)} />
                    </Tooltip>
                  }
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required
                  label={'Número de Indentificação Fiscal (Nif)'}
                  error={errorMessageNif}
                  placeholder='Escrever Número de Indentificação Fiscal'
                  value={nif}
                  onChange={(e) => {
                    setNif(e.target.value);
                    setErrorMessageNif('');
                  }}
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required
                  label={'Outros Dados'}
                  placeholder='Escrever outros dados'
                  value={otherData}
                  onChange={(e) => {
                    setOtherData(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title='Restaurar Dados Originais'>
            <Button onClick={RestoreData} style={{ marginLeft: 'auto' }}>
              Restaurar
            </Button>
          </Tooltip>
        </Box>
      </Content>
    </Grid>
  );
};

EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  detailPage: PropTypes.string.isRequired,
  pageProps: PropTypes.any,
};

export default EditClient;
