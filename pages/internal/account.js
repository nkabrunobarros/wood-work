//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import AccountScreen from '../../components/pages/account/account';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../navigation/routes';
import * as countriesActionsRedux from '../../store/actions/country';

//  Services

const Account = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const reduxState = useSelector((state) => state);
  const setCountries = (data) => dispatch(countriesActionsRedux.setCountries(data));

  useEffect(() => {
    const getData = async () => {
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
