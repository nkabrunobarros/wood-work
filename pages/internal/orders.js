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

export async function getServerSideProps(context) {
  const res = await getCategories();
  const res2 = await getOrders();
  const res3 = await getClients();

  return {
    props: { categories: res, orders: res2, clients: res3 }, // will be passed to the page component as props
  };
}

const Orders = ({ categories, orders, clients }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.internal.orders}`,
    },
  ];
  const items = orders;
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
  const tableCols = [
    'numero',
    'categoria',
    'stock',
    'produção',
    'em distribuição',
    'ações',
  ];

  const detailPage = routes.private.internal.order;
  const editPage = routes.private.internal.editOrder;

  const props = {
    categories,
    items,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage,
    internalPOV,
    cards,
    clients,
    editPage,
  };
  return loaded ? (
    <OrdersScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
Orders.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  internalPOV: PropTypes.boolean,
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default Orders;
