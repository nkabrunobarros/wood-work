// Node modules
import Router from 'next/router';
import { useEffect } from 'react';
import hasData from '../../components/utils/hasData';

export default function useAuthValidation(hasFullyLoaded, loggedUser, route) {
  const user = loggedUser;
  useEffect(() => {
    // Trigger client side update on loginData
    if (!user && !hasFullyLoaded) {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      if (
        !hasData(localStorage.getItem('token')) &&
        !hasData(sessionStorage.getItem('token'))
      )
        Router.push(route);
    } else return true;
  }, []);
}
