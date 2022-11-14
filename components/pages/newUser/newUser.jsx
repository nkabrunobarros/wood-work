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
  Box, Checkbox, FormControlLabel, Tooltip
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


const NewUser = ({ ...props }) => {
  const { breadcrumbsPath, countries, profiles } = props;
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cleaningInputs, setCleaningInputs] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(true);
  const [newestUser, setNewestUser] = useState();

  const shifts = [
    {
      label: 'Morning',
      value: [1,2]
    },
    {
      label: 'Afternoon',
      value: [2,3]
    },
    {
      label: 'Night',
      value: [3,4]
    }
  ];

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
    {
      id: 'taxId',
      label: 'Tax Id',
      value: '',
      error: '',
      required: true,
      type: 'number'
    },
    {
      id: 'ssnId',
      label: 'Numero Segurança Social',
      value: '',
      error: '',
      required: true,
      type: 'number'
    },
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
    {
      id: 'workerShift',
      label: 'Turno',
      value: '',
      error: '',
      required: true,
      options: shifts,
      optLabel: 'label',
      optValue: 'value'
    },
    {
      id: 'hasOrganization',
      label: 'Organização',
      value: '',
      error: '',
      required: true
    },
    {
      id: 'assemblyFor',
      label: 'Montagem',
      value: 'urn:ngsi-ld:Project:MC_MuebleTv_A',
      error: '',
      required: false
    },
    {
      id: 'cellphone',
      label: 'Telemovel',
      value: '',
      error: '',
      type: 'phone',
      required: false
    },
    {
      id: 'phone',
      label: 'Telephone',
      value: '',
      error: '',
      type: 'phone',
      required: false
    },
    {
      id: 'password',
      label: 'Senha',
      value: '',
      error: '',
      type: 'password',
      required: true
    },
    {
      id: 'obs',
      label: 'Observações',
      value: '',
      error: '',
      type: 'area',
      required: false
    },

  ]
  );

  async function CreateUser() {
    setDialogOpen(false);
    //  open success modal && success toast
    setProcessing(true);

    const builtWorker = {
      id: 'urn:ngsi-ld:Worker:17',
      type: 'Worker',
      active: {
        type : 'Property',
        value: 'True'
      },
      "@context": [
        "https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld",
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
    };

    inputFields.map((ele) => {
      builtWorker[ele.id] = {};

      // if (ele.options) {
      if (false) {
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
      .then(() => setSuccessOpen(true))
      .catch((err) => {
        if (err.response.status === 409) toast.warning('Este Worker já existe');
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
        onConfirm={() => CreateUser()}
        message='Está prestes a criar um novo worker, tem certeza que quer continuar?'
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What to do after Create Modal */}
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearFields()}
        onConfirm={() => Router.push(`${routes.private.internal.user}${newestUser.id}`)}
        message={`Worker criado com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Worker'
        cancelTxt='Criar novo Worker'
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
                {generatePassword ? <FormControlLabel control={<Checkbox checked={generatePassword} onChange={() => setGeneratePassword(!generatePassword)} />} label="Gerar Senha" />
                    :
                    <MyInput
                      label={
                        <Tooltip title='Trocar para senha autogerada'>
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
          </Grid>
        </Box>
        {/* <div className='flex'>
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
                <PhoneInput
                  label='Telefone'
                  type='number'
                  error={errorMessageTelefone}
                  options={countries}
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    setErrorMessageTelefone('');
                  }}
                />
              </div>
              <div className='filterContainer4'>
                <PhoneInput
                  label='Telemovel'
                  type='number'
                  error={errorMessageTelemovel}
                  options={countries}
                  value={telemovel}
                  onChange={(e) => {
                    console.log(e.target.value);
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
                    setErrorMessagePerfil();
                    setPerfil(e.target.value);
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
                    setErrorMessagePais();
                    setPais(e.target.value);
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
        </div> */}
      </Content>
    </Grid>
  );
};


export default NewUser;
