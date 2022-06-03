//  Nodes
import React, { useEffect } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Styling
import '../styles/globals.css';
//  Components
import Layout from '../components/layout/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router, { useRouter } from 'next/router';
import routes from '../navigation/routes';
import Head from 'next/head';
// import { getUser } from '../components/mock/Users';

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
    fontFamily: [
      "Montserrat"
    ].join(",")
  }
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      if (localStorage.getItem('user') !== null) {
        const data = localStorage
          .getItem('user')
          .substring(1, localStorage.getItem('user').length - 1);
        if (data === null) Router.push(routes.public.signIn);
      }
    }
  }, [router.asPath]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Wood Work 4.0</title>
        <link rel="icon" href="/logo_bw_ww40_inv.png" />
      </Head>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
