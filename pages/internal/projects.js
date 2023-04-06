/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../../navigation/routes';

//  Page Component
import ProjectsScreen from '../../components/pages/projects/projects';

//  Proptypes

//  Actions
import * as appStatesActions from '../../store/actions/appState';
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';
//  Icons
import { Check, Layers, LayoutTemplate, PackagePlus, Settings, Truck } from 'lucide-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
// import useWindowFocus from '../../components/utils/useWindowFocus';
import AuthData from '../../lib/AuthData';
import { categories } from './new-project';

//  Preloader
// import Loader from '../../components/loader/loader';

const Projects = ({ ...pageProps }) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  //  dispatch actions
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
  const setLoading = (data) => dispatch(appStatesActions.setLoading(data));
  const setLastRefreshed = () => dispatch(appStatesActions.setLastRefreshed());
  const [loaded, setLoaded] = useState(false);
  // const focused = useWindowFocus();
  const shouldRefresh = moment().diff(moment(reduxState.appStates.lastRefreshed), 'seconds') > 30;

  async function fetchData (dispatch) {
    let errors = false;
    let loadedSomething = false;

    try {
      await setLoading(true);
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      await getProjects();

      if (!reduxState.expeditions?.data || shouldRefresh) { await getExpeditions(); loadedSomething = true; }

      await getBudgets();

      if (!reduxState.clients?.data || shouldRefresh) { await getClients(); loadedSomething = true; }

      setTimeout(() => {
        setLoading(false);
      }, '500');

      (loadedSomething || shouldRefresh) && await setLastRefreshed();
    } catch (err) { errors = true; }

    return !errors;
  }

  useEffect(() => {
    async function loadData () {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);
  // useEffect(() => {
  //   async function loadData () {
  //     setLoaded(await fetchData(dispatch));
  //   }

  //   focused && loadData();
  // }, [focused]);

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
        title: 'Projetos',
        href: `${routes.private.internal.projects}`,
      },
    ];

    const cards = [
      {
        id: 'waiting adjudication',
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
        id: 'drawing',
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
        id: 'production',
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
        id: 'testing',
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
        id: 'transport',
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
        num: 6,
        id: 'finished',
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
        show: true,
      },
      {
        id: 'ClienteLabel',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
        show: true,
      },
      {
        id: 'amount.value',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
        show: true,
      },
      {
        id: 'price.value',
        numeric: false,
        disablePadding: false,
        label: 'Preço',
        show: true,
      },
      {
        id: 'createdAt.value',
        numeric: false,
        disablePadding: false,
        label: 'Data criação',
        show: true,
      },
      {
        id: 'Estado',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
        show: true,
      },
      {
        id: 'actionsConf',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
        show: true,
      },
    ];

    const headCellsProjects = [
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
        show: true,
      },
      {
        id: 'ClienteLabel',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
        show: true,
      },
      {
        id: 'Referência',
        numeric: false,
        disablePadding: false,
        label: 'Referência',
        show: true,
      },
      {
        id: 'Categoria',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
        show: true,
      },
      {
        id: 'amount.value',
        numeric: false,
        disablePadding: false,
        label: 'Quantidade',
        show: true,
      },
      {
        id: 'Estado',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
        show: true,
      },
      {
        id: 'Projeto',
        numeric: false,
        disablePadding: false,
        label: 'Projeto',
        show: true,
      },
      {
        id: 'Inicio',
        numeric: false,
        disablePadding: false,
        label: 'Início Prod.',
        show: true,
      },
      {
        id: 'Termino',
        numeric: false,
        disablePadding: false,
        label: 'Fim Prod.',
        show: true,
      },
      {
        id: 'Complete',
        numeric: false,
        disablePadding: false,
        label: 'Qtd. Prod.',
        show: true,
      },
      {
        id: 'ExpeditionTime',
        numeric: false,
        disablePadding: false,
        label: 'Entrada Expedição',
        show: true,
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
    ];

    const clients = [...reduxState.clients?.data ?? []].map((client) => {
      return {
        ...client,
        Nome: client.user.first_name + ' ' + client.user.last_name + ' - ' + client.user.email,
        Email: client.user.email,
      };
    });

    const budgets = [...reduxState.budgets?.data ?? []].map((bud) => {
      const thisClient = clients.find(ele => ele.id === bud.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));

      return bud?.status?.value !== 'adjudicated' && {
        ...bud,
        Estado: bud?.status?.value,
        Nome: bud?.name?.value.replace(/_/g, ' '),
        ClienteLabel: (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || ''),
        Quantidade: bud.amount.value

      };
    });

    const filteredBudgets = budgets.filter(item => item !== false);

    const projects = [...reduxState.projects?.data ?? []].map((proj) => {
      const thisClient = clients.find(ele => ele.id === proj.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));
      const thisBudget = reduxState.budgets?.data.find((ele) => ele.id === proj.budgetId.object);
      const thisExpedition = reduxState.expeditions?.data.find((ele) => ele.id === proj.expedition.object);

      return {
        ...proj,
        Quantidade: proj?.amount?.value,
        Estado: proj?.status?.value,
        Nome: proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' '),
        budgetId: { ...proj.budgetId, ...(budgets.find((ele) => ele.id === proj.budgetId.object)) },
        Cliente: proj.orderBy.object,
        ClienteLabel: (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || ''),
        Referência: `${proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' ')} ECL 2023/000100`,
        Categoria: categories.find(c => c.id === thisBudget?.category?.value)?.label,
        ExpeditionTime: thisExpedition?.expeditionTime.value,
        Complete: 0,
        Projeto: thisBudget?.dateRequest?.value,
        Inicio: moment(proj?.createdAt).format('DD/MM/YYYY'),
        Termino: thisBudget?.dateAgreedDelivery?.value,
      };
    });

    const merged = [...projects, ...filteredBudgets];

    console.log(merged);

    const props = {
      items: merged,
      counts,
      breadcrumbsPath,
      cards,
      pageProps,
      headCellsBudget,
      headCellsProjects,
      clients,
      budgets,
      projects: merged,
      detailPage: routes.private.internal.project,
      editPage: routes.private.internal.editProject,
      detailPageBudgetTab: routes.private.internal.budget,
    };

    return <ProjectsScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Projects;
