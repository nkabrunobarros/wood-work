import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newOrder';
import routes from '../../navigation/routes';

import * as ClientActions from '../../pages/api/actions/client';
import * as ProductsActions from '../../pages/api/actions/product';
// import * as StockActions from '../../pages/api/actions/stock';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const getData = async () => {
      await ClientActions.clients().then((response) => setClients(response.data.payload.data));

      await ProductsActions.products().then((response) => {
        setProducts(response.data.payload.data);
        // console.log(response.data.payload.data)

        //   response.data.payload.data.map(async (ord, i) => {
        //     try {
        //       await StockActions.stock({ id: ord.id }).then((res) => {
        //         response.data.payload.data[i].stock = res.data.payload.amount
        //       })  

        //     } catch (err) {
        //       console.log('err')
        //       response.data.payload.data[i].stock = null

        //     }
        // })

      });
    };

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

  const props = {
    pageProps,
    breadcrumbsPath,
    clients,
    products,
  };

  return loaded ? <NewOrderScreen {...props} /> : <Loader center={true} />;
};

export default NewOrder;
