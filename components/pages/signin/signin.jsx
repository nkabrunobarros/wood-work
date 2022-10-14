//  Nodes
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputLabel, TextField
} from '@mui/material';
import styles from '../../../styles/SignIn.module.css';

import routes from '../../../navigation/routes';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';

import { XCircle } from 'lucide-react';
import Router, { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import * as authActions from '../../../pages/api/actions/auth';
import PrimaryBtn from '../../buttons/primaryBtn';
import MyInput from '../../inputs/myInput';
import EmailValidation from '../../utils/EmailValidation';
import IsInternal from '../../utils/IsInternal';
import ToastSet from '../../utils/ToastSet';

const SignIn = (props) => {
  const [visible, setVisible] = useState(true);
  const { client } = props;
  const [email, setEmail] = useState('geral@nka.pt');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState();
  const [senhaErrors, setSenhaErrors] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {
      email: '',
      password: ''
    };

    if (email === '') errors.email = 'Email é obrigatório';
    else if (!EmailValidation(email)) errors.email = 'Email mal estruturado';


    if (password === '') errors.password = 'Senha é obrigatório';
    else if (password.length < 6) errors.password = 'Senha tem que ter minimo 6 caracteres';


    if (errors.password || errors.email) {
      setSenhaErrors(errors.password);
      setEmailErrors(errors.email);

      return;
    }

    setLoading(true);

    const loadingNotification = toast.loading('');


    await authActions.login({ email, password })
      .then(async (result) => {
        setCookie(undefined, 'auth_token', result.data.payload.token);

        const resUser = await authActions.me({ token: result.data.payload.token });
        const user = resUser.data.payload;

        localStorage.setItem("user", JSON.stringify(user));

        // Success

        ToastSet(loadingNotification, 'A entrar', 'success');
        setLoading(false);

        if (IsInternal(user.perfil.descricao)) router.push(routes.private.internal.orders);
        else {
          if (!user.tos) router.push(routes.private.terms);
          else router.push(routes.private.orders);
        }
      })
      //  Error
      .catch((err) => {
        setLoading(false);

        if (!err.response.data.success && err.response.data.message === 'credenciais-invalidas') ToastSet(loadingNotification, 'Credenciais invalidas', 'error');
        else if (err.response.data.message === 'utilizador-inativo') ToastSet(loadingNotification, 'Conta Inativa', 'error');
        else ToastSet(loadingNotification, 'Algo Inesperado aconteceu, por favor tente mais tarde', 'error');
      });
  };


  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
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

            <TextField
              required
              fullWidth
              id='email'
              value={email}
              onChange={(e) => {
                if (emailErrors) setEmailErrors('');

                setEmail(e.target.value);
              }
              }
              type='email'
              name='email'
              autoComplete='email'
              autoFocus
              error={!!emailErrors}
              label={emailErrors || ''}
            />
            <MyInput
              label='Senha'
              onChange={(e) => { setSenhaErrors(''); setPassword(e.target.value); }}
              value={password}
              error={senhaErrors}
              type={visible ? 'password' : 'text'}
              iconTooltip={visible && 'Mostrar Senha'}
              adornmentOnClick={() => setVisible(!visible)}
              adornmentIcon={visible ? <Visibility color={'primary'} /> : <VisibilityOff />} />
            <Grid container style={{ alignItems: 'center' }}>
              <Grid item xs>
                <a
                  onClick={() => Router.push(routes.public.forgotPassword)}
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
            <PrimaryBtn
              onClick={(e) => handleSubmit(e)}
              type='submit'
              fullWidth
              variant='contained'
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={25} sx={{ color: 'white' }} />
              ) : (
                'Entrar'
              )}
            </PrimaryBtn>
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
