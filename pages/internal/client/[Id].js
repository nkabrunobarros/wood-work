import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import ClientScreen from '../../../components/pages/client/client';
import routes from '../../../navigation/routes';
import PropTypes from 'prop-types';
import clientService from '../../../services/clients/client-service';
import hasData from '../../../components/utils/hasData';

// eslint-disable-next-line react/prop-types
const EditClient = ({ ...pageProps}) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState();
  const router = useRouter();
  const clientId = router.query.Id;
  // eslint-disable-next-line react/prop-types

  useEffect(() => {
    const getAll = async () => {
      await clientService
        .getClientById(clientId)
        .then((res) => setClient(res.data.data));
    };
    getAll();
    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const editRoute = routes.private.internal.editClient;
    const breadcrumbsPath = [
      {
        title: 'Clientes',
        href: `${routes.private.internal.clients}`,
      },
      {
        title: `${client.nome}`,
        href: `${routes.private.internal.clients}`,
      },
    ];
    const props = {
      client,
      breadcrumbsPath,
      editRoute,
      pageProps
    };
    if (hasData(client)) pageProps.hasFullyLoaded = true;
    return loaded && pageProps.hasFullyLoaded ? <ClientScreen {...props} /> : <Loader center={true} />;
  }
  return loaded ? null : <Loader center={true} />;
};
EditClient.PropTypes = {
  client: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  editRoute: PropTypes.string,
  clients: PropTypes.array,
  pageProps: PropTypes.any
};

export default EditClient;
