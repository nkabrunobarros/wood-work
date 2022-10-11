//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputLabel, TextareaAutosize, Tooltip
} from '@mui/material';
import { Save, User, X } from 'lucide-react';
import Router from 'next/router';
import styles from '../../../styles/NewOrder.module.css';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import MyInput from '../../inputs/myInput';
import Select from '../../inputs/select';
import Loader from '../../loader/loader';
import EmailValidation from '../../utils/EmailValidation';
import hasData from '../../utils/hasData';

import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as UserActions from '../../../pages/api/actions/user';
import Notification from '../../dialogs/Notification';
import PhoneInput from '../../inputs/phoneInput/PhoneInput';


const NewUser = ({ ...props }) => {
  const { breadcrumbsPath, countries, profiles } = props;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [telemovel, setTelemovel] = useState();
  const [pais, setPais] = useState();
  const [cidade, setCidade] = useState();
  const [perfil, setPerfil] = useState();
  const [password, setPassword] = useState();
  const [obs, setObs] = useState('');
  //  Errors states
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageTelefone, setErrorMessageTelefone] = useState('');
  const [errorMessageTelemovel, setErrorMessageTelemovel] = useState('');
  const [errorMessagePais, setErrorMessagePais] = useState('');
  const [errorMessageCidade, setErrorMessageCidade] = useState('');
  const [errorMessagePerfil, setErrorMessagePerfil] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cleaningInputs, setCleaningInputs] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);
  const [newestUser, setNewestUser] = useState();

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

    if (!hasData(cidade)) setErrorMessageCidade('Campo Obrigatório');

    if (!hasData(pais) || pais === ' ') setErrorMessagePais('Campo Obrigatório');

    if (!hasData(perfil) || perfil === ' ') setErrorMessagePerfil('Campo Obrigatório');

    if (!hasData(password)) setErrorMessagePassword('Campo Obrigatório');
    else if (password.lenght < 6)
      setErrorMessagePassword('Senha tem que ter 6 caracteres');

    if (
      hasData(name) &&
      !!EmailValidation(email) &&
      hasData(telefone) &&
      hasData(telemovel) &&
      hasData(cidade) &&
      hasData(pais) &&
      hasData(perfil)
    )
      setDialogOpen(!dialogOpen);
  }

  async function CreateUser() {
    setDialogOpen(false)
    //  open success modal && success toast
    setProcessing(true)

    const newUser = {
      email,
      ativo: true,
      nome: name,
      telemovel,
      telefone,
      morada: cidade,
      paisCodigo: pais,
      idPerfil: perfil,
      password: generatePassword ? `${process.env.NEXT_PUBLIC_DEFAULT_PASS}` : password,
      tos: false,
      obs,
    }

    try {
      await UserActions.saveUser(newUser).then((response) => {
        if (response.data.success === false && response.data.message === 'registo-ja-existe') toast.warning('Um utilizador ja existe com este Email')
        else if (!response.data.success) toast.error('Algo aconteceu')
        else {
          // success here
          setNewestUser(response.data.payload)
          setProcessing(false)
          setSuccessOpen(true)

        }

      })
    } catch (error) {
      console.log(error)
    }

    setProcessing(false)

  }

  const ClearFields = () => {
    setCleaningInputs(true);
    setName('');
    setEmail('');
    setTelefone('');
    setTelemovel('');
    setPerfil('');
    setCidade('');
    setPais(" ");
    setPerfil(" ");
    setObs('');
    setErrorMessageName('');
    setErrorMessageEmail('');
    setErrorMessageTelefone('');
    setErrorMessageTelemovel('');
    setErrorMessagePerfil('');
    setErrorMessageCidade('');
    setErrorMessagePais('');
    setErrorMessagePassword('');

    setTimeout(() => {
      setCleaningInputs(false);
      setSuccessOpen(false);
    }, 500);
  };

  return (
    <Grid component='main'>
      <CssBaseline />
      <Notification />
      {/* Situational Panels */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => CreateUser()}
        message='Está prestes a criar um novo utilizador, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What to do after Create Modal */}
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearFields()}
        onConfirm={() => Router.push(`${routes.private.internal.user}${newestUser.id}`)}
        message={`Utilizador Criado com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Utilizador'
        cancelTxt='Criar novo Utilizador'
      />

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
              <User size={20} strokeWidth='1' /> Dados de Utilizador
            </a>
            <div id='pad' className='filters'>
              <div className='filterContainer4'>
                <MyInput
                  required
                  label='Nome'
                  value={name}
                  error={errorMessageName}
                  placeholder='Escrever Nome'
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMessageName('');
                  }}
                />
              </div>
              <div className='filterContainer4'>
                <MyInput
                  required
                  label='Email'
                  value={email}
                  error={errorMessageEmail}
                  placeholder='Escrever Email'
                  type='email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessageEmail('');
                  }}
                />
              </div>
              <div className='filterContainer4'>
                <MyInput
                  required
                  label='Telemovel'
                  value={telefone}
                  error={errorMessageTelefone}
                  placeholder='Escrever numero de telefone'
                  type='number'
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setErrorMessageTelefone('');
                  }}
                />
              </div>
              <div className='filterContainer4'>
                {/* <MyInput
                  required
                  label='Telemovel'
                  onChange={(e) => {
                    setTelemovel(e.target.value);
                    setErrorMessageTelemovel('');
                  }}
                  value={telemovel}
                  error={errorMessageTelemovel}
                  placeholder='Escrever numero de telemovel'
                /> */}
                <PhoneInput
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
              <div className='filterContainer4'>

                <Select
                  error={errorMessagePerfil}
                  label={'Perfil'}
                  required
                  fullWidth
                  options={profiles}
                  value={perfil}
                  optionLabel='descricao'
                  optionValue='id'
                  onChange={(e) => {
                    setErrorMessagePerfil()
                    setPerfil(e.target.value)
                  }}
                />
              </div>
              <div className='filterContainer4'>
                <MyInput
                  label='Cidade'
                  required
                  value={cidade}
                  error={errorMessageCidade}
                  placeholder='Escrever Cidade'
                  onChange={(e) => {
                    setCidade(e.target.value);
                    setErrorMessageCidade('');
                  }}
                />
              </div>
              <div className='filterContainer4'>
                <Select
                  error={errorMessagePais}
                  label={'País'}
                  required
                  fullWidth
                  options={countries}
                  optionValue={'codigo'}
                  optionLabel="descricao"
                  value={perfil}
                  onChange={(e) => {
                    setErrorMessagePais()
                    setPais(e.target.value)
                  }}
                />
              </div>
              <div className='filterContainer4'>
                {generatePassword ? <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label="Gerar Senha" />
                  :
                  <MyInput
                    label={<Tooltip title='Trocar para senha autogerada'>
                      <a className='link' onClick={() => setGeneratePassword(!generatePassword)} >Senha</a>
                    </Tooltip>}
                    required
                    value={password}
                    error={errorMessagePassword}
                    placeholder='Escrever Senha'
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessagePassword('');
                    }}
                  />
                }

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
  countries: PropTypes.arrayOf(PropTypes.object),
  profiles: PropTypes.arrayOf(PropTypes.object),
};

export default NewUser;
