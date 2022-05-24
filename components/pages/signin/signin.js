//  Nodes
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

import styles from '../../../styles/SignIn.module.css'
import { IconButton, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'

import routes from '../../../navigation/routes'
import Router from 'next/router'
import styledEngineSc from '@mui/styled-engine-sc'

function Copyright (props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {' Desenvolvido por  NKA - '}
      <Link color="inherit" href="https://nka.pt/" target="#">
     New Knowledge Advice Lda.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#225EE8'
    }
  }
})
const SignIn = () => {
  const [visible, setVisible] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      remember: data.get('remember')
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid className={styles.sidePanel} item xs={false} sm={4} md={7}>
          <Box
            className={styles.logo}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <div className={styles.logoImg}>
             <div styles={{width: '300px', height: '300px', position: 'absolute' }}>asd</div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: '25%',
              mx: '15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start'
            }}
          >
            <Typography color={'primary'}>Portal Interno WW4.0</Typography>
            <Typography component="h1" variant="h2">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <InputLabel htmlFor="email">Endereço de Email</InputLabel>

              <OutlinedInput
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <InputLabel htmlFor="password">Senha</InputLabel>
              <OutlinedInput
                id="password"
                margin="normal"
                required
                fullWidth
                name="password"
                type={visible ? 'password' : 'text'}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {visible
                        ? (
                        <Visibility
                          color={'primary'}
                          onClick={() => setVisible(false)}
                        />
                          )
                        : (
                        <VisibilityOff onClick={() => setVisible(true)} />
                          )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => Router.push(routes.public.forgotPassword)}
                    variant="body2"
                    className="link"
                  >
                    Esqueceu-se da sua senha?
                  </Link>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox name="remember" value={true} color="primary" />}
                    label="Lembrar utilizador"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default SignIn
