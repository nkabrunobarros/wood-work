//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditOrderScreen from '../../../components/pages/editOrder/editOrder';

//  Utils
import hasData from '../../../components/utils/hasData';

//  Navigation
import routes from '../../../navigation/routes';
import clientService from '../../../services/clients/client-service';

//  Services
import orderService from '../../../services/orders/order-service';

const EditOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const [clients, setClients] = useState();

  const router = useRouter();
  const orderId = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await orderService
        .getOrderById(orderId)
        .then((res) => setOrder(res.data.data));
      await clientService
        .getAllClients()
        .then((res) => setClients(res.data.data));
    };
    Promise.all([getAll()]).then(setLoaded(true));
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
      clients
    };
    if (hasData(order) && hasData(clients)) pageProps.hasFullyLoaded = true;
    return loaded && pageProps.hasFullyLoaded ? (
      <EditOrderScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default EditOrder;
