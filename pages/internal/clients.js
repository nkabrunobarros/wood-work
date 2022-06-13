import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import UsersScreen from "../../components/pages/users/users";
import routes from "../../navigation/routes";
import getCountries from "../../components/mock/Countries";

import PropTypes from "prop-types";
import hasData from "../../components/utils/hasData";
import clientService from "../../services/clients/client-service";

export async function getServerSideProps(context) {
  const res2 = await getCountries();
  return {
    props: { countries: res2 }, // will be passed to the page component as props
  };
}
const Clients = ({ hasFullyLoaded, countries, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);
  useEffect(() => {
    const getData = async () => {
      await clientService
        .getAllClients()
        .then((res) => setClients(res.data.data));
    };
    getData();
  }, []);
  const headCells = [
    {
      id: "nome",
      numeric: false,
      disablePadding: false,
      label: "Nome",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "actions",
      numeric: true,
      disablePadding: false,
      label: "Ações",
    },
  ];
  const editRoute = routes.private.internal.editClient;
  const detailRoute = routes.private.internal.client;
  const newRoute = routes.private.internal.newClient;
  const breadcrumbsPath = [
    {
      title: "Clientes",
      href: `${routes.private.internal.clients}`,
    },
  ];
  const items = clients;
  const props = {
    items,
    breadcrumbsPath,
    countries,
    editRoute,
    detailRoute,
    headCells,
    newRoute,
  };

  // hasFullyLoaded = useAuthValidation(hasFullyLoaded, pageProps.loggedUser , routes.public.signIn);
  if (hasData(items) && hasData(countries)) pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? (
    <UsersScreen {...props} />
  ) : (
    <Loader center={true} />
  );
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
  hasFullyLoaded: PropTypes.any,
};
export default Clients;
