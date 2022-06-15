//  Nodes
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import ClientScreen from '../../../components/pages/client/client';

//  Navigation
import routes from '../../../navigation/routes';

//  Proptypes
import PropTypes from 'prop-types';

//  Services
import clientService from '../../../services/clients/client-service';

//  Utils
import hasData from '../../../components/utils/hasData';

const EditClient = ({ ...pageProps}) => {
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
