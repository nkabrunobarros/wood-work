//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import EditWorkerScreen from '../../../components/pages/editWorker/editWorker';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
// import * as CountryActions from '../../api/actions/country';
// import * as ProfileActions from '../../api/actions/perfil';
import * as workerActions from '../../api/actions/worker';

const EditWorker = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  // const [countries, setCountries] = useState();
  // const [profiles, setProfiles] = useState();
  const countries = [];
  const profiles = [];
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      try {
        await workerActions
          .worker({ id: router.query.Id })
          .then((res) => setUser(res.data[0]));

        // await CountryActions
        //   .countries()
        //   .then((res) => setCountries(res.data.payload.data));

        // await ProfileActions
        //   .perfis()
        //   .then((res) => setProfiles(res.data.payload.data));
      } catch (error) { }

    };

    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    console.log(user);

    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.internal.users}`,
      },
      {
        title: `${user.givenName.value}`,
        href: `${routes.private.internal.user}${user.id}`,
      },
      {
        title: 'Editar Utilizador',
        href: `${routes.private.internal.editWorker}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      user,
      pageProps,
      countries,
      profiles,
    };



    return loaded && <EditWorkerScreen {...props} />;
  } else return <Loader center={true} />;
};

export default EditWorker;