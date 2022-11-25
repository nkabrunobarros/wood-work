//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import EditUserScreen from '../../../components/pages/editWorker/editWorker';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as CountryActions from '../../../pages/api/actions/country';
import * as ProfileActions from '../../../pages/api/actions/perfil';
import * as UserActions from '../../../pages/api/actions/user';

const EditUser = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      try {
        await UserActions
          .userById({ id: router.query.Id })
          .then((res) => setUser(res.data.payload));
  
        await CountryActions
          .countries()
          .then((res) => setCountries(res.data.payload.data));
  
        await ProfileActions
          .perfis()
          .then((res) => setProfiles(res.data.payload.data));
      } catch (error) {}

    };

    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.internal.users}`,
      },
      {
        title: `${user.nome}`,
        href: `${routes.private.internal.user}${user.id}`,
      },
      {
        title: 'Editar Utilizador',
        href: `${routes.private.internal.editUser}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      user,
      pageProps,
      countries,
      profiles,
    };



    return loaded && <EditUserScreen {...props} />;
  } else return <Loader center={true} />;
};

export default EditUser;
