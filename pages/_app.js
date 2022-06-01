//  Nodes
import React, { useEffect } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Styling
import '../styles/globals.css';
//  Components
import Layout from '../components/layout/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import routes from '../navigation/routes';
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
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // async function getUserPerm(data) {
    //   const perfil = await getUser(data);
    //   return perfil.perfil;
    // }
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      if (localStorage.getItem('user') !== null) {
        console.log(localStorage.getItem('user'));
        const data = localStorage
          .getItem('user')
          .substring(1, localStorage.getItem('user').length - 1);
        if (data === null) Router.push(routes.public.signIn);
        else {
          // getUserPerm(data).then((res) => {
          //   if (res !== 'Client') Router.push(routes.private.internal.orders);
          //   else Router.push(routes.private.orders);
          // });
        }
      }
    }
  }, [router.asPath]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin={true}
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
          rel='stylesheet'
        />{' '}
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
