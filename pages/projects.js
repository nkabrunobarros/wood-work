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
  const detailPage = routes.private.order;


  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        concluded: 0,
      };

      await ProductsActions.products().then((response) => setProducts(response.data.payload.data));
      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data));
      await ClientsActions.clients().then((response) => setClients(response.data));

      await ExpeditionActions.expeditions().then(async (expResponse) => {
        //  Get projects and build
        await ProjectsActions.projects().then((response) => {
          response.data.map((proj, index) => (response.data[index].expedition.object = expResponse.data.find(exp => exp.id.toLowerCase().replace('project', 'expedition') === proj.expedition.object.toLowerCase())));
          setProjects(response.data);

          response.data.map(async (ord) => {
            switch (ord.status.value.toLowerCase()) {
              case 'waiting':
                counts.budgeting++;

                break;

              case 'em desenho':
                counts.drawing++;

                break;

              case 'working':
                counts.production++;

                break;
              case 'finished':
                counts.concluded++;

                break;

              default:
                break;
            }
          });

          setPanelsInfo(counts);

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

    const internalPOV = true;

    const cards = [
      {
        num: 1,
        title: 'Em Orçamentação',
        amount: panelsInfo.budgeting,
        icon: (
          <PackageCheck
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
          <Layers
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
        icon: <AlertOctagon
          size={pageProps.globalVars.iconSizeXl}
          strokeWidth={pageProps.globalVars.iconStrokeWidth} />
        ,
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
        id: 'status.value',
        numeric: false,
        disablePadding: false,
        label: 'Produção',
      },
      {
        id: 'expedition.object.deliveryFlag.value',
        numeric: false,
        disablePadding: false,
        label: 'Em distribuição',
      },
    ];

    const props = {
      categories,
      panelsInfo,
      breadcrumbsPath,
      detailPage,
      internalPOV,
      cards,
      clients,
      pageProps,
      products,
      projects,
      headCellsProjects
    };

    return <OrdersScreen {...props} />;
  } else return <Loader center={true} />;
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
