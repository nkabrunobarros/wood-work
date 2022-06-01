//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';
import OrdersScreen from '../../components/pages/orders/orders';

import PropTypes from 'prop-types';

import { getCategories } from '../../components/mock/Categories';
import getOrders from '../../components/mock/Orders';
import routes from '../../navigation/routes';

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
    budgeting: 12,
    drawing: 11,
    production: 13,
    concluded: 17,
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

  const props = {
    categories,
    items,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage,
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
  detailPage: PropTypes.any,
};

export default Orders;
