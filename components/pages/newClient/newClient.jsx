/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes

import {
  Box, ButtonGroup, Card,
  Tooltip, Typography
} from '@mui/material';
import { Building2, ChevronLeft, Save, User, X } from 'lucide-react';
import Router from 'next/router';
import SwipeableViews from 'react-swipeable-views';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import * as clientsActionsRedux from '../../../store/actions/client';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import FormGenerator from '../../formGenerator';
import TabPanel from '../../tapPanel/TabPanel';
import EmailValidation from '../../utils/EmailValidation';

//  PropTypes
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const NewClient = ({ ...props }) => {
  const {
    breadcrumbsPath, pageProps
    // profiles
  } = props;

  const dispatch = useDispatch();
  const newClient = (data) => dispatch(clientsActionsRedux.newClient(data));
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Errors states
  const [generatePassword, setGeneratePassword] = useState(true);
  const [selectTypeInstituition, setSelectTypeInstituition] = useState();
  //  Step states
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const [inputFields, setInputFields] = useState(
    [
      // {
      //   id: 'user.username',
      //   label: 'Nome Utilizador',
      //   value: '',
      //   error: '',
      //   required: true,
      //   tooltip: 'Dado utilizado para login.',
      // },
      {
        id: 'user.first_name',
        label: 'Primeiro Nome',
        value: '',
        error: '',
        required: true,
        tooltip: '',
      },
      {
        id: 'user.last_name',
        label: 'Ultimo Nome',
        value: '',
        error: '',
        tooltip: ''
      },
      // {
      //   id: 'name',
      //   label: 'Nome',
      //   value: '',
      //   error: '',
      //   required: true,
      //   tooltip: ''
      // },
      {
        id: 'user.email',
        type: 'email',
        label: 'Email',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'isCompany',
        label: 'Email',
        value: selectTypeInstituition === 'empresa',
        error: '',
        required: true,
        tooltip: '',
        hidden: true,
      },
      // {
      //   id: 'telephone',
      //   label: 'Telefone',
      //   value: '',
      //   error: '',
      //   type: 'phone',
      //   required: true,
      //   tooltip: ''
      // },
      // {
      //   id: 'vat',
      //   label: 'Numero Identificação Fiscal (Nif)',
      //   value: '',
      //   error: '',
      //   required: false,
      //   tooltip: '',
      // },
      {
        id: 'address.streetAddress',
        label: 'Rua',
        value: '',
        error: '',
        required: true,
        tooltip: '',
        maxLength: 50
      },
      {
        id: 'address.postalCode',
        label: 'Codigo Postal',
        value: '',
        error: '',
        required: true,
        tooltip: '',
        maxLength: 15
      },
      {
        id: 'address.addressLocality',
        label: 'Localidade',
        value: '',
        error: '',
        required: true,
        maxLength: 25,
      },
      {
        id: 'address.addressRegion',
        label: 'Região',
        value: '',
        error: '',
        required: false,
        maxLength: 25,
      },
      {
        id: 'address.addressCountry',
        label: 'País',
        value: '',
        error: '',
        type: 'country',
        required: true,
      },
      {
        id: 'delivery_address.streetAddress',
        label: 'Rua de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: '',
        maxLength: 50

      },
      {
        id: 'delivery_address.postalCode',
        label: 'Codigo Postal de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: '',
        maxLength: 15

      },
      {
        id: 'delivery_address.addressLocality',
        label: 'Localidade de Entrega',
        value: '',
        error: '',
        required: true,
        maxLength: 25

      },
      {
        id: 'delivery_address.addressRegion',
        label: 'Região de Entrega',
        value: '',
        error: '',
        required: false,
        maxLength: 25

      },
      {
        id: 'delivery_address.addressCountry',
        label: 'País de Entrega',
        value: '',
        error: '',
        required: true,
        type: 'country',
      },
      {
        id: 'ownerType',
        label: 'Tipo Cliente',
        value: 'owner',
        error: '',
        options: [
          { id: 'owner', label: 'Potential' },
          { id: 'buyer', label: 'Buyer' },
        ],
        hidden: true,
        required: true,
        tooltip: 'Isto ainda nao está aplicado no fireware.'
      },
      // {
      //   id: 'user.password',
      //   label: 'Senha',
      //   value: 'ChangeMe',
      //   error: '',
      //   type: 'password',
      //   required: true,
      //   tooltip: 'Trocar para senha autogerada',
      //   hidden: true,
      // },
    ]
  );

  function ValidateFields () {
    let hasErrors = false;

    inputFields.map((input, i) => {
      const data = [...inputFields];

      if (input.type === 'password') {
        if (!generatePassword && input.value === '') {
          data[i].error = 'Campo Óbrigatorio';
          hasErrors = true;
        }
      } else if (input.required && input.value === '') {
        data[i].error = 'Campo Óbrigatorio';
        hasErrors = true;
        // Case it reaches here, validates specifiq fields and value structure
      } else if (input.required && input.id === 'email' && !EmailValidation(input.value)) {
        data[i].error = 'Email mal estruturado';
        hasErrors = true;
      } else if (String(input.value).replace(/ /g, '').length !== 9 && input.type === 'phone' && input.required) {
        data[i].error = 'Número mal estruturado';
        hasErrors = true;
      } else data[i].error = '';

      setInputFields(data);
    });

    if (hasErrors) {
      toast.error('Preencha todos os campos.');

      return true;
    }

    setDialogOpen(true);
  }

  async function handleSave () {
    const loading = toast.loading('');
    const qs = require('qs');

    const builtClient2 = {
      active: false,
      tos: false,
    };

    inputFields.map((ele) => {
      if (ele.type === 'password') ele.value = 'ChangeMe';

      if (ele.value !== '') {
        builtClient2[ele.id] = {};
        builtClient2[ele.id] = ele.value;
      }
    });

    builtClient2['user.username'] = builtClient2['user.email'];
    builtClient2.country = builtClient2['address.addressCountry'];
    // builtClient2['user.password_confirm'] = builtClient2['user.password'];

    const data = qs.stringify({ ...builtClient2 });

    await newClient(data).then(() => {
      ClearFields();
      ToastSet(loading, 'Cliente Criado!', 'success');
    })
      .catch((err) => { onError(err, loading); });

    setDialogOpen(false);
  }

  function onError (error, loading) {
    const errorKeys = Object.keys(error.response.data);

    const updatedFields = inputFields.map((field) => {
      const [key, subKey] = field.id.split('.');

      if (errorKeys.includes(key)) {
        if (subKey && error.response.data[key][subKey]) {
          switch (error.response.data[key][subKey][0]) {
          case 'A user with that username already exists.':
            return { ...field, error: 'Já existe um utilizador com este Nome de Utilizador.' };
          case 'User with this email address already exists.':
            return { ...field, error: 'Já existe um utilizador com este Email.' };
          case 'This field is required.':
            return { ...field, error: 'Campo Obrigatório.' };
          case 'Ensure this field has no more than 15 characters.':
            return { ...field, error: 'Tamanho máximo de 15 caracteres.' };
          case 'Ensure this field has no more than 50 characters.':
            return { ...field, error: 'Tamanho máximo de 50 caracteres.' };
          case '[\'Zip codes must be in the format XYYY-YYY (where X is a digit between 1 and 9 and Y is any other digit).\']':
            return { ...field, error: 'Mal formatado.' };
          case 'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.':
            return { ...field, error: 'Só pode conter letras, números e @/./+/-/_' };
          default:
            return { ...field, error: error.response.data[key][subKey][0] };
          }
        } else if (!subKey && error.response.data[key]) {
          switch (error.response.data[key][0]) {
          case 'The vat number already exists.':
            return { ...field, error: 'Já existe um utilizador com este número.' };
          case 'Invalid tax ID':
            return { ...field, error: 'Número inválido' };
          default:
            return { ...field, error: error.response.data[key][0] };
          }
        }
      }

      return field;
    });

    setInputFields(updatedFields);

    if (error.response.status === 400) {
      ToastSet(loading, 'Erros no formulário.', 'warning');
    } else {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }
  }

  const ClearFields = () => {
    const data = [...inputFields];

    data.map((ele) => ele.value = '');
    setInputFields(data);
  };

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i].value = e.target.value;
    data[i].error = '';
    setInputFields(data);
  };

  //  Handle tipeClient step
  const handleStepChange = (index) => {
    setActiveStep(index);
  };

  const panelProps = {
    sx: {
      width: '100%',
      backgroundColor: 'var(--primary)',
      color: 'white',
      minHeight: '60vh'
    },
    className: 'fullCenter hoverOpacity link',
  };

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <Notification />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        {/* Situational Panels */}
        <ConfirmDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={() => handleSave()}
          message='Está prestes a criar um novo cliente, tem certeza que quer continuar?'
          icon='AlertOctagon'
        />

        <SwipeableViews
          axis={theme?.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          <TabPanel value={activeStep} index={0}>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container md={6} sm={6} xs={12} pt={'2rem'} pl={'2rem'} pr={'2rem'}>
                <Card
                  {...panelProps}
                  onClick={() => {
                    setSelectTypeInstituition('particular');
                    setActiveStep(1);
                  }}
                >
                  <User size={100} strokeWidth={1} color='white' />
                  <Typography variant='title' color='white'>Particular</Typography>
                </Card>
              </Grid>
              <Grid container md={6} sm={6} xs={12} pt={'2rem'} pl={'2rem'} pr={'2rem'} >
                <Card
                  onClick={() => {
                    setSelectTypeInstituition('empresa');
                    setActiveStep(1);
                  }}
                  {...panelProps}
                >
                  <Building2 size={100} strokeWidth={1} color='white'/>
                  <Typography variant='title' color='white'>Empresa</Typography>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            {/* Case clientType is chosen */}
            <Content>{console.log()}
              <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
                <Typography variant='title'>Novo Cliente {selectTypeInstituition === 'empresa' ? ' Empresarial' : ' Particular'} </Typography>
                <Box sx={{ marginLeft: 'auto' }}>
                  <ButtonGroup>
                    <PrimaryBtn
                      text='Guardar'
                      icon={
                        <Save
                          strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                          size={pageProps?.globalVars?.iconSize}
                        />
                      }
                      onClick={ValidateFields}
                    />
                    <PrimaryBtn
                      text='Cancelar'
                      icon={
                        <X
                          strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                          size={pageProps?.globalVars?.iconSize}
                        />
                      }
                      light
                      onClick={() => Router.back()}
                    />
                  </ButtonGroup>
                </Box>
              </Box>
              <Grid container sx={{ padding: '24px' }}>
                <Tooltip title='Clique para voltar'>
                  <Typography variant='md' p={'8px'}>
                    <a id='align' className='link' onClick={() => setActiveStep(0)}> <ChevronLeft /> Voltar</a>
                  </Typography>
                </Tooltip>
                <FormGenerator
                  fields={inputFields}
                  onFormChange={handleFormChange}
                  optionalData={{
                    generatePassword,
                    setGeneratePassword,
                  }}
                />
              </Grid>
            </Content>
          </TabPanel>
        </SwipeableViews>
      </Grid>
      <Footer/>
    </>
  );
};

NewClient.propTypes = {
  pageProps: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  organizations: PropTypes.array,
};

export default NewClient;
