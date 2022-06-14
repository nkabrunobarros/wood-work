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
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextareaAutosize,
} from '@mui/material';
import Router from 'next/router';

import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Loader from '../../loader/loader';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, client, detailPage, pageProps } = props;
  const [name, setName] = useState(client.nome);
  const [email, setEmail] = useState(client.email);
  const [contactName, setContactName] = useState(client.contactName);
  const [telemovel, setTelemovel] = useState(client.telemovel);

  const [address, setAddress] = useState(client.address);
  const [postalCode, setPostalCode] = useState(client.postalCode);
  const [nif, setNif] = useState(client.nif);
  const [obs, setObs] = useState(client.obs);
  const [otherData, setOtherData] = useState(client.otherData);

  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Snackbar Notification
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [backdrop, setBackdrop] = useState(false);

  function handleSave() {
    setDialogOpen(!dialogOpen);
  }
  function onConfirm() {
    setBackdrop(true);

    //  Snackbar notification body
    setSnackbarMessage('Dados alterados com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    //  Dialog Modal State
    setDialogOpen(false);

    setTimeout(() => {
      setSnackbarOpen(false);
      setBackdrop(false);
      Router.push(`${detailPage}${client.id}`);
    }, 2000);
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
        message={
          'Está prestes a alterar a informação do cliente, tem certeza que quer continuar?'
        }
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
            <a className='headerTitleXl'>{client.nome}</a>
          </div>
          <div style={{ display: 'flex' }}>
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
          </div>
        </div>
        <div className='flex'>
          <div style={{ flex: 1 }}>
            <a id='pad' className='lightTextSm'>
              <User
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              Dados Gerais
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
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='nome'
                  placeholder='Escrever nome'
                />
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                  placeholder='Escrever Email'
                />
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
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder='Escrever pessoa de contacto'
                />
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='telemovel'>Telemovel</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id='telemovel'
                  name='telemovel'
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                  autoComplete='telemovel'
                  placeholder='Escrever telemovel'
                />
              </div>
              <InputLabel htmlFor='email'>Observações</InputLabel>

              <TextareaAutosize
                placeholder='Escrever Texto'
                className={styles.textarea}
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </div>
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a id='align' className='lightTextSm'>
              <Edit2
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              Dados de Faturação
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
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Escrever morada'
              />
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
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder='Lorem Ipsum dolor sit'
              />
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
                onChange={(e) => setNif(e.target.value)}
                placeholder='Lorem Ipsum dolor sit'
              />
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
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
          </div>
        </div>
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
