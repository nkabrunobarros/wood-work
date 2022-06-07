//  Nodes
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';

import styles from '../../../styles/NewOrder.module.css';
import { Box, Save, User, X } from 'lucide-react';
import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Router from 'next/router';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Loader from '../../loader/loader';
import hasData from '../../utils/hasData';
import { EmailValidation } from '../../utils/EmailValidation';
import routes from '../../../navigation/routes';

const NewUser = ({ ...props }) => {
  const { breadcrumbsPath, countries } = props;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [telemovel, setTelemovel] = useState();
  const [pais, setPais] = useState();
  const [cidade, setCidade] = useState();
  const [perfil, setPerfil] = useState();
  const [obs, setObs] = useState();

  //  Errors states
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageTelefone, setErrorMessageTelefone] = useState('');
  const [errorMessageTelemovel, setErrorMessageTelemovel] = useState('');
  const [errorMessagePais, setErrorMessagePais] = useState('');
  const [errorMessageCidade, setErrorMessageCidade] = useState('');
  const [errorMessagePerfil, setErrorMessagePerfil] = useState('');

  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Snackbar Notification
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [backdrop, setBackdrop] = useState(false);

  const [cleaningInputs, setCleaningInputs] = useState(false);

  const onCountryChange = (value) => {
    if (value === null) setPais('');
    else setPais(value.label);
  };
  function handleSave() {
    if (!hasData(name)) setErrorMessageName('This field is required *');
    if (!hasData(email)) setErrorMessageEmail('This field is required *');
    else if (!EmailValidation(email)) setErrorMessageEmail('Email invalido *');
    if (!hasData(telefone)) setErrorMessageTelefone('This field is required *');
    else if (telefone < 100000000)
      setErrorMessageTelefone('Number has to have 9 digits');
    if (!hasData(telemovel))
      setErrorMessageTelemovel('This field is required *');
    else if (telemovel < 100000000)
      setErrorMessageTelemovel('Number has to have 9 digits');
    if (!hasData(cidade)) setErrorMessageCidade('This field is required *');
    if (!hasData(pais)) setErrorMessagePais('This field is required *');
    if (!hasData(perfil)) setErrorMessagePerfil('This field is required *');

    if (
      hasData(name) &&
      hasData(email) &&
      EmailValidation(email) &&
      hasData(telefone) &&
      hasData(telemovel) &&
      hasData(cidade) &&
      hasData(pais) &&
      hasData(perfil)
    )
      setDialogOpen(!dialogOpen);
  }

  function onConfirm() {
    setBackdrop(true);

    //  Snackbar notification body
    setSnackbarMessage('message text');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    //  Dialog Modal State
    setDialogOpen(false);

    setTimeout(() => {
      setSnackbarOpen(false);
      setBackdrop(false);
      Router.push(routes.private.internal.users);
    }, 2000);
  }
  const ClearFields = () => {
    setCleaningInputs(true);
    setName('');
    setEmail('');
    setTelefone('');
    setTelemovel('');
    setPerfil('');
    setCidade('');
    setPais(null);
    setObs('');

    setErrorMessageName('');
    setErrorMessageEmail('');
    setErrorMessageTelefone('');
    setErrorMessageTelemovel('');
    setErrorMessagePerfil('');
    setErrorMessageCidade('');
    setErrorMessagePais('');

    setTimeout(() => {
      setCleaningInputs(false);
    }, 500);
  };
  return (
    <Grid component='main'>
      {/* Situational Panels */}
      <CssBaseline />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
        message='Está prestes a criar um novo utilizador, tem certeza que quer continuar?'
      />
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={snackbarOpen}
        onRequestClose={() => setSnackbarOpen(false)}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <Loader />
      </Backdrop>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div id='align' style={{ flex: 1 }}>
            <a className='headerTitleXl'>{breadcrumbsPath[1].title}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <PrimaryBtn
              text='Guardar'
              icon={<Save stroke-width='1' />}
              onClick={handleSave}
            />
            <PrimaryBtn
              text='Cancelar'
              icon={<X stroke-width='1' />}
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <div className='flex'>
          <div style={{ flex: 1 }}>
            <a id='pad' className='lightTextSm'>
              <User size={20} stroke-width='1' /> Dados de Utilizador
            </a>
            <div id='pad' className='filters'>
              <div className='filterContainer4'>
                <InputLabel htmlFor='email'>Nome</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='nome'
                  name='nome'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMessageName('');
                  }}
                  autoComplete='nome'
                  placeholder='Escrever nome* '
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageName ? `${errorMessageName}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  type='email'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessageEmail('');
                  }}
                  autoComplete='email'
                  placeholder='Escrever Email*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageEmail ? `${errorMessageEmail}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='contact'>Telefone</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='contact'
                  name='contact'
                  autoComplete='contact'
                  value={telefone}
                  type='number'
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setErrorMessageTelefone('');
                  }}
                  placeholder='Escrever numero de telefone*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageTelefone ? `${errorMessageTelefone}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='telemovel'>Telemovel</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='telemovel'
                  name='telemovel'
                  value={telemovel}
                  onChange={(e) => {
                    setTelemovel(e.target.value);
                    setErrorMessageTelemovel('');
                  }}
                  autoComplete='telemovel'
                  placeholder='Escrever numero de telemovel*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageTelemovel ? `${errorMessageTelemovel}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='Perfil'>Perfil de Utilizador</InputLabel>
                <Select
                  labelId='Perfil'
                  id='Perfil'
                  fullWidth
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                >
                  <MenuItem value={'Selecionar uma categoria'} disabled>
                    Selecionar uma categoria
                  </MenuItem>
                  <MenuItem value={'Interno'}>Interno</MenuItem>
                  <MenuItem value={'Cliente'}>Cliente</MenuItem>
                </Select>
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessagePerfil ? `${errorMessagePerfil}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='Cidade'>Cidade</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='Cidade'
                  name='Cidade'
                  value={cidade}
                  onChange={(e) => {
                    setCidade(e.target.value);
                    setErrorMessageCidade('');
                  }}
                  autoComplete='Cidade'
                  placeholder='Escrever Cidade*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageCidade ? `${errorMessageCidade}` : null}
                </a>
              </div>
              <div className='filterContainer4'>
                <InputLabel htmlFor='Pais'>País</InputLabel>
                <Autocomplete
                  id='country-select-demo'
                  fullWidth
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => onCountryChange(value)}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading='lazy'
                        width='20'
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=''
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Escrever um país'
                      value={pais}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessagePais ? `${errorMessagePais}` : null}
                </a>
              </div>

              <div className='filterContainer4'>
                <InputLabel htmlFor='email'>Observações</InputLabel>

                <TextareaAutosize
                  placeholder='Escrever observações'
                  className={styles.textarea}
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Button onClick={ClearFields} style={{ marginLeft: 'auto' }}>
            {cleaningInputs ? <CircularProgress size={26} /> : 'Limpar'}
          </Button>
        </div>
      </Content>
    </Grid>
  );
};
NewUser.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  countries: PropTypes.array,
};

export default NewUser;
