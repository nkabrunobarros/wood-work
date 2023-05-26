//  Nodes
import React, { useEffect, useState } from 'react';

import PermissionScreen from '../../../components/pages/permission/permission';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/loader/loader';
import routes from '../../../navigation/routes';
import * as permissionsActionsRedux from '../../../store/actions/profile';

function addListPermissions (profiles, resources) {
  // Create an object to store the permissions for each resource type
  const permissionsMap = {};

  // Iterate over the resources array and populate the permissions map
  for (const resource of resources) {
    const { codename } = resource;
    const [type, action] = codename.split('_');

    if (!permissionsMap[action]) {
      permissionsMap[action] = {};
    }

    permissionsMap[action][type] = resource.id;
  }

  // Iterate over the profiles array and add the listPermissions property
  for (const profile of profiles) {
    const { permissions } = profile;
    const listPermissions = {};

    for (const permission of permissions) {
      const { codename } = permission;
      const [type, action] = codename.split('_');

      if (!listPermissions[action]) {
        listPermissions[action] = {};
      }

      // Check if the profile has access to the resource
      listPermissions[action][type] = permission.id;
    }

    // Set missing permissions to false
    for (const type in permissionsMap) {
      if (!listPermissions[type]) {
        listPermissions[type] = {};
      }

      for (const action in permissionsMap[type]) {
        if (!listPermissions[type][action]) {
          listPermissions[type][action] = false;
        }
      }
    }

    profile.listPermissions = listPermissions;
  }

  return profiles;
}

const Permission = ({ pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [permission, setPermission] = useState(false);
  const [resources, setResources] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const getPermission = (data) => dispatch(permissionsActionsRedux.permissions(data));
  const getResources = (data) => dispatch(permissionsActionsRedux.resources(data));

  useEffect(() => {
    async function load () {
      await getPermission().then((res) => setPermission(res.data.results.filter(ele => ele.id === router.query.Id)));
      await getResources().then((res) => setResources(res.data)); //  All permissions resources
    }

    load().then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const perm = addListPermissions([...permission].map((ele) => { return { ...ele }; }), [...resources]);

    const breadcrumbsPath = [
      {
        title: 'Permissões',
        href: `${routes.private.internal.permissions}`,
      },
      {
        title: perm[0].name,
        href: `${routes.private.internal.permission}`,
      }
    ];

    console.log(perm[0]);

    const props = { breadcrumbsPath, pageProps, resources, permission: perm[0] };

    return <PermissionScreen {...props} />;
  }

  return <Loader center={true} />;
};

Permission.propTypes = {
  pageProps: PropTypes.any,
};

export default Permission;
