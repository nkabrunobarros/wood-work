//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Custom Components
import * as workersActionsRedux from '../../../store/actions/worker';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles

//  Icons
import { Save, User, X } from 'lucide-react';

//  Material UI
import {
  Box
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Utlis
import ToastSet from '../../utils/ToastSet';

//  Navigation
import Notification from '../../dialogs/Notification';
// import PhoneInput from '../../inputs/phoneInput/PhoneInput';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import FormGenerator from '../../formGenerator';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import EmailValidation from '../../utils/EmailValidation';

const EditUser = ({ ...props }) => {
  const { breadcrumbsPath, pageProps } = props;
  const dispatch = useDispatch();
  const updateWorker = (data) => dispatch(workersActionsRedux.updateWorker(data));

  const [inputFields, setInputFields] = useState([
    {
      id: 'user.first_name',
      label: 'Primeiro Nome',
      value: props.user.givenName.value,
      error: '',
      required: true,
      tooltip: ''
    },
    {
      id: 'user.last_name',
      label: 'Último Nome',
      value: props.user.familyName.value,
      error: '',
      tooltip: ''
    },
    {
      id: 'user.email',
      label: 'Email',
      value: props.user.email.value,
      error: '',
      type: 'email',
      required: true,
      disabled: true,
    },
  ]
  );

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
        input?.value?.length < 9 &&
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

    handleUpdate();
  }

  async function handleUpdate () {
    const loading = toast.loading('');
    const formData = new FormData();

    // eslint-disable-next-line array-callback-return
    inputFields.map((field) => {
      formData.append(field.id, field.value);
    });

    await updateWorker({ data: formData, id: props?.user?.id.replace('urn:ngsi-ld:Worker:', '') })
      .then(() => {
        ToastSet(loading, 'Utilizador atualizado!', 'success');
        Router.push(routes.private.internal.worker + props.user.id);
      })
      .catch(() => {
        ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
      });
  }

  const handleFormChange = (i, e) => {
    setInputFields(prevInputFields => {
      const data = [...prevInputFields];

      data[i].value = e.target.value;
      data[i].error = '';

      return data;
    });
  };

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Notification />
        <Content>
          <Box
            id='pad'
            className='flex'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Box id='align' style={{ flex: 1 }}>
              <a className='headerTitleXl'>{breadcrumbsPath[1].title} </a>
            </Box>
            <Box style={{ display: 'flex' }}>
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
            </Box>
          </Box>
          <a id='align' className='lightTextSm' style={{ paddingLeft: '24px' }}>
            <User
              strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
              size={pageProps?.globalVars?.iconSize} />
            <span>Dados de Utilizador</span>
          </a>
          <Grid id='pad' container md={12} sm={12} xs={12}>
            <FormGenerator
              perRow={3}
              fields={inputFields}
              onFormChange={handleFormChange}
            />
          </Grid>
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

EditUser.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  user: PropTypes.object,
  pageProps: PropTypes.any,
  profiles: PropTypes.arrayOf(PropTypes.object)
};

export default EditUser;
