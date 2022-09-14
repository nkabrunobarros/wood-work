// Node modules
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Custom Components
import DrawerMobile from './drawer/drawer';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';
import Loader from '../loader/loader';
import jwt from 'jsonwebtoken';
import * as authActions from '../../src/actions/auth';
import * as permissionActions from '../../src/actions/permission';

//  Material UI
import { CssBaseline, Hidden } from '@mui/material';
import { parseCookies } from 'nookies';
import moment from 'moment';
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
        console.log('dont have user Logged in, but have token')
        const resUser = await authActions.me({ token })
        const user = resUser.data.payload;
        const permission = await permissionActions.permission({ id: user.idPerfil })
        const builtUser = {
          id: user.id,
          email: user.email,
          nome: user.nome,
          ativo: user.ativo,
          perfil: permission.data.payload
        }
        localStorage.setItem("user", JSON.stringify(builtUser));
        console.log(resUser)
        pageProps.loggedUser = builtUser;
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


const Layout = ({ children, ...pageProps }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      // check cookie 
      const isLoaded = await Test(pageProps);
      setLoaded(isLoaded);
      console.log(isLoaded)

      // validate cookie

      //  set pageProps

      // loade = true



      pageProps.loggedUser = JSON.parse(localStorage.getItem('user'));
    }
    Promise.all([load()]).then(() => setLoaded(true))
    console.log(Router.asPath)

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
      <Navbar openDrawer={handleDrawerToggle} {...pageProps} />
      <Hidden implementation='css'>
        <DrawerMobile
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          {...pageProps}
        />
      </Hidden>
      <div style={{ padding: '0rem 2rem 4rem 2rem', overflow: 'hidden' }}>
        {children}
      </div>
      <div style={{ width: '100%' }}>
        <Footer section={footer} />
      </div>
    </React.Fragment>
  ) : <Loader center={true} />
};
Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
