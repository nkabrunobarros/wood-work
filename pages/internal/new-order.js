import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newOrder';
import routes from '../../navigation/routes';
const NewOrder = (...pageProps) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.internal.orders}`,
    },
    {
      title: 'Nova Encomenda',
      href: `${routes.private.internal.orders}`,
    },
  ];
  const props = {
    breadcrumbsPath,
  };

  return loaded ? <NewOrderScreen {...props} /> : <Loader center={true} />;
};
export default NewOrder;
