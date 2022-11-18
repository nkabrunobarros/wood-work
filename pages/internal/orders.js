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

//  USEFUL
import * as BudgetsActions from '../../pages/api/actions/budget';
import * as CategoriesActions from '../../pages/api/actions/category';
import * as ClientsActions from '../../pages/api/actions/client';
import * as OrdersActions from '../../pages/api/actions/order';
import * as ProductsActions from '../../pages/api/actions/product';
import * as ProjectsActions from '../../pages/api/actions/project';

//  Icons
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';


//  TODO: TROCAR PARA UTILIZAR OS DADOS FIREWARE E DAI PARA A FRENTE

const Orders = ({ ...pageProps }) => {
  const [panelsInfo, setPanelsInfo] = useState();
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [budgets, setBudgets] = useState();
  const [projects, setProjects] = useState();
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
      await ClientsActions.clients().then((response) => setClients(response.data));
      await BudgetsActions.budgets().then((response) => setBudgets(response.data));
      await ProjectsActions.projects().then((response) => setProjects(response.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

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

    const headCellsBudget = [
      {
        id: 'name.value',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'amount.value',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'belongsTo.object',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
      },
      {
        id: 'aprovedDate.value',
        numeric: false,
        disablePadding: false,
        label: 'Data Aprovada',
      },
      {
        id: 'actionsConf',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
    ];

    const headCellsProjects = [
      {
        id: 'name.value',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'category.value',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
      },
      {
        id: 'orderBy.object',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
      },
      {
        id: 'status.value',
        numeric: false,
        disablePadding: false,
        label: 'Status',
      },
      {
        id: 'nestingTag.value',
        numeric: false,
        disablePadding: false,
        label: 'Tag de aninhamento',
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
      categories,
      budgets,
      headCellsBudget,
      projects,
      headCellsProjects
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
