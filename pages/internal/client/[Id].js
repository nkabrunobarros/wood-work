//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import ClientScreen from '../../../components/pages/client/client';

//  Navigation
import routes from '../../../navigation/routes';

//  Proptypes
import PropTypes from 'prop-types';

//  Services
import * as ClientActions from '../../../pages/api/actions/client';

const EditClient = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      await ClientActions
        .client({ id: router.query.Id })
        .then((res) => setClient(res.data[0]));
    };

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
        title: `${client?.name?.value}`,
        href: `${routes.private.internal.clients}`,
      },
    ];

    const props = {
      client,
      breadcrumbsPath,
      editRoute,
      pageProps
    };

    return <ClientScreen {...props} />;
  }

  return <Loader center={true} />;
};

EditClient.PropTypes = {
  client: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  editRoute: PropTypes.string,
  clients: PropTypes.array,
  pageProps: PropTypes.any
};

export default EditClient;
