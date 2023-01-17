//  Nodes
import emailjs from '@emailjs/browser';
import { Button, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ChevronLeft } from 'lucide-react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../styles/SignIn.module.css';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';

//  PropTypes
import Image from 'next/image';
import PropTypes from 'prop-types';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';

const ForgotPassword = (props) => {
  const { client, signinRoute } = props;
  const [windowWidth, setWindowHeight] = useState();
  const [email, setEmail] = useState();

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

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) return toast.error('Prencher formulario');

    const USER_ID = 'service_kqtxrtc';
    const TEMPLATE_ID = 'template_6nvzzrx';

    //  TODO: separar o email de cliente e de colaborador com url's corretos
    emailjs
      .sendForm(USER_ID, TEMPLATE_ID, event.currentTarget, 'HtyN6X3l4PFTtFQSI')
      .then(
        (result) => {
          console.log(result);
          setEmail();
          toast.success('Sucesso! Siga as instruções que constam do email enviado.');
        },
        () => {
          setEmail();
          toast.error('Email não enviado.');
        }
      );

    setEmail();
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Box
        style={{ width: windowWidth > 600 ? '80px' : '50px', position: 'absolute', right: '25px', top: '25px' }}
      >
        <a href='http://mofreita.com/' target='#'>
          <Image
            alt='Background Image'
            src={companyLogo}
            placeholder='blur'
            width={windowWidth > 600 ? 80 : 50}

          />
        </a>
      </Box>
      {windowWidth > 600 && <Grid className={styles.sidePanelForgot} item xs={false} sm={4} md={7}>
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
              style={{ width: '300px', height: '300px', position: 'absolute' }}
            ></div>
          </div>
        </Box>
      </Grid> }
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
          <Typography variant='md' color={'primary'} sx={{ fontWeight: 600 }}>
            {client ? 'Portal Cliente WW4.0' : 'Portal Interno WW4.0'}
          </Typography>
          <Typography component='h2' variant='h3'>
            Recuperar senha
          </Typography>
          <Typography variant='h7'>
            Introduza o seu endereço de email. Irá receber um email para alterar a senha.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box mt={2}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submeter
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <a
                  id='align'
                  onClick={() => Router.push(signinRoute)}
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

ForgotPassword.propTypes = {
  client: PropTypes.bool,
  signinRoute: PropTypes.bool
};

export default ForgotPassword;
