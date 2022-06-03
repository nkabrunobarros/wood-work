/* eslint-disable react/prop-types */
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

import styles from '../../../styles/SignIn.module.css';
import { IconButton, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import routes from '../../../navigation/routes';
import Router from 'next/router';
import Footer from '../../layout/footer/footer';

// import authService from '../../../services/auth-service';
import { getUser } from '../../mock/Users';

const SignIn = ({ ...props }) => {
  const [visible, setVisible] = useState(true);
  const { client } = props;
  const [email, setEmail] = useState('admin@nka.pt');
  const [password, setPassword] = useState('123456');

  // async function loginUser() {
  //   await authService.login(email, password).then(
  //     (res) => {
  //       if (res.status === 200 && res.data.data.perfil === 'Client')
  //         Router.push(routes.private.orders);
  //       else Router.push(routes.private.internal.orders);
  //     },
  //     (error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       console.log(resMessage);
  //     }
  //   );
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const token = await loginUser({
    //   email,
    //   password,
    // });
    // sessionStorage.setItem('token', token);

    const foundUser = await getUser(email.toLocaleLowerCase());
    if (foundUser !== undefined && foundUser.password === password) {
      localStorage.setItem(
        'user',
        JSON.stringify(email.toLocaleLowerCase()).substring(1, email.length + 1)
      );
      sessionStorage.setItem(
       'user',
        JSON.stringify(email.toLocaleLowerCase()).substring(1, email.length + 1)
      );
      Router.push(routes.private.terms);
      if (foundUser.perfil === 'Client') Router.push(routes.private.terms);
      else Router.push(routes.private.internal.orders);
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid className={styles.sidePanel} item xs={false} sm={4} md={7}>
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
              margin='normal'
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
              margin='normal'
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
              Entrar
            </Button>
          </Box>
        </Box>
        <Footer section='client' />
      </Grid>
    </Grid>
  );
};
export default SignIn;
