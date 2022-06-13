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
import { Edit2, Save, User, X } from 'lucide-react';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextareaAutosize,
} from '@mui/material';
import Router from 'next/router';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Loader from '../../loader/loader';
import hasData from '../../utils/hasData';
import { EmailValidation } from '../../utils/EmailValidation';

const NewClient = ({ ...props }) => {
  const { breadcrumbsPath } = props;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contactName, setContactName] = useState();
  const [telemovel, setTelemovel] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [nif, setNif] = useState();
  const [obs, setObs] = useState();
  const [otherData, setOtherData] = useState();

  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Snackbar Notification
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [backdrop, setBackdrop] = useState(false);

  //  Errors states
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageContact, setErrorMessageContact] = useState('');
  const [errorMessageTelemovel, setErrorMessageTelemovel] = useState('');
  const [errorMessageAddress, setErrorMessageAddress] = useState('');
  const [errorMessagePostalCode, setErrorMessagePostalCode] = useState('');
  const [errorMessageNif, setErrorMessageNif] = useState('');

  const [cleaningInputs, setCleaningInputs] = useState(false);

  function handleSave() {
    if (!hasData(name)) setErrorMessageName('This field is required *');
    if (!hasData(email)) setErrorMessageEmail('This field is required *');
    else if (!EmailValidation(email)) setErrorMessageEmail('Email invalido *');
    if (!hasData(contactName))
      setErrorMessageContact('This field is required *');
    if (!hasData(telemovel))
      setErrorMessageTelemovel('This field is required *');
    else if (telemovel < 100000000)
      setErrorMessageTelemovel('Number has to have 9 digits');
    if (!hasData(address)) setErrorMessageAddress('This field is required *');
    if (!hasData(postalCode))
      setErrorMessagePostalCode('This field is required *');
    if (!hasData(nif)) setErrorMessageNif('This field is required *');

    if (
      hasData(name) &&
      hasData(email) &&
      EmailValidation(email) &&
      hasData(contactName) &&
      hasData(telemovel) &&
      hasData(address) &&
      hasData(postalCode) &&
      hasData(nif)
    )
      setDialogOpen(!dialogOpen);
  }

  function onConfirm() {
    setBackdrop(true);

    //  Snackbar notification body
    setSnackbarMessage('Novo cliente criado com sucesso');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    //  Dialog Modal State
    setDialogOpen(false);

    setTimeout(() => {
      setSnackbarOpen(false);
      setBackdrop(false);
    }, 2000);
  }
  const ClearFields = () => {
    setCleaningInputs(true);
    setName('');
    setEmail('');
    setContactName('');
    setTelemovel('');
    setAddress('');
    setPostalCode('');
    setNif('');
    setObs('');
    setOtherData('');
    
    setErrorMessageName();
    setErrorMessageEmail();
    setErrorMessageContact();
    setErrorMessageTelemovel();
    setErrorMessageAddress();
    setErrorMessagePostalCode();
    setErrorMessageNif();

    setTimeout(() => {
      setCleaningInputs(false);
    }, 500);
  };
  return (
    <Grid component='main'>
      {/* Situational Panels */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
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
      <CssBaseline />
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
              icon={<Save strokeWidth='1' />}
              onClick={handleSave}
            />
            <PrimaryBtn
              text='Cancelar'
              icon={<X strokeWidth='1' />}
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <div className='flex'>
          <div style={{ flex: 1 }}>
            <a id='pad' className='lightTextSm'>
              <User size={20} strokeWidth='1' /> Dados Gerais
            </a>
            <div id='pad' className='filters'>
              <div className='filterContainer2'>
                <InputLabel htmlFor='email'>Nome</InputLabel>
                <OutlinedInput
                  
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
              <div className='filterContainer2'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  type='email'
                  
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
              <div className='filterContainer2'>
                <InputLabel htmlFor='contact'>Pessoa de Contacto</InputLabel>
                <OutlinedInput
                  
                  required
                  fullWidth
                  id='contact'
                  name='contact'
                  autoComplete='contact'
                  value={contactName}
                  onChange={(e) => {
                    setContactName(e.target.value);
                    setErrorMessageContact('');
                  }}
                  placeholder='Escrever pessoa de contacto*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageContact ? `${errorMessageContact}` : null}
                </a>
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='telemovel'>Telemovel</InputLabel>
                <OutlinedInput
                  
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
                  placeholder='Escrever telemovel*'
                />
                <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                  {errorMessageTelemovel ? `${errorMessageTelemovel}` : null}
                </a>
              </div>
              <InputLabel htmlFor='email'>Observações</InputLabel>

              <TextareaAutosize
                placeholder='Escrever observações'
                className={styles.textarea}
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </div>
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a className='lightTextSm'>
              <Edit2 strokeWidth={1} size={20}  /> Dados de
              Faturação
            </a>
            <div>
              <InputLabel htmlFor='email'>Morada Fiscal</InputLabel>
              <OutlinedInput
                
                required
                fullWidth
                id='address'
                name='address'
                autoComplete='address'
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrorMessageAddress('');
                }}
                placeholder='Escrever morada*'
              />
              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessageAddress ? `${errorMessageAddress}` : null}
              </a>
            </div>
            <div>
              <InputLabel htmlFor='email'>Codigo Postal</InputLabel>
              <OutlinedInput
                
                required
                fullWidth
                id='postalCode'
                name='postalCode'
                autoComplete='postalCode'
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  setErrorMessagePostalCode('');
                }}
                placeholder='Escrever Codigo Postal*'
              />
              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessagePostalCode ? `${errorMessagePostalCode}` : null}
              </a>
            </div>
            <div>
              <InputLabel htmlFor='email'>
                Número de Indentificação Fiscal (Nif)
              </InputLabel>
              <OutlinedInput
                
                required
                fullWidth
                id='nif'
                name='nif'
                value={nif}
                autoComplete='nif'
                onChange={(e) => {
                  setNif(e.target.value);
                  setErrorMessageNif('');
                }}
                placeholder='Escrever Numero de identificação fiscal*'
              />
              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessageNif ? `${errorMessageNif}` : null}
              </a>
            </div>
            <div>
              <InputLabel htmlFor='email'>Outros Dados</InputLabel>
              <OutlinedInput
                
                required
                fullWidth
                id='otherData'
                name='otherData'
                autoComplete='otherData'
                value={otherData}
                onChange={(e) => setOtherData(e.target.value)}
                placeholder='Escrever outros dados'
              />
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
NewClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
};

export default NewClient;
