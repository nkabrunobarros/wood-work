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
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
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
            user.profile = {};
            user.profile.type = 'Profile';

            user.profile.object = {
              description: Router.route === '/' ? 'client' : 'Admin',
              type: Router.route === '/' ? 'client' : 'internal',
              permissions: [
                { idPerfil: '123456789', subject: 'workers', action: 'READ' },
                { idPerfil: '123456789', subject: 'workers', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'workers', action: 'DELETE' },

                //  DashboardsScreen
                { idPerfil: '123456789', subject: 'dashboards', action: 'READ' },

                //  FactoryScreen
                { idPerfil: '123456789', subject: 'factoryLevel', action: 'READ' },

                //  leftoversScreen
                { idPerfil: '123456789', subject: 'leftovers', action: 'READ' },

                //  Ficheiros
                { idPerfil: '123456789', subject: 'ficheiros', action: 'READ' },
                { idPerfil: '123456789', subject: 'ficheiros', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'ficheiros', action: 'DELETE' },

                //  perfis
                { idPerfil: '123456789', subject: 'perfis', action: 'READ' },
                { idPerfil: '123456789', subject: 'perfis', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'perfis', action: 'DELETE' },

                //  Ficheiros
                { idPerfil: '123456789', subject: 'messages', action: 'READ' },
                { idPerfil: '123456789', subject: 'messages', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'messages', action: 'DELETE' },

                //  profiles
                { idPerfil: '123456789', subject: 'profiles', action: 'READ' },
                { idPerfil: '123456789', subject: 'profiles', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'profiles', action: 'DELETE' },

                //  Unidades
                { idPerfil: '123456789', subject: 'unidades', action: 'READ' },
                { idPerfil: '123456789', subject: 'unidades', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'unidades', action: 'DELETE' },

                //  ConversaoUnidades
                { idPerfil: '123456789', subject: 'conversaounidades', action: 'READ' },
                { idPerfil: '123456789', subject: 'conversaounidades', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'conversaounidades', action: 'DELETE' },

                //  Moedas
                { idPerfil: '123456789', subject: 'moedas', action: 'READ' },
                { idPerfil: '123456789', subject: 'moedas', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'moedas', action: 'DELETE' },

                //  projects
                { idPerfil: '123456789', subject: 'projects', action: 'READ' },
                { idPerfil: '123456789', subject: 'projects', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'projects', action: 'DELETE' },

                //  Clients
                { idPerfil: '123456789', subject: 'clients', action: 'READ' },
                { idPerfil: '123456789', subject: 'clients', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'clients', action: 'DELETE' },

                //  Stocks
                { idPerfil: '123456789', subject: 'stocks', action: 'READ' },
                { idPerfil: '123456789', subject: 'stocks', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'stocks', action: 'DELETE' },

                //  Products
                { idPerfil: '123456789', subject: 'products', action: 'READ' },
                { idPerfil: '123456789', subject: 'products', action: 'WRITE' },
                { idPerfil: '123456789', subject: 'products', action: 'DELETE' },

                //  Client
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },

                //  profiles
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'profiles', action: 'READ' },

                //  Unidades
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'unidades', action: 'READ' },

                //  ConversaoUnidades
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'conversaounidades', action: 'READ' },

                //  Moedas
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'moedas', action: 'READ' },

                //  projects
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'projects', action: 'READ' },

                //  Clients
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'clients', action: 'READ' },

                //  Stocks
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'stocks', action: 'READ' },

                //  Products
                { idPerfil: 'cl16o9cag0000x3tqp8lbslzz', subject: 'products', action: 'READ' },
              ]

            };

            if (user.type === 'Owner' && user.tos === undefined) user.tos = { type: 'Property', value: 'False' };

            localStorage.setItem('user', JSON.stringify(user));
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
            {client && <a
              className='link'
              style={{ color: 'inherit' }}
              target='#'
              onClick={() => Router.push(routes.private.tos)}
            > Termos e Condições | Política de Privacidade </a>
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
        <Footer />
      </Grid>
    </Grid>
  );
};

SignIn.propTypes = {
  me: PropTypes.func,
  login: PropTypes.func,
  client: PropTypes.bool,
  loginSuccessRoute: PropTypes.string,
  forgotPasswordRoute: PropTypes.string,
  loginSuccessRouteTerms: PropTypes.string,
};

export default SignIn;
