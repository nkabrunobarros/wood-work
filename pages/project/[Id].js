//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrderScreen from '../../components/pages/project/project';
import routes from '../../navigation/routes';

//  Navigation

//  Services
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as filesActionsRedux from '../../store/actions/file';
import * as foldersActionsRedux from '../../store/actions/folder';
import * as projectsActionsRedux from '../../store/actions/project';

const Order = ({ ...pageProps }) => {
  const reduxState = useSelector((state) => state);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const getProject = (data) => dispatch(projectsActionsRedux.project(data));
  const setDisplayedProject = (data) => dispatch(projectsActionsRedux.setDisplayedProject(data));
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const getExpedition = (data) => dispatch(expeditionsActionsRedux.expedition(data));
  const getFolders = (data) => dispatch(foldersActionsRedux.folders(data));
  const getFiles = (data) => dispatch(filesActionsRedux.budgetFiles(data));
  const [folders, setFolders] = useState();

  useEffect(() => {
    const getData = async () => {
      const project = (await getProject(router.query.Id)).data;
      const expedition = (await getExpedition(project.expedition.object)).data;
      const budget = (await getBudget(project.budgetId.object)).data;
      const client = (await getClient(project.orderBy.object)).data;

      getFolders().then(async (res) => {
        const resFiles = await getFiles(router.query.Id.replace('Project', 'Budget'));

        // eslint-disable-next-line array-callback-return
        const builtFolders = res.data.results.map((folder) => {
          const folder2 = { ...folder };

          folder2.files = resFiles.data.results.filter((file) => file.budget === project.budgetId.object && file.folder === folder.id);
          // builtFolders.push(folder2);

          return folder2;
        });

        setFolders(builtFolders);
      });

      const thisOrder = JSON.parse(JSON.stringify({ ...project }));

      thisOrder.budgetId.object = budget;
      thisOrder.orderBy.object = client;
      thisOrder.expedition = expedition;
      setDisplayedProject(thisOrder);
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded &&
    reduxState.projects.displayedProject && folders
  ) {
    const breadcrumbsPath = [
      {
        title: 'Pedidos',
        href: `${routes.private.projects}`,
      },
      {
        title: `Pedido  ${reduxState.projects.displayedProject?.name?.value}`,
        href: `${routes.private.internal.project}`,
      },
    ];

    const headCellsOrderDetail = [
      {
        id: 'startAt',
        label: 'Cliente',
      },
      {
        id: 'startAt',
        label: 'Real',
      },
      {
        id: 'startAt',
        label: 'Inicio',
        borderLeft: true,
      },
      {
        id: 'endAt',
        label: 'Fim',
        borderRight: true,
      },
      {
        id: 'time',
        disablePadding: false,
        label: 'Tempo',
      },
    ];

    const headCellsUpperProductionDetail = [
      {
        id: 'amountDone',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Produzida: ${reduxState.projects.displayedProject?.completed || 0} Un`,
        span: 4,
      },
      {
        id: 'orderedAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: `Quantidade Pedida: ${reduxState.projects.displayedProject?.amount?.amount?.value} Un`,
        span: 1,
      },
      {
        id: 'perUnit',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Por Unidade',
        span: 3,
      },
    ];

    const headCellsMessages = [
      {
        id: 'mensagem',
        label: 'Mensagem',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
    ];

    const headCellsDocs = [
      {
        id: 'nome',
        label: 'Nome',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
      {},
    ];

    const props = {
      order: reduxState.projects.displayedProject,
      breadcrumbsPath,
      headCellsOrderDetail,
      headCellsDocs,
      pageProps,
      headCellsUpperProductionDetail,
      folders,
      headCellsMessages,
    };

    return <OrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Order;
