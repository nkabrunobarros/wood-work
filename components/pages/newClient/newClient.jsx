//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

import {
  Box, InputLabel, Paper,
  Popover, TextareaAutosize,
  Tooltip,
  Typography
} from '@mui/material';
import axios from 'axios';
import { Edit2, Info, Save, User, X } from 'lucide-react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import routes from '../../../navigation/routes';
import * as ClientService from '../../../pages/api/actions/client';
import styles from '../../../styles/NewOrder.module.css';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import MyInput from '../../inputs/myInput';
import Loader from '../../loader/loader';
import EmailValidation from '../../utils/EmailValidation';
import hasData from '../../utils/hasData';

const NewClient = ({ ...props }) => {
  const { breadcrumbsPath, pageProps } = props;
  const [name, setName] = useState();
  const [legalName, setLegalName] = useState();
  const [email, setEmail] = useState();
  const [contactName, setContactName] = useState();
  const [telefone, setTelefone] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [nif, setNif] = useState();
  const [obs, setObs] = useState('');
  const [otherData, setOtherData] = useState('');
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Errors states
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageLegalName, setErrorMessageLegalName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageContact, setErrorMessageContact] = useState('');
  const [errorMessageTelefone, setErrorMessageTelefone] = useState('');
  const [errorMessageAddress, setErrorMessageAddress] = useState('');
  const [errorMessagePostalCode, setErrorMessagePostalCode] = useState('');
  const [errorMessageNif, setErrorMessageNif] = useState('');
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newestUser, setNewestUser] = useState();
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

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
      giveName: name,
      email,
      legalName,
      address,
      status: true,
      taxId: Number(nif),
      telephone: Number(telefone),
      buysTo: '1123',
      otherData,
      contact: contactName,
      postalCode,
      obs
    }

    try {
      await ClientService.saveClient(builtClient).then((response) => {
        if (!response.data.success) toast.error('Algo aconteceu')
        else {
          // success here
          setProcessing(false)
          setNewestUser(response.data.payload)
          setSuccessOpen(true)

        }
      })
    } catch (error) {
      if (!error.response.data.success && error.response.data.message === 'registo-ja-existe') {
        toast.warning('Um Cliente ja existe com este email');
        setProcessing(false)
      }
    }

    setProcessing(false)
  }

  const ClearFields = () => {
    setSuccessOpen(false)
    setName('');
    setLegalName('');
    setEmail('');
    setContactName('');
    setTelefone('');
    setAddress('');
    setPostalCode('');
    setNif('');
    setObs('');
    setOtherData('');
    setErrorMessageName();
    setErrorMessageLegalName();
    setErrorMessageEmail();
    setErrorMessageContact();
    setErrorMessageTelefone();
    setErrorMessageAddress();
    setErrorMessagePostalCode();
    setErrorMessageNif();

  };

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

  const Item = styled(Paper)(() => ({
    padding: '.5rem',
  }));

  return (
    <Grid component='main'>
      <CssBaseline />
      <Notification />

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
      {/* Situational Panels */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
        message='Está prestes a criar um novo cliente, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearFields()}
        onConfirm={() => Router.push(`${routes.private.internal.client}${newestUser.id}`)}
        message={`Cliente criado com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Cliente'
        cancelTxt='Criar novo Cliente'
      />
      {processing && <Loader center={true} backdrop />}

      <CustomBreadcrumbs path={breadcrumbsPath} />

      <Content>
        <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Typography item className='headerTitleXl'>Novo Cliente</Typography>
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
          <Grid item xs={12} md={4} bgcolor={"lightGray.main"} className={styles.clientContainer}>
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
      </Content>
    </Grid>
  );
};

NewClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  pageProps: PropTypes.any,

};

export default NewClient;
