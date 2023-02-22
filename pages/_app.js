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
import MomentJsConfig from '../components/utils/MomentJsConfig';
import { storeWrapper } from '../store/store';
import MuiTheme from './MuiTheme';

export const initializeClientSideProps = async ({ Component, ctx }) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  return { pageProps };
};

const App = ({ Component, pageProps }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [fontSize, setFontSize] = useState('md');
  const { auth_token: token } = parseCookies();
  const theme = MuiTheme({ selectedTheme, fontSize });
  const router = useRouter();

  moment.locale(MomentJsConfig());

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

      if (token !== 'undefined') {
        const decodedToken = jwt.decode(token);
        const a = true;

        if (moment(new Date(0).setUTCSeconds(decodedToken?.exp)) > moment() || a) {
          pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));
          pageProps.theme = selectedTheme;

          const isPublicPage = Object.values(routes.public).some((route) => route === router.route);

          if (isPublicPage && !!token) {
            if (IsInternal(pageProps.loggedUser?.profile.object.description)) router.push(routes.private.internal.projects);
            else {
              // if (pageProps.loggedUser?.tos) router.push(routes.private.projects);
              // else router.push(routes.private.terms);
              router.push(routes.private.projects);
            }
          }
        } else {
          destroyCookie('auth-token');
          router.push(routes.public.signIn);
        }
      } else {
        destroyCookie('auth-token');
        console.log('here destroyed');
        router.push(routes.public.signIn);
      }
    };

    load();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Wood Work 4.0" />
        <meta name="keywords" content="work, madeira, moveis, barato" />
        <meta name="author" content="Bruno Barros" />
        <title>Wood Work 4.0</title>
        <link rel='icon' href='/logo_bw_ww40_inv.png' />
      </Head>
      <Layout {...pageProps} toggleTheme={toggleTheme} toggleFontSize={toggleFontSize}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

App.getInitialProps = storeWrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
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

  // Client-side-only code
  if (typeof window !== 'undefined') {
    return initializeClientSideProps({ Component, ctx, store });
  }

  // Ignore server side initialization for now
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx, hasFullyLoaded) : {}),
  };

  pageProps.globalVars = globalVars;
  pageProps.hasFullyLoaded = hasFullyLoaded;

  return { pageProps };
});

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  ctx: PropTypes.any,
};

export default storeWrapper.withRedux(App);
