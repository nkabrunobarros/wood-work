/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../../navigation/routes';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import ProjectsScreen from '../../components/pages/projects/projects';

//  Proptypes
import PropTypes from 'prop-types';

//  Actions
// import * as CategoriesActions from '../api/actions/category';
// import * as ProductsActions from '../api/actions/product';
import * as BudgetsActions from '../api/actions/budget';
import * as ClientsActions from '../api/actions/client';
import * as ExpeditionActions from '../api/actions/expedition';
import * as ProjectsActions from '../api/actions/project';
//  Icons
import { Layers, LayoutTemplate, PackagePlus, Settings, Truck } from 'lucide-react';

const Projects = ({ ...pageProps }) => {
  // const [products, setProducts] = useState();
  // const [categories, setCategories] = useState();
  const products = [];
  const categories = [];
  const [panelsInfo, setPanelsInfo] = useState();
  const [clients, setClients] = useState();
  const [budgets, setBudgets] = useState();
  const [projects, setProjects] = useState();
  // const [expeditions, setExpeditions] = useState();
  const [loaded, setLoaded] = useState(false);
  const detailPage = routes.private.internal.project;
  const editPage = routes.private.internal.editProject;
  const detailPageBudgetTab = routes.private.internal.budget;

  function calcState(value) {
    if (value.status.value !== 'finished') return value.status.value;
    else if (value.expedition.object.deliveryFlag.value) return 'Entregue';
    else if (!value.expedition.object.deliveryFlag.value && value.expedition.object.expeditionTime) return 'em transporte';
    else return 'finished';
  }

  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        expedition: 0,
        concluded: 0,
      };


      // await ProductsActions.products().then((response) => setProducts(response.data.payload.data));
      // await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data));
      await ClientsActions.clients().then(async (responseClients) => {
        setClients(responseClients.data);

        await ExpeditionActions.expeditions().then(async (expResponse) => {
          //  Get projects and build
          await ProjectsActions.projects().then((response) => {
            response.data.map((proj, index) => {
              const thisClient = responseClients.data.find(ele => ele.id === proj.orderBy.object);

              response.data[index].expedition.object = expResponse.data.find(exp => exp.id.toLowerCase().replace('project', 'expedition') === proj.expedition.object.toLowerCase());
              response.data[index].Cliente = proj.orderBy.object;
              response.data[index].Nome = proj.name.value;
              response.data[index].telemovel = thisClient?.telephone.value;
              // response.data[index].Producao = proj.status.value;
              response.data[index].Producao = proj.expedition.object?.deliveryFlag?.value ? 'delivered' : (proj.expedition.object?.expeditionTime?.value ? 'expediting' : proj.status.value);
              response.data[index].estado = { type: 'Property', value: calcState(response.data[index]) };
              response.data[index].Estado = calcState(response.data[index]);

              switch (calcState(response.data[index])) {
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
                case 'em transporte':
                  counts.expedition++;

                  break;

                default:
                  break;
              }
            });

            setProjects(response.data);
            setPanelsInfo(counts);

          });
        });
      });

      await BudgetsActions.budgets().then((response) => setBudgets(response.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {

    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos/Orçamentos',
        href: `${routes.private.internal.projects}`,
      },
    ];

    const cards = [
      {
        num: 1,
        title: 'Orçamentos por adjudicar',
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
        title: 'Em Montagem',
        amount: panelsInfo.concluded,
        icon: (
          <Settings
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--babyblue)',
      },
      {
        num: 5,
        title: 'Em Expedição',
        amount: panelsInfo.expedition,
        icon: (
          <Truck
            size={pageProps.globalVars.iconSizeXl}
            strokeWidth={pageProps.globalVars.iconStrokeWidth}
          />
        ),
        color: 'var(--yellow)',
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
        id: 'belongsTo.object',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
      },
      {
        id: 'amount.value',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'price.value',
        numeric: false,
        disablePadding: false,
        label: 'Preço',
      },
      {
        id: 'createdAt.value',
        numeric: false,
        disablePadding: false,
        label: 'Data criação',
      },
      {
        id: 'actionsConf',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
    ];

    console.log(budgets);

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
      // {
      //   id: 'status.value',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Produção',
      // },
      // {
      //   id: 'expedition.object.deliveryFlag.value',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Em expedição',
      // },
      {
        id: 'ord_amount_proj',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'estado.value',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
    ];

    const props = {
      panelsInfo,
      breadcrumbsPath,
      detailPage,
      cards,
      clients,
      editPage,
      pageProps,
      products,
      detailPageBudgetTab,
      categories,
      budgets,
      headCellsBudget,
      projects,
      headCellsProjects
    };

    return <ProjectsScreen {...props} />;
  } else return <Loader center={true} />;
};

Projects.propTypes = {
  panelsInfo: PropTypes.object,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
};

export default Projects;
