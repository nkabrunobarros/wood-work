//  Nodes
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { ConnectWithoutContact, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  CircularProgress, IconButton,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import styles from '../../../styles/SignIn.module.css';

import routes from '../../../navigation/routes';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';

import Router, { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import * as authActions from '../../../src/actions/auth';
import * as permissionActions from '../../../src/actions/permission';
import ToastSet from '../../utils/ToastSet';

const SignIn = (props) => {
  const [visible, setVisible] = useState(true);
  const { client } = props;
  console.log(props)
  const [email, setEmail] = useState('geral@nka.pt');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


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
    try {

      const result = await authActions.login({ email, password })
      if (!result.data.success && result.data.message === 'credenciais-invalidas') { 
        
        ToastSet(loadingNotification, 'Credenciais invalidas', 'error')
        setLoading(false)
     }
      setCookie(undefined, 'auth_token', result.data.payload.token);
      const resUser = await authActions.me({ token: result.data.payload.token })
      const user = resUser.data.payload;
      const permission = await permissionActions.permission({ id: user.idPerfil })
      const builtUser = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        morada: user.morada,
        telefone: user.telefone,
        telemovel: user.telemovel,
        ativo: user.ativo,
        pais: user.paisCodigo,
        perfil: permission.data.payload
      }
      localStorage.setItem("user", JSON.stringify(builtUser));
      ToastSet(loadingNotification, 'A entrar', 'success')
      if (builtUser.perfil.descricao === 'Administrador') router.push(routes.private.internal.orders)
      else router.push(routes.private.orders)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
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
SignIn.propTypes = {
  client: PropTypes.any,
};
export default SignIn;
