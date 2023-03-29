/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import styles from '../../../styles/SignIn.module.css';
import Notification from '../../dialogs/Notification';
// import FormGenerator from '../../formGenerator';
import { useDispatch } from 'react-redux';
import * as emailActionsRedux from '../../../store/actions/email';
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';
import Loader from '../../loader/loader';

const ResetPassword = (props) => {
  // eslint-disable-next-line react/prop-types
  const [submiting, setSubmiting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowHeight] = useState();
  const dispatch = useDispatch();
  const updatePassword = (data) => dispatch(emailActionsRedux.updatePassword(data));

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setWindowHeight(window.innerWidth);
    }, []);
  }

  const listenToResize = () => {
    setWindowHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', listenToResize);

    return () => window.removeEventListener('resize', listenToResize);
  }, []);

  const [inputFields, setInputFields] = useState([
    {
      id: 'password',
      label: 'Nova senha',
      value: '',
      error: '',
      required: true,
      type: 'password'
    },
    {
      id: 'password_confirm',
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

      if (i === 0 && input.value === '') {
        data[i].error = 'Campo Óbrigatorio';
        hasErrors = true;
      } else if (i === 0 && input.value.length < 6) {
        data[i].error = 'password tem que ser minimo 6 letras';
        hasErrors = true;
      } else if (i === 1 && !hasErrors && inputFields[0].value !== inputFields[1].value) {
        data[i].error = 'Senhas tem que ser iguais';
        hasErrors = true;
      }
    });

    setInputFields(data);

    if (hasErrors) {
      toast.error('Verifique os erros no formulário."');

      return false;
    }

    return true;
  }

  async function handleSubmit (e) {
    e.preventDefault();
    setSubmiting(true);

    //  Validate form data
    if (ValidateData()) {
      // Reset Success
      const data = {};

      inputFields.map((field) => {
        data[field.id] = field.value;
      });

      data.id = props.params.token;

      await updatePassword(data).then((res) => {
        if (res.data === '"The token is valid. The Operation has occurred successfully."') toast.success('Senha redefinida!');
        else ;

        setSubmiting(false);
      }).catch((err) => {
        if (err.response.data.includes('Token has expired'))toast.error('Link inválido. Por favor refaça o pedido.');
        else toast.error('Algo aconteceu! Por favor tente mais tarde.');

        setSubmiting(false);
      });
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
          <Typography variant='md' color={'primary'} sx={{ fontWeight: 600 }}>Portal {props.params.profile !== 'CUSTOMER' ? 'Interno' : 'Cliente'} WW4.0</Typography>
          <Typography component='h2' variant='h3'>
            Redefinir senha
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <Grid container>
              {/* <FormGenerator fields={inputFields} perRow={1} onFormChange={handleFormChange} /> */}
              <Grid md={12} sm={12 } xs={12} container sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  name={inputFields[0].id}
                  label={inputFields[0].label}
                  required={inputFields[0].required}
                  value={inputFields[0].value}
                  error={inputFields[0].error}
                  placeholder={'Escrever nova Senha'}
                  type={visible ? 'text' : 'password'}
                  onChange={(e) => handleFormChange(0, e)}
                  adornmentIcon={visible ? <Visibility color={'primary'} /> : <VisibilityOff />}
                  adornmentOnClick={() => setVisible(!visible)}
                  iconTooltip={!visible && 'Mostrar senha'}
                />
              </Grid>
              <Grid md={12} sm={12 } xs={12} container sx={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}>
                <MyInput
                  name={inputFields[1].id}
                  label={inputFields[1].label}
                  required={inputFields[1].required}
                  value={inputFields[1].value}
                  error={inputFields[1].error}
                  placeholder={'Repita nova senha'}
                  type={visible ? 'text' : 'password'}
                  onChange={(e) => handleFormChange(1, e)}
                  adornmentIcon={visible ? <Visibility color={'primary'} /> : <VisibilityOff />}
                  adornmentOnClick={() => setVisible(!visible)}
                  iconTooltip={!visible && 'Mostrar Senha'}
                />
              </Grid>
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
