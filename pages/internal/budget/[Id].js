/* eslint-disable array-callback-return */
//  Page Component
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader/loader';
import BudgetScreen from '../../../components/pages/budget/budget';
import AuthData from '../../../lib/AuthData';
import routes from '../../../navigation/routes';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as clientsActionsRedux from '../../../store/actions/client';
import * as filesActionsRedux from '../../../store/actions/file';
import * as foldersActionsRedux from '../../../store/actions/folder';
import { categories } from '../new-project';

const Budget = ({ ...pageProps }) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const router = useRouter();
  const [budget, setBudget] = useState();
  const [loaded, setLoaded] = useState(false);
  const [folders, setFolders] = useState([]);
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));
  const setDisplayingBudget = (data) => dispatch(budgetsActionsRedux.setDisplayingBudget(data));
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const getFiles = (data) => dispatch(filesActionsRedux.budgetFiles(data));
  const getFolders = (data) => dispatch(foldersActionsRedux.folders(data));

  useEffect(() => {
    const getData = async () => {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      const budget = (await getBudget(router.query.Id)).data;
      const client = (await getClient(budget.orderBy.object)).data;
      const thisBudget = JSON.parse(JSON.stringify({ ...budget }));

      thisBudget.orderBy.object = client;
      setBudget(thisBudget);
      setDisplayingBudget(thisBudget);

      await getFolders().then(async (res) => {
        const builtFolders = [];
        const resFiles = await getFiles(router.query.Id);

        res.data.results.map((folder) => {
          const folder2 = { ...folder };

          folder2.files = resFiles.data.results.filter((file) => file.budget === router.query.Id && file.folder === folder.id);
          builtFolders.push(folder2);
        });

        setFolders(builtFolders);
      });
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Pedidos',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: `${budget.name.value}`,
        href: `${routes.private.internal.budget}`,
      },
    ];

    const headCellsUpperOrderDetail = [
      {
        id: 'deadline',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Data de Entrega',
        span: 2,
      },
      {
        id: 'production',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Produção',
        span: 2,
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Pedido: ${budget?.amount?.value} Un`,
        span: 1,
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
      breadcrumbsPath,
      budget: { ...budget },
      folders,
      pageProps,
      headCellsDocs,
      headCellsMessages,
      headCellsOrderDetail,
      headCellsUpperOrderDetail,
      categories
    };

    return <BudgetScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Budget;
