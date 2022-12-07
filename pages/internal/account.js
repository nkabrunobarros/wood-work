//  Nodes
import React from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import AccountScreen from '../../components/pages/account/account';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Services


const Account = ({ ...pageProps }) => {
  let loaded = false;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) loaded = true;

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: `Conta`,
        href: `${routes.private.internal.user}`,
      },
    ];

    const props = {
      user,
      breadcrumbsPath,
      pageProps
    };

    return loaded && <AccountScreen {...props} />;
  } else return <Loader center={true} />;

};

Account.propTypes = {
  users: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
};

export default Account;
