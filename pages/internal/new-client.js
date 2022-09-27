import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewClientScreen from '../../components/pages/newClient/newClient';
import routes from '../../navigation/routes';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  const breadcrumbsPath = [
    {
      title: 'Clientes',
      href: `${routes.private.internal.clients}`,
    },
    {
      title: 'Novo Cliente',
      href: `${routes.private.internal.newClient}`,
    },
  ];

  const props = {
    breadcrumbsPath,
    pageProps
  };

  return loaded ? <NewClientScreen {...props} /> : <Loader center={true} />;
};

export default NewOrder;
