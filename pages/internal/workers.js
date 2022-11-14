//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import WorkersScreen from '../../components/pages/workers/workers';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes

//  Services
import * as ProfileActions from '../api/actions/perfil';
import * as WorkerActions from '../api/actions/worker';

const Workers = () => {
  const [loaded, setLoaded] = useState(false);
  const [workers, setWorkers] = useState();
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    const getData = async () => {
      await WorkerActions
        .workers()
        .then((res) => setWorkers(res.data));

      await ProfileActions
        .perfis()
        .then((res) => setProfiles(res.data.payload.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));

  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Workers',
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
        id: 'perfil.descricao',
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
        id: 'hasPermission.type',
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

    const editRoute = routes.private.internal.editUser;
    const detailRoute = routes.private.internal.user;
    const newRoute = routes.private.internal.newUser;

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

  } else return <Loader center={true} />;
};


export default Workers;
