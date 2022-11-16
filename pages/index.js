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
    const loginSuccessRoute = routes.private.orders;
    const loginSuccessRouteTerms = routes.private.terms;

    const props = {
      client,
      login: authActions.login,
      me: authActions.me,
      loginSuccessRoute,
      loginSuccessRouteTerms
    };

    return <SignInScreen {...props} />;
  } else return <Loader center={true} />;

};

export default SignIn;
