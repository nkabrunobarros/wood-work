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

import { destroyCookie, setCookie } from 'nookies';
//  PropTypes
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import * as authActionsRedux from '../../../store/actions/auth';

const SignIn = (props) => {
  const [visible, setVisible] = useState(true);

  const {
    client,
    loginSuccessRoute,
    // loginSuccessRouteTerms,
    forgotPasswordRoute
  } = props;

  const [username, setUsername] = useState(Router.route === '/' ? 'Barros' : 'admin');
  // const [email, setEmail] = useState(Router.route === '/' ? 'geral@nka.pt' : 'bruno.barros@nka.pt');
  const [password, setPassword] = useState(Router.route === '/' ? 'ChangeMe' : 'zo5JhUY7xzgg5Jk');
  const [loading, setLoading] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState();
  // const [emailErrors, setEmailErrors] = useState();
  const [senhaErrors, setSenhaErrors] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowHeight] = useState();
  const dispatch = useDispatch();
  const loginRedux = (data) => dispatch(authActionsRedux.login(data));
  const me2 = (data) => dispatch(authActionsRedux.me(data));
  const userPermissionsSet = (data) => dispatch(authActionsRedux.userPermissionsSet(data));

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

    if (username === '') errors.email = 'Campo obrigatório';

    if (password === '') errors.password = 'Campo obrigatório';
    else if (password.length < 6) errors.password = 'Senha tem que ter minimo 6 caracteres';

    if (errors.password || errors.username) {
      setSenhaErrors(errors.password);
      setUsernameErrors(errors.username);

      return;
    }

    setLoading(true);

    const loadingNotification = toast.loading('');

    try {
      await loginRedux({ username, password }).then(async (res) => {
        setCookie(undefined, 'auth_token', res.data.access_token);

        await me2(res.data.access_token).then(async (res) => {
          const user = res?.data[0] || res?.data;
          let active;

          const permissions = [
            { idPerfil: '123456789', subject: 'workers', action: 'READ' },
            { idPerfil: '123456789', subject: 'workers', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'workers', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'dashboards', action: 'READ' },
            { idPerfil: '123456789', subject: 'factoryLevel', action: 'READ' },
            { idPerfil: '123456789', subject: 'assemblys', action: 'READ' },
            { idPerfil: '123456789', subject: 'leftovers', action: 'READ' },
            { idPerfil: '123456789', subject: 'ficheiros', action: 'READ' },
            { idPerfil: '123456789', subject: 'ficheiros', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'ficheiros', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'perfis', action: 'READ' },
            { idPerfil: '123456789', subject: 'perfis', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'perfis', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'messages', action: 'READ' },
            { idPerfil: '123456789', subject: 'messages', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'messages', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'profiles', action: 'READ' },
            { idPerfil: '123456789', subject: 'profiles', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'profiles', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'unidades', action: 'READ' },
            { idPerfil: '123456789', subject: 'unidades', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'unidades', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'conversaounidades', action: 'READ' },
            { idPerfil: '123456789', subject: 'conversaounidades', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'conversaounidades', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'moedas', action: 'READ' },
            { idPerfil: '123456789', subject: 'moedas', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'moedas', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'projects', action: 'READ' },
            { idPerfil: '123456789', subject: 'projects', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'projects', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'clients', action: 'READ' },
            { idPerfil: '123456789', subject: 'clients', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'clients', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'stocks', action: 'READ' },
            { idPerfil: '123456789', subject: 'stocks', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'stocks', action: 'DELETE' },
            { idPerfil: '123456789', subject: 'products', action: 'READ' },
            { idPerfil: '123456789', subject: 'products', action: 'WRITE' },
            { idPerfil: '123456789', subject: 'products', action: 'DELETE' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'profiles', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'unidades', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'conversaounidades', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'moedas', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'projects', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'stocks', action: 'READ' },
            { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'products', action: 'READ' },
          ];

          await userPermissionsSet({
            description: window.location.pathname.includes('/internal/') || window.location.pathname.includes('/signin') ? 'Admin' : 'Client',
            type: window.location.pathname.includes('/internal/') || window.location.pathname.includes('/signin') ? 'internal' : 'client',
            permissions,
            newPerms: res.data.orionPermissions,
          });

          if (user.type === 'Owner') active = user.active.value;
          else active = user.is_active;

          if (!active) {
            ToastSet(loadingNotification, 'Conta Inativa', 'error');
            setDialogOpen(true);
            setLoading(false);
            destroyCookie(null, 'auth_token');
          } else {
            // Success
            ToastSet(loadingNotification, 'A entrar', 'success');
            setLoading(false);
            // if (user.type === 'Owner' && user.tos?.value === 'False') router.push(loginSuccessRouteTerms);
            // else router.push(loginSuccessRoute);
            router.push(loginSuccessRoute);
          }
        }).catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);

      if (err.response.data.error_description === 'Invalid credentials given.') ToastSet(loadingNotification, 'Credenciais erradas.', 'error');
      else ToastSet(loadingNotification, 'Algo aconteceu. Por favor tente mais tarde', 'error');

      setLoading(false);
    }
  };

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
            {/* <MyInput
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
            /> */}
            <MyInput
              id='email'
              label='Nome de Utilizador'
              onChange={(e) => {
                if (usernameErrors) setUsernameErrors('');

                setUsername(e.target.value);
              }
              }
              value={username}
              error={usernameErrors}
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
                <Typography variant="sm" color="link.main">

                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => Router.push(forgotPasswordRoute)}
                  >Esqueceu-se da sua senha?</a>
                </Typography>
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
          </Box>
        </Box>
        <Footer isPublicPage={true}/>
      </Grid>
    </Grid>
  );
};

export default SignIn;
