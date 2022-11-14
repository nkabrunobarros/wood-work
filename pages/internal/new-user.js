//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import NewUserScreen from '../../components/pages/newUser/newUser';

//  Navigation
import routes from '../../navigation/routes';

//  Actions
import * as CountryActions from '../../pages/api/actions/country';
import * as ProfileActions from '../../pages/api/actions/perfil';

const NewOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await CountryActions
          .countries()
          .then((res) => setCountries(res.data.payload.data));

        await ProfileActions
          .perfis()
          .then((res) => setProfiles(res.data.payload.data));
      } catch (error) { }
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Workers',
        href: `${routes.private.internal.users}`,
      },
      {
        title: 'Novo Worker',
        href: `${routes.private.internal.newUser}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      countries,
      profiles,
    };

    return loaded && <NewUserScreen {...props} />;
  } else return <Loader center={true} />;
};

export default NewOrder;
