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
import * as ProductsActions from '../../pages/api/actions/product';

//  Icons
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';

const Orders = ({ ...pageProps }) => {
  const [panelsInfo, setPanelsInfo] = useState();
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [loaded, setLoaded] = useState(false);
  const detailPage = routes.private.internal.order;
  const editPage = routes.private.internal.editOrder;

  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        concluded: 0,
      };

      await OrdersActions.ordersProduction().then(async (response) => {
        response.data.payload.data.map(async (ord, i) => {
          switch (ord.order.status.toLowerCase()) {
            case 'em orçamentação':
              counts.budgeting++;

              break;

            case 'em desenho':
              counts.drawing++;

              break;

            case 'em produção':
              counts.production++;

              break;
            case 'concluida':
              counts.concluded++;

              break;

            default:
              break;
          }
          // filters on 1st level

          response.data.payload.data[i].orderId = response.data.payload.data[i].order.id;
          response.data.payload.data[i].productId = response.data.payload.data[i].product.id;
          response.data.payload.data[i].clientId = response.data.payload.data[i].order.client.id;
        });

        setOrders(response.data.payload.data);
        setPanelsInfo(counts);
      });

      await ProductsActions.products().then((response) => setProducts(response.data.payload.data));
      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data));
      await ClientsActions.clients().then((response) => setClients(response.data.payload.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  // const pos = [
  //   'O', null, 'X',
  //   'O', 'X', 'O',
  //   'X', null, null,
  // ];

  // //  Horizontal
  // if (pos[0] === pos[1] && pos[0] === pos[2]) console.log('winner : ', pos[0])

  // if (pos[3] === pos[4] && pos[3] === pos[5]) console.log('winner : ', pos[3])

  // if (pos[6] === pos[7] && pos[6] === pos[8]) console.log('winner : ', pos[6])

  // //  VERTICAL
  // if (pos[0] === pos[3] && pos[0] === pos[6]) console.log('winner : ', pos[0])

  // if (pos[1] === pos[4] && pos[1] === pos[7]) console.log('winner : ', pos[1])

  // if (pos[2] === pos[5] && pos[2] === pos[8]) console.log('winner : ', pos[2])

  // //  Sides
  // if (pos[0] === pos[4] && pos[0] === pos[8]) console.log('winner : ', pos[0])

  // if (pos[2] === pos[4] && pos[2] === pos[6]) console.log('winner : ', pos[2])

  if (loaded) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.orders}`,
      },
    ];

    const cards = [
      {
        num: 1,
        title: 'Em Orçamentação',
        amount: panelsInfo.budgeting,
        icon: (
          <Layers
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
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
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
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
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
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
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--babyblue)',
      },
    ];

    const headCells = [
      {
        id: 'product.name',
        numeric: false,
        disablePadding: false,
        label: 'Produto',
      },
      {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Nº Encomenda',
      },
      {
        id: 'order.client.legalName',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
      },
      {
        id: 'ord_amount',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'product.category.name',
        numeric: false,
        disablePadding: true,
        label: 'Categoria',
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

    const props = {
      items: orders,
      panelsInfo,
      headCells,
      breadcrumbsPath,
      detailPage,
      cards,
      clients,
      editPage,
      pageProps,
      products,
      categories
    };

    return <OrdersScreen {...props} />;
  } else return <Loader center={true} />;
};

Orders.propTypes = {
  panelsInfo: PropTypes.object,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
};

export default Orders;
