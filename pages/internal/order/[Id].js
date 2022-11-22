//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import OrderScreen from '../../../components/pages/order/order';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
// import * as FilesActions from '../../../pages/api/actions/file';
// import * as FolderActions from '../../../pages/api/actions/folder';
// import * as OrdersActions from '../../../pages/api/actions/order';
import * as ClientsActions from '../../../pages/api/actions/client';
import * as ExpeditionsActions from '../../../pages/api/actions/expedition';
import * as ProjectsActions from '../../../pages/api/actions/project';

const Order = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const [folders, setFolders] = useState([]);
  const router = useRouter();

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
        //   await FolderActions
        //     .folders({ id: res.data.id })
        //     .then(async (res) => {
        //       res.data.payload.data.map(async (fold, i) => {
        //         res.data.payload.data[i].files = [];

        //         await FilesActions
        //           .files({ id: fold.id })
        //           .then((result) => res.data.payload.data[i].files.push(result.data.payload.data))
        //           .catch((err) => console.log(err));
        //       });

        //       setFolders(res.data.payload.data);

        //     })
        //     .catch((err) => console.log(err));
        // });
      });
    };

    Promise.all([getData()])
      .then(() => setLoaded(true));
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
        label: `Quantidade Encomendada: ${order?.amount.value} Un`,
        span: 1,
      },
    ];

    const headCellsOrderDetail = [
      {
        id: 'startAt',
        label: 'Cliente',
      },
      {
        id: 'startAt',
        label: 'Real',
      },
      {
        id: 'startAt',
        label: 'Inicio',
        borderLeft: true,
      },
      {
        id: 'endAt',
        label: 'Fim',
        borderRight: true,
      },
      {
        id: 'time',
        disablePadding: false,
        label: 'Tempo',
      },
    ];

    const headCellsProductionDetail = [
      {
        id: 'operacao.value',
        label: 'Operação',
      },
      {
        id: 'previsto1.value',
        label: 'Previsto',
      },
      {
        id: 'realizado1.value',
        label: 'Realizado',
      },
      {
        id: 'desvio',
        label: 'Desvio',
      },
      {
        id: 'previstoAtual.value',
        label: 'Previsto (Atual)',
        borderLeft: true,
        borderRight: true,
      },
      {
        id: 'previsto2.value',
        label: 'Previsto',
      },
      {
        id: 'realizado2.value',
        label: 'Realizado',
      },
      {
        id: 'desvio2.value',
        label: 'Desvio',
      },
    ];

    const headCellsUpperProductionDetail = [
      {
        id: 'amountDone',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Produzida: ${order?.completed || 0} Un`,
        span: 4,
      },
      {
        id: 'orderedAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: `Quantidade Encomendada: ${order?.amount?.value} Un`,
        span: 1,
      },
      {
        id: 'perUnit',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Por Unidade',
        span: 3,
      },
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
        href: `${routes.private.internal.orders}`,
      },
      {
        title: `Encomenda ${order.name.value}`,
        href: `${routes.private.internal.order}`,
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

    const productionDetail = [
      {
        operacao: order?.status,
        previsto1: `${order?.product?.craftTime * order?.amount} H`,
        realizado1: `${18} H`,
        desvio: (order?.product?.craftTime * order?.amount) - 18,
        previstoAtual: 20,
        previsto2: order?.product?.craftTime,
        realizado2: 2,
        desvio2: -2
      }
    ];

    //  Test para calcular diferença entre duas datas 
    // const days = moment(order.order.endAt).diff(moment(order.order.startAt), 'hours');

    // console.log(days)

    const props = {
      order,
      breadcrumbsPath,
      headCellsUpperProductionDetail,
      headCellsProductionDetail,
      headCellsUpperOrderDetail,
      headCellsOrderDetail,
      headCellsMessages,
      productionDetail,
      headCellsDocs,
      orderDetail,
      pageProps,
      folders,
    };

    return <OrderScreen {...props} />;
  } else return <Loader center={true} />;

};

export default Order;
