//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  PreLoader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditClientScreen from '../../../components/pages/editClient/editClient';
import hasData from '../../../components/utils/hasData';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import clientService from '../../../services/clients/client-service';

const EditClient = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState();

  const router = useRouter();
  const clientId = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await clientService
        .getClientById(clientId)
        .then((res) => setClient(res.data.data));
    };
    Promise.all([getAll()]).then(setLoaded(true));
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
    if (hasData(client)) pageProps.hasFullyLoaded = true;

    return loaded && pageProps.hasFullyLoaded ? (
      <EditClientScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default EditClient;
