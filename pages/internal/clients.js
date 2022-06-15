//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import UsersScreen from '../../components/pages/users/users';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes
import PropTypes from 'prop-types';

//  Utils
import hasData from '../../components/utils/hasData';

//  Services
import countryService from '../../services/countries/country-service';
import clientService from '../../services/clients/client-service';

const Clients = ({ hasFullyLoaded, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [countries, setCountries] = useState();

  useEffect(() => {
    const getData = async () => {
      await clientService
        .getAllClients()
        .then((res) => setClients(res.data.data));
      await countryService
        .getAllCountries()
        .then((res) => setCountries(res.data.data));
    };
    Promise.all([getData()]).then(setLoaded(true));
  }, []);
  if (loaded) {
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
    const newRoute = routes.private.internal.newClient;

    const breadcrumbsPath = [
      {
        title: 'Clientes',
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
  }
  return <Loader center={true} />;
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
