//  Nodes
import emailjs from '@emailjs/browser';
import { OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ChevronLeft } from 'lucide-react';
import Router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import styles from '../../../styles/SignIn.module.css';
import PrimaryBtn from '../../buttons/primaryBtn';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';

const ForgotPassword = () => {
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
          toast.success('Sucesso!. Siga as instruções dadas no email para nova Senha');
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
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
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
            <Box mt={2}>
              <PrimaryBtn
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submeter
              </PrimaryBtn>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <a
                  id='align'
                  onClick={() => Router.push(routes.public.signIn)}
                  className='link'
                >
                  <ChevronLeft className='link' />
                  <span>Voltar a página de Login</span>
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
