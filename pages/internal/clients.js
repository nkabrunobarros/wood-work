//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import ClientsScreen from '../../components/pages/clients/clients';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes
import PropTypes from 'prop-types';

//  Utils

//  Services
// import countryService from '../../services/countries/country-service';
import * as ClientsActions from '../../pages/api/actions/client';
import * as ProfileActions from '../../pages/api/actions/perfil';

const Clients = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    const getData = async () => {
      await ClientsActions
        .clients()
        .then((res) => {
          console.log(res);
          setClients(res.data);
        });

      await ProfileActions
        .perfis()
        .then((res) => setProfiles(res.data.payload.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const headCells = [
      {
        id: 'legalName.value',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'email.value',
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
      profiles,
      editRoute,
      detailRoute,
      headCells,
      newRoute,
      pageProps
    };


    return <ClientsScreen {...props} />;
  } else return <Loader center={true} />;

};

Clients.propTypes = {
  items: PropTypes.array,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array,
  profiles: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};

export default Clients;
