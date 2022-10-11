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
// eslint-disable-next-line sort-imports
import { createTheme, ThemeProvider } from '@mui/material';

//  Navigation
import routes from '../navigation/routes';

//  Utils

//  Momment
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { destroyCookie, parseCookies } from 'nookies';
import IsInternal from '../components/utils/IsInternal';
import AppContext from './AppContenxt';


const App = ({ Component, pageProps }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const theme = createTheme({
    palette: {
      mode: selectedTheme,

      primary: {
        main: '#225EE8',
      },
      default: {
        main: selectedTheme === 'light' ? '#fff' : '#282828',
      },
      lightGray: {
        main: selectedTheme === 'light' ? 'var(--grayBG)' : '#383838',
      },
      lightTextSm: {
        main: selectedTheme === 'light' ? '#8c8c8c' : 'rgba(255, 255, 255, 0.7)',
        black: selectedTheme === 'light' ? 'black' : 'var(--white)'
      }
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
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828'
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            width: '100%'
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' && 'var(--grayBG)'
          }
        }
      }
    },
  });


  const { auth_token: token } = parseCookies();
  const router = useRouter();

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'

    localStorage.setItem('theme', desiredTheme)
    setSelectedTheme(desiredTheme)

    return desiredTheme
  }


  useEffect(() => {
    const load = () => {
      //  theme
      if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light')
      else if (selectedTheme !== localStorage.getItem('theme')) setSelectedTheme(localStorage.getItem('theme'))


      if (token) {
        const decodedToken = jwt.decode(token);

        if (moment(new Date(0).setUTCSeconds(decodedToken.exp)) > moment()) {
          pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));
          pageProps.theme = selectedTheme

          const isPublicPage = Object.values(routes.public).some((route) => route === router.route);

          if (isPublicPage && !!token) {
            if (IsInternal(pageProps.loggedUser.perfil.descricao)) router.push(routes.private.internal.orders)
            else {
              if (pageProps.loggedUser.tos) router.push(routes.private.orders);
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
        <Layout {...pageProps} toggleTheme={toggleTheme}>
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
