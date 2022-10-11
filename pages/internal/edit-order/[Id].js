//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditOrderScreen from '../../../components/pages/editOrder/editOrder';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as OrdersActions from '../../../pages/api/actions/order';
import * as ClientsActions from '../../../pages/api/actions/client';
import * as ProductsActions from '../../../pages/api/actions/product';

const EditOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      await OrdersActions
        .order({id: router.query.Id})
        .then((res) => setOrder(res.data.payload));

      await ClientsActions
        .clients()
        .then((res) => setClients(res.data.payload.data));

      await ProductsActions.products().then((response) => setProducts(response.data.payload.data))

    };

    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.orders}`,
      },
      {
        title: `Editar Encomenda`,
        href: `${routes.private.internal.order}`,
      },
    ];

    const props = {
      order,
      breadcrumbsPath,
      pageProps,
      clients,
      products
    };
  

    return <EditOrderScreen {...props} />
   
  } else return <Loader center={true} />;
};

export default EditOrder;
