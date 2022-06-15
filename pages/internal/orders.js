//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../../navigation/routes';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrdersScreen from '../../components/pages/orders/orders';

//  Proptypes
import PropTypes from 'prop-types';

//  Data services
import orderService from '../../services/orders/order-service';
import clientService from '../../services/clients/client-service';
import categoryService from '../../services/categories/category-service';

//  Icons
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';

//  Utlis
import hasData from '../../components/utils/hasData';

const Orders = ({ hasFullyLoaded, globalVars }) => {
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [categories, setCategories] = useState();
  const [loaded, setLoaded] = useState(false);
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
  //  Breadcrumbs path feed
  if (loaded) {
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
        icon: (
          <Layers
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--primary)',
      },
      {
        num: 2,
        title: 'Em Desenho',
        amount: 11,
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
        amount: 13,
        icon: (
          <PackagePlus
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--orange)',
      },
      {
        num: 4,
        title: 'Concluidas',
        amount: 17,
        icon: (
          <Settings
            size={globalVars.iconSizeXl}
            strokeWidth={globalVars.iconStrokeWidth}
          />
        ),
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
    if (hasData(items) &&
     hasData(clients) &&
      hasData(categories) &&
      hasData(panelsInfo) &&
      hasData(headCells) &&
      hasData(breadcrumbsPath) &&
      hasData(detailPage) &&
      hasData(editPage) &&
      hasData(cards))
      hasFullyLoaded = true;

    return hasFullyLoaded ? (
      <OrdersScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
Orders.propTypes = {
  categories: PropTypes.array.isRequired,
  panelsInfo: PropTypes.object.isRequired,
  headCells: PropTypes.array.isRequired,
  breadcrumbsPath: PropTypes.array.isRequired,
  clients: PropTypes.array.isRequired,
  detailPage: PropTypes.string.isRequired,
  editPage: PropTypes.string.isRequired,
  internalPOV: PropTypes.boolean,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasFullyLoaded: PropTypes.bool,
  globalVars: PropTypes.object,
};

export default Orders;
