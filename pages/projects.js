/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Navigation
import routes from '../navigation/routes';

//  Preloader

//  Page Component
import OrdersScreen from '../components/pages/projects/projects';

//  Proptypes
import PropTypes from 'prop-types';

//  Data services

//  Actions
import * as budgetsActionsRedux from '../store/actions/budget';
import * as clientsActionsRedux from '../store/actions/client';
import * as expeditionsActionsRedux from '../store/actions/expedition';
import * as projectsActionsRedux from '../store/actions/project';
//  Icons
import { AlertOctagon, Layers, LayoutTemplate, PackageCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const Orders = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  //  dispatch actions
  const getProjects = (data) => dispatch(projectsActionsRedux.myProjects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.myBudgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));

  async function fetchData() {
    let errors = false;

    try {
      if (!reduxState.projects?.data) {
        await getProjects(reduxState.auth.me.id);
      }

      if (!reduxState.clients?.data) { await getClients(); }

      if (!reduxState.expeditions?.data) { await getExpeditions(); }

      if (!reduxState.budgets?.data) { await getBudgets(); }
    } catch (err) {
      console.log(err);
      errors = true;
    }

    return !errors;
  }

  useEffect(() => {
    async function loadData() {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);

  if (loaded) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Pedidos',
        href: `${routes.private.internal.orders}`,
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
        id: 'Estado',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
      },
    ];

    const budgets = [...reduxState.budgets?.data ?? []].map((bud) => {
      return bud?.status?.value !== 'adjudicated' && bud?.status?.value !== 'canceled' && {
        ...bud,
        Estado: bud?.status?.value,
        Nome: bud?.name?.value.replace(/_/g, ' '),

      };
    });

    const projects = [...reduxState.projects?.data ?? []].map((proj) => ({
      ...proj,
      Estado: proj?.status?.value,
      Nome: proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' '),
      budgetId: { ...proj.budgetId, ...(budgets.find((ele) => ele.id === proj.budgetId.object)) },
    }));

    const merged = [...projects, ...budgets.filter((ele) => ele.status !== 'adjudicated')];

    const props = {
      counts,
      breadcrumbsPath,
      cards,
      pageProps,
      headCellsProjects,
      budgets,
      projects: merged,
      detailPage: routes.private.project,
      editPage: routes.private.editProject,
      detailPageBudgetTab: routes.private.budget,
    };

    return <OrdersScreen {...props} />;
  }
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
