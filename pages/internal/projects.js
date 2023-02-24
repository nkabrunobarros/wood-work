/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../../navigation/routes';

//  Page Component
import ProjectsScreen from '../../components/pages/projects/projects';

//  Proptypes

//  Actions
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';
//  Icons
import { Check, Layers, LayoutTemplate, PackagePlus, Settings, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../lib/AuthData';

//  Preloader
import Loader from '../../components/loader/loader';

const Projects = ({ ...pageProps }) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  //  dispatch actions
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
  const [loaded, setLoaded] = useState(false);

  async function fetchData(dispatch) {
    let errors = false;

    try {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      if (!reduxState.projects?.data) { await getProjects(); }

      if (!reduxState.expeditions?.data) { await getExpeditions(); }

      if (!reduxState.budgets?.data) { await getBudgets(); }

      if (!reduxState.clients?.data) { await getClients(); }
    } catch (err) { errors = true; }

    return !errors;
  }

  useEffect(() => {
    async function loadData() {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);

  if (loaded) {
    const counts = {
      waitingBudget: 0,
      waitingAdjudication: 0,
      drawing: 0,
      production: 0,
      expedition: 0,
      concluded: 0,
      testing: 0,
    };

    reduxState.budgets?.data?.forEach((bud) => {
      switch (bud.status?.value) {
        case 'waiting budget':
          counts.waitingBudget++;

          break;
        case 'waiting adjudication':
          counts.waitingAdjudication++;

          break;
      }
    });

    reduxState.projects?.data?.forEach((proj) => {
      switch (proj.status?.value) {
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

    // Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos/Orçamentos',
        href: `${routes.private.internal.projects}`,
      },
    ];

    const cards = [
      {
        num: 1,
        title: 'Por adjudicar',
        amount: counts.waitingAdjudication,
        icon: (
          <Layers
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--primary)',
      },
      {
        num: 2,
        title: 'Em Desenho',
        amount: counts.drawing,
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
        amount: counts.production,
        icon: (
          <PackagePlus
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--orange)',
      },
      {
        num: 4,
        title: 'Em Montagem',
        amount: counts.testing,
        icon: (
          <Settings
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--babyblue)',
      },
      {
        num: 5,
        title: 'Em Expedição',
        amount: counts.expedition,
        icon: (
          <Truck
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--yellow)',
      },
      {
        num: 5,
        title: 'Terminados',
        amount: counts.concluded,
        icon: (
          <Check
            size={pageProps?.globalVars?.iconSizeXl}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--green)',
      },
    ];

    const headCellsBudget = [
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'orderBy.object',
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
        id: 'Estado',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
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
        id: 'Nome',
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
        id: 'ord_amount_proj',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'Estado',
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

    const clients = [...reduxState.clients?.data ?? []];

    const budgets = [...reduxState.budgets?.data ?? []].map((bud) => ({
      ...bud,
      Estado: bud?.status?.value,
      Nome: bud?.name?.value.replace(/_/g, ' '),
      Cliente: bud.orderBy.object

    }));

    const projects = [...reduxState.projects?.data ?? []].map((proj) => ({
      ...proj,
      Estado: proj?.status?.value,
      Nome: proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' '),
      budgetId: { ...proj.budgetId, ...(budgets.find((ele) => ele.id === proj.budgetId.object)) },
      Cliente: clients.find((ele) => ele.id === (budgets.find((ele) => ele.id === proj.budgetId.object)).orderBy.object).id
    }));

    const props = {
      counts,
      breadcrumbsPath,
      cards,
      pageProps,
      headCellsBudget,
      headCellsProjects,
      clients,
      budgets,
      projects,
      detailPage: routes.private.internal.project,
      editPage: routes.private.internal.editProject,
      detailPageBudgetTab: routes.private.internal.budget,
    };

    return <ProjectsScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Projects;
