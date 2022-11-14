import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewClientScreen from '../../components/pages/newClient/newClient';
import routes from '../../navigation/routes';

//  Actions
import * as CountryActions from '../../pages/api/actions/country';
import * as OrganizationActions from '../../pages/api/actions/organization';
import * as ProfileActions from '../../pages/api/actions/perfil';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();
  const [profiles, setProfiles] = useState();
  const [organizations, setOrganizations] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await CountryActions
          .countries()
          .then((res) => setCountries(res.data.payload.data));

        await ProfileActions
          .perfis()
          .then((res) => setProfiles(res.data.payload.data));

        await OrganizationActions
          .organizations()
          .then((res) => setOrganizations(res.data.payload.data));
      } catch (error) { }
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Clientes',
        href: `${routes.private.internal.clients}`,
      },
      {
        title: 'Novo Cliente',
        href: `${routes.private.internal.newClient}`,
      },
    ];
  
    const props = {
      breadcrumbsPath,
      pageProps,
      countries,
      profiles,
      organizations,
    };
  
    return <NewClientScreen {...props} />;

  } else return <Loader center={true} />;
};

export default NewOrder;
