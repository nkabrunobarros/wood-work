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
import { ThemeProvider } from '@mui/material';

//  Navigation
import routes from '../navigation/routes';

//  Utils

//  Momment
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { destroyCookie, parseCookies } from 'nookies';
import IsInternal from '../components/utils/IsInternal';
import MuiTheme from './MuiTheme';


const App = ({ Component, pageProps }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [fontSize, setFontSize] = useState('md');
  const { auth_token: token } = parseCookies();
  const theme = MuiTheme({ selectedTheme, fontSize });
  const router = useRouter();

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', desiredTheme);
    setSelectedTheme(desiredTheme);

    return desiredTheme;
  };

  const toggleFontSize = (value) => {
    localStorage.setItem('font', value);
    setFontSize(value);

    return value;
  };


  useEffect(() => {
    const load = () => {
      //  theme
      if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light');
      else if (selectedTheme !== localStorage.getItem('theme')) setSelectedTheme(localStorage.getItem('theme'));

      if (!localStorage.getItem('font')) localStorage.setItem('font', 'md');
      else if (fontSize !== localStorage.getItem('font')) setFontSize(localStorage.getItem('font'));


      if (token) {
        const decodedToken = jwt.decode(token);

        if (moment(new Date(0).setUTCSeconds(decodedToken.exp)) > moment()) {
          pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));
          pageProps.theme = selectedTheme;

          const isPublicPage = Object.values(routes.public).some((route) => route === router.route);

          if (isPublicPage && !!token) {
            if (IsInternal(pageProps.loggedUser?.profile.object.description)) router.push(routes.private.internal.projects);
            else {
              if (pageProps.loggedUser?.tos) router.push(routes.private.projects);
              else router.push(routes.private.terms);
            }
          }

        }
        else {
          destroyCookie('auth-token');
          router.push(routes.public.signIn);
        }
      }
    };

    load();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Wood Work 4.0</title>
        <link rel='icon' href='/logo_bw_ww40_inv.png' />
      </Head>
      <Layout {...pageProps} toggleTheme={toggleTheme} toggleFontSize={toggleFontSize}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
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
