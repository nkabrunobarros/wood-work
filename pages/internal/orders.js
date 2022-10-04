/* eslint-disable array-callback-return */
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

import * as CategoriesActions from '../../pages/api/actions/category';
import * as ClientsActions from '../../pages/api/actions/client';
import * as OrdersActions from '../../pages/api/actions/order';
import * as StockActions from '../../pages/api/actions/stock';

//  Icons
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';

//  Utlis

const Orders = ({ globalVars }) => {
  const [panelsInfo, setPanelsInfo] = useState();
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [categories, setCategories] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        concluded: 0,
      }

      await OrdersActions.orders().then(async (response) => {

        response.data.payload.data.map(async (ord, i) => {
          switch (ord.status) {
            case 'Em orçamentação':
              counts.budgeting++;

              break;

            case 'Em desenho':
              counts.drawing++;

              break;

            case 'Em produçao':
              counts.production++;

              break;
            case 'Concluida':
              counts.concluded++;

              break;

            default:
              break;
          }

          await StockActions.stock({ id: ord.product.id }).then((res) => {
            response.data.payload.data[i].stock = res.data.payload.amount
          })

        })

        setOrders(response.data.payload.data);
        setPanelsInfo(counts)
      });

      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data))
      await ClientsActions.clients().then((response) => setClients(response.data.payload.data))
    }

    Promise.all([getData()]).then(() => setLoaded(true));
  }, [])

  console.log(loaded)

  if (loaded) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.orders}`,
      },
    ];

    const items = orders;
    const internalPOV = true;

    const cards = [
      {
        num: 1,
        title: 'Em Orçamentação',
        amount: panelsInfo.budgeting,
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
        amount: panelsInfo.drawing,
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
        amount: panelsInfo.production,
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
        title: 'Em Montagem e Testes',
        amount: panelsInfo.concluded,
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
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Numero',
      },
      {
        id: 'client.legalName',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
      },
      {
        id: 'product.category.name',
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
        id: 'order_prod',
        // id: 'order_prod',
        numeric: false,
        disablePadding: false,
        label: 'Produção',
      },
      {
        id: 'order_dispatch',
        // id: 'order_dispatch',
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
    
    return <OrdersScreen {...props} />
  } else return <Loader center={true} />
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
