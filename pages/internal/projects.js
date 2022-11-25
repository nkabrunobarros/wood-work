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
import { Layers, LayoutTemplate, PackagePlus, Settings } from 'lucide-react';

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

  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        concluded: 0,
      };


      // await ProductsActions.products().then((response) => setProducts(response.data.payload.data));
      // await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data));
      await ClientsActions.clients().then((response) => setClients(response.data));
      await BudgetsActions.budgets().then((response) => setBudgets(response.data));

      await ExpeditionActions.expeditions().then(async (expResponse) => {
        //  Get projects and build
        await ProjectsActions.projects().then((response) => {
          response.data.map((proj, index) => {
            response.data[index].expedition.object = expResponse.data.find(exp => exp.id.toLowerCase().replace('project', 'expedition') === proj.expedition.object.toLowerCase());
            response.data[index].Cliente = proj.orderBy.object;
            response.data[index].Numero = proj.id;
            // response.data[index].Producao = proj.status.value;
            response.data[index].Producao = proj.expedition.object?.deliveryFlag?.value ? 'delivered' : (proj.expedition.object?.expeditionTime?.value ? 'expediting' : proj.status.value);

            switch (proj.status.value.toLowerCase()) {
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

          setProjects(response.data);
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
        title: 'Projetos',
        href: `${routes.private.internal.projects}`,
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
        label: 'Produção',
      },
      {
        id: 'ord_amount_proj',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'expedition.object.deliveryFlag.value',
        numeric: false,
        disablePadding: false,
        label: 'Em distribuição',
      },
      {
        id: 'nestingTag.value',
        numeric: false,
        disablePadding: false,
        label: 'Tag de alinhamento',
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
