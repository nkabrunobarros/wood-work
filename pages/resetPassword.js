//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ResetPasswordScreen from '../components/pages/resetPassword/resetPassword';

//  Navigation

//  PropTypes

//  Styling

//  Preloader
import Loader from '../components/loader/loader';
import PageNotFound from '../components/pages/404';

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const [clientType, setClientType] = useState();
  const [loaded, setLoaded] = useState(false);

  console.log('aqui');

  useEffect(() => {
    function checkToken() {
      console.log(router.query);
      //  TODO: validar o token recebido se existe na BD
      // TODO: apenas se existir, é que se dá o state do token
      setToken(router.query?.token);
      setClientType(router.query?.type);
    }

    Promise.all([checkToken()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const props = {
      token,
      clientType
    };

    return token ? <ResetPasswordScreen {...props} /> : <PageNotFound />;
  }

  return <Loader center={true} />;
};

ResetPassword.propTypes = {

};

export default ResetPassword;
