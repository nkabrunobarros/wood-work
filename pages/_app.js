//  Node modules
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

//  Proptypes
import PropTypes from 'prop-types';

//  Styles
import '../styles/globals.css';

//  App Layout
import Layout from '../components/layout/layout';

//  Services
import authService from '../services/auth-service';

//  Material UI
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material';

//  Navigation
import routes from '../navigation/routes';

//  Utils
import hasData from '../components/utils/hasData';
import Loader from '../components/loader/loader';

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
  if (!accessToken || accessToken === null) {
    hasFullyLoaded = true;
  }

  // Validate user token when having a token in local storage and no login data at our redux store.
  const isPrivatePage = Object.values(routes.private).some((item) => {
    const regex = new RegExp(item);
    if (regex.test(router.pathname)) return true;
    else return false;
  });


  // Redirect users to the login page when trying to access a private page without being authed.
  if (isPrivatePage && !hasData(accessToken)) {
    hasFullyLoaded = true;
    console.log('should redicting to login');
    // Router.push(routes.public.signIn);
  }

  // if (!accessToken) Router.push(routes.public.signIn);

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
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('user');

    function PrivatePage() {
      const isPrivatePage = Object.values(routes.private).some((item) => {
        const regex = new RegExp(item);
        if (regex.test(router.pathname)) return true;
        else return false;
      });
      return isPrivatePage;
    }

    const getData = async () => {
      // if (typeof window !== 'undefined') {
      //   const res = await authService.getCurrentUser();
      //   if (res) setLoggedUser(res.data.data);
      //   return initializeClientSideProps({ Component, router });
      // }
      if (typeof window !== 'undefined') {
        if (
          (!accessToken || accessToken === null) &&
          PrivatePage() &&
          !accessToken
        ) {
          pageProps.hasFullyLoaded = true;
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
          Router.push(routes.public.signIn);
        }
        if (accessToken) {
          const res = await authService.getCurrentUser();
          if (res) setLoggedUser(res.data.data);
          if (!PrivatePage()) {
            switch (res.data.data.perfil) {
              case 'internal':
                pageProps.hasFullyLoaded = true;
                Router.push(routes.private.internal.orders);
                break;
            
              default:
                pageProps.hasFullyLoaded = true;
                Router.push(routes.private.orders);
                break;
            }
          }
        }
      }
    };
    Promise.all([getData()]).then(setLoaded(true));
  }, []);
  if (loaded) {
    pageProps.loggedUser = loggedUser;
    return !pageProps.hasFullyLoaded ? (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Wood Work 4.0</title>
          <link rel='icon' href='/logo_bw_ww40_inv.png' />
        </Head>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    ) : (
      <Loader center={true} />
    );
  }
};

App.getInitialProps = async ({ Component, ctx }) => {
  const hasFullyLoaded = false;
  const globalVars = {
    iconSize: 20,
    iconSizeXl: 40,
    iconSizeXxl: 54,
    iconStrokeWidth: 1,
    iconXlStrokeWidth: 0.5,
    iconSmStrokeWidth: 1.5,
  };

  // Ignore server side initialization for now
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
