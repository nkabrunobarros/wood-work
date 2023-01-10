/* eslint-disable no-constant-condition */
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../../../styles/SignIn.module.css';
import Notification from '../../dialogs/Notification';
import FormGenerator from '../../formGenerator';
import Footer from '../../layout/footer/footer';
import Loader from '../../loader/loader';

const ResetPassword = () => {
  const [submiting, setSubmiting] = useState(false);

  const [inputFields, setInputFields] = useState([
    {
      id: 'password',
      label: 'Senha',
      value: '',
      error: '',
      required: true,
      type: 'password'
    },
    {
      id: 'passwordConfirm',
      label: 'Confirme senha',
      value: '',
      error: '',
      required: true,
      type: 'password'
    }
  ]);

  function ValidateData () {
    let hasErrors = false;

    if (inputFields.length === 0) {
      hasErrors = true;
    }

    const data = [...inputFields];

    // eslint-disable-next-line array-callback-return
    inputFields.map((input, i) => {
      data[i].error = '';

      if (input.value === '') {
        data[i].error = 'Campo Óbrigatorio';
        hasErrors = true;
      } else if (input.value.length < 6) {
        data[i].error = 'password tem que ser minimo 6 letras';
        hasErrors = true;
      } else if (inputFields[0].value !== inputFields[1].value) {
        data[i].error = 'Senhas tem que ser iguais';
        hasErrors = true;
      }
    });

    setInputFields(data);

    if (hasErrors) {
      toast.error('Prencha todos os campos.');

      return false;
    }

    return true;
  }

  function handleSubmit (e) {
    e.preventDefault();
    setSubmiting(true);

    //  Validate form data
    if (ValidateData()) {
      //  TODO: FAZER O PEDIDO DE RESET
      // Reset Success
      if (true) {
        toast.success('Reseted');
        setSubmiting(false);
      }
    } else {
      //  Reset Fails
      setSubmiting(false);
    }
  }

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i].value = e.target.value;
    data[i].error = '';
    setInputFields(data);
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Notification />
      {submiting && <Loader center={true} backdrop />}

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
              style={{ width: '300px', height: '300px', position: 'absolute' }}
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
          <Typography color={'primary'}>Portal WW4.0</Typography>
          <Typography component='h2' variant='h3'>
            Redefinir senha da conta
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <Grid container>
              <FormGenerator fields={inputFields} perRow={1} onFormChange={handleFormChange} />
            </Grid>
            <Grid container p={1} className='fullCenter'>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submeter
              </Button>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Grid>
    </Grid>);
};

export default ResetPassword;
