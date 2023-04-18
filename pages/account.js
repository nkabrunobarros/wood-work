//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../components/loader/loader';

//  Page Component
import AccountScreen from '../components/pages/account/account';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import { useDispatch, useSelector } from 'react-redux';
import routes from '../navigation/routes';
import * as clientsActionsRedux from '../store/actions/client';
import * as countriesActionsRedux from '../store/actions/country';

import axios from 'axios';

//  Services

const Account = ({ ...pageProps }) => {
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const getClient = (data) => dispatch(clientsActionsRedux.clientMe(data));
  const [loaded, setLoaded] = useState(false);
  const [owner, setOwner] = useState();
  const reduxState = useSelector((state) => state);
  const setCountries = (data) => dispatch(countriesActionsRedux.setCountries(data));

  useEffect(() => {
    const getData = async () => {
      getClient().then((res) => setOwner(res.data[0]));
      !reduxState.countries.data && await axios.get('https://restcountries.com/v3.1/all').then(async (res) => await setCountries(res.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Conta',
        href: `${routes.private.internal.user}`,
      },
    ];

    const props = {
      user,
      owner,
      breadcrumbsPath,
      pageProps
    };

    return loaded && <AccountScreen {...props} />;
  }

  return <Loader center={true} />;
};

Account.propTypes = {
  users: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
};

export default Account;
