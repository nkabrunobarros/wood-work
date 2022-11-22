//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import NewWorkerScreen from '../../components/pages/newWorker/newWorker';

//  Navigation
import routes from '../../navigation/routes';

//  Actions
import * as CountryActions from '../api/actions/country';
import * as OrganizationActions from '../api/actions/organization';
import * as ProfileActions from '../api/actions/perfil';

const NewOrder = () => {
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
        .then((res) => setOrganizations(res.data));
      } catch (error) { }
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Workers',
        href: `${routes.private.internal.workers}`,
      },
      {
        title: 'Novo Worker',
        href: `${routes.private.internal.newWorker}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      countries,
      profiles,
      organizations,
    };

    return loaded && <NewWorkerScreen {...props} />;
  } else return <Loader center={true} />;
};

export default NewOrder;
