//  Nodes
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrdersScreen from '../../components/pages/ordersSimilar/projects-similar';

//  PropTypes

//  Navigation
import routes from '../../navigation/routes';

//  Services
import moment from 'moment/moment';
import AuthData from '../../lib/AuthData';
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';

//  Utils

const OrdersSimilar = () => {
  //  Data States
  const [loaded, setLoaded] = useState(false);
  const [datesDiferencesFormat, setDatesDiferencesFormat] = useState('days');
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getExpeditions = () => dispatch(expeditionsActionsRedux.expeditions());

  useEffect(() => {
    async function getData () {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.clients.data && await getClients();
      !reduxState.expeditions.data && await getExpeditions();
      !reduxState.budgets.data && await getBudgets();
      await getProjects();
    }

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && reduxState.projects.data) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos Similares',
        href: `${routes.private.internal.projectsSimilar}`,
      },
    ];

    //  Table upper cols
    const headCellsUpper = [
      {
        id: 'amountProduced',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Quantidade Produzida:12 Un',
        span: 5,
      },
      {
        id: 'orderAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Quantidade Pedida:25 Un',
        span: 1,
      },
      {
        id: 'perUnit',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Por unidade',
        span: 5,
      },
    ];

    //  Table lower cols
    const headCells = [
      // {
      //   id: 'id',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Nome',
      // },
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome Projeto',
      },
      {
        id: 'Cliente',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
      },
      {
        id: 'previsto1',
        numeric: false,
        disablePadding: false,
        label: 'Previsto',
      },
      {
        id: 'realizado1',
        numeric: false,
        disablePadding: false,
        label: 'Realizado',
      },
      {
        id: 'desvio',
        numeric: false,
        disablePadding: false,
        label: 'Desvio',
      },
      {
        id: 'previstoAtual',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Horas Atuais',
      },
      {
        id: 'product.craftTime',
        numeric: false,
        disablePadding: false,
        label: 'Previsto',
      },
      {
        id: 'Custo',
        numeric: false,
        disablePadding: false,
        label: 'Custo',
      },
      {
        id: 'realizado2',
        numeric: false,
        disablePadding: false,
        label: 'Realizado',
      },
      {
        id: 'desvio2',
        numeric: false,
        disablePadding: false,
        label: 'Desvio',
      },
      // {
      //   id: 'actions',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Ações',
      // },
    ];

    const detailPage = routes.private.internal.project;
    const editPage = routes.private.internal.editProject;

    //  Dummy Operation types
    const operations = [
      {
        label: 'Corte',
        value: 'Corte',
      },
      {
        label: 'Montagem',
        value: 'Montagem',
      },
      {
        label: 'Colagem',
        value: 'Colagem',
      },
    ];

    const clients = [...reduxState.clients?.data ?? []];

    const projects = [...reduxState.projects.data]?.map(
      // eslint-disable-next-line array-callback-return
      (item) => {
        const item2 = { ...item };
        const thisClient = clients.find(ele => ele.id === item.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));
        const thisExpedition = reduxState.expeditions?.data.find((ele) => ele.id === item?.expedition?.object);
        const thisBudget = reduxState.budgets?.data.find((ele) => ele.id === item?.hasBudget?.object);
        const projCreated = moment(item.createdAt);
        const projAgreedDelivery = moment(thisBudget?.dateDeliveryProject?.value, 'DD/MM/YYYY');
        const projDelivered = moment(thisExpedition?.expeditionTime?.value, 'DD/MM/YYYY');

        console.log(projDelivered);
        // data[i].desvio = formatNum(item.previsto, item.realizado)
        item2.operacao = item.status.value;
        item2.previsto1 = `${projCreated.diff(projAgreedDelivery, datesDiferencesFormat) * -1 || 0} ${datesDiferencesFormat === 'days' ? 'dia(s)' : 'hora(s)'}`;
        item2.realizado1 = `${projCreated.diff(projDelivered, datesDiferencesFormat) || 0} ${datesDiferencesFormat === 'days' ? 'dia(s)' : 'hora(s)'}`;
        item2.desvio = (projCreated.diff(projAgreedDelivery, datesDiferencesFormat) * -1 || 0) - (projCreated.diff(projDelivered, datesDiferencesFormat) || 0);
        item2.previstoAtual = 20;
        item2.previsto2 = 0;
        item2.realizado2 = '2 hora(s)';
        item2.desvio2 = -2;
        item2.Custo = '20€';
        item2.Nome = item?.name.value;
        item2.Cliente = (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || '');

        return item2;
      }
    );

    //  Page Props
    const props = {
      items: projects,
      breadcrumbsPath,
      detailPage,
      editPage,
      clients: [...reduxState.clients?.data].map(client => {
        const client2 = { ...client };

        client2.Nome = client.user.first_name + ' ' + client.user.last_name;
        client2.Email = client.user.email;

        return client2;
      }),
      woodTypes: [],
      products: [],
      operations,
      headCellsUpper,
      headCells,
      setDatesDiferencesFormat,
      datesDiferencesFormat
    };

    //  Verifies if all data as been loaded and set page to fully Loaded
    return <OrdersScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default OrdersSimilar;
