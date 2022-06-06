import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import UsersScreen from '../../components/pages/users/users';
import routes from '../../navigation/routes';
import getCountries from '../../components/mock/Countries';
import { getClients } from '../../components/mock/Clients';

import PropTypes from 'prop-types';

export async function getServerSideProps(context) {
  const res = await getClients();
  const res2 = await getCountries();
  return {
    props: { users: res, countries: res2 }, // will be passed to the page component as props
  };
}
const Clients = ({ users, countries }) => {
  const [loaded, setLoaded] = useState(false);
  const items = users;
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);
  const headCells = [
    {
      id: 'nome',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];
  const editRoute = routes.private.internal.editClient;
  const detailRoute = routes.private.internal.client;
  const newRoute = routes.private.internal.newClient
  const breadcrumbsPath = [
    {
      title: 'Clientes',
      href: `${routes.private.internal.clients}`,
    },
  ];
  const props = {
    items,
    breadcrumbsPath,
    countries,
    editRoute,
    detailRoute,
    headCells,
    newRoute
  };
  return loaded ? <UsersScreen {...props} /> : <Loader center={true} />;
};

Clients.propTypes = {
  items: PropTypes.array,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array,
  countries: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};
export default Clients;
