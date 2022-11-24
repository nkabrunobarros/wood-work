//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrderScreen from '../../components/pages/project/project';

//  Navigation
import routes from '../../navigation/routes';

//  Services
import * as ClientsActions from '../api/actions/client';
import * as ExpeditionsActions from '../api/actions/expedition';
import * as ProjectsActions from '../api/actions/project';

const Order = ({ ...pageProps }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();

  useEffect(() => {
    const getData = async () => {
      await ProjectsActions.project({ id: router.query.Id }).then(async (res) => {
        const thisOrder = res.data[0];

        await ClientsActions.client({ id: thisOrder.orderBy.object }).then(async (clientRes) => {
          thisOrder.orderBy.object = clientRes.data[0];
        });

        await ExpeditionsActions.expedition({ id: thisOrder.expedition.object }).then(async (expeditionRes) => {
          thisOrder.expedition.object = expeditionRes.data[0];
        });

        setOrder(thisOrder);
      });


    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {

    const headCellsUpperOrderDetail = [
      {
        id: 'deadline',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Data de Entrega',
        span: 2,
      },
      {
        id: 'production',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Produção',
        span: 2,
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Quantidade Encomendada: 25 Un',
        span: 1,
      },
    ];

    const headCellsOrderDetail = [
      {
        id: 'clienteTime',
        label: 'Cliente',
      },
      {
        id: 'real',
        label: 'Real',
      },
      {
        id: 'start',
        label: 'Inicio',
        borderLeft: true,
      },
      {
        id: 'end',
        label: 'Fim',
        borderRight: true,
      },
      {
        id: 'time',
        disablePadding: false,
        label: 'Tempo',
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

    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: `Encomenda Nº ${order.name.value}`,
        href: `${routes.private.internal.project}`,
      },
    ];

    const orderDetail = [
      {
        id: Math.random(),
        startAt: order?.order?.startAt,
        real: '06 abril 2022',
        start: '17 março 2022',
        endAt: order?.order?.endAt,
        time: `${order?.product?.craftTime * order?.amount} H`,
      },
    ];

    //  Filters what can the user see depending of profile
    const props = {
      order,
      breadcrumbsPath,
      headCellsOrderDetail,
      headCellsUpperOrderDetail,
      headCellsDocs,
      pageProps,
      orderDetail,
      folders: [],
    };

    return <OrderScreen {...props} />;
  } else return <Loader center={true} />;
};

export default Order;
