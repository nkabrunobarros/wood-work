//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ResetPasswordScreen from '../components/pages/resetPassword/resetPassword';

//  Preloader
import Loader from '../components/loader/loader';
import PageNotFound from '../components/pages/404';

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function checkToken () {
      //  TODO: validar o token recebido se existe na BD
      // TODO: apenas se existir, é que se dá o state do token
      setToken(router.query);
    }

    Promise.all([checkToken()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const props = {
      token,
    };

    return token ? <ResetPasswordScreen {...props} /> : <PageNotFound />;
  }

  return <Loader center={true} />;
};

ResetPassword.propTypes = {

};

export default ResetPassword;
