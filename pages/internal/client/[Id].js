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
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../../lib/AuthData';
import * as clientsActionsRedux from '../../../store/actions/client';
import * as countriesActionsRedux from '../../../store/actions/country';

const EditClient = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const setCountries = (data) => dispatch(countriesActionsRedux.setCountries(data));
  const setDisplayedClient = (data) => dispatch(clientsActionsRedux.setDisplayedClient(data));

  useEffect(() => {
    const getData = async () => {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      if (!reduxState.clients.displayedClient) await getClient(router.query.Id).then((res) => console.log(res));
      else if (reduxState.clients.data) setDisplayedClient(reduxState.clients.data.find(ele => ele.id === router.query.Id));

      !reduxState.countries.data && await axios.get('https://restcountries.com/v3.1/all').then(async (res) => await setCountries(res.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const editRoute = routes.private.internal.editClient;

    const breadcrumbsPath = [
      {
        title: 'Clientes',
        href: `${routes.private.internal.clients}`,
      },
      {
        title: `${reduxState.clients.displayedClient?.user?.first_name + ' ' + reduxState.clients.displayedClient?.user?.last_name}`,
        href: `${routes.private.internal.clients}`,
      },
    ];

    const props = {
      client: JSON.parse(JSON.stringify({ ...reduxState.clients.displayedClient })),
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
