//  Node modules
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Proptypes
import PropTypes from 'prop-types';

//  Styles
import '../styles/globals.css';

//  App Layout
import Layout from '../components/layout/layout';

//  Services

//  Material UI
import { ThemeProvider, createTheme } from '@mui/material';

//  Navigation
import routes from '../navigation/routes';

//  Utils

//  Momment
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { destroyCookie, parseCookies } from 'nookies';
import AppContext from './AppContenxt';
import IsInternal from '../components/utils/IsInternal';

const theme = createTheme({
  palette: {
    primary: {
      main: '#225EE8',
    },
    default: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    wordWrap: "break-word",
  },
  TextareaAutosize: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          //  maxHeight: '45px',
          backgroundColor: 'white',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    }
  },
});

const App = ({ Component, pageProps }) => {
  const { auth_token: token } = parseCookies();
  const router = useRouter();

  useEffect(() => {
    const load = () => {
      if (token) {
        const decodedToken = jwt.decode(token);

        if (moment(new Date(0).setUTCSeconds(decodedToken.exp)) > moment()) {
          pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));

          const isPublicPage = Object.values(routes.public).some((route) => route === router.route);

          if (isPublicPage && !!token) {
            if ( IsInternal(pageProps.loggedUser.perfil.descricao)) router.push(routes.private.internal.orders)
            else { 
              if (pageProps.loggedUser.tos)router.push(routes.private.orders);
               else router.push(routes.private.terms);
            }
          }

        }
        else {
          destroyCookie('auth-token');
          router.push(routes.public.signIn)
        }
      }
    }

    load();
  }, [])



  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider>
        <Head>
          <title>Wood Work 4.0</title>
          <link rel='icon' href='/logo_bw_ww40_inv.png' />
        </Head>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </ThemeProvider>
  )
};

App.getInitialProps = async ({ Component, ctx }) => {
  const hasFullyLoaded = false;

  const globalVars = {
    iconSize: 20,
    iconSizeMd: 30,
    iconSizeXl: 40,
    iconSizeXxl: 54,
    iconStrokeWidth: 1,
    iconXlStrokeWidth: 0.5,
    iconSmStrokeWidth: 1.5,
  };

  const pageProps = {
    ...(Component.getInitialProps
      ? await Component.getInitialProps(ctx, hasFullyLoaded)
      : {}),
  };

  pageProps.globalVars = globalVars;
  pageProps.hasFullyLoaded = hasFullyLoaded;

  return { pageProps };
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  ctx: PropTypes.any,
};

export default App;
