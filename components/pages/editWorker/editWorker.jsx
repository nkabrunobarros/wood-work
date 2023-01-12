//  Nodes
import Router from 'next/router';
import React, { useState } from 'react';

//  Custom Components
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import MyInput from '../../inputs/myInput';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Icons
import { Lock, Save, User, X } from 'lucide-react';

//  Material UI
import {
  Box,
  Button,
  CircularProgress,
  InputLabel, OutlinedInput
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Utlis
import ToastSet from '../../utils/ToastSet';

//  Navigation
import * as WorkerActions from '../../../pages/api/actions/worker';
import Notification from '../../dialogs/Notification';
// import PhoneInput from '../../inputs/phoneInput/PhoneInput';
import { toast } from 'react-toastify';
import MySelect from '../../inputs/select';
import { functions } from '../newWorker/newWorker';

const EditUser = ({ ...props }) => {
  const { breadcrumbsPath, pageProps } = props;

  const [user, setUser] = useState({
    name: { value: props.user?.name?.value, error: '' },
    email: { value: props.user?.email?.value, error: '' },
    functionPerformed: { value: props.user?.functionPerformed?.value, error: '' },
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

    const builtWorker = [{
      id: props.user.id,
      type: 'Worker',
      name: { type: 'Property', value: user.name.value },
      functionPerformed: { type: 'Property', value: user.functionPerformed.value },
      '@context': [
        'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.keyValue.jsonld',
        'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
      ]
    }];

    await WorkerActions.updateWorker(builtWorker)
      .then(() => ToastSet(loading, 'Utilizador atualizado.', 'success'))
      .catch(() => ToastSet(loading, 'Atualização falhou.', 'error'));
  }

  const ClearFields = () => {
    setTimeout(() => {
      setCleaningInputs(false);
    }, 500);
  };

  // const shifts = [
  //   {
  //     label: 'Manhã',
  //     value: [1, 2]
  //   },
  //   {
  //     label: 'Tarde',
  //     value: [2, 3]
  //   },
  //   {
  //     label: 'Noite',
  //     value: [3, 4]
  //   }
  // ];

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
            <PrimaryBtn
              text='Guardar'
              icon={
                <Save
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              onClick={Validate}
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
          </Box>
        </Box>
        <a id='align' className='lightTextSm' style={{ paddingLeft: '24px' }}>
          <User
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
            size={pageProps.globalVars.iconSize} />
          <span>Dados de Utilizador</span>
        </a>
        <Grid id='pad' container md={12} sm={12} xs={12}>
          <Grid container md={8} sm={8} xs={12}>
            <Grid container md={6} sm={6} xs={12} p={0.5}><MyInput label='Nome' name='name' onChange={(e) => onFieldChange(e)} value={user?.name?.value} error={user?.name?.error} /></Grid>
            <Grid container md={6} sm={6} xs={12} p={0.5}><MyInput label='Email' name='email' onChange={(e) => onFieldChange(e)} value={user?.email?.value} error={user?.email?.error} disabled/></Grid>
            <Grid container md={6} sm={6} xs={12} p={0.5}><MySelect label='Função' name='functionPerformed' onChange={(e) => onFieldChange(e)} value={user?.functionPerformed?.value} error={user?.functionPerformed?.error} options={functions} optionLabel='label' optionValue={'value'} /></Grid>
            {/* <Grid container md={6} sm={6} xs={12} p={0.5}><PhoneInput label='Telemovel' name='cellphone' onChange={(e) => onFieldChange(e)} value={user?.cellphone?.value} error={user?.cellphone?.error} /></Grid> */}
          </Grid>
          <Grid container md={4} sm={4} xs={12}>
            <Box id='pad' style={{ flex: 1 }} bgcolor={'lightGray.main'} className={styles.clientContainer}>
              <a id='align' className='headerTitleSm'>
                <Lock
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
                <span> Alterar Senha</span>
              </a>
              <Box>
                <InputLabel >Senha Antiga</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id='nome'
                  name='nome'
                  type='password'
                  autoComplete='nome'
                  placeholder='Escrever password * '
                />
              </Box>
              <Box>
                <InputLabel >Senha Nova</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id='nome'
                  name='nome'
                  type='password'
                  autoComplete='nome'
                  placeholder='Escrever password * '
                />
              </Box>
              <Box>
                <InputLabel >Confirmar Senha Nova</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  id='nome'
                  name='nome'
                  type='password'
                  autoComplete='nome'
                  placeholder='Escrever password * '
                />
              </Box>
            </Box>
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
