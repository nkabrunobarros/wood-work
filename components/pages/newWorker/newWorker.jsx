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
  Box, Button, CircularProgress
} from '@mui/material';
import { Save, X } from 'lucide-react';
import Router from 'next/router';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Loader from '../../loader/loader';
import EmailValidation from '../../utils/EmailValidation';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as WorkerActions from '../../../pages/api/actions/worker';
import * as workersActionsRedux from '../../../store/actions/worker';
import Notification from '../../dialogs/Notification';
import FormGenerator from '../../formGenerator';

export const functions = [
  {
    label: 'CNC',
    value: 'CNC',
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
    label: 'Warehouse'
  }
];

const newWorker = ({ ...props }) => {
  const { breadcrumbsPath, organizations } = props;
  //  Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cleaningInputs, setCleaningInputs] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [inputFields, setInputFields] = useState([
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
    {
      id: 'user.email',
      label: 'Email',
      value: '',
      error: '',
      type: 'email',
      required: true
    },
    // {
    //   id: 'functionPerformed',
    //   label: 'Função',
    //   value: '',
    //   error: '',
    //   required: true,
    //   options: permissions,
    //   optLabel: 'name',
    //   optValue: 'id'
    // },
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
      id: 'user.password',
      label: 'Senha',
      value: 'ChangeMe',
      error: '',
      type: 'password',
      required: true
    },
  ]
  );

  const dispatch = useDispatch();
  const newWorker = (data) => dispatch(workersActionsRedux.newWorker(data));

  async function CreateWorker () {
    //  open success modal && success toast
    setDialogOpen(false);
    setProcessing(true);

    const builtWorker = {
      active: true,
      performanceRole: 2,
    };

    inputFields.map((ele) => {
      builtWorker[ele.id] = ele.value;
    });

    builtWorker['user.password_confirm'] = builtWorker['user.password'];
    builtWorker.hasOrganization = builtWorker.hasOrganization.replace('urn:ngsi-ld:Organization:', '');

    const qs = require('qs');
    const data = qs.stringify({ ...builtWorker });

    await newWorker(data).then(() => setSuccessOpen(true)).catch((err) => onError(err));
    setProcessing(false);

    try {
      false && await WorkerActions.createWorker(builtWorker)
        .then(() => {
          Router.push(routes.private.internal.workers);
        })
        .catch((err) => {
          if (err.response.status === 409) toast.warning('Este utilizador já existe');
          else toast.error('Algo aconteceu. Por favor tente mais tarde.');
        });
    } catch (e) {
      console.log(e);
    }

    setProcessing(false);
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
    setCleaningInputs(true);

    setTimeout(() => {
      setCleaningInputs(false);
      setSuccessOpen(false);
      setInputFields(inputFields.map(input => ({ ...input, error: '', value: '' })));
    }, 500);
  };

  const handleFormChange = (i, e) => {
    setInputFields(prevInputFields => {
      const data = [...prevInputFields];

      data[i].value = e.target.value;
      data[i].error = '';

      return data;
    });
  };

  function ValidateFields () {
    let hasErrors = false;
    const data = [...inputFields];

    data.forEach((input) => {
      if (input.required && input.value === '') {
        input.error = 'Campo Obrigatório';
        hasErrors = true;
      } else if (
        input.required &&
        input.id === 'email' &&
        !EmailValidation(input.value)
      ) {
        input.error = 'Email mal estruturado';
        hasErrors = true;
      } else if (
        input.value.length < 9 &&
        input.type === 'phone' &&
        input.required
      ) {
        input.error = 'Número mal estruturado';
        hasErrors = true;
      } else {
        input.error = '';
      }
    });

    setInputFields(data);

    if (hasErrors) {
      toast.error('Preencha todos os campos.');

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
        message={'Utilizador criado com sucesso, que deseja fazer a agora?'}
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
            <FormGenerator
              perRow={3}
              fields={inputFields}
              onFormChange={handleFormChange}
            />
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
