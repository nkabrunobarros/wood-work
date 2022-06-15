//  Nodes
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrderScreen from '../../components/pages/order/order';

//  Utils
import hasData from '../../components/utils/hasData';

//  Navigation
import routes from '../../navigation/routes';

//  Services
import orderService from '../../services/orders/order-service';

const Order = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const router = useRouter();
  const orderId = router.query.Id;

  useEffect(() => {
    const getData = async () => {
      await orderService
        .getOrderById(orderId)
        .then((res) => setOrder(res.data.data));
    };
    Promise.all([getData()]).then(setLoaded(true));
  }, []);

  if (loaded) {
    const docs = [
      {
        id: 1,
        name: 'Desenho 1',
        data: '11/03/2022',
        fileSize: ' 150 Mb',
        createdAt: '11 de Fevereiro 2022',
        updatedAt: '02 de Março de 2022',
      },
      {
        id: 2,
        name: 'Maquete 1',
        data: '12/03/2022',
        fileSize: ' 170 Mb',
        createdAt: '11 de Janeiro 2022',
        updatedAt: '04 de Março de 2022',
      },
      {
        id: 3,
        name: 'Desenho 2',
        data: '13/03/2022',
        fileSize: ' 22 Mb',
        createdAt: '14 de Fevereiro 2022',
        updatedAt: '01 de Março de 2022',
      },
      {
        id: 4,
        name: 'Maquete 2',
        data: '14/03/2022',
        fileSize: ' 1 Gb',
        createdAt: '23 de Fevereiro 2022',
        updatedAt: '22 de Março de 2022',
      },
    ];
    const headCellsDocs = [
      {
        id: 'nome',
        label: 'Nome',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
      {},
    ];
    const headCellsMessages = [
      {
        id: 'mensagem',
        label: 'Mensagem',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
    ];
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.orders}`,
      },
      {
        title: `Encomenda Nº${orderId}`,
        href: `${routes.private.profile}`,
      },
    ];

    const props = {
      order,
      docs,
      breadcrumbsPath,
      headCellsMessages,
      headCellsDocs,
      pageProps,
    };
    if (hasData(order)) pageProps.hasFullyLoaded = true;
    return loaded && pageProps.hasFullyLoaded ? (
      <OrderScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default Order;
