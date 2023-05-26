//  Nodes
import React, { useEffect, useState } from 'react';

import NewProfileScreen from '../../components/pages/newProfile/newProfile';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Loader from '../../components/loader/loader';
import routes from '../../navigation/routes';
import * as profileActionsRedux from '../../store/actions/profile';

const NewProfile = ({ pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [resources, setResources] = useState(false);
  const dispatch = useDispatch();
  const getResources = (data) => dispatch(profileActionsRedux.resources(data));

  useEffect(() => {
    async function load () {
      await getResources().then((res) => setResources(res.data)); //  All permissions resources
    }

    load().then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const permissionsMap = {};

    for (const resource of resources) {
      const { codename } = resource;
      const [type, action] = codename.split('_');

      if (!permissionsMap[action]) {
        permissionsMap[action] = {};
      }

      permissionsMap[action][type] = false;
    }

    const breadcrumbsPath = [
      {
        title: 'Perfis',
        href: `${routes.private.internal.profiles}`,
      },
      {
        title: 'Novo Perfil',
        href: `${routes.private.internal.newProfile}`,
      },
    ];

    const props = { breadcrumbsPath, pageProps, resources, permissionsMap };

    return <NewProfileScreen {...props} />;
  }

  return <Loader center={true} />;
};

NewProfile.propTypes = {
  pageProps: PropTypes.any,
};

export default NewProfile;
