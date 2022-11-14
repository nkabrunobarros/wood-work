/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import * as ClientActions from '../../../pages/api/actions/client';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes

import {
  Box, Checkbox, FormControlLabel, InputLabel, Paper,
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
import styles from '../../../styles/NewOrder.module.css';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import MyInput from '../../inputs/myInput';
import PhoneInput from '../../inputs/phoneInput/PhoneInput';
import Select from '../../inputs/select';
import Loader from '../../loader/loader';
import EmailValidation from '../../utils/EmailValidation';

const NewClient = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, countries,
    // organizations,
    profiles } = props;

  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Errors states
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newestUser, setNewestUser] = useState();
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);

  const [inputFields, setInputFields] = useState(
    {
      name: {
        value: '',
        error: '',
        required: true
      },
      legalName: {
        value: '',
        error: '',
        required: true
      },
      email: {
        value: '',
        error: '',
        required: true
      },
      telephone: {
        value: '',
        error: '',
        required: true
      },
      cellphone: {
        value: '',
        error: '',
        required: true
      },
      contact: {
        value: '',
        error: '',
        required: true
      },
      obs: {
        value: '',
        error: '',
        required: false
      },
      address: {
        value: '',
        error: '',
        required: true
      },
      postalCode: {
        value: '',
        error: '',
        required: true
      },
      taxId: {
        value: '',
        error: '',
        required: true
      },
      otherData: {
        value: '',
        error: '',
        required: false
      },
      country: {
        value: '',
        error: '',
        required: true
      },
      profileId: {
        value: '',
        error: '',
        required: true
      },
      password: {
        value: '',
        error: '',
        required: false
      },
      buysTo: {
        value: '',
        error: '',
        required: false
      },
    }
  );


  function onInputChange(e) {
    const newfields = { ...inputFields };

    newfields[e.target.name].value = e.target.value;
    newfields[e.target.name].error = '';
    setInputFields(newfields);
  }


  function handleSave() {
    //  Get inputs property's and mapping each field
    const keys = Object.keys(inputFields);
    let errors = false;

    keys.map(key => {
      const newfields = { ...inputFields };

      if (inputFields[key].required && !inputFields[key].value) {
        //  Case input is empty

        console.log('error on ' + key);
        errors = true;
        newfields[key].error = 'Campo Obrigatório';
        setInputFields(newfields);
      } else if (key === 'email' && !EmailValidation(inputFields[key].value)) {
        newfields[key].error = 'Email invalido';
        errors = true;
      } else if ((key === 'cellphone' || key === 'telephone') && inputFields[key].value < 100000000) {
        newfields[key].error = 'Numero tem que ter 9 digitos';
        errors = true;
      } else if (key === 'postalCode' && !postalCodeInfo) {
        newfields[key].error = 'Codigo Postal Invalido';
        errors = true;
      }

      setInputFields(newfields);
      console.log(newfields);


    });

    if (!errors) setDialogOpen(!dialogOpen);
  }

  async function onConfirm() {
    setDialogOpen(false);
    setProcessing(true);

    const builtClient = {
      email: inputFields.email.value,
      idPerfil: inputFields.profileId.value,
      giveName: inputFields.name.value,
      legalName: inputFields.legalName.value,
      address: inputFields.address.value,
      contact: inputFields.contact.value,
      postalCode: inputFields.postalCode.value,
      password: inputFields.password.value || 'ChangeMe',
      buysTo: '1123', //
      // buysTo: inputFields.buysTo.value || null, //
      otherData: inputFields.otherData.value,
      obs: inputFields.obs.value,
      taxId: Number(inputFields.taxId.value),
      telephone: Number(inputFields.telephone.value),
      // cellphone: inputFields.telephone.value,
      paisCodigo: inputFields.country.value,
      tos: false,
      status: true,
      ativo: true,
    };

    console.log(builtClient);

    try {
      await ClientActions.saveClient(builtClient).then((response) => {
        console.log(response);

        if (!response.data.success) toast.error('Algo aconteceu');
        else {
          // success here
          setProcessing(false);
          setNewestUser(response.data.payload);
          setSuccessOpen(true);
        }
      });
    } catch (error) {
      if (!error.response.data.success && error.response.data.message === 'registo-ja-existe') {
        toast.warning('Um Cliente já existe com este email');
        setProcessing(false);
      }
    }

    setProcessing(false);
  }

  const ClearFields = () => {
    setSuccessOpen(false);

    setInputFields({
      name: {
        value: '',
        error: '',
        required: true
      },
      legalName: {
        value: '',
        error: '',
        required: true
      },
      email: {
        value: '',
        error: '',
        required: true
      },
      telephone: {
        value: '',
        error: '',
        required: true
      },
      cellphone: {
        value: '',
        error: '',
        required: true
      },
      contact: {
        value: '',
        error: '',
        required: true
      },
      obs: {
        value: '',
        error: '',
        required: false
      },
      address: {
        value: '',
        error: '',
        required: true
      },
      postalCode: {
        value: '',
        error: '',
        required: true
      },
      taxId: {
        value: '',
        error: '',
        required: true
      },
      otherData: {
        value: '',
        error: '',
        required: false
      },
      country: {
        value: '',
        error: '',
        required: true
      },
      profileId: {
        value: '',
        error: '',
        required: true
      },
      password: {
        value: '',
        error: '',
        required: false
      },
      buysTo: {
        value: '',
        error: '',
        required: false
      },
    });
  };

  useEffect(() => {
    async function PostalCodeInfo() {
      try {
        const res = await axios.get(`https://geoapi.pt/cp/${inputFields.postalCode.value}?json=1`);

        if (res.data) setPostalCodeInfo(res.data);

      } catch (error) {
        setPostalCodeInfo();
      }
    }

    PostalCodeInfo();

  }, [inputFields.postalCode.value]);

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
                    required={inputFields.name.required}

                    label={'Nome'}
                    name={'name'}
                    error={inputFields.name.error}
                    value={inputFields.name.value}
                    onChange={(e) => onInputChange(e)}
                    placeholder='Escrever nome'
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required={inputFields.legalName.required}
                    label={'Nome Legal'}
                    placeholder='Escrever Nome Legal'
                    name={'legalName'}
                    error={inputFields.legalName.error}
                    value={inputFields.legalName.value}
                    onChange={(e) => onInputChange(e)}
                  />

                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required={inputFields.email.required}
                    label={'Email'}
                    placeholder='Escrever email'
                    type='email'
                    name={'email'}
                    error={inputFields.email.error}
                    value={inputFields.email.value}
                    onChange={(e) => onInputChange(e)}
                  />

                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <Select
                    error={inputFields.profileId.error}
                    label={'Perfil'}
                    required={inputFields.profileId.required}
                    fullWidth
                    options={profiles}
                    optionValue={'id'}
                    optionLabel={"descricao"}
                    name={'profileId'}
                    value={inputFields.profileId.value}
                    onChange={(e) => onInputChange(e)}
                  />

                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <Select
                    error={inputFields.country.error}
                    label={'País'}
                    required={inputFields.country.required}
                    fullWidth
                    name='country'
                    options={countries}
                    optionValue={'codigo'}
                    optionLabel="descricao"
                    value={inputFields.country.value}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required={inputFields.contact.required}

                    label={'Pessoa de Contacto'}
                    placeholder='Escrever pessoa de contacto'
                    name={'contact'}
                    error={inputFields.contact.error}
                    value={inputFields.contact.value}
                    onChange={(e) => onInputChange(e)}
                  />

                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <MyInput
                    required={inputFields.telephone.required}
                    label={'Telefone'}
                    placeholder='Escrever numero de telefone'
                    name={'telephone'}
                    error={inputFields.telephone.error}
                    value={inputFields.telephone.value}
                    onChange={(e) => onInputChange(e)}
                    type='number'

                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  {/* <MyInput
                    required={inputFields.cellphone.required}
                    label={'Telemovel'}
                    placeholder='Escrever numero de telefone'
                    name={'cellphone'}
                    error={inputFields.cellphone.error}
                    value={inputFields.cellphone.value}
                    onChange={(e) => onInputChange(e)}
                    type='number'

                  /> */}
                  <PhoneInput
                    label='Telemovel'
                    required={inputFields.cellphone.required}
                    error={inputFields.cellphone.error}
                    options={countries}
                    name='cellphone'
                    value={inputFields.cellphone.value}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  <InputLabel htmlFor='email'>Observações</InputLabel>

                  <TextareaAutosize
                    required={inputFields.obs.required}
                    placeholder='Escrever observações'
                    className={styles.textarea}
                    name={'obs'}
                    error={inputFields.obs.error}
                    value={inputFields.obs.value}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                  {generatePassword ? <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label="Gerar Senha" />
                    :
                    <MyInput
                      label={
                        <Tooltip title='Trocar para senha autogerada'>
                          <a className='link' onClick={() => setGeneratePassword(!generatePassword)} >Senha</a>
                        </Tooltip>
                      }
                      required={inputFields.obs.required}
                      error={inputFields.obs.error}
                      value={inputFields.obs.value}
                      placeholder='Escrever Senha'
                      onChange={(e) => onInputChange(e)}
                    />
                  }
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
                  required={inputFields.telephone.required}

                  label={'Morada Fiscal'}
                  placeholder='Escrever Morada Fiscal'
                  name={'address'}
                  error={inputFields.address.error}
                  value={inputFields.address.value}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required={inputFields.telephone.required}

                  label={'Codigo Postal'}
                  placeholder='Escrever Codigo Postal'
                  name={'postalCode'}
                  value={inputFields.postalCode.value}
                  error={inputFields.postalCode.error}
                  onChange={(e) => onInputChange(e)}
                  adornmentIcon={!!postalCodeInfo &&
                    <Tooltip title='Detalhes Codigo Postal' >
                      <Info color="var(--primary)" strokeWidth={1} onClick={(event) => setAnchorEl(event.currentTarget)} />
                    </Tooltip>
                  }
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required={inputFields.telephone.required}
                  type='number'
                  label={'Número de Identificação Fiscal (Nif)'}
                  placeholder='Escrever Número de Identificação Fiscal'
                  name={'taxId'}
                  value={inputFields.taxId.value}
                  error={inputFields.taxId.error}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
              <Grid container item sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  required={inputFields.telephone.required}
                  label={'Outros Dados'}
                  placeholder='Escrever outros dados'
                  name={'otherData'}
                  value={inputFields.otherData.value}
                  error={inputFields.otherData.error}
                  onChange={(e) => onInputChange(e)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Grid>
  );
};


export default NewClient;
