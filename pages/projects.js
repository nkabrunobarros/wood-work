/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../navigation/routes';

//  Preloader
import Loader from '../components/loader/loader';

//  Page Component
import OrdersScreen from '../components/pages/projects/projects';

//  Proptypes
import PropTypes from 'prop-types';

//  Data services
import * as BudgetsActions from './api/actions/budget';
import * as CategoriesActions from './api/actions/category';
import * as ClientsActions from './api/actions/client';
import * as ExpeditionActions from './api/actions/expedition';
import * as ProductsActions from './api/actions/product';
import * as ProjectsActions from './api/actions/project';

//  Icons
import { AlertOctagon, Layers, LayoutTemplate, PackageCheck } from 'lucide-react';

const Orders = ({ ...pageProps }) => {
  const [clients, setClients] = useState();
  const [categories, setCategories] = useState();
  const [loaded, setLoaded] = useState(false);
  const [panelsInfo, setPanelsInfo] = useState();
  const [products, setProducts] = useState();
  const [projects, setProjects] = useState();
  const detailPage = routes.private.project;

  useEffect(() => {
    const getData = async () => {
      const counts = {
        waitingBudget: 0,
        waitingAdjudication: 0,
        drawing: 0,
        production: 0,
        expedition: 0,
        concluded: 0,
        testing: 0,
      };

      const test = [];

      await ProductsActions.products().then((response) => setProducts(response.data.payload.data)).catch(() => setProducts([]));
      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data)).catch(() => setCategories([]));

      await BudgetsActions.myBudgets().then((response) => {
        response.data.map(item => {
          switch (item.status.value) {
          case 'waiting budget':
            counts.waitingBudget++;

            break;
          case 'waiting adjudication':
            counts.waitingAdjudication++;

            break;

          default:
            break;
          }

          test.push({
            id: item.id,
            category: { ...item.category },
            name: { ...item.name },
            Nome: item.name.value,
            amount: { ...item.amount },
            statusClient: { type: 'Property', value: item.status.value },
            Estado: item.status.value

          });
        });
      });

      await ClientsActions.clients().then(async (responseClients) => {
        setClients(responseClients.data);

        await ExpeditionActions.expeditions().then(async (expResponse) => {
          //  Get projects and build
          await ProjectsActions.myProjects().then((response) => {
            console.log(response);

            response.data.map((proj, index) => {
              const thisClient = responseClients.data.find(ele => ele.id === proj.orderBy.object);

              response.data[index].expedition.object = expResponse.data.find(exp => exp.id.toLowerCase().replace('project', 'expedition') === proj.expedition.object.toLowerCase());
              response.data[index].Cliente = proj.orderBy.object;
              response.data[index].Nome = proj.name.value;
              response.data[index].telemovel = thisClient?.telephone.value;
              // response.data[index].Producao = proj.status.value;
              response.data[index].Producao = proj.expedition.object?.deliveryFlag?.value ? 'delivered' : (proj.expedition.object?.expeditionTime?.value ? 'expediting' : proj.status.value);
              response.data[index].estado = { type: 'Property', value: response.data[index].status.value };
              response.data[index].Estado = response.data[index].status.value;
              response.data[index].statusClient = {};
              response.data[index].statusClient.value = response.data[index].status.value;
              test.push(response.data[index]);

              switch (proj.status.value.toLowerCase()) {
              case 'waiting budget':
                counts.waitingBudget++;

                break;
              case 'waiting adjudication':
                counts.waitingAdjudication++;

                break;

              case 'drawing':
                counts.drawing++;

                break;

              case 'production':
                counts.production++;

                break;
              case 'transport':
                counts.expedition++;

                break;
              case 'testing':
                counts.testing++;

                break;
              case 'finished':
                counts.concluded++;

                break;
              }
            });

            setProjects(test);
            setPanelsInfo(counts);
          });
        });
      });
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
        amount: panelsInfo.waitingBudget,
        icon: (
          <PackageCheck
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
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
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--green)',
      },
      {
        num: 3,
        title: 'Em Produção',
        amount: panelsInfo.production,
        icon: (
          <Layers
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--orange)',
      },
      {
        num: 4,
        title: 'Em Montagem',
        amount: panelsInfo.testing,
        icon: <AlertOctagon
          size={pageProps?.globalVars?.iconSizeXl}
          strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />,
        color: 'var(--babyblue)',
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
        id: 'ord_amount_proj',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'statusClient.value',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
      },
    ];

    const props = {
      categories,
      panelsInfo,
      breadcrumbsPath,
      detailPage,
      cards,
      clients,
      pageProps,
      products,
      projects,
      headCellsProjects
    };

    return <OrdersScreen {...props} />;
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
};

export default Orders;
