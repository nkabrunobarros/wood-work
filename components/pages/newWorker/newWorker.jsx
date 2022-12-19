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
  Box, Button, Checkbox, CircularProgress, FormControlLabel, Tooltip
} from '@mui/material';
import { Save, X } from 'lucide-react';
import Router from 'next/router';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import MyInput from '../../inputs/myInput';
import Select from '../../inputs/select';
import Loader from '../../loader/loader';
import EmailValidation from '../../utils/EmailValidation';

import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as WorkerActions from '../../../pages/api/actions/worker';
import Notification from '../../dialogs/Notification';
import PhoneInput from '../../inputs/phoneInput/PhoneInput';


const newWorker = ({ ...props }) => {
  const { breadcrumbsPath, countries, organizations } = props;
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cleaningInputs, setCleaningInputs] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);
  // const [newestWorker, setNewestWorker] = useState();

  // const shifts = [
  //   {
  //     label: 'Manhã',
  //     value: [1,2]
  //   },
  //   {
  //     label: 'Tarde',
  //     value: [2,3]
  //   },
  //   {
  //     label: 'Noite',
  //     value: [3,4]
  //   }
  // ];

  const functions = [
    {
      label:   'CNC', 
      value:   'CNC', 
    },
    {
      label: 'Nesting', 
      value: 'Nesting', 
    },
    {
      label: 'Manual Cut', 
      value: 'Manual Cut', 
    },
    {
      label: 'Assembly', 
      value: 'Assembly', 
    },
    {
      label: 'Manager', 
      value: 'Manager', 
    },
    {
      label: 'Designer', 
      value: 'Designer', 
    },
    {
      label: 'Budgeting', 
      value: 'Budgeting', 
    },
    {
      value: 'Warehouse',
      label:  'Warehouse'
    }
];

  const [inputFields, setInputFields] = useState([ 
    {
      id: 'givenName',
      label: 'Primeiro Nome',
      value: '',
      error: '',
      required: true
    },
    {
      id: 'familyName',
      label: 'Ultimo Nome',
      value: '',
      error: '',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      value: '',
      error: '',
      type: 'email',
      required: true
    },
    // {
    //   id: 'taxId',
    //   label: 'Tax Id',
    //   value: '',
    //   error: '',
    //   required: true,
    //   type: 'number'
    // },
    // {
    //   id: 'ssnId',
    //   label: 'Numero Segurança Social',
    //   value: '',
    //   error: '',
    //   required: false,
    //   type: 'number'
    // },
    {
      id: 'functionPerformed',
      label: 'Função',
      value: '',
      error: '',
      required: true,
      options: functions,
      optLabel: 'label',
      optValue: 'value'
    },
    // {
    //   id: 'workerShift',
    //   label: 'Turno',
    //   value: '',
    //   error: '',
    //   required: true,
    //   options: shifts,
    //   optLabel: 'label',
    //   optValue: 'value'
    // },
    // {
    //   id: 'hasOrganization',
    //   label: 'Organização',
    //   value: organizations[0].id,
    //   options: organizations,
    //   optLabel: 'legalName',
    //   error: '',
    //   required: true,
    //   tooltip: ''
    // },
    // {
    //   id: 'assemblyFor',
    //   label: 'Montagem',
    //   value: 'urn:ngsi-ld:Project:MC_MuebleTv_A',
    //   error: '',
    //   required: false
    // },
    // {
    //   id: 'cellphone',
    //   label: 'Telemovel',
    //   value: '',
    //   error: '',
    //   type: 'phone',
    //   required: false
    // },
    // {
    //   id: 'phone',
    //   label: 'Telephone',
    //   value: '',
    //   error: '',
    //   type: 'phone',
    //   required: false
    // },
    {
      id: 'password',
      label: 'Senha',
      value: '',
      error: '',
      type: 'password',
      required: true
    },
    // {
    //   id: 'obs',
    //   label: 'Observações',
    //   value: '',
    //   error: '',
    //   type: 'area',
    //   required: false
    // },

  ]
  );

  async function CreateWorker() {
    setDialogOpen(false);
    //  open success modal && success toast
    setProcessing(true);

    const builtWorker = {
      id: `urn:ngsi-ld:Worker:${Math.random() * 10000}`,
      type: 'Worker',
      active: {
        type : 'Property',
        value: 'True',
      },
      hasOrganization: {
        type: 'Relationship',
        object: organizations[0].id
      },
      "@context": [
        "https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld",
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
    };

    inputFields.map((ele) => {
      builtWorker[ele.id] = {};

      const a = false;

      // if (ele.options) {
      if (a) {
        // builtWorker[ele.id].type = 'Relationship';
        // builtWorker[ele.id].object = ele.value;
      }
      else {
        if (ele.type === 'password')  ele.value = 'ChangeMe';

        builtWorker[ele.id].type = 'Property';
        builtWorker[ele.id].value = ele.value;
        }
    }); 
    
    try {
      await WorkerActions.createWorker(builtWorker)
      .then(() => {
        // setSuccessOpen(true);
        Router.push(routes.private.internal.workers);
      })
      .catch((err) => {
        if (err.response.status === 409) toast.warning('Este utilizador já existe');
        else toast.error('Algo aconteceu. Por favor tente mais tarde.');
      });
    }
     catch (e) {
       console.log(e);
     }

    setProcessing(false);
  }

  const ClearFields = () => {
    setCleaningInputs(true);
    
    const data = [...inputFields];

    data.map((ele) => ele.value = '');
    setInputFields(data);

    setTimeout(() => {
      setCleaningInputs(false);
      setSuccessOpen(false);
    }, 500);
  };

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

      if (input.type === 'password') {
          if ( !generatePassword && input.value === '' ) {
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
      } else if (input.value.length < 9 && input.type === 'phone' && input.required) {
        data[i].error = 'Numero mal estruturado';
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

  return (
    <Grid component='main'>
      <CssBaseline />
      <Notification />
      {/* Situational Panels */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => CreateWorker()}
        message='Está prestes a criar um novo utlizador, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What to do after Create Modal */}
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearFields()}
        onConfirm={() => Router.push(`${routes.private.internal.workers}`)}
        message={`Utilizador criado com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Utilizador'
        cancelTxt='Criar novo utilizador'
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
              onClick={ValidateFields}
            />
            <PrimaryBtn
              text='Cancelar'
              icon={<X strokeWidth='1' />}
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <Box>
          {/* Input Fields Generator */}
          <Grid container p={'12px'}>
            {inputFields.map((field, index) => {
              if (field.options) 
                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
                  <Select
                    name={field.id}
                    label={field.label}
                    required={field.required}
                    value={field.value}
                    error={field.error}
                    type={field.type && field.type}
                    onChange={(e) => handleFormChange(index, e)}
                    options={field.options}
                    optionValue={field.optValue}
                    optionLabel={field.optLabel}
                    placeholder={`Escrever ${field.label}`}
                  /> 
                </Grid>;

              if (field.type === 'phone' && field.required) 
                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
                <PhoneInput
                  name={field.id}
                  label={field.label}
                  options={countries}
                  required={field.required}
                  value={field.value}
                  placeholder={`Escrever ${field.label}`}
                  error={field.error}
                  onChange={(e) => handleFormChange(index, e)}
                />
                </Grid>;

              if (field.type === 'password' && field.required) 
                return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}> 
                {generatePassword ? <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label="Enviar senha por email" />
                    :
                    <MyInput
                      label={
                        <Tooltip title='Trocar para enviar senha por email'>
                          <a className='link' onClick={() => setGeneratePassword(!generatePassword)} >Senha</a>
                        </Tooltip>
                      }
                        name={field.id}
                        required={field.required}
                        value={field.value}
                        error={field.error}
                        type={field.type}
                        placeholder={`Escrever ${field.label}`}
                        onChange={(e) => handleFormChange(index, e)}
                    />
                  }
                </Grid>;

              //  Default case regular text input 
              return <Grid key={index} md={3} sm={6} xs={12} container sx={{ paddingLeft: '.5rem',paddingRight: '.5rem'}}>
                <MyInput 
                  name={field.id}
                  label={field.label}
                  required={field.required}
                  value={field.value}
                  error={field.error}
                  type={field.type && field.type}
                  onChange={(e) => handleFormChange(index, e)}
                  placeholder={`Escrever ${field.label}`}
                  
                />
            </Grid>;
            })}
            <Grid container md={12} >
              <Button onClick={ClearFields} style={{ marginLeft: 'auto' }}>
                {cleaningInputs ? <CircularProgress size={26} /> : 'Limpar'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Content>
    </Grid>
  );
};


export default newWorker;
