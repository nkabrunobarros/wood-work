// Node modules
import Router from 'next/router';
import { useEffect } from 'react';
import hasData from '../../components/utils/hasData';

export default function useAuthValidation(hasFullyLoaded, loggedUser, route) {
  const user = loggedUser;
  console.log(user);
  useEffect(() => {
    // Trigger client side update on loginData
    if (!user && !hasFullyLoaded) {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      if (
        !hasData(localStorage.getItem('user')) &&
        !hasData(sessionStorage.getItem('user'))
      )
        Router.push(route);
    } else return true;
  }, []);
}
