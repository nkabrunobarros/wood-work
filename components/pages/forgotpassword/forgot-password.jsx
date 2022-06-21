//  Nodes
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/SignIn.module.css';
import { OutlinedInput } from '@mui/material';

import emailjs from '@emailjs/browser';
import routes from '../../../navigation/routes';
import Router from 'next/router';

import { ChevronLeft } from 'lucide-react';
import Footer from '../../layout/footer/footer';
import Notification from '../../dialogs/Notification';
import { toast } from 'react-toastify';

const ForgotPassword = (e) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const USER_ID = `service_kqtxrtc`;
    const TEMPLATE_ID = `template_6nvzzrx`;
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
    });
    emailjs
      .sendForm(USER_ID, TEMPLATE_ID, event.currentTarget, 'HtyN6X3l4PFTtFQSI')
      .then(
        (result) => {
          console.log(result);
          toast.success('Sent');
        },
        (error) => {
          toast.error('An error occurred, Please try again', error);
        }
      );
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Grid className={styles.sidePanelForgot} item xs={false} sm={4} md={7}>
        <Box
          className={styles.logo}
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
              styles={{ width: '300px', height: '300px', position: 'absolute' }}
            ></div>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
        <Box
          sx={{
            my: '25%',
            mx: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography color={'primary'}>Portal Interno WW4.0</Typography>
          <Typography component='h2' variant='h3'>
            Esqueceu a Senha?
          </Typography>
          <Typography variant='h7'>
            Insira o seu endereço de email e verifique a sua caixa de correio
            pelas instruções redifinir a senha
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <OutlinedInput
              type='hidden'
              id='name'
              name='name'
              autoComplete='name'
              value={'Bruno Barros'}
              autoFocus
            />
            <OutlinedInput
              required
              fullWidth
              id='email'
              name='email'
              autoComplete='email'
              placeholder='email'
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submeter
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <a
                onClick={() => Router.push(routes.public.signIn)}
                className='link'
              >
                <ChevronLeft /> Voltar a página de Login
              </a>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};
export default ForgotPassword;
