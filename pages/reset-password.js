//  Nodes
import React, { useEffect, useState } from 'react';
import ResetPasswordScreen from '../components/pages/resetPassword/resetPassword';

//  Preloader
import Loader from '../components/loader/loader';
import PageNotFound from '../components/pages/404';

const ResetPassword = () => {
  const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function checkToken () {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get('token');
      const profile = urlParams.get('profile');
      const activationToken = urlParams.get('activationToken');

      setToken({ token, profile, activationToken });
    }

    Promise.all([checkToken()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const props = {
      params: token,
    };

    return token ? <ResetPasswordScreen {...props} /> : <PageNotFound />;
  }

  return <Loader center={true} />;
};

ResetPassword.propTypes = {

};

export default ResetPassword;
