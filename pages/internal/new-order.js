import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newOrder';
import routes from '../../navigation/routes';
const NewOrder = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.internal.orders}`,
    },
  ];
  const props = {
    breadcrumbsPath
  };

  return loaded ? (
    <NewOrderScreen {...props} />
  ) : (
    <div>
      <Loader center={true} />
    </div>
  );
};
export default NewOrder;
