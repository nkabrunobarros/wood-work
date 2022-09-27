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

const EditClient = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState();
  const router = useRouter();
  const clientId = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await ClientActions
        .client({id: clientId})
        .then((res) => setClient(res.data.payload));
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
        title: `Editar Cliente`,
        href: `${routes.private.internal.clients}`,
      },
    ];

    const props = {
      client,
      breadcrumbsPath,
      detailPage,
      pageProps,
    };


    return loaded && <EditClientScreen {...props} />
  }

  return <Loader center={true} />;
};

export default EditClient;
