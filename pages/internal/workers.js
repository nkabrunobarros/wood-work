//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import { functions } from '../../components/pages/newWorker/newWorker';
import WorkersScreen from '../../components/pages/workers/workers';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes

//  Services
// import * as ProfileActions from '../api/actions/perfil';
import * as WorkerActions from '../api/actions/worker';

const Workers = () => {
  const [loaded, setLoaded] = useState(false);
  const [workers, setWorkers] = useState();
  // const [profiles, setProfiles] = useState();
  const profiles = functions;

  useEffect(() => {
    const getData = async () => {
      await WorkerActions
        .workers()
        .then((res) => setWorkers([...res.data].map((worker) => {
          worker.Nome = worker.givenName?.value;
          worker.Email = worker.email?.value;
          worker.Perfil = worker.functionPerformed?.value;

          return worker;
        })));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    console.log(workers);

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
        id: 'givenName.value',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'email.value',
        numeric: false,
        disablePadding: true,
        label: 'Email',
      },
      {
        id: 'functionPerformed.value',
        numeric: true,
        disablePadding: false,
        label: 'Função',
      },
      {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
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
      workers,
      headCellsWorkers,
    };

    return <WorkersScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Workers;
