/* eslint-disable no-return-assign */
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
  Box, ButtonGroup, Divider, Paper,
  Popover, Typography
} from '@mui/material';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import routes from '../../../navigation/routes';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import FormGenerator from '../../formGenerator';
import EmailValidation from '../../utils/EmailValidation';

const NewClient = ({ ...props }) => {
  const { breadcrumbsPath, pageProps,
    organizations,
    // profiles
  } = props;

  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  //  Errors states
  const [postalCodeInfo, setPostalCodeInfo] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);

  const [inputFields, setInputFields] = useState(
    [
      {
        id: 'legalName',
        label: 'legal Name',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'givenName',
        label: 'given Name',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'cellphone',
        label: 'Telemovel',
        value: '',
        error: '',
        type: 'phone',
        required: true,
        tooltip: ''
      },
      {
        id: 'telephone',
        label: 'Telefone',
        value: '',
        error: '',
        type: 'phone',
        required: true,
        tooltip: ''
      },
      {
        id: 'clientTypeInstitution',
        label: 'Tipo Instituição',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'taxId',
        label: 'taxId',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'hasOrganization',
        label: 'Organização',
        value: organizations[0].id,
        options: organizations,
        optLabel: 'legalName',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'postalCode',
        label: 'Codigo Postal',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'streetAddres',
        label: 'Rua',
        value: '',
        error: '',
        required: true,
        tooltip: ''
      },
      {
        id: 'addressCountry',
        label: 'País',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'addressRegion',
        label: 'Concelho',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'addressDistrict',
        label: 'Distrito',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'addressLocality',
        label: 'Localidade',
        value: '',
        error: '',
        required: true,
        disabled: true,
        tooltip: 'Prencha o Codigo Postal'
      },
      {
        id: 'ownerType',
        label: 'Tipo Cliente',
        value: 'owner',
        error: '',
        options: [
          { id: 'owner', label: 'Potential' },
          { id: 'buyer',label: 'Buyer' },
        ],
        required: true,
        tooltip: 'Isto ainda nao está aplicado no fireware.'
      },
      {
        id: 'password',
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
    function FillAddressFields() {
      const data = [...inputFields];

      postalCodeInfo && data.map( (field, i) => {
      if (field.id === 'postalCode'){ data[i].error = '';}

      if (field.id === 'addressCountry'){ data[i].value = 'Portugal';data[i].error = '';}

      if (field.id === 'addressDistrict') {data[i].value = postalCodeInfo.Distrito;data[i].error = '';}

      if (field.id === 'addressRegion') {data[i].value = postalCodeInfo.Concelho;data[i].error = '';}

      if (field.id === 'addressLocality' && typeof postalCodeInfo.Localidade !== 'object') {data[i].value = postalCodeInfo.Localidade;data[i].error = '';}
    });

    setInputFields(data);
    }

    FillAddressFields();
  },[postalCodeInfo]);

  function ValidateFields() {
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
      } else if (input.value.length !== 9 && input.type === 'phone' && input.required) {
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

  async function handleSave() {
    const builtClient = {
      id: `urn:ngsi-ld:Owner:${inputFields.find(ele => ele.id === 'legalName').value.replace(/ /g, '')}`,
      type: 'Owner',
      "@context": [
        "https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld",
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
      ]
    };


    inputFields.map((ele) => {
      builtClient[ele.id] = {};

      // if (ele.options) {
      if (false) {
        // builtWorker[ele.id].type = 'Relationship';
        // builtWorker[ele.id].object = ele.value;
      }
      else {
        if (ele.type === 'password') ele.value = 'ChangeMe';

        builtClient[ele.id].type = 'Property';
        builtClient[ele.id].value = ele.value;
      }
    });

    //  FIX: remove this when type is in fireware
    // delete builtClient.clientType;
    //  Build address

    builtClient.address = {};
    builtClient.address.type = 'Property';
    
    builtClient.address.value={
      streetAddres : builtClient.streetAddres.value,
      postalCode : builtClient.postalCode.value,
      addressLocality :builtClient.addressLocality.value,
      addressRegion : builtClient.addressRegion.value,
      addressCountry : builtClient.addressCountry.value
    };
    
    builtClient.addressDelivery = {};
    builtClient.addressDelivery.type = 'Property';
    builtClient.addressDelivery.value ={...builtClient.address};
    //  Remove extra props
    delete builtClient.streetAddres;
    delete builtClient.addressCountry;
    delete builtClient.addressRegion;
    delete builtClient.addressLocality;
    delete builtClient.addressDistrict;
    delete builtClient.postalCode;
    console.log(builtClient);

    try {
      await ClientActions.saveClient(builtClient)
        .then(() => setSuccessOpen(true))
        .catch((err) => {
          if (err.response.status === 409) toast.warning('Este Cliente já existe');
          else toast.error('Algo aconteceu. Por favor tente mais tarde.');
        });
    }
    catch (e) { console.log(e); }

    setDialogOpen(false);
  }

  const ClearFields = () => {

    const data = [...inputFields];

    data.map((ele) => ele.value = '');
    setInputFields(data);

    setTimeout(() => {
      setSuccessOpen(false);
    }, 500);
  };

  async function ValidatePostalCode(e) {
    //  e brings the postal code string
    if ( e === null && postalCodeInfo !== null) 
    {
      setPostalCodeInfo();

      const data = [...inputFields];

      postalCodeInfo && data.map( (field, i) => {
        if (field.id === 'addressCountry') data[i].value = '';

        if (field.id === 'addressDistrict') data[i].value = '';

        if (field.id === 'addressRegion') data[i].value = '';

        if (field.id === 'addressLocality') data[i].value = '';
      });

      setInputFields(data);

      return;
    }

    try {
      const res = await axios.get(`https://geoapi.pt/cp/${e}?json=1`);

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
                <Item> {typeof postalCodeInfo?.Localidade === 'object' ?
                  <>
                    {postalCodeInfo.Localidade.map((x, i) => <a key={i}>{x}<Divider /></a>)}
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
        onConfirm={() => handleSave()}
        message='Está prestes a criar um novo cliente, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearFields()}
        onConfirm={() => Router.push(`${routes.private.internal.clients}`)}
        message={`Cliente criado com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Cliente'
        cancelTxt='Criar novo Cliente'
      />
      {/* {processing && <Loader center={true} backdrop />} */}

      <CustomBreadcrumbs path={breadcrumbsPath} />

      <Content>
        <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Typography item className='headerTitleXl'>Novo Cliente</Typography>
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
    </Grid>
  );
};


export default NewClient;
