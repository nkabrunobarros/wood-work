import React, { useEffect, useState } from 'react';
import Loader from '../components/loader/loader';
import SignInScreen from '../components/pages/signin/signin';
import * as authActions from '../pages/api/actions/auth';

//  Navigation
import routes from '../navigation/routes';

const SignIn = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  if (loaded) {
    const client = true;
    const loginSuccessRoute = routes.private.projects;
    const loginSuccessRouteTerms = routes.private.terms;
    const forgotPasswordRoute = routes.public.forgotPassword;

    const props = {
      client,
      login: authActions.loginClient,
      me: authActions.me,
      loginSuccessRoute,
      loginSuccessRouteTerms,
      forgotPasswordRoute
    };

    return <SignInScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default SignIn;
