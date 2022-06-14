//  Nodes
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import OrderScreen from '../../../components/pages/order/order';

//  Utils
import hasData from '../../../components/utils/hasData';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import orderService from '../../../services/orders/order-service';

const Order = ({ ...pageProps }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const orderId = router.query.Id;

  useEffect(() => {
    const getOrder = async () => {
      await orderService
        .getOrderById(orderId)
        .then((res) => setOrder(res.data.data));
    };

    getOrder();
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

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
    docs,
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
  };
  if (hasData(order)) pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? (
    <OrderScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
export default Order;
