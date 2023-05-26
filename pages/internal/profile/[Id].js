//  Nodes
import React, { useEffect, useState } from 'react';

import ProfileScreen from '../../../components/pages/permission/permission';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/loader/loader';
import routes from '../../../navigation/routes';
import * as permissionsActionsRedux from '../../../store/actions/profile';
import PropTypes from 'prop-types';

function addListProfiles (profiles, resources) {
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

const Profile = ({ pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(false);
  const [resources, setResources] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const getProfile = (data) => dispatch(permissionsActionsRedux.profiles(data));
  const getResources = (data) => dispatch(permissionsActionsRedux.resources(data));

  useEffect(() => {
    async function load () {
      await getProfile().then((res) => setProfile(res.data.results.filter(ele => ele.id === router.query.Id)));
      await getResources().then((res) => setResources(res.data)); //  All permissions resources
    }

    load().then(() => setLoaded(true));
  }, []);

  if (loaded && profile) {
    const perm = addListProfiles([...profile].map((ele) => { return { ...ele }; }), [...resources]);

    const breadcrumbsPath = [
      {
        title: 'Perfis',
        href: `${routes.private.internal.profiles}`,
      },
      {
        title: perm[0].name,
        href: `${routes.private.internal.profile}${perm[0].id}`,
      }
    ];

    // console.log(perm[0]);

    const props = { breadcrumbsPath, pageProps, resources, profile: perm[0] };

    return <ProfileScreen {...props} />;
  }

  return <Loader center={true} />;
};

Profile.propTypes = {
  pageProps: PropTypes.any,
};

export default Profile;
