/* eslint-disable array-callback-return */
//  Nodes
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//  Mui
import {
  // eslint-disable-next-line sort-imports
  Box, ButtonGroup, Grid, Paper, Popover, styled, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

//  Custom components
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Loader from '../../loader/loader';

//  PropTypes
import PropTypes from 'prop-types';

//  Icons
import { Edit2, Save, User, X } from 'lucide-react';
import Router from 'next/router';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Utils


//  FormGenerator
import FormGenerator from '../../formGenerator';

import * as ClientActions from '../../../pages/api/actions/client';

//   TODO: FIX CLIENTE SAVE FUNCTION
// TODO: 


const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, pageProps,organizations, client } = props;
  // const [client, setClient] = useState(props.client);
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const processing= false;
  // const [processing, setProcessing] = useState(false);

  const [inputFields, setInputFields] = useState(
    [
      {
        id: 'legalName',
        label: 'legal Name',
        value: client?.legalName?.value,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'givenName',
        label: 'given Name',
        value: client?.givenName?.value,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        value: client?.email?.value,
        error: '',
        required: true,
        disabled: true,
      },
      // {
      //   id: 'cellphone',
      //   label: 'Telemovel',
      //   value: client?.telephone?.value,
      //   error: '',
      //   type: 'phone',
      //   required: true,
      //   tooltip: ''
      // },
      {
        id: 'telephone',
        label: 'Telefone',
        value: client?.telephone?.value,
        error: '',
        type: 'phone',
        required: true,
        tooltip: ''
      },
      // {
      //   id: 'clientTypeInstitution',
      //   label: 'Tipo Instituição',
      //   // value: client?.clientTypeInstitution?.value,
      //   value: '',
      //   error: '',
      //   required: true,
      //   tooltip: ''
      // },

      {
        id: 'hasOrganization',
        label: 'Organização',
        value: organizations[0].id,
        // value: client?.hasOrganization?.value,
        options: organizations,
        optLabel: 'legalName',
        error: '',
        required: true,
        tooltip: ''
      },
    ]
  );

  const [inputFields2, setInputFields2] = useState([
    {
      id: 'taxId',
      label: 'taxId',
      value: client?.taxId?.value,
      error: '',
      required: true,
      tooltip: ''
    },
    {
      id: 'postalCode',
      label: 'Codigo Postal',
      value: client?.address.value.postalCode,
      error: '',
      required: true,
      tooltip: ''
    },
    {
      id: 'address',
      label: 'Morada Fiscal',
      value: client?.address?.value.postalCode,
      error: '',
      required: true,
      tooltip: ''
    },
    {
      id: 'obs',
      label: 'Observações',
      value: client?.obs?.value,
      type: 'area',
      error: '',
      required: false,
      tooltip: ''
    },
  ]);

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i].value = e.target.value;
    data[i].error = '';
    setInputFields(data);

  };

  const handleFormChange2 = (i, e) => {
    const data = [...inputFields2];

    data[i].value = e.target.value;
    data[i].error = '';
    setInputFields2(data);

  };

  useEffect(() => {

    async function PostalCodeInfo() {
      try {
        const res = await axios.get(`https://geoapi.pt/cp/${inputFields2.find(ele => ele.id === 'postalCode').value}?json=1`);


        if (res.data) setPostalCodeInfo(res.data);

      } catch (error) {
        setPostalCodeInfo();
      }
    }

    PostalCodeInfo();

  }, [inputFields2.find(ele => ele.id === 'postalCode')?.value]);

  function ValidateFields() {
    let hasErrors = false;

    inputFields.map((input, i) => {
      const data = [...inputFields];

      if (input.required && input.value === '') {
        data[i].error = 'Campo Óbrigatorio';
        hasErrors = true;
        // Case it reaches here, validates specifiq fields and value structure
      } else if (!postalCodeInfo && input.id === 'postalCode') {
        data[i].error = 'Codigo Postal Invalido';
        hasErrors = true;
      } else if (input.value?.length !== 9 && input.type === 'phone' && input.required) {
        data[i].error = 'Número mal estruturado';
        hasErrors = true;
      }

      setInputFields(data);
    });

    inputFields2.map((input, i) => {
      const data = [...inputFields2];

      if (input.required && input.value === '') {
        data[i].error = 'Campo Óbrigatorio';
        hasErrors = true;
        // Case it reaches here, validates specifiq fields and value structure
      } else if (!postalCodeInfo && input.id === 'postalCode') {
        data[i].error = 'Codigo Postal Invalido';
        hasErrors = true;
      } else if (input.value?.length !== 9 && input.type === 'phone' && input.required) {
        data[i].error = 'Número mal estruturado';
        hasErrors = true;
      }

      setInputFields2(data);
    });

    if (hasErrors) {
      toast.error('Prencha todos os campos.');

      return true;
    }

    setDialogOpen(true);
  }

  // function handleSave() {
  //   if (!hasData(name)) setErrorMessageName('Campo Obrigatório');

  //   if (!hasData(legalName)) setErrorMessageLegalName('Campo Obrigatório');

  //   if (!hasData(email)) setErrorMessageEmail('Campo Obrigatório');
  //   else if (!EmailValidation(email)) setErrorMessageEmail('Email invalido *');

  //   if (!hasData(contactName))
  //     setErrorMessageContact('Campo Obrigatório');

  //   if (!hasData(telefone))
  //     setErrorMessageTelefone('Campo Obrigatório');
  //   else if (telefone < 100000000)
  //     setErrorMessageTelefone('Number has to have 9 digits');

  //   if (!hasData(address)) setErrorMessageAddress('Campo Obrigatório');

  //   if (!hasData(postalCode)) setErrorMessagePostalCode('Campo Obrigatório');
  //   else if (!hasData(postalCodeInfo)) setErrorMessagePostalCode('Codigo Postal Invalido');

  //   if (!hasData(nif)) setErrorMessageNif('Campo Obrigatório');

  //   if (
  //     hasData(name) &&
  //     hasData(legalName) &&
  //     hasData(email) &&
  //     EmailValidation(email) &&
  //     hasData(contactName) &&
  //     hasData(telefone) &&
  //     hasData(address) &&
  //     hasData(postalCodeInfo) &&
  //     hasData(nif)
  //   )
  //     setDialogOpen(!dialogOpen);
  // }


  async function onConfirm() {

    const builtClient = {
      id: client.id,
      type: client.type,
    };

    inputFields.map((ele) => {
      builtClient[ele.id] = {};

      const a = false;

      // if (ele.options) {
      if (a) {
        // builtWorker[ele.id].type = 'Relationship';
        // builtWorker[ele.id].object = ele.value;
      }
      else {
        if (ele.type === 'password') ele.value = 'ChangeMe';

        builtClient[ele.id].type = 'Property';
        builtClient[ele.id].value = ele.value;
      }
    });

    inputFields2.map((ele) => {
      builtClient[ele.id] = {};

      const a = false;

      // if (ele.options) {
      if (a) {
        // builtWorker[ele.id].type = 'Relationship';
        // builtWorker[ele.id].object = ele.value;
      }
      else {
        if (ele.type === 'password') ele.value = 'ChangeMe';

        builtClient[ele.id].type = 'Property';
        builtClient[ele.id].value = ele.value;
      }
    });

    try {
      await ClientActions.updateClient(
        [builtClient]
      )
        .then(() => toast.success('Atualizado.'))
        .catch((err) => {
          if (err.response.status === 409) toast.warning('Este Cliente já existe');
          else toast.error('Algo aconteceu. Por favor tente mais tarde.');
        });
    }
    catch (e) { console.log(e); }

    


    // setDialogOpen(false);
    // setProcessing(true);

    // const builtClient = {
    //   id: client.id,
    //   giveName: name,
    //   email,
    //   legalName,
    //   address,
    //   status: client.status,
    //   taxId: Number(nif),
    //   telephone: Number(telefone),
    //   buysTo: client.buysTo,
    //   otherData,
    //   contact: contactName,
    //   postalCode,
    //   obs
    // };


    // try {
    //   await ClientService.saveClient(builtClient).then((response) => {
    //     if (response.data.success === false && response.data.message === 'registo-ja-existe') toast.warning('Um Cliente ja existe com este email');
    //     else if (!response.data.success) toast.error('Algo aconteceu');
    //     else {
    //       // success here
    //       setProcessing(false);
    //       setClient(response.data.payload);
    //       toast.success('Cliente Atualizado');

    //       setTimeout(() => {
    //         Router.push(`${detailPage}${response.data.payload.id}`);
    //       }, 500);
    //     }
    //   });
    // } catch (e) { }

  }

  const Item = styled(Paper)(() => ({
    padding: '.5rem',
  }));

  // function RestoreData() {

  //   toast.success('Dados Restaurados.');
  // }

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
            <ButtonGroup>
              <PrimaryBtn
                text='Guardar'
                icon={
                  <Save
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
                onClick={ValidateFields}
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
                </ButtonGroup>
          </Box>
        </Box>
        <Grid container sx={{ padding: '24px' }}>
          <Grid item md={8} sm={8} xs={12} >
            {/* <Grid container >
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
            </Grid> */}
            <Grid item xs={12} md={6} sx={{ paddingRight: '.5rem' }}>
              <Typography id='align' item className='lightTextSm'>
                <User
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSize}
              />  
              Dados Gerais
              </Typography>
            </Grid>
            <FormGenerator
            perRow={3}
            fields={inputFields}
            onFormChange={handleFormChange}
            optionalData={{
              postalCodeInfo
            }}
          />
          </Grid>
          <Grid item  md={4}  sm={4} xs={12} bgcolor={"lightGray.main"} className={styles.clientContainer}>
            {/* <Grid container>
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
                  label={'Número de Identificação Fiscal (Nif)'}
                  error={errorMessageNif}
                  placeholder='Escrever Número de Identificação Fiscal'
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
            </Grid> */}
            <Grid container item sx={{ paddingRight: '.5rem' }}>
                <Typography id='align' className='lightTextSm'>
                  <Edit2
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                  Dados de Faturação
                </Typography>
              </Grid>
            <FormGenerator
              perRow={1}
              fields={inputFields2}
              onFormChange={handleFormChange2}
              optionalData={{
                postalCodeInfo
              }}
          />
          </Grid>
        </Grid>
        {/* <Box sx={{ display: 'flex' }}>
          <Tooltip title='Restaurar Dados Originais'>
            <Button onClick={RestoreData} style={{ marginLeft: 'auto' }}>
              Restaurar
            </Button>
          </Tooltip>
        </Box> */}
      </Content>
    </Grid>
  );
};

EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  detailPage: PropTypes.string.isRequired,
  organizations: PropTypes.any,
  pageProps: PropTypes.any,
};

export default EditClient;
