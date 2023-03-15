/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes

import {
  Box, ButtonGroup, Card, Divider, Paper,
  Popover, Tooltip, Typography
} from '@mui/material';
import axios from 'axios';
import { Building2, ChevronLeft, Save, User, X } from 'lucide-react';
import Router from 'next/router';
import SwipeableViews from 'react-swipeable-views';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';
import routes from '../../../navigation/routes';
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
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);
  const [selectTypeInstituition, setSelectTypeInstituition] = useState();
  //  Step states
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const [inputFields, setInputFields] = useState(
    [
      {
        id: 'user.username',
        label: 'Nome Utilizador',
        value: '',
        error: '',
        required: true,
        tooltip: 'Dado utilizado para login.',
      },
      {
        id: 'user.first_name',
        label: 'Primeiro Nome',
        value: '',
        error: '',
        required: true,
        tooltip: ''
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
      {
        id: 'vat',
        label: 'Numero Identificação Fiscal (Nif)',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.streetAddress',
        label: 'Rua',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.postalCode',
        label: 'Codigo Postal',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.addressLocality',
        label: 'Localidade',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'address.addressRegion',
        label: 'Concelho',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },

      {
        id: 'address.addressCountry',
        label: 'País',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'delivery_address.streetAddress',
        label: 'Rua de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'delivery_address.postalCode',
        label: 'Codigo Postal de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'delivery_address.addressLocality',
        label: 'Localidade de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'delivery_address.addressRegion',
        label: 'Concelho de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
      },

      {
        id: 'delivery_address.addressCountry',
        label: 'País de Entrega',
        value: '',
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
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
      {
        id: 'user.password',
        label: 'Senha',
        value: '',
        error: '',
        type: 'password',
        required: true,
        tooltip: 'Trocar para senha autogerada'
      },
    ]
  );

  useEffect(() => {
    function FillAddressFields () {
      const data = [...inputFields];

      postalCodeInfo && data.map((field, i) => {
        if (field.id === 'address.postalCode') { data[i].error = ''; }

        if (field.id === 'address.addressCountry') { data[i].value = 'PT'; data[i].error = ''; }

        if (field.id === 'address.addressRegion') { data[i].value = postalCodeInfo.Concelho; data[i].error = ''; }

        if (field.id === 'address.addressLocality' && typeof postalCodeInfo.Localidade !== 'object') { data[i].value = postalCodeInfo.Localidade; data[i].error = ''; }

        if (field.id === 'delivery_address.postalCode') { data[i].error = ''; data[i].value = postalCodeInfo.CP; }

        if (field.id === 'delivery_address.addressCountry') { data[i].value = 'PT'; data[i].error = ''; }

        if (field.id === 'delivery_address.addressRegion') { data[i].value = postalCodeInfo.Concelho; data[i].error = ''; }

        if (field.id === 'delivery_address.addressLocality' && typeof postalCodeInfo.Localidade !== 'object') { data[i].value = postalCodeInfo.Localidade; data[i].error = ''; }
      });

      setInputFields(data);
    }

    FillAddressFields();
  }, [postalCodeInfo]);

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
      } else if (!postalCodeInfo && input.id === 'postalCode') {
        data[i].error = 'Codigo Postal Invalido';
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
    const qs = require('qs');

    const builtClient2 = {
      active: true,
      tos: false,
    };

    inputFields.map((ele) => {
      builtClient2[ele.id] = {};

      if (ele.type === 'password') ele.value = 'ChangeMe';

      builtClient2[ele.id] = ele.value;
    });

    builtClient2.country = builtClient2['address.addressCountry'];
    builtClient2['user.password_confirm'] = builtClient2['user.password'];

    const data = qs.stringify({ ...builtClient2 });

    await newClient(data).then(() => setSuccessOpen(true))
      .catch((err) => onError(err));

    setDialogOpen(false);
  }

  function onError (error) {
    const errorKeys = Object.keys(error.response.data);

    const updatedFields = inputFields.map((field) => {
      const [key, subKey] = field.id.split('.');

      if (errorKeys.includes(key) && error.response.data[key][subKey]) {
        switch (error.response.data[key][subKey][0]) {
        case 'A user with that username already exists.':
          return { ...field, error: 'Já existe um utilizador com este Nome de Utilizador.' };
        case 'User with this email address already exists.':
          return { ...field, error: 'Já existe um utilizador com este Email.' };
        case 'This field is required.':
          return { ...field, error: 'Campo Obrigatório.' };
        default:
          return { ...field, error: error.response.data[key][subKey][0] };
        }
      }

      return field;
    });

    setInputFields(updatedFields);

    if (error.response.status === 400) {
      toast.warning('Erros no formulário.');
    } else {
      toast.error('Algo aconteceu. Por favor tente mais tarde.');
    }
  }

  const ClearFields = () => {
    const data = [...inputFields];

    data.map((ele) => ele.value = '');
    setInputFields(data);

    setTimeout(() => {
      setSuccessOpen(false);
    }, 500);
  };

  async function ValidatePostalCode (props) {
    //  e brings the postal code string
    if (props === null && postalCodeInfo !== null) {
      setPostalCodeInfo();

      const data = [...inputFields];

      postalCodeInfo && data.map((field, i) => {
        if (field.id === 'addressCountry') data[i].value = '';

        if (field.id === 'addressRegion') data[i].value = '';

        if (field.id === 'addressLocality') data[i].value = '';
      });

      setInputFields(data);

      return;
    }

    try {
      const res = await axios.get(`https://geoapi.pt/cp/${props.value}?json=1`);

      if (res.data) setPostalCodeInfo(res.data);
    } catch (error) {
      // TODO: CATCH ERROR
      toast.warning('Codigo Postal Invalido');
    }
  }

  const Item = styled(Paper)(() => ({
    padding: '.5rem',
  }));

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
      {true && <Navbar />}
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <Notification />
        <CustomBreadcrumbs path={breadcrumbsPath} />
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
            <Grid container >
              <Grid container item >
                <Grid item xs={6} sx={{ padding: '.5rem' }}>
                  <Item>Distrito</Item>
                </Grid>
                <Grid item xs={6} sx={{ padding: '.5rem' }}>
                  <Item>{postalCodeInfo?.Distrito}</Item>
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6} sx={{ padding: '.5rem' }}>
                  <Item>Concelho</Item>
                </Grid>
                <Grid item xs={6} sx={{ padding: '.5rem' }}>
                  <Item>{postalCodeInfo?.Concelho}</Item>
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6} sx={{ padding: '.5rem' }}>
                  <Item>{typeof postalCodeInfo?.Localidade === 'object' ? 'Localidades' : 'Localidade'}</Item>
                </Grid>
                <Grid item xs={6} sx={{ maxHeight: '300px', overflow: 'scroll', padding: '.5rem' }}>
                  <Item> {typeof postalCodeInfo?.Localidade === 'object'
                    ? <>
                      {postalCodeInfo.Localidade.map((x, i) => <a key={i}>{x}<Divider /></a>)}
                    </>
                    : postalCodeInfo?.Localidade}</Item>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Popover>
        {/* Situational Panels */}
        <ConfirmDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={() => handleSave()}
          message='Está prestes a criar um novo cliente, tem certeza que quer continuar?'
          icon='AlertOctagon'
        />
        <ConfirmDialog
          open={successOpen}
          handleClose={() => ClearFields()}
          onConfirm={() => Router.push(`${routes.private.internal.clients}`)}
          message={'Cliente criado com sucesso, que deseja fazer a agora?'}
          icon='Verified'
          iconType='success'
          okTxt='Ver Cliente'
          cancelTxt='Criar novo Cliente'
        />
        <SwipeableViews
          axis={theme?.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
        >
          <TabPanel value={activeStep} index={0}>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container md={6} sm={6} xs={6} p={10}>
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
              <Grid container md={6} sm={6} xs={6} p={10} >
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
            <Content>
              <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
                <Typography item className='headerTitleXl'>Novo Cliente</Typography>
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
                    postalCodeInfo,
                    setGeneratePassword,
                    ValidatePostalCode
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
