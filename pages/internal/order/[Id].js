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
import * as OrdersActions from '../../../pages/api/actions/order';
import * as FilesActions from '../../../pages/api/actions/file';

const Order = ({ ...pageProps }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const [files, setFiles] = useState();
  const orderId = router.query.Id;

  useEffect(() => {
    const getData = async () => {
      await OrdersActions
        .order({id: orderId})
        .then((res) => setOrder(res.data.payload));

      await FilesActions
        .files()
        .then((res) =>setFiles(res.data.payload.data));
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

    const headCellsProductionDetail = [
      {
        id: 'operacao',
        label: 'Operação',
      },
      {
        id: 'previsto1',
        label: 'Previsto',
      },
      {
        id: 'realizado',
        label: 'Realizado',
      },
      {
        id: 'desvio',
        label: 'Desvio',
      },
      {
        id: 'previstoAtual',
        label: 'Previsto (Atual)',
        borderLeft: true,
        borderRight: true,
      },
      {
        id: 'previsto2',
        label: 'Previsto',
      },
      {
        id: 'realizado2',
        label: 'Realizado',
      },
      {
        id: 'desvio2',
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
        label: 'Quantidade Produzida: 12 Un',
        span: 4,
      },
      {
        id: 'orderedAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Quantidade Encomendada: 25 Un',
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

    const productionDetail = [
      {
        id: Math.random(),
        operacao: 'Corte',
        previsto1: 18,
        realizado: 17,
        desvio: -1,
        previstoAtual: 34,
        previsto2: 1,
        realizado2: 1,
        desvio2: 0,
      },
    ];

    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.orders}`,
      },
      {
        title: `Encomenda Nº ${orderId}`,
        href: `${routes.private.internal.order}`,
      },
    ];

    const orderDetail = [
      {
        id: Math.random(),
        clienteTime: '04 abril 2022',
        real: '06 abril 2022',
        start: '17 março 2022',
        end: '06 abril 2022',
        time: 37,
      },
    ];

    //  Filters what can the user see depending of profile
    const internalPOV = true;

    const props = {
      order,
      breadcrumbsPath,
      internalPOV,
      productionDetail,
      headCellsUpperProductionDetail,
      headCellsProductionDetail,
      headCellsOrderDetail,
      headCellsUpperOrderDetail,
      headCellsMessages,
      headCellsDocs,
      pageProps,
      orderDetail,
      files,
    };


    return loaded && <OrderScreen {...props} />
  }

  return <Loader center={true} />;
};

export default Order;
