/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
//  Nodes
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

//  Mui
import {
  Box, ButtonGroup, Grid, Paper, Popover, Typography, styled
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

//  FormGenerator
import FormGenerator from '../../formGenerator';

import { useDispatch } from 'react-redux';
import * as ClientsActionsRedux from '../../../store/actions/client';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, client } = props;
  // const [client, setClient] = useState(props.client);
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const processing = false;
  // const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const updateClient = (data) => dispatch(ClientsActionsRedux.updateClient(data));

  async function ValidatePostalCode (props) {
    const data = [...inputFields];

    //  e brings the postal code string
    if (props === null && postalCodeInfo !== null) {
      setPostalCodeInfo();

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

      if (res.data) {
        setPostalCodeInfo(res.data);
        data[props.index].error = '';
        setInputFields(data);
      }
    } catch (error) {
      // TODO: CATCH ERROR
      toast.warning('Codigo Postal Invalido');
      data[props.index].error = 'Codigo Postal Invalido';
      setInputFields(data);
    }
  }

  const [inputFields, setInputFields] = useState(
    [
      {
        id: 'user.first_name',
        label: 'Primeiro Nome',
        value: client.givenName.value,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'user.last_name',
        label: 'Ultimo Nome',
        value: client.familyName.value,
        error: '',
        tooltip: ''
      },
      {
        id: 'user.email',
        type: 'email',
        label: 'Email',
        value: client.email.value,
        error: '',
        disabled: true,
        required: true,
        tooltip: ''
      },
      {
        id: 'vat',
        label: 'Numero Identificação Fiscal (Nif)',
        value: client.vat.value,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.streetAddress',
        label: 'Rua',
        value: client.address.value.streetAddress,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.postalCode',
        label: 'Codigo Postal',
        value: client.address.value.postalCode,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'address.addressLocality',
        label: 'Localidade',
        value: client.address.value.addressLocality,
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'address.addressRegion',
        label: 'Concelho',
        value: client.address.value.addressRegion,
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'address.addressCountry',
        label: 'País',
        value: client.address.value.addressCountry,
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'delivery_address.streetAddress',
        label: 'Rua de Entrega',
        value: client.delivery_address.value.streetAddress,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'delivery_address.postalCode',
        label: 'Codigo Postal de Entrega',
        value: client.delivery_address.value.postalCode,
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'delivery_address.addressLocality',
        label: 'Localidade de Entrega',
        value: client.delivery_address.value.addressLocality,
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'delivery_address.addressRegion',
        label: 'Concelho de Entrega',
        value: client.delivery_address.value.addressRegion,
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'delivery_address.addressCountry',
        label: 'País de Entrega',
        value: client.delivery_address.value.addressCountry,
        error: '',
        required: true,
        tooltip: 'Prencha o Codigo Postal'
      },
    ]
  );

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i].value = e.target.value;
    data[i].error = '';
    setInputFields(data);
  };

  function ValidateFields () {
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
      } else if ((input.value?.length !== 11 && input.value?.length !== 9) && input.type === 'phone' && input.required) {
        data[i].error = 'Número mal estruturado';
        hasErrors = true;
      }

      setInputFields(data);
    });

    if (hasErrors) {
      toast.error('Prencha todos os campos.');

      return true;
    }

    setDialogOpen(true);
  }

  async function onConfirm () {
    const builtClient = {
      id: client?.id.replace('urn:ngsi-ld:Owner:', ''),
    };

    inputFields.map((ele) => {
      builtClient[ele.id] = {};

      const a = false;

      // if (ele.options) {
      if (a) {
        // builtWorker[ele.id].type = 'Relationship';
        // builtWorker[ele.id].object = ele.value;
      } else {
        if (ele.type === 'password') ele.value = 'ChangeMe';

        builtClient[ele.id] = ele.value;
      }
    });

    // builtClient.telephone.value = builtClient.telephone.value.replace(/ /g, '');

    builtClient.address = {
      streetAddress: builtClient['address.streetAddress'],
      postalCode: builtClient['address.postalCode'],
      addressLocality: builtClient['address.addressLocality'],
      addressRegion: builtClient['address.addressRegion'],
      addressCountry: builtClient['address.addressCountry'],
    };

    builtClient.delivery_address = {
      streetAddress: builtClient['delivery_address.streetAddress'],
      postalCode: builtClient['delivery_address.postalCode'],
      addressLocality: builtClient['delivery_address.addressLocality'],
      addressRegion: builtClient['delivery_address.addressRegion'],
      addressCountry: builtClient['delivery_address.addressCountry'],
    };

    //  Remove extra props
    delete builtClient['address.streetAddress'];
    delete builtClient['address.postalCode'];
    delete builtClient['address.addressLocality'];
    delete builtClient['address.addressRegion'];
    delete builtClient['address.addressCountry'];
    delete builtClient['delivery_address.streetAddress'];
    delete builtClient['delivery_address.postalCode'];
    delete builtClient['delivery_address.addressLocality'];
    delete builtClient['delivery_address.addressRegion'];
    delete builtClient['delivery_address.addressCountry'];

    const data = builtClient;

    try {
      await updateClient(data)
        .then((res) => {
          console.log(res);
          toast.success('Atualizado.');
          setDialogOpen(false);
        })
        .catch((err) => {
          if (err.response.status === 409) toast.warning('Este Cliente já existe');
          else toast.error('Algo aconteceu. Por favor tente mais tarde.');
        });
    } catch (e) { console.log(e); }
  }

  const Item = styled(Paper)(() => ({
    padding: '.5rem',
  }));

  return (
    <>
      {true && <Navbar />}
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
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
                  <Item> {typeof postalCodeInfo?.Localidade === 'object'
                    ? <>
                      {postalCodeInfo.Localidade.map((x, i) => <a key={i}>{x}<br></br></a>)}
                    </>
                    : postalCodeInfo?.Localidade}</Item>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Popover>
        {processing && <Loader center={true} backdrop />}
        <Content>
          <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
            <Typography item className='headerTitleXl'>{client.givenName.value}</Typography>
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
            <Grid item md={12} sm={12} xs={12} >

              <Grid item xs={12} md={6} sx={{ paddingRight: '.5rem' }}>
                <Typography id='align' item className='lightTextSm'>
                  <User
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
              Dados Gerais
                </Typography>
              </Grid>
              <FormGenerator
                perRow={3}
                fields={inputFields}
                onFormChange={handleFormChange}
                optionalData={{
                  postalCodeInfo,
                  ValidatePostalCode
                }}
              />
            </Grid>
            <Grid item md={4} sm={4} xs={12} sx={{ display: 'none' }} bgcolor={'lightGray.main'} className={styles.clientContainer}>

              <Grid container item sx={{ paddingRight: '.5rem', display: 'none' }}>
                <Typography id='align' className='lightTextSm'>
                  <Edit2
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                  Dados de Faturação
                </Typography>
              </Grid>

            </Grid>
          </Grid>

        </Content>
      </Grid>
      <Footer/>
    </>
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
