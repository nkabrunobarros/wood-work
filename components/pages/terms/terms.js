//  Nodes
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import styles from '../../../styles/SignIn.module.css'
import { Checkbox, FormControlLabel } from '@mui/material'
import Footer from '../../layout/footer/footer'

//  Navigation
import Router from 'next/router'
import routes from '../../../navigation/routes'

const Terms = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email')
    })
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid className={styles.sidePanelTerms} item xs={false} sm={4} md={7}>
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
            <div
              styles={{
                width: '300px',
                height: '300px',
                position: 'absolute'
              }}
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
            alignItems: 'start'
          }}
        >
          <Typography color={'primary'}>Portal Interno WW4.0</Typography>
          <Typography component='h2' variant='h3'>
            Consentimento de Utilização
          </Typography>
          <Typography variant='h7'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            rutrum, ex a hendrerit dapibus, dui mi tristique odio, ut commodo
            orci dolor et enim. Integer massa lorem, vulputate sed elit in,
            eleifend posuere ex. Praesent ac dolor id urna faucibus lobortis.
            Sed consectetur dignissim magna et ornare. Phasellus imperdiet diam
            vitae velit porta, at pulvinar augue vestibulum. Integer laoreet
            libero sed tellus lobortis venenatis. In dignissim condimentum
            neque. Morbi vel dictum ante, et pretium arcu. Nullam in lectus at
            metus mollis placerat. Duis scelerisque, mi at varius egestas, mi
            odio feugiat lectus, quis accumsan nisl nunc non orci. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed iaculis erat quis
            purus pulvinar, ut suscipit mi aliquam. Sed quis accumsan velit,
            vitae tincidunt mauris.
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name='TOS'
                  value={acceptedTerms}
                  color='primary'
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                />
              }
              label='Li e aceito os Termos de Utilização'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={!acceptedTerms}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => Router.push(routes.private.home)}
            >
              Entrar
            </Button>
          </Box>
        </Box>
        <Footer
          section=''
          page={'Termos e Condições | Politica de Privacidade'}
        />
      </Grid>
    </Grid>
  )
}
export default Terms
