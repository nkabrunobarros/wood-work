//  Nodes
import React from 'react';

//  Custom Components
import Loader from '../components/loader/loader';

//  Page Component
import ProfileScreen from '../components/pages/profile/profile';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../navigation/routes';

//  Services

const Profile = () => {
  let loaded = false;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) loaded = true;

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Conta',
        href: `${routes.private.internal.user}`,
      },
    ];

    const props = {
      user,
      breadcrumbsPath
    };

    return loaded && <ProfileScreen {...props} />;
  }

  return <Loader center={true} />;
};

Profile.propTypes = {
  users: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
};

export default Profile;
