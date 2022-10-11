// Node modules
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Custom Components
import jwt from 'jsonwebtoken';
import * as authActions from '../../pages/api/actions/auth';
import styles from '../../styles/404.module.css';
import Loader from '../loader/loader';
import IsInternal from '../utils/IsInternal';
import DrawerMobile from './drawer/drawer';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';

//  Material UI
import { Box, CssBaseline, Fab, Hidden, Tooltip } from '@mui/material';

import { ChevronUp } from 'lucide-react';
import moment from 'moment';
import { parseCookies } from 'nookies';

// Pages without layout (sidebar || navbar (these have footer inbued in the page)  )
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`,
  // `${routes.public.internal.signInClient}`,
];

async function Test(pageProps) {
  const { auth_token: token } = parseCookies();

  // Case token is valid
  if (token) {
    const decodedToken = jwt.decode(token);

    if (moment(new Date(0).setUTCSeconds(decodedToken.exp)) > moment()) {
      //  case token is valid still
      if (pageProps.loggedUser) {
        // case it gets here, has token and user on pageProps
        return true;
      }
      else {
        const u = JSON.parse(localStorage.getItem('user'))

        pageProps.loggedUser = u;

        const resUser = await authActions.me({ token })

        localStorage.setItem("user", JSON.stringify(resUser.data.payload));
        pageProps.loggedUser = resUser.data.payload;

        return true;
      }
    } else {
      console.log('token is invalid')
      //  case token is invalid
    }

  } else {
    // Case no token at all on cookie
    authActions.logout()
  }
}


const Layout = ({ children, toggleTheme, ...pageProps }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouter();
  const [loaded, setLoaded] = useState(false);
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''))
  const [isVisible, setIsVisible] = useState(false);

  if (typeof window !== "undefined") pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));


  const listenToScroll = () => {
    const heightToHideFrom = 500;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      !isVisible && setIsVisible(true)
      isVisible && setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);

    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);


  useEffect(() => {
    async function load() {
      // check cookie 
      const isLoaded = await Test(pageProps);

      pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));
      setLoaded(isLoaded);
    }

    Promise.all([load()]).then(() => setLoaded(true))
  }, [])

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const clientPages = [
    `${routes.private.messages}`,
    `${routes.private.order}`,
    `${routes.private.orders}`,
    `${routes.private.profile}`,
  ];

  let footer = '';

  if (clientPages.includes(path.route)) footer = 'client';

  if (noLayoutScreens.includes(path.route)) return children;

  return loaded ? (
    <React.Fragment>
      <CssBaseline />
      <Navbar openDrawer={handleDrawerToggle} toggleTheme={toggleTheme} {...pageProps} />
      <Hidden implementation='css'>
        <DrawerMobile
          toggleTheme={toggleTheme}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          {...pageProps}
        />
      </Hidden>
      <div style={{ padding: '0rem 2rem 4rem 2rem', overflow: 'hidden' }}>
        {IsInternal(pageProps.loggedUser?.perfil.descricao) === isInternalPage ? <>
          {children}
          {isVisible && (
            <Box className={styles.floatingBtnContainer} style={{ position: 'fixed', bottom: '10%', right: '5%' }}>
              <Fab
                aria-label="like"
                size={'medium'}
                color={'primary'}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                <ChevronUp color="white" />
              </Fab>
            </Box>
          )}
        </>
          : <>
            <div className={styles.main} target="_blank" rel="noreferrer">
              <header className={styles.topheader}></header>

              <div>
                <div className={styles.starsec}></div>
                <div className={styles.starthird}></div>
                <div className={styles.starfourth}></div>
                <div className={styles.starfifth}></div>
              </div>
              {/* Lamp section */}
              {/* <div className={styles.lamp__wrap}>
  <div className={styles.lamp}>
    <div className={styles.cable}></div>
    <div className={styles.cover}></div>
    <div className={styles.in}>
      <div className={styles.bulb}></div>
    </div>
    <div className={styles.light}></div>
  </div>
</div> */}
              <section className={styles.error}>
                <div className={styles.error__content}>
                  <div className={styles.error__message}>
                    <h1 className={styles.message__title}>Você não tem acesso a esta página</h1>
                    <p className={styles.message__text}>

                      Se é suposto ter acesso a esta página, por favor entre em
                      <Tooltip title='Enviar email'>
                        <a href={`mailto:${process.env.NEXT_PUBLIC_REPORT_EMAIL}`} className='link'> contacto </a>
                      </Tooltip>
                      com o responsavel
                    </p>
                  </div>
                  <div className={styles.error__nav}>
                    <a className={styles.enav__link} onClick={() => Router.back()}>
                      {/* <a className={styles.enav__link} onClick={() => Router.push(routes.private.internal.orders)}> */}
                      VOLTAR
                    </a>
                  </div>
                </div>
              </section>
            </div></>}

      </div>
      <div style={{ width: '100%' }}>
        <Footer section={footer} />
      </div>
    </React.Fragment>
  ) : <Loader center={true} />
};

Layout.propTypes = {
  children: PropTypes.any,
  toggleTheme: PropTypes.any,
};

export default Layout;
