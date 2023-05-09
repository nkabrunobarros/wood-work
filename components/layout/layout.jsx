/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
// Node modules
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//  PropTypes

//  Navigation
import routes from '../../navigation/routes';

//  Custom Components
import jwt from 'jsonwebtoken';
// import { navLinks } from '../utils/navLinks';

import { parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from '../../components/pages/404';
import AuthData from '../../lib/AuthData';
import FloatingButton from '../../components/floatingButton/FloatingButton';

const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.signInInternal}`,
  `${routes.public.forgotPassword}`,
  `${routes.public.forgotPasswordInternal}`,
  `${routes.public.resetPassword}`,
  `${routes.public.accountActivation}`,
  `${routes.public.resetPasswordInternal}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`,
  `${routes.private.privacy}`,
  `${routes.private.error}`,
];

async function ValidateToken (path) {
  const { auth_token: token } = parseCookies();

  !token && !noLayoutScreens.includes(path.route.replace('[Id]', '')) && Router.push('/');

  // Case token is valid
  if (token) {
    const decodedToken = jwt.decode(token);

    return !!decodedToken;
  }
}

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
  const reduxState = useSelector((state) => state);
  const path = useRouter();
  const dispatch = useDispatch();

  const listenToScroll = () => {
    const heightToHideFrom = 500;
    const winScroll = window.pageYOffset;

    setIsVisible(winScroll > heightToHideFrom);
  };

  useEffect(() => {
    const load = async () => {
      let me = reduxState.auth.me;

      if (!reduxState.auth.me || !reduxState.auth.userPermissions) {
        me = await AuthData(dispatch);
      }

      const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));
      const isClientPage = Object.values(routes.private).includes(path.route.replace('[Id]', ''));

      if ((isInternalPage && me?.me?.role === 'CUSTOMER') || (isClientPage && me?.me?.role !== 'CUSTOMER') || me?.response?.status === 403) {
        setNoAccess(true);
      }

      if (me?.me?.role === 'CUSTOMER' && me.me.tos === false) {
        // Router.push('/terms');
      }

      // check cookie
      const isValid = await ValidateToken(path);

      setLoaded(isValid);
    };

    load();
    window.addEventListener('scroll', listenToScroll);

    return () => window.removeEventListener('scroll', listenToScroll);
  }, [path.route, reduxState.auth.me, reduxState.auth.userPermissions]);

  return (
    <>
      {loaded && !noAccess && children}
      {loaded && noAccess && <PageNotFound noAccess />}
      <FloatingButton isVisible={isVisible} />
    </>
  );

  // return <Loader center={true} />;
};

export default Layout;
