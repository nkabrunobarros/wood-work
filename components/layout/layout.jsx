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
// import { navLinks } from '../utils/navLinks';

import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import FloatingButton from '../../components/floatingButton/FloatingButton';
import PageNotFound from '../../components/pages/404';
import AuthData from '../../lib/AuthData';

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

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
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
    const { auth_token: authToken } = parseCookies();
    const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));
    const isClientPage = Object.values(routes.private).includes(path.route.replace('[Id]', ''));

    const verifyToken = async () => {
      if (!authToken) {
        // Token not found, redirect to login page
        !noLayoutScreens.includes(path.route.replace('[Id]', '')) && Router.push(isInternalPage ? '/signin' : isClientPage && '/');

        return;
      }

      try {
        const meRes = await AuthData(dispatch);

        if ((isInternalPage && meRes?.me?.role === 'CUSTOMER') || (isClientPage && meRes?.me?.role !== 'CUSTOMER') || meRes?.response?.status === 403) {
          setNoAccess(true);
        }
        // If the token is valid, do nothing
      } catch (error) {
        console.log(error);

        if (error.response?.status === 403) {
          // Invalid token, delete cookie and redirect to login page
          destroyCookie(null, 'auth_token');
          Router.push('/signin');
        }
      }
    };

    window.addEventListener('scroll', listenToScroll);
    Promise.all([verifyToken()]).then(() => setLoaded(true));

    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return loaded && noAccess
    ? <PageNotFound noAccess />
    : loaded && <>
      {children}
      <FloatingButton isVisible={isVisible}/>
    </>;

  // return <Loader center={true} />;
};

export default Layout;
