/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../navigation/routes';

//  Page Component
import OrdersScreen from '../components/pages/projects/projects';

//  Proptypes
import PropTypes from 'prop-types';

//  Actions
import * as budgetsActionsRedux from '../store/actions/budget';
import * as clientsActionsRedux from '../store/actions/client';
import * as expeditionsActionsRedux from '../store/actions/expedition';
import * as projectsActionsRedux from '../store/actions/project';
//  Icons
import { AlertOctagon, Layers, LayoutTemplate, PackageCheck } from 'lucide-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader/loader';

const Orders = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  //  dispatch actions
  const getProjects = (data) => dispatch(projectsActionsRedux.myProjects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.myBudgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));

  const categories = [
    { label: 'Cozinha', id: 'MC_' },
    { label: 'Quarto', id: 'MQ_' },
    { label: 'Banheiro', id: 'MB_' },
    { label: 'Garagem', id: 'MG_' },
    { label: 'Varanda', id: 'MV_' },
    { label: 'Sala de estar', id: 'MS_' }
  ];

  async function fetchData () {
    let errors = false;

    try {
      if (!reduxState.projects?.data) {
        await getProjects(reduxState.auth.me.id);
      }

      if (!reduxState.clients?.data) { await getClients(); }

      if (!reduxState.expeditions?.data) { await getExpeditions().then((res) => console.log(res)); }

      await getBudgets();
    } catch (err) {
      console.log(err);
      errors = true;
    }

    return !errors;
  }

  useEffect(() => {
    async function loadData () {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);

  if (loaded) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos',
        href: `${routes.private.internal.projects}`,
      },
    ];

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

    const cards = [
      {
        id: 'waiting budget',
        num: 1,
        title: 'Em Orçamentação',
        amount: counts.waitingBudget,
        icon: (
          <PackageCheck
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
          <Layers
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
        icon: <AlertOctagon
          size={pageProps?.globalVars?.iconSizeXl}
          strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />,
        color: 'var(--babyblue)',
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
      // {
      //   id: 'Referência',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Referência',
      //   show: true,
      // },
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
        label: 'Início',
        show: true,
      },
      {
        id: 'Termino',
        numeric: false,
        disablePadding: false,
        label: 'Fim',
        show: true,
      },
      // {
      //   id: 'Complete',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Qtd. Prod.',
      //   show: true,
      // },
      // {
      //   id: 'ExpeditionTime',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Entrada Expedição',
      //   show: true,
      // },
    ];

    const budgets = [...reduxState.budgets?.data ?? []].map((bud) => {
      return bud?.status?.value !== 'adjudicated' && {
        ...bud,
        Estado: bud?.status?.value,
        Nome: bud?.name?.value.replace(/_/g, ' '),
        Created: moment(bud?.createdAt).format('DD/MM/YYYY'),
        Projeto: bud?.dateRequest?.value,
        Entregue: bud?.dateDelivery?.value,
        Categoria: categories.find(c => c.id === bud.category?.value)?.label,
        Referência: `${bud?.name?.value.replace(/_/g, ' ')} ECL 2023/000100`,
      };
    });

    const filteredBudgets = budgets.filter(item => item !== false);

    const projects = [...reduxState.projects?.data ?? []].map((proj) => {
      const thisBudget = reduxState.budgets?.data.find((ele) => ele.id === proj.budgetId.object);
      // const thisExpedition = reduxState.expeditions?.data.find((ele) => ele.id === proj.expedition.object);

      return {
        ...proj,
        Estado: proj?.status?.value,
        Nome: proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' '),
        budget: thisBudget,
        Inicio: moment(proj?.createdAt).format('DD/MM/YYYY'),
        Termino: thisBudget?.dateAgreedDelivery.value,
        Projeto: thisBudget?.dateRequest.value,
        Entregue: thisBudget?.dateDelivery.value,
        Categoria: categories.find(c => c.id === thisBudget.category.value)?.label,
        Referência: `${proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' ')} ECL 2023/000100`,
        ExpeditionTime: '',
        Complete: 0,
      };
    }
    );

    const merged = [...projects, ...filteredBudgets.filter((ele) => ele.status !== 'adjudicated')];

    merged.sort((a, b) => a.Projeto?.localeCompare(b.Projeto));

    const props = {
      counts,
      breadcrumbsPath,
      cards,
      pageProps,
      headCellsProjects,
      budgets,
      items: merged,
      projects,
      detailPage: routes.private.project,
      editPage: routes.private.editProject,
      detailPageBudgetTab: routes.private.budget,
    };

    return <OrdersScreen {...props} />;
  }

  return <Loader center={true} />;
};

Orders.propTypes = {
  categories: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
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
