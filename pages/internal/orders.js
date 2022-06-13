//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';
import OrdersScreen from '../../components/pages/orders/orders';

import PropTypes from 'prop-types';

import { getCategories } from '../../components/mock/Categories';
import { getOrders } from '../../components/mock/Orders';
import routes from '../../navigation/routes';
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';
import { getClients } from '../../components/mock/Clients';
import orderService from '../../services/orders/order-service';
import hasData from '../../components/utils/hasData';

export async function getServerSideProps(context) {
  const res = await getCategories();
  const res2 = await getOrders();
  const res3 = await getClients();

  return {
    props: { categories: res, orders: res2, clients: res3 }, // will be passed to the page component as props
  };
}

const Orders = ({
  hasFullyLoaded,
  categories,
  orders,
  clients,
  ...pageProps
}) => {
  const [queryOrders, setQueryOrders] = useState();
  useEffect(() => {
    const getAllOrders = async () => {
      const res = await orderService.getAllOrders();
      setQueryOrders(res.data.data);
    };
    getAllOrders();
  }, []);
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.internal.orders}`,
    },
  ];
  const items = queryOrders;
  const internalPOV = true;
  const panelsInfo = {
    budgeting: 12,
    drawing: 11,
    production: 13,
    concluded: 17,
  };

  const cards = [
    {
      num: 1,
      title: 'Em Orçamentação',
      amount: 12,
      icon: <Layers size={40} />,
      color: 'var(--primary)',
    },
    {
      num: 2,
      title: 'Em Desenho',
      amount: 11,
      icon: <LayoutTemplate size={40} />,
      color: 'var(--green)',
    },
    {
      num: 3,
      title: 'Em Produção',
      amount: 13,
      icon: <PackagePlus size={40} />,
      color: 'var(--orange)',
    },
    {
      num: 4,
      title: 'Concluidas',
      amount: 17,
      icon: <Settings size={40} />,
      color: 'var(--babyblue)',
    },
  ];
  const headCells = [
    {
      id: 'numero',
      numeric: false,
      disablePadding: false,
      label: 'Numero',
    },
    {
      id: 'cliente',
      numeric: false,
      disablePadding: true,
      label: 'Cliente',
    },
    {
      id: 'categoria',
      numeric: false,
      disablePadding: true,
      label: 'Categoria',
    },
    {
      id: 'stock',
      numeric: false,
      disablePadding: false,
      label: 'Stock',
    },
    {
      id: 'produção',
      numeric: false,
      disablePadding: false,
      label: 'Produção',
    },
    {
      id: 'distribuição',
      numeric: false,
      disablePadding: false,
      label: 'Em distribuição',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];

  const detailPage = routes.private.internal.order;
  const editPage = routes.private.internal.editOrder;

  const props = {
    categories,
    items,
    panelsInfo,
    headCells,
    breadcrumbsPath,
    detailPage,
    internalPOV,
    cards,
    clients,
    editPage,
  };
  if (
    hasData(items) &&
    hasData(clients) &&
    hasData(categories)
  )
    hasFullyLoaded = true;

  return hasFullyLoaded ? (
    <OrdersScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
Orders.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  internalPOV: PropTypes.boolean,
  cards: PropTypes.arrayOf(PropTypes.object),
  hasFullyLoaded: PropTypes.bool,
};

export default Orders;
