import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newOrder';
import routes from '../../navigation/routes';

import * as ClientActions from '../../pages/api/actions/client';
import * as ProductsActions from '../../pages/api/actions/product';

const NewOrder = ({...pageProps}) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const getData = async () => {
      await ClientActions.clients().then((response) => setClients(response.data.payload.data))
      await ProductsActions.products().then((response) => setProducts(response.data.payload.data))

      // await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data))
      // await ProductsActions.products().then((response) => setProducts(response.data.payload.data))
    }

    Promise.all([getData()]).then(() => setLoaded(true));

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

  console.log(clients)

  const props = {
    pageProps,
    breadcrumbsPath,
    clients,
    products,
  };

  return loaded ? <NewOrderScreen {...props} /> : <Loader center={true} />;
};

export default NewOrder;
