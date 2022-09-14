//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../components/loader/loader';

//  Page Component
import OrdersScreen from '../components/pages/orders/orders';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../navigation/routes';

//  Icons
import {
  AlertOctagon,
  Layers,
  LayoutTemplate,
  PackageCheck,
} from 'lucide-react';

//  Utlis
import hasData from '../components/utils/hasData';

//  Data services
import orderService from '../services/orders/order-service';
import clientService from '../services/clients/client-service';
import categoryService from '../services/categories/category-service';

const Orders = ({ hasFullyLoaded, globalVars }) => {
  const [loaded, setLoaded] = useState(false);
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getAll = async () => {
      await orderService.getAllOrders().then((res) => setOrders(res.data.data));
      await clientService
        .getAllClients()
        .then((res) => setClients(res.data.data));
      await categoryService
        .getAllCategories()
        .then((res) => setCategories(res.data.data));
    };
    Promise.all([getAll()]).then(setLoaded(true));
  }, []);
  if (loaded) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.orders}`,
      },
    ];
    const items = orders;
    const headCells = [
      {
        id: 'numero',
        numeric: false,
        disablePadding: false,
        label: 'Numero',
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
    const panelsInfo = {
      budgeting: 2,
      drawing: 1,
      production: 3,
      concluded: 7,
    };

    const detailPage = routes.private.order;

    const cards = [
      {
        num: 1,
        title: 'Em Orçamentação',
        amount: 2,
        icon: (
          <PackageCheck
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--primary)',
      },
      {
        num: 2,
        title: 'Em Desenho',
        amount: 1,
        icon: (
          <LayoutTemplate
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--green)',
      },
      {
        num: 3,
        title: 'Em Produção',
        amount: 3,
        icon: (
          <Layers
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--orange)',
      },
      {
        num: 4,
        title: 'Concluídas',
        amount: 7,
        icon: (
          <AlertOctagon
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--babyblue)',
      },
    ];

    const props = {
      categories,
      items,
      panelsInfo,
      headCells,
      breadcrumbsPath,
      detailPage,
      cards,
      clients,
    };
    let loaded = false;
    if (hasData(items) && hasData(clients) && hasData(categories)) loaded = true;

    return loaded ? <OrdersScreen {...props} /> : <Loader center={true} />
  }
};

Orders.propTypes = {
  categories: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  panelsInfo: PropTypes.object.isRequired,
  headCells: PropTypes.array.isRequired,
  breadcrumbsPath: PropTypes.array.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  detailPage: PropTypes.any.isRequired,
  clients: PropTypes.array.isRequired,
  hasFullyLoaded: PropTypes.bool,
  globalVars: PropTypes.any,
};

export default Orders;
