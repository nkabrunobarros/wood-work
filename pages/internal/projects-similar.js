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
import AuthData from '../../lib/AuthData';
import * as clientsActionsRedux from '../../store/actions/client';
import * as projectsActionsRedux from '../../store/actions/project';

//  Utils

const OrdersSimilar = () => {
  //  Data States
  const [loaded, setLoaded] = useState(false);
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));

  useEffect(() => {
    async function getData() {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.clients.data && getClients();
      !reduxState.projects.data && getProjects();
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
        id: 'order.orderBy.object',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
      },
      {
        id: 'product.craftTime',
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
        id: 'product.cost',
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
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
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

    //  Page Props
    const props = {
      items: [...reduxState.projects.data]?.map(
        // eslint-disable-next-line array-callback-return
        (item) => {
          const item2 = { ...item };
          const thisClient = clients.find(ele => ele.id === item.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));

          debugger;

          // data[i].desvio = formatNum(item.previsto, item.realizado)
          item2.operacao = item.status.value;
          item2.previsto1 = `${item?.product?.craftTime * item?.amount} H`;
          item2.realizado1 = `${18} horas`;
          item2.desvio = (item?.product?.craftTime * item?.amount) - 18;
          item2.previstoAtual = 20;
          item2.previsto2 = item?.product?.craftTime;
          item2.realizado2 = 2;
          item2.desvio2 = -2;
          item2.Nome = item?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' ');
          item2.Cliente = (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || '');

          return item2;
        }
      ),
      breadcrumbsPath,
      detailPage,
      editPage,
      clients: [],
      woodTypes: [],
      products: [],
      operations,
      headCellsUpper,
      headCells,
    };

    //  Verifies if all data as been loaded and set page to fully Loaded
    return <OrdersScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default OrdersSimilar;
