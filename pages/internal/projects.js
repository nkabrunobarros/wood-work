import React, { useEffect, useState } from 'react';

import routes from '../../navigation/routes';

import ProjectsScreen from '../../components/pages/projects/projects';

import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';
//  Icons
import { Layers, LayoutTemplate, PackageCheck, PackagePlus, Settings, Truck } from 'lucide-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import { categories } from './new-project';

const Projects = ({ ...pageProps }) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
  const [loaded, setLoaded] = useState(false);

  async function fetchData() {
    let errors = false;

    try {
      await getProjects();
      await getExpeditions();
      await getBudgets();
      await getClients();
    } catch (err) { errors = true; }

    return !errors;
  }

  useEffect(() => {
    async function loadData() {
      setLoaded(await fetchData());
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
      switch (bud.budgetStatus?.value) {
        case 'needs analysis':
          counts.waitingAdjudication++;

          break;
        case 'waiting budget':
          counts.waitingAdjudication++;

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
        id: ['waiting adjudication', 'needs analysis', 'waiting budget'],
        num: 1,
        title: 'Pré Adjudicação',
        amount: counts.waitingAdjudication,
        icon: (
          <Layers
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--primary)',
      },
      {
        id: 'drawing',
        num: 2,
        title: 'Pendente Desenho',
        amount: counts.drawing,
        icon: (
          <LayoutTemplate
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--green)',
      },
      {
        id: 'production',
        num: 3,
        title: 'Pendente Produção',
        amount: counts.production,
        icon: (
          <PackagePlus
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--orange)',
      },
      {
        id: 'testing',
        num: 4,
        title: 'Pendente Montagem',
        amount: counts.testing,
        icon: (
          <Settings
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--babyblue)',
      },
      {
        id: 'packaging',
        num: 4,
        title: 'Pendente Embalamento',
        amount: counts.testing,
        icon: (
          <PackageCheck
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: '#9c27b0',
      },
      {
        id: 'transport',
        num: 5,
        title: 'Pendente Expedição',
        amount: counts.expedition,
        icon: (
          <Truck
            size={'60%'}
            strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
          />
        ),
        color: 'var(--yellow)',
      },
      // {
      //   num: 6,
      //   id: 'finished',
      //   title: 'Terminados',
      //   amount: counts.concluded,
      //   icon: (
      //     <Check
      //       size={'60%'}
      //       strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
      //     />
      //   ),
      //   color: 'var(--green)',
      // },
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
      // {
      //   id: 'amount.value',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Quantidade',
      //   show: true,
      // },
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
        id: 'ClienteLabel',
        numeric: false,
        disablePadding: false,
        label: 'Cliente',
        show: true,
      },
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
        show: true,
      },
      {
        id: 'Numero',
        numeric: false,
        disablePadding: false,
        label: 'Número',
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
        label: 'Data',
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
        id: 'ExpeditionTime',
        numeric: false,
        disablePadding: false,
        label: 'Entrada Expedição',
        show: true,
      },
      {
        id: 'EntregaProj',
        numeric: false,
        disablePadding: false,
        label: 'Entrega Acordada',
        show: true,
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
        show: true,
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

      return bud?.budgetStatus?.value !== 'adjudicated' && {
        ...bud,
        Estado: bud?.budgetStatus?.value,
        Nome: bud?.name?.value.replace(/_/g, ' '),
        ClienteLabel: (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || ''),
        Quantidade: bud?.amount?.value,
        Numero: bud.num?.value || 212453,
        Cliente: bud.orderBy.object,
        Projeto: bud?.dateRequest?.value,

      };
    });

    const filteredBudgets = budgets.filter(item => item !== false);

    const projects = [...reduxState.projects?.data ?? []].map((proj) => {
      const thisClient = clients.find(ele => ele.id === proj.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));
      const thisBudget = reduxState.budgets?.data.find((ele) => ele.id === proj.hasBudget?.object);
      const thisExpedition = reduxState.expeditions?.data.find((ele) => ele.id === proj.expedition?.object);

      return {
        ...proj,
        Quantidade: proj?.amount?.value,
        Estado: proj?.status?.value,
        Nome: proj?.name.value,
        hasBudget: { ...proj.hasBudget, ...(budgets.find((ele) => ele.id === proj.hasBudget?.object)) },
        Cliente: proj.orderBy.object,
        ClienteLabel: (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || ''),
        Referência: `${proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' ')} ECL 2023/000100`,
        Numero: thisBudget?.num?.value || 212453,
        Categoria: categories.find(c => c.id === thisBudget?.category?.value)?.label,
        ExpeditionTime: thisExpedition?.expeditionTime.value,
        Produced: proj.produced?.value,
        Projeto: thisBudget?.dateRequest?.value,
        Inicio: moment(proj?.createdAt).format('DD/MM/YYYY'),
        Termino: thisExpedition?.expeditionTime.value,
      };
    });

    const merged = [...projects, ...filteredBudgets];

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
      editPage: routes.private.internal.editBudget,
      detailPageBudgetTab: routes.private.internal.budget,
    };

    return <ProjectsScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Projects;
