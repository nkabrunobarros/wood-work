// Node modules
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Custom Components
import jwt from 'jsonwebtoken';
// import { navLinks } from '../utils/navLinks';

import { Box, Fab } from '@mui/material';
import { ChevronUp } from 'lucide-react';
import moment from 'moment';
import { parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../lib/AuthData';
import styles from '../../styles/404.module.css';

const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.signInInternal}`,
  `${routes.public.forgotPassword}`,
  `${routes.public.forgotPasswordInternal}`,
  `${routes.public.resetPassword}`,
  `${routes.public.resetPasswordInternal}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`,
  `${routes.private.privacy}`,
  `${routes.private.error}`,
  `${routes.private.internal.test}`,
  `${routes.private.internal.test2}`,
  `${routes.private.internal.test3}`,
];

async function ValidateToken (path) {
  const { auth_token: token } = parseCookies();

  !token && !noLayoutScreens.includes(path.route.replace('[Id]', '')) && Router.push('/');

  // Case token is valid
  if (token) {
    const decodedToken = jwt.decode(token);

    return !moment(new Date(0).setUTCSeconds(decodedToken?.exp)) > moment();
  }
}

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduxState = useSelector((state) => state);
  const path = useRouter();
  const dispatch = useDispatch();

  const listenToScroll = () => {
    const heightToHideFrom = 500;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      !isVisible && setIsVisible(true);
      isVisible && setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    async function load () {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && await AuthData(dispatch);

      // check cookie
      const isValid = await ValidateToken(path);

      setLoaded(isValid);
    }

    Promise.all([load()]).then(() => setLoaded(true));
    window.addEventListener('scroll', listenToScroll);

    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return loaded && <>{children}
    <Box className={styles.floatingBtnContainer} style={{ display: !isVisible && 'none', position: 'fixed', bottom: '10%', right: '5%' }}>
      <Fab
        aria-label="like"
        size={'medium'}
        color={'primary'}
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      >
        <ChevronUp color="white" />
      </Fab>
    </Box></>;

  // return <Loader center={true} />;
};

Layout.propTypes = {
  children: PropTypes.any,
  toggleTheme: PropTypes.any,
  toggleFontSize: PropTypes.any,
};

export default Layout;
