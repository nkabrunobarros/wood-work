//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';
import OrdersScreen from '../../components/pages/ordersSimilar/orders-similar';

import PropTypes from 'prop-types';

import routes from '../../navigation/routes';
import { getOrders } from '../../components/mock/Orders';
import { getClients } from '../../components/mock/Clients';
import { getWoodTypes } from '../../components/mock/WoodTypes';
import { getProducts } from '../../components/mock/Products';

export async function getServerSideProps(context) {
  const res = getOrders();
  const clientsRes = getClients();
  const woods = getWoodTypes();
  const prods = getProducts();
  return {
    props: {
      items: res,
      clients: clientsRes,
      woodTypes: woods,
      products: prods,
    }, // will be passed to the page component as props
  };
}

const OrdersSimilar = ({ items, clients, woodTypes, products }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas Similares',
      href: `${routes.private.internal.ordersSimilar}`,
    },
  ];

  const headCellsUpper = [
    {
      id: 'amountProduced',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Quantidade Produzida:12 Un',
      span: 6,
    },
    {
      id: 'orderAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Quantidade Encomendada:25 Un',
      span: 1,
    },
    {
      id: 'perUnit',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Por unidade',
      span: 5,
    },
  ];
  const headCells = [
    {
      id: 'productId',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'cliente',
      numeric: false,
      disablePadding: true,
      label: 'Cliente',
    },
    {
      id: 'numero',
      numeric: false,
      disablePadding: false,
      label: 'Num. Encomenda',
    },
    {
      id: 'previsto',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'realizado',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'horasAtuais',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Horas Atuais',
    },
    {
      id: 'previsto2',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'custo',
      numeric: false,
      disablePadding: false,
      label: 'Custo',
    },
    {
      id: 'realizado2',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio2',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];

  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7,
  };
  const tableCols = [
    'nome',
    'numEncomenda',
    'cliente',
    'previsto',
    'realizado',
    'desvio',
    'horasAtuais',
    'previsto2',
    'custo',
    'realizado2',
    'desvio2',
    'ações',
  ];

  function formatNum(val1, val2) {
    const res = val1 - val2;

    if (Number.isInteger(res)) return res;
    else return res.toFixed(2);
  }

  items.map(
    (item, i) => (items[i].desvio = formatNum(item.previsto, item.realizado))
  );
  items.map(
    (item, i) => (items[i].desvio2 = formatNum(item.previsto2, item.realizado2))
  );

  const detailPage = routes.private.order;

  const operations = [
    {
      label: 'Corte',
      value: 'Corte',
    },
    {
      label: 'Montagem',
      value: 'Montagem',
    },
    {
      label: 'Colagem',
      value: 'Colagem',
    },
  ];

  const props = {
    items,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage,
    clients,
    woodTypes,
    products,
    operations,
    headCellsUpper,
    headCells,
  };
  return loaded ? <OrdersScreen {...props} /> : <Loader center={true} />;
};
OrdersSimilar.propTypes = {
  items: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string,
  clients: PropTypes.array,
  woodTypes: PropTypes.array,
  products: PropTypes.array,
  operations: PropTypes.array,
  headCellsUpper: PropTypes.array,
  headCells: PropTypes.array,
};

export default OrdersSimilar;
