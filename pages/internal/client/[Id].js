import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import ClientScreen from '../../../components/pages/client/client';
import routes from '../../../navigation/routes';
import { getClients } from '../../../components/mock/Clients';
import PropTypes from 'prop-types';

export async function getServerSideProps(context) {
  const res = getClients();
  return {
    props: { clients: res }, // will be passed to the page component as props
  };
}
// eslint-disable-next-line react/prop-types
const EditClient = ({ clients }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const clientId = router.query.Id;
  // eslint-disable-next-line react/prop-types
  const client = clients.find(
    (client) => client.id.toString() === clientId.toString()
  );

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  
  const editRoute = routes.private.internal.editClient

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
    editRoute
  };
  return loaded ? <ClientScreen {...props} /> : <Loader center={true} />;
};
EditClient.PropTypes = {
  client: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  editRoute: PropTypes.string,
  clients: PropTypes.array
}

export default EditClient;
