/* eslint-disable consistent-return */
//  Nodes
import { Button } from '@mui/material';
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
import { useDispatch } from 'react-redux';
import companyLogo from '../../../public/Logo-NKA.png';

// import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import * as emailActionsRedux from '../../../store/actions/email';
import MyInput from '../../inputs/myInput';

const ForgotPassword = (props) => {
  const { client, signinRoute } = props;
  const [windowWidth, setWindowHeight] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const sendResetEmail = (data) => dispatch(emailActionsRedux.resetPassword(data));

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

    const FormData = require('form-data');
    const data = new FormData();

    data.append('email', email);

    if (!email) return toast.error('Prencher formulario');

    await sendResetEmail(data).then(() => {
      setEmail('');
      toast.success('Sucesso! Siga as instruções que constam do email enviado.');
    }).catch(() => {
      setEmail('');
      toast.success('Sucesso! Siga as instruções que constam do email enviado.');
      // toast.error('Email não enviado.');
    });
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      <Box
        style={{ width: windowWidth > 600 ? '160px' : '100px', position: 'absolute', right: '25px', top: '25px' }}
      >
        <a href='http://mofreita.com/' target='#'>
          <Image
            alt='Background Image'
            src={companyLogo}
            placeholder='blur'
            width={windowWidth > 600 ? 160 : 100}

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
            <MyInput
              label={'Email'}
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
