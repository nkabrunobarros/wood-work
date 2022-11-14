//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import UsersScreen from '../../components/pages/users/users';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes

//  Utils

//  Services
import * as ProfileActions from '../../pages/api/actions/perfil';
import * as UserActions from '../../pages/api/actions/user';
import * as WorkerActions from '../../pages/api/actions/worker';

const Users = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState();
  const [workers, setWorkers] = useState();
  const [profiles, setProfiles] = useState();
  const items = users;



  useEffect(() => {
    const getData = async () => {
      await UserActions
        .users()
        .then((res) => setUsers(res.data.payload.data));

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
      items,
      breadcrumbsPath,
      profiles,
      editRoute,
      detailRoute,
      headCells,
      newRoute,
      workers,
      headCellsWorkers,
    };


    return <UsersScreen {...props} />;

  } else return <Loader center={true} />;
};


export default Users;
