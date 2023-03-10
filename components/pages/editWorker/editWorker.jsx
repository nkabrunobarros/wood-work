//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Custom Components
import * as workersActionsRedux from '../../../store/actions/worker';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import MyInput from '../../inputs/myInput';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles

//  Icons
import { Save, User, X } from 'lucide-react';

//  Material UI
import {
  Box,
  Button,
  CircularProgress
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

const EditUser = ({ ...props }) => {
  const { breadcrumbsPath, pageProps } = props;
  const dispatch = useDispatch();
  const updateWorker = (data) => dispatch(workersActionsRedux.updateWorker(data));

  const [user, setUser] = useState({
    givenName: { value: props.user?.givenName?.value, error: '' },
    familyName: { value: props.user?.familyName?.value, error: '' },
    email: { value: props.user?.email?.value, error: '' },
    // functionPerformed: { value: props.user?.functionPerformed?.value, error: '' },
  });

  //  Snackbar Notification
  const [cleaningInputs, setCleaningInputs] = useState(false);

  function Validate () {
    const thisUser = { ...user };
    let errors = false;

    // eslint-disable-next-line array-callback-return
    Object.keys(thisUser).map(key => {
      if (thisUser[key].value === '' || thisUser[key].value === undefined) { thisUser[key].error = 'Campo obrigatorio'; errors = true; }
    });

    setUser(thisUser);
    !errors && handleUpdate();
  }

  async function handleUpdate () {
    const loading = toast.loading('');

    await updateWorker({
      id: props.user.id.replace('urn:ngsi-ld:Worker:', ''),
      givenName: user.givenName.value,
      familyName: user.familyName.value,
      email: user.email.value,
    })
      .then(() => ToastSet(loading, 'Utilizador atualizado.', 'success'))
      .catch(() => ToastSet(loading, 'Atualização falhou.', 'error'));
  }

  const ClearFields = () => {
    setTimeout(() => {
      setCleaningInputs(false);
    }, 500);
  };

  function onFieldChange ({ target }) {
    const user2 = { ...user };

    if (!user2[target.name])user2[target.name] = {};

    user2[target.name] = { value: target.value, error: '' };
    setUser(user2);
  }

  return (
    <Grid component='main'>
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
            {console.log(props)}
            <PrimaryBtn
              text='Guardar'
              icon={
                <Save
                  strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                  size={pageProps?.globalVars?.iconSize}
                />
              }
              onClick={Validate}
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
          <Grid container md={12} sm={12} xs={12}>{console.log(user)}
            <Grid container md={4} sm={6} xs={12} p={0.5}><MyInput label='Primeiro Nome' name='givenName' onChange={(e) => onFieldChange(e)} value={user?.givenName?.value} error={user?.givenName?.error} /></Grid>
            <Grid container md={4} sm={6} xs={12} p={0.5}><MyInput label='Ultimo Nome' name='familyName' onChange={(e) => onFieldChange(e)} value={user?.familyName?.value} error={user?.familyName?.error} /></Grid>
            <Grid container md={4} sm={6} xs={12} p={0.5}><MyInput label='Email' name='email' onChange={(e) => onFieldChange(e)} value={user?.email?.value} error={user?.email?.error} disabled/></Grid>
            {/* <Grid container md={4} sm={4} xs={12} p={0.5}><MySelect label='Função' name='functionPerformed' onChange={(e) => onFieldChange(e)} value={user?.functionPerformed?.value} error={user?.functionPerformed?.error} options={functions} optionLabel='label' optionValue={'value'} /></Grid> */}
          </Grid>
        </Grid>
        <Box style={{ display: 'flex' }}>
          <Button onClick={ClearFields} style={{ marginLeft: 'auto' }}>
            {cleaningInputs ? <CircularProgress size={26} /> : 'Restaurar'}
          </Button>
        </Box>
      </Content>
    </Grid>
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
