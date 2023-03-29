/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import DashboardScreen from '../../components/pages/dashboard/dashboard';
import AuthData from '../../lib/AuthData';
import routes from '../../navigation/routes';
//  Actions
import * as clientsActionsRedux from '../../store/actions/client';
import * as permissionsActionsRedux from '../../store/actions/permission';

const DashBoards = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getPermissions = (data) => dispatch(permissionsActionsRedux.permissions(data));
  const getResources = (data) => dispatch(permissionsActionsRedux.resources(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));

  useEffect(() => {
    const getData = async () => {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.permissions.data && await getPermissions();
      !reduxState.permissions.resources && await getResources();
      !reduxState.clients.data && await getClients();
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && typeof window !== 'undefined' && reduxState.clients.data && reduxState.permissions.data) {
    const breadcrumbsPath = [
      {
        title: 'Painel de Controlo',
        href: `${routes.private.internal.dashboards}`,
      }
    ];

    const test = reduxState.permissions.resources.map(resource => { return resource.name.replace('add_', '').replace('view_', '').replace('change_', '').replace('delete_', ''); });

    function removeDuplicates (arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    const resources = removeDuplicates(test.map(word => {
      if (word.endsWith('s')) {
        return word.slice(0, -1); // remove last character if it's "s"
      }

      return word;
    }));

    const permissionsBuilt = reduxState.permissions.data.map((item) => {
      const perm = { ...item };

      perm.resources = {};
      perm.pagesAccess = {};

      reduxState.permissions.resources.map((reso) => {
        if (reso.name.includes('access_')) perm.pagesAccess[reso.name.replace('access_', '')] = !!reduxState.permissions.resources.find((ele) => ele.name === reso.name);
      });

      resources.map((reso) => {
        if (!reso.includes('access_')) {
          perm.resources[reso] = {
            get: !!reduxState.permissions.resources.find((ele) => ele.name === `view_${reso}`),
            post: !!reduxState.permissions.resources.find((ele) => ele.name === `add_${reso}`),
            patch: !!reduxState.permissions.resources.find((ele) => ele.name === `change_${reso}`),
            delete: !!reduxState.permissions.resources.find((ele) => ele.name === `delete_${reso}`),
          };
        }
      });

      return perm;
    });

    const props = {
      breadcrumbsPath,
      pageProps,
      clients: reduxState.clients.data,
      permissions: permissionsBuilt,
      resources: resources.filter(ele => !ele.includes('access_')),
      acessSections: removeDuplicates(test).filter((reso) => reso.includes('access_'))
    };

    console.log(props);

    return <DashboardScreen {...props} />;
  }

  return <Loader center={true} />;
};

DashBoards.propTypes = {

};

export default DashBoards;
