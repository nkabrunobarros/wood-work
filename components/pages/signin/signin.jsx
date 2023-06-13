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
  CircularProgress, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Grid, Paper,
  Typography
} from '@mui/material';

//  Styles
import styles from '../../../styles/SignIn.module.css';

//  Dialogs
import Notification from '../../dialogs/Notification';
import ToastSet from '../../utils/ToastSet';

//  Custom components
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';

//  Lucide icons
import { XCircle } from 'lucide-react';

//  Utils

import { setCookie } from 'nookies';
//  PropTypes
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';

import * as authActionsRedux from '../../../store/actions/auth';
import RedirectTo from '../../utils/RedirectTo';

const SignIn = (props) => {
  const [visible, setVisible] = useState(true);

  const {
    client,
    forgotPasswordRoute
  } = props;

  const [username, setUsername] = useState(Router.route === '/' ? 'bruno.barros@nka.pt' : 'admin@email.com');
  // const [email, setEmail] = useState(Router.route === '/' ? 'geral@nka.pt' : 'bruno.barros@nka.pt');
  const [password, setPassword] = useState(Router.route === '/' ? 'ChangeMe1' : 'zo5JhUY7xzgg5Jk');
  const [loading, setLoading] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState();
  // const [emailErrors, setEmailErrors] = useState();
  const [senhaErrors, setSenhaErrors] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowHeight] = useState();
  const dispatch = useDispatch();
  const loginRedux = (data) => dispatch(authActionsRedux.login(data));
  const getMe = (data) => dispatch(authActionsRedux.me(data));
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
      // eslint-disable-next-line consistent-return
      await loginRedux({ username, password }).then(async (res) => {
        setLoading(false);

        if (res?.response?.status === 400) {
          if (res.response?.data?.error_description === 'Invalid credentials given.') return ToastSet(loadingNotification, 'Credenciais erradas.', 'error');

          return ToastSet(loadingNotification, 'Algo aconteceu. Por favor tente mais tarde', 'error');
        }

        // setCookie(undefined, 'auth_token_expireAt', res?.data?.expires_in);
        setCookie(undefined, 'auth_token', res?.data?.access_token);

        await getMe(res.data.access_token).then(async (res) => {
          const user = res?.data[0] || res?.data;

          await userPermissionsSet({
            description: user.role,
            type: user.role !== 'CUSTOMER' ? 'internal' : 'client',
            permissions_orion: user.orion_permissions,
          });

          ToastSet(loadingNotification, 'A entrar', 'success');
          setLoading(false);

          const nextPage = RedirectTo(user);

          // eslint-disable-next-line no-constant-condition
          if (user.role === 'CUSTOMER' && user.tos === false) router.push('/terms');
          else router.push(nextPage);
        }).catch((err) => console.log(err));
      });
    } catch (err) {
      if (err.response?.data?.error_description === 'Invalid credentials given.') ToastSet(loadingNotification, 'Credenciais erradas.', 'error');
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
        onClose={() => setDialogOpen(false)}>
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
      <Box style={{ width: windowWidth > 600 ? '80px' : '50px', position: 'absolute', right: '25px', top: '25px' }}
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
              label='Endereço de email'
              onChange={(e) => {
                if (usernameErrors) setUsernameErrors('');

                setUsername(e.target.value);
              }
              }
              value={username}
              error={usernameErrors}
              name='email'
              type='email'
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
