// Node modules
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// Styles
import '../styles/globals.css';
// Store
// App Layout
import Layout from '../components/layout/layout';
import React, { useEffect, useState } from 'react';
import authService from '../services/auth-service';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { createTheme } from '@mui/material';

// Here is where we handle all the pages needs in terms of initial data to have and auth validation.
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
    fontFamily: ['Montserrat'].join(','),
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
  },
});
export const initializeClientSideProps = async ({ Component, router }) => {
  let hasFullyLoaded = false;
  const accessToken = localStorage.getItem('user');

  // It has no token saved.
  if (!accessToken) hasFullyLoaded = true;

  // console.log(accessToken);

  // Validate user token when having a token in local storage and no login data at our redux store.
  if (accessToken === null) {
    hasFullyLoaded = true;
  }
  // const isPrivatePage = Object.values(routes.private).some((item) => {
  //   const regex = new RegExp(item);
  //   if (hasData(router.pathname)) return regex.test(router.pathname);
  //   else return false
  // });

  // Redirect users to the login page when trying to access a private page without being authed.
  // if (isPrivatePage && hasFullyLoaded) Router.push(routes.public.signIn);

  const pageProps = {
    ...(Component.getInitialProps
      ? await Component.getInitialProps(router, hasFullyLoaded)
      : {}),
  };

  pageProps.hasFullyLoaded = hasFullyLoaded;

  return { pageProps };
};

const App = ({ Component, pageProps }) => {
  const [loggedUser, setLoggedUser] = useState();

  const router = useRouter();
  useEffect(() => {
    const getLoggedUser = async () => {
      if (typeof window !== 'undefined') {
        const res = await authService.getCurrentUser();
        setLoggedUser(res.data.data);
        return initializeClientSideProps({ Component, router });
      }
    };
    getLoggedUser();
  }, []);

  const globalVars = {
    iconSize: 20,
    iconSizeXl: 40,
    iconSizeXxl: 54,
    iconStrokeWidth: 1,
    iconXlStrokeWidth: 0.5,
    iconSmStrokeWidth: 1.5,
  };

  pageProps.loggedUser = loggedUser;
  pageProps.globalVars = globalVars;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Wood Work 4.0</title>
        <link rel='icon' href='/logo_bw_ww40_inv.png' />
      </Head>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const hasFullyLoaded = false;

  // Client-side-only code
  if (typeof window !== 'undefined') {
    return initializeClientSideProps({ Component, ctx });
  } else {
    // Ignore server side initialization for now
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx, hasFullyLoaded)
        : {}),
    };

    pageProps.hasFullyLoaded = hasFullyLoaded;

    return { pageProps };
  }
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  ctx: PropTypes.any,
};

export default App;
