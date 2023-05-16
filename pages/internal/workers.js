//  Nodes
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Custom Components
import Loader from '../../components/loader/loader';
import { functions } from '../../components/pages/newWorker/newWorker';
import WorkersScreen from '../../components/pages/workers/workers';

//  Navigation
import routes from '../../navigation/routes';
import * as workersActionsRedux from '../../store/actions/worker';

//  Proptypes

const Workers = () => {
  const [loaded, setLoaded] = useState(false);
  const profiles = functions;
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getWorkers = (data) => dispatch(workersActionsRedux.workers(data));

  useEffect(() => {
    const getData = async () => {
      await getWorkers();
      // !reduxState.permissions.data && await getPermissions();
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && reduxState.workers.data) {
    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.users}`,
      },
    ];

    const headCells = [
      {
        id: 'nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
      },
      {
        id: 'functionPerformed.object.description',
        numeric: true,
        disablePadding: false,
        label: 'Perfil',
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
      },
    ];

    const headCellsWorkers = [
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
        show: true
      },
      {
        id: 'email.value',
        numeric: false,
        disablePadding: true,
        label: 'Email',
        show: true
      },
      // {
      //   id: 'functionPerformed.value',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Função',
      // },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
        show: true
      },
    ];

    const editRoute = routes.private.internal.editWorker;
    const detailRoute = routes.private.internal.worker;
    const newRoute = routes.private.internal.newWorker;

    const props = {
      breadcrumbsPath,
      profiles,
      editRoute,
      detailRoute,
      headCells,
      newRoute,
      workers: reduxState.workers?.data.map((worker) => {
        const worker2 = { ...worker };

        worker2.Nome = worker.givenName?.value + ' ' + worker.familyName?.value;
        worker2.Email = worker.email?.value;
        worker2.Perfil = worker.functionPerformed?.value;

        return worker2;
      }),
      headCellsWorkers,
    };

    return <WorkersScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Workers;
