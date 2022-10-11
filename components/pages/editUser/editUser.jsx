//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Custom Components
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import MyInput from '../../inputs/myInput';
import Loader from '../../loader/loader';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Icons
import { Lock, Save, User, X } from 'lucide-react';

//  Material UI
import {
  Backdrop,
  Button,
  CircularProgress,
  InputLabel, OutlinedInput, TextareaAutosize
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Utlis
import EmailValidation from '../../utils/EmailValidation';
import hasData from '../../utils/hasData';

//  Navigation
import { toast } from 'react-toastify';
import * as UserActions from '../../../pages/api/actions/user';
import Notification from '../../dialogs/Notification';
import PhoneInput from '../../inputs/phoneInput/PhoneInput';
import Select from '../../inputs/select';

const EditUser = ({ ...props }) => {
  const { breadcrumbsPath, user, countries, profiles, pageProps } = props;
  const [name, setName] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [telefone, setTelefone] = useState(user.telefone);
  const [telemovel, setTelemovel] = useState(user.telemovel);
  const [pais, setPais] = useState(user.paisCodigo);
  const [morada, setMorada] = useState(user.morada);
  const [obs, setObs] = useState(user.obs);
  const [active, setActive] = useState(user.ativo);
  const [perfil, setPerfil] = useState(user.perfil.id);
  //  Errors states
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageTelefone, setErrorMessageTelefone] = useState('');
  const [errorMessageTelemovel, setErrorMessageTelemovel] = useState('');
  const [errorMessagePais, setErrorMessagePais] = useState('');
  const [errorMessageMorada, setErrorMessageMorada] = useState('');
  const [errorMessagePerfil, setErrorMessagePerfil] = useState('');
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Snackbar Notification
  const [backdrop, setBackdrop] = useState(false);
  const [cleaningInputs, setCleaningInputs] = useState(false);

  function handleSave() {
    if (!hasData(name)) setErrorMessageName('Campo Obrigatório');

    if (!hasData(email)) setErrorMessageEmail('Campo Obrigatório');
    else if (!EmailValidation(email)) setErrorMessageEmail('Email invalido');

    if (!hasData(telefone)) setErrorMessageTelefone('Campo Obrigatório');
    else if (telefone < 100000000)
      setErrorMessageTelefone('Numero tem que ter 9 digitos');

    if (!hasData(telemovel))
      setErrorMessageTelemovel('Campo Obrigatório');
    else if (telemovel < 100000000)
      setErrorMessageTelemovel('Numero tem que ter 9 digitos');

    if (!hasData(morada)) setErrorMessageMorada('Campo Obrigatório');

    if (!hasData(pais)) setErrorMessagePais('Campo Obrigatório');

    if (!hasData(perfil)) setErrorMessagePerfil('Campo Obrigatório');

    if (
      hasData(name) &&
      hasData(email) &&
      EmailValidation(email) &&
      hasData(telefone) &&
      hasData(telemovel) &&
      hasData(morada) &&
      hasData(pais) &&
      hasData(perfil)
    )
      setDialogOpen(!dialogOpen);
  }

  async function onConfirm() {
    setBackdrop(true);
    setDialogOpen(false);

    const newUser = {
      id: user.id,
      email,
      ativo: active,
      nome: name,
      telemovel,
      telefone,
      morada,
      paisCodigo: pais,
      idPerfil: 'cl8om6j3q0000b4fjz5manyk3',
      obs,
      tos: user.tos,
    }


    try {
      await UserActions.saveUser(newUser).then((res) => {
        console.log(res)
        setName(res.data.payload.nome)
        setActive(res.data.payload.ativo)
        setEmail(res.data.payload.email)
        setTelefone(res.data.payload.telefone)
        setTelemovel(res.data.payload.telemovel)
        // setPerfil(res.data.payload.idPerfil)
        setMorada(res.data.payload.morada)
        setPais(res.data.payload.paisCodigo)
        setObs(res.data.payload.obs)
        setBackdrop(false);
        toast.success('Utilizador Atualizado.')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const ClearFields = () => {
    setName(user.nome)
    setActive(user.ativo)
    setEmail(user.email)
    setTelefone(user.telefone)
    setTelemovel(user.telemovel)
    setPerfil(user.idPerfil)
    setMorada(user.morada)
    setPais(user.paisCodigo)
    setObs('');
    setErrorMessageName('');
    setErrorMessageEmail('');
    setErrorMessageTelefone('');
    setErrorMessageTelemovel('');
    setErrorMessagePerfil('');
    setErrorMessageMorada('');
    setErrorMessagePais('');

    setTimeout(() => {
      setCleaningInputs(false);
    }, 500);
  };

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Notification />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onConfirm()}
        message={`Está prestes a editar utilizador ${user.nome}, tem certeza que quer continuar?`}
      />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <Loader />
      </Backdrop>
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div id='align' style={{ flex: 1 }}>
            <a className='headerTitleXl'>{breadcrumbsPath[1].title} </a>
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
        <a id='align' className='lightTextSm' style={{ paddingLeft: '24px' }}>
          <User
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
            size={pageProps.globalVars.iconSize} />
          <span>Dados de Utilizador</span>
        </a>
        <div className='flex'>
          <div id='pad' style={{ flex: 2 }} className='filters'>
            <div className='filterContainer2'>
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
            </div>
            <div className='filterContainer2'>
              <MyInput
                disabled
                required
                label={'Email'}
                error={errorMessageEmail}
                placeholder='Escrever Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessageEmail('');
                }}
                type='email'
              />
            </div>
            <div className='filterContainer2'>
              <MyInput
                required
                label={'Telefone'}
                error={errorMessageTelefone}
                placeholder='Escrever numero de telefone'
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                  setErrorMessageTelefone('');
                }}
                type='number'
              />
              <PhoneInput
                required
                label={'Telefone'}
                error={errorMessageTelefone}
                placeholder='Escrever numero de telefone'
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                  setErrorMessageTelefone('');
                }}
                type='number'
                options={countries}

              />
            </div>
            <div className='filterContainer2'>
              {/* <MyInput
                required
                label={'Telemovel'}
                error={errorMessageTelemovel}
                placeholder='Escrever numero de telemovel'
                value={telemovel}
                onChange={(e) => {
                  setTelemovel(e.target.value);
                  setErrorMessageTelemovel('');
                }}
                type='number'
              /> */}
              <PhoneInput
                required
                label='Telemovel'
                type='number'
                options={countries}
                value={telemovel}
                onChange={(e) => {
                  console.log(e.target.value)
                  setTelemovel(e.target.value);
                  setErrorMessageTelemovel('');
                }}
              />
            </div>
            <div className='filterContainer2'>
              <Select
                label='Perfil'
                options={profiles}
                optionLabel='descricao'
                fullWidth
                value={perfil}
                onChange={(e) => {
                  setPerfil(e.target.value)
                  setErrorMessagePerfil('');
                }}
              />

              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessagePerfil ? `${errorMessagePerfil}` : null}
              </a>
            </div>
            <div className='filterContainer2'>

              <MyInput
                required
                label={'Morada'}
                error={errorMessageMorada}
                placeholder='Escrever morada'
                value={morada}
                onChange={(e) => {
                  setMorada(e.target.value);
                  setErrorMessageMorada('');
                }}
              />
              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessageMorada ? `${errorMessageMorada}` : null}
              </a>
            </div>
            <div className='filterContainer2'>
              <Select
                label='País'
                options={countries}
                value={pais}
                optionLabel='descricao'
                optionValue='codigo'
                onChange={(e) => setPais(e.target.value)}
              />

              <a style={{ color: 'var(--red)', fontSize: 'small' }}>
                {errorMessagePais ? `${errorMessagePais}` : null}
              </a>
            </div>
            <div className='filterContainer2'>
              <InputLabel htmlFor='email'>Observações</InputLabel>

              <TextareaAutosize
                placeholder='Escrever observações'
                className={styles.textarea}
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </div>
          </div>
          <div id='pad' style={{ flex: 1 }} bgcolor={"lightGray.main"} className={styles.clientContainer}>
            <a id='align' className='headerTitleSm'>
              <Lock
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              <span> Alterar Senha</span>
            </a>
            <div>
              <InputLabel htmlFor='email'>Senha Antiga</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='nome'
                name='nome'
                type='password'
                autoComplete='nome'
                placeholder='Escrever password * '
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>Senha Nova</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='nome'
                name='nome'
                type='password'
                autoComplete='nome'
                placeholder='Escrever password * '
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>Confirmar Senha Nova</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='nome'
                name='nome'
                type='password'
                autoComplete='nome'
                placeholder='Escrever password * '
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Button onClick={ClearFields} style={{ marginLeft: 'auto' }}>
            {cleaningInputs ? <CircularProgress size={26} /> : 'Restaurar'}
          </Button>
        </div>
      </Content>
    </Grid>
  );
};

EditUser.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  user: PropTypes.object,
  pageProps: PropTypes.any,
  profiles: PropTypes.arrayOf(PropTypes.object)
};

export default EditUser;
