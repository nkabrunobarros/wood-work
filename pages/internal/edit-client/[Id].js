//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  PreLoader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditClientScreen from '../../../components/pages/editClient/editClient';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as ClientActions from '../../../pages/api/actions/client';
import * as OrganizationActions from '../../../pages/api/actions/organization';

const EditClient = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState();
  const [organizations, setOrganizations] = useState();
  const router = useRouter();
  const clientId = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await ClientActions
        .client({ id: clientId })
        .then((res) => setClient(res.data[0]));

      await OrganizationActions
        .organizations()
        .then((res) => setOrganizations(res.data));
    };



    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const detailPage = routes.private.internal.client;

    const breadcrumbsPath = [
      {
        title: 'Clientes',
        href: `${routes.private.internal.clients}`,
      },
      {
        title: `${client.legalName.value}`,
        href: `${routes.private.internal.client}${client.id}`,
      },
      {
        title: `Editar Cliente`,
        href: `${routes.private.internal.clients}`,
      },
    ];

    const props = {
      client,
      breadcrumbsPath,
      detailPage,
      pageProps,
      organizations,
    };


    return <EditClientScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditClient;
