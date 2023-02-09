/* eslint-disable react/prop-types */
//  Nodes
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Mui
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Grid, Paper, Typography
} from '@mui/material';

//  Styles
import styles from '../../../styles/SignIn.module.css';

//  Navigation

//  Dialogs
import Notification from '../../dialogs/Notification';
import ToastSet from '../../utils/ToastSet';

//  Custom components
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';

//  Lucide icons
import { XCircle } from 'lucide-react';

//  Utils
import EmailValidation from '../../utils/EmailValidation';

import { destroyCookie, setCookie } from 'nookies';
//  PropTypes
import Image from 'next/image';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as authActions from '../../../pages/api/actions/auth';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';

const SignIn = (props) => {
  const [visible, setVisible] = useState(true);

  const {
    client,
    login,
    me,
    loginSuccessRoute,
    loginSuccessRouteTerms,
    forgotPasswordRoute
  } = props;

  const [email, setEmail] = useState(Router.route === '/' ? 'geral@nka.pt' : 'bruno.barros@nka.pt');
  const [password, setPassword] = useState('ChangeMe');
  const [loading, setLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState();
  const [senhaErrors, setSenhaErrors] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowHeight] = useState();

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setWindowHeight(window.innerWidth);
    }, [window.innerWidth]);
  }

  const listenToResize = () => {
    setWindowHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', listenToResize);

    return () => window.removeEventListener('resize', listenToResize);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {
      email: '',
      password: ''
    };

    if (email === '') errors.email = 'Campo obrigatório';
    else if (!EmailValidation(email)) errors.email = 'Email mal estruturado';

    if (password === '') errors.password = 'Campo obrigatório';
    else if (password.length < 6) errors.password = 'Senha tem que ter minimo 6 caracteres';

    if (errors.password || errors.email) {
      setSenhaErrors(errors.password);
      setEmailErrors(errors.email);

      return;
    }

    setLoading(true);

    const loadingNotification = toast.loading('');

    await login({ email, password }).then(async (res) => {
      if (res.status !== 404) {
        res.data.token !== undefined && setCookie(undefined, 'auth_token', res.data.token);

        await me({ ...res?.data }).then((resultMe) => {
          const user = resultMe?.data[0];

          if (user.active?.value?.toLowerCase() === 'false') {
            ToastSet(loadingNotification, 'Conta Inativa', 'error');
            setDialogOpen(true);
            setLoading(false);
            destroyCookie(null, 'auth_token');
          } else {
            // Success
            ToastSet(loadingNotification, 'A entrar', 'success');
            setLoading(false);

            if (user.type === 'Owner' && user.tos?.value === 'False') router.push(loginSuccessRouteTerms);
            else router.push(loginSuccessRoute);
          }
        });
      } else {
        setLoading(false);

        if (!res.response?.data?.success && res.response?.data?.message === 'credenciais-invalidas') ToastSet(loadingNotification, 'Credenciais invalidas', 'error');
        else if (res.response?.data?.message === 'utilizador-inativo') ToastSet(loadingNotification, 'Conta Inativa', 'error');
        else ToastSet(loadingNotification, 'Algo Inesperado aconteceu, por favor tente mais tarde', 'error');
      }
    });
  };

  async function test () {
    const loadingNotification = toast.loading('');

    setLoading(true);

    await authActions.loginTest({ username: 'bruno', password: '59CAyKMHfSLAtBt9' }).then((res) => {
      ToastSet(loadingNotification, 'A entrar', 'success');

      if (res.response) {
        if (res.response.data.error_description === 'Invalid credentials given.') ToastSet(loadingNotification, 'Credenciais erradas.', 'error');
        else if (res.response.data.error_description === 'User inactive') {
          ToastSet(loadingNotification, 'Conta inativa.', 'error');
          setDialogOpen(true);
        } else ToastSet(loadingNotification, 'Algo Inesperado aconteceu, por favor tente mais tarde', 'error');
      }
    });

    setLoading(false);
  }

  async function test2 () {
    const axios = require('axios');

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://woodwork4.ddns.net/ww4/api/v1/owner/?options=keyValues',
      headers: {
        'Fiware-Service': 'woodwork40',
        Link: '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/context/ww4zero.context.jsonld>; type="application/ld+json"',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IkQxUXRFVXRXN2F4RUhWMWdBZkpNM1lrd3ROcVp3MSJ9.tgTd0o_-wlwbdk18phvrnTEdiQNvKqH2lYq1TFmFfxk'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle id='alert-dialog-title' sx={{ color: 'var(--primary)' }}>
          Conta Bloqueada
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box mb={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <XCircle size={80} color='var(--red)' />
          </Box>

          <DialogContentText id='alert-dialog-description'>
            Esta conta está bloqueada. Se não é suposto, por favor entre em  <a className='link' href={`mailto:${process.env.NEXT_PUBLIC_REPORT_EMAIL}`}>contacto</a> com o responsavel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        style={{ width: windowWidth > 600 ? '80px' : '50px', position: 'absolute', right: '25px', top: '25px' }}
      >
        <a
          target='#'
          href='http://mofreita.com/'
        >
          <Image
            width={windowWidth > 600 ? 80 : 50}
            alt='Company Logo'
            src={companyLogo}
            placeholder='blur'
          />
        </a>
      </Box>
      {windowWidth > 600 &&
        <Grid className={styles.sidePanel} item xs={0} sm={6} md={7}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div className={styles.logoImg}>
            </div>
          </Box>
        </Grid>
      }

      <Grid container item xs={12} sm={6} md={5}
        component={Paper}
        elevation={6}
        square
        fullHeight
      >
        <Box
          sx={{
            my: '20%',
            mx: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%'
          }}
        >
          <Typography variant='md' color={'primary'} sx={{ fontWeight: 600 }}>
            {client ? 'Portal Cliente WW4.0' : 'Portal Interno WW4.0'}
          </Typography>

          <Typography component='h1' variant='h2'>
            Login
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <MyInput
              id='email'
              label='Endereço de Email'
              onChange={(e) => {
                if (emailErrors) setEmailErrors('');

                setEmail(e.target.value);
              }
              }
              value={email}
              error={emailErrors}
              name='email'
            />
            <MyInput
              id='password'
              label='Senha'
              onChange={(e) => { setSenhaErrors(''); setPassword(e.target.value); }}
              value={password}
              error={senhaErrors}
              name='password'
              type={visible ? 'password' : 'text'}
              iconTooltip={visible && 'Mostrar Senha'}
              adornmentOnClick={() => setVisible(!visible)}
              adornmentIcon={visible ? <Visibility color={'primary'} /> : <VisibilityOff />} />
            <Grid container style={{ alignItems: 'center' }}>
              <Grid item xs>
                <a
                  onClick={() => Router.push(forgotPasswordRoute)}
                  className='link'
                >Esqueceu-se da sua senha?</a>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox name='remember' value={true} color='primary' />
                  }
                  label='Lembrar utilizador'
                />
              </Grid>
            </Grid>
            {client &&
            <Box display='flex'>
              <a
                target='#'
                onClick={() => Router.push(routes.private.tos)}
              > <Typography sx={{ cursor: 'pointer' }} color={'primary'}>Termos e Condições</Typography>  </a>
              <Typography pr={1}pl={1}> | </Typography>
              <a
                target='#'
                onClick={() => Router.push(routes.private.privacy)}
              >  <Typography sx={{ cursor: 'pointer' }} color={'primary'}>Política de Privacidade</Typography> </a>
            </Box>
            }
            <Button
              id='submit'
              onClick={(e) => handleSubmit(e)}
              type='submit'
              fullWidth
              variant='contained'
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading
                ? (
                  <CircularProgress size={25} sx={{ color: 'white' }} />
                )
                : (
                  'Entrar'
                )}
            </Button>
            <Button onClick={() => test()} >test</Button>
            <Button onClick={() => test2()} >test2</Button>

          </Box>
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default SignIn;
