//  Nodes
import React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import styles from '../../../styles/SignIn.module.css'
import { InputLabel, OutlinedInput } from '@mui/material'
import Image from 'next/image'

import routes from '../../../navigation/routes'
import Router from 'next/router'

import { ChevronLeft } from 'lucide-react'

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
const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email')
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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
            <Image
              width={250}
              height={250}
              src="/../public/Logotipo_Vetorizado.png"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={24}
          square
        >
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
            <Typography component="h2" variant="h3">
              Esqueceu a Senha?
            </Typography>
            <Typography variant="h7">
              Insira o seu endereço de email e verifique a sua caixa de correio
              pelas instruções redifinir a senha
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <a onClick={() => Router.push(routes.public.signIn)}
                  className="link"
                >
                  <ChevronLeft /> Voltar a página de Login
                </a>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default ForgotPassword
