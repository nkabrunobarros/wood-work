/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import EditClientScreen from '../../../components/pages/editClient/editClient';
import routes from '../../../navigation/routes';
import { getClients } from '../../../components/mock/Clients';

export async function getServerSideProps(context) {
  const res = getClients();
  return {
    props: { clients: res }, // will be passed to the page component as props
  };
}
const EditClient = ({ clients }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const clientId = router.query.Id;
  const client = clients.find(
    (client) => client.id.toString() === clientId.toString()
  );

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

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
  };
  return loaded ? <EditClientScreen {...props} /> : <Loader center={true} />;
};
export default EditClient;
