//  Nodes
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';

import styles from '../../../styles/SignIn.module.css';
import {
  IconButton,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import routes from '../../../navigation/routes';
import Footer from '../../layout/footer/footer';
import Notification from '../../dialogs/Notification';

import { EmailValidation } from '../../utils/EmailValidation';

import { toast } from 'react-toastify';
import ToastSet from '../../utils/ToastSet';
import authService from '../../../services/auth-service';
import Router from 'next/router';

const SignIn = ({ ...props }) => {
  const [visible, setVisible] = useState(true);
  // eslint-disable-next-line react/prop-types
  const { client } = props;
  const [email, setEmail] = useState('admin@nka.pt');
  const [password, setPassword] = useState('123456');

  const [loading, setLoading] = useState(false);
  async function loginUser() {
    const res = await authService.login(email, password).then(
      (res) => {
        return res.data.data;
      },
      (error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        return error;
      }
    );
    return res;
  }

  const handleSubmit = async (event) => {
    const loadingNotification = toast.loading('');
    event.preventDefault();
    setLoading(true);

    if (email === '') {
      setLoading(false);
      return ToastSet(
        loadingNotification,
        'Endereço de Email é obrigatório',
        'error'
      );
    }
    if (password === '') {
      setLoading(false);
      return ToastSet(loadingNotification, 'Senha é obrigatória', 'error');
    }
    if (password.length < 6) {
      setLoading(false);
      return ToastSet(
        loadingNotification,
        'Senha tem que ter minimo 6 caracteres',
        'error'
      );
    }

    if (!EmailValidation(email)) {
      setLoading(false);
      return ToastSet(
        loadingNotification,
        'Endereço de Email mal estruturado',
        'error'
      );
    }
    await loginUser({
      email,
      password,
    }).then((res) => {
      console.log(res);
      if (res.id) {
        ToastSet(loadingNotification, 'Sucesso! A entrar', 'success');
        switch (res.perfil) {
          case 'internal':
            Router.push(routes.private.internal.orders);
            break;
          case 'client':
            Router.push(routes.private.orders);
            break;
          default:
            console.log('inside switch');
            break;
        }
      } else {
        ToastSet(
          loadingNotification,
          'Erro, endereço email ou senha incorretos',
          'error'
        );
        // console.log(res)
        // switch (res) {
        //   case 400:
        //     ToastSet(
        //       loadingNotification,
        //       'Endereço de Email ou Senha incorreta',
        //       'error'
        //     );
        //     break;
        //   default:
        //     ToastSet(
        //       loadingNotification,
        //       'Something has happend, if the problem persists, please contact the mangament',
        //       'error'
        //     );
        //     break;
        // }

        setLoading(false);
      }
    });
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Grid className={styles.sidePanel} item xs={false} sm={4} md={7}>
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
            <div
              styles={{
                width: '300px',
                height: '300px',
                position: 'absolute',
              }}
            ></div>
          </div>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        fullHeight
      >
        <Box
          sx={{
            my: '25%',
            mx: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography color={'primary'}>
            {!client ? 'Portal Cliente WW4.0' : 'Portal Interno WW4.0'}
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
            <InputLabel htmlFor='email'>Endereço de Email</InputLabel>

            <OutlinedInput
              required
              fullWidth
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              autoComplete='email'
              autoFocus
            />
            <InputLabel htmlFor='password'>Senha</InputLabel>
            <OutlinedInput
              id='password'
              required
              fullWidth
              name='password'
              type={visible ? 'password' : 'text'}
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    edge='end'
                  >
                    {visible ? (
                      <Visibility
                        color={'primary'}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <VisibilityOff onClick={() => setVisible(true)} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Grid container style={{ alignItems: 'center' }}>
              <Grid item xs>
                <a
                  onClick={() => Router.push(routes.public.forgotPassword)}
                  variant='body2'
                  className='link'
                >
                  Esqueceu-se da sua senha?
                </a>
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={25} sx={{ color: 'white' }} />
              ) : (
                'Entrar'
              )}
            </Button>
          </Box>
        </Box>
        <Footer section='client' />
      </Grid>
    </Grid>
  );
};
SignIn.PropTypes = {
  client: PropTypes.any,
};
export default SignIn;
