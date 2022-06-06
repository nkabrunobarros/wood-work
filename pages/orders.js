//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../components/loader/loader';
import OrdersScreen from '../components/pages/orders/orders';

import PropTypes from 'prop-types';

import { getCategories } from '../components/mock/Categories';
import {getOrders} from '../components/mock/Orders';
import routes from '../navigation/routes';
import { AlertOctagon, Layers, LayoutTemplate, PackageCheck } from 'lucide-react';

export async function getServerSideProps(context) {
  const res = await getCategories();
  const res2 = await getOrders();

  return {
    props: { categories: res, orders: res2 }, // will be passed to the page component as props
  };
}

const Orders = ({ categories, orders }) => {
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
      href: `${routes.private.orders}`,
    },
  ];
  const items = orders;

  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7,
  };
  const tableCols = [
    'numero',
    'categoria',
    'stock',
    'produção',
    'em distribuição',
    'ações',
  ];

  const detailPage = routes.private.order;
  const cards = [
    {
      num: 1,
      title: 'Em Orçamentação',
      amount: 2,
      icon: <PackageCheck size={40} />,
      color: 'var(--primary)'
    },
    {
      num: 2,
      title: 'Em Desenho',
      amount: 1,
      icon: <LayoutTemplate size={40} />,
      color: 'var(--green)'
    },
    {
      num: 3,
      title: 'Em Produção',
      amount: 3,
      icon: <Layers size={40} />,
      color: 'var(--orange)'
    },
    {
      num: 4,
      title: 'Concluidas',
      amount: 7,
      icon: <AlertOctagon size={40} />,
      color: 'var(--babyblue)'
    },
  ]

  const props = {
    categories,
    items,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage,
    cards
  };
  return loaded ? (
    <OrdersScreen {...props} />
  ) : (
    <div>
      <Loader center={true} />
    </div>
  );
};
Orders.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  cards: PropTypes.arrayOf(PropTypes.object),
  detailPage: PropTypes.any,
};

export default Orders;
