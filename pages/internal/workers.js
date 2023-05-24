//  Nodes
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Custom Components
import Loader from '../../components/loader/loader';
import WorkersScreen from '../../components/pages/workers/workers';

//  Navigation
import routes from '../../navigation/routes';
import * as workersActionsRedux from '../../store/actions/worker';

//  Proptypes

const Workers = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getWorkers = (data) => dispatch(workersActionsRedux.workers(data));

  useEffect(() => {
    const getData = async () => {
      await getWorkers();
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

    const headCellsWorkers = [
      {
        id: 'Nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
        show: true
      },
      {
        id: 'Email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
        show: true
      },
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
      editRoute,
      detailRoute,
      newRoute,
      workers: reduxState.workers?.data.map((worker) => {
        const worker2 = { ...worker };

        worker2.Nome = worker.givenName?.value + ' ' + worker.familyName?.value;
        worker2.NomeDropdown = worker.givenName?.value + ' ' + worker.familyName?.value + ' - ' + worker.email?.value;
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
