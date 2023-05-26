//  Nodes
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import NewWorkerScreen from '../../components/pages/newWorker/newWorker';

//  Navigation
import routes from '../../navigation/routes';

//  Actions
import * as OrganizationsActionsRedux from '../../store/actions/organization';
import * as permissionsActionsRedux from '../../store/actions/profile';

const NewOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getOrganizations = (data) => dispatch(OrganizationsActionsRedux.organizations(data));
  const getPermissions = (data) => dispatch(permissionsActionsRedux.permissions(data));

  useEffect(() => {
    const getData = async () => {
      !reduxState.organizations.data && await getOrganizations();
      // !reduxState.permissions.data && await getPermissions();
      await getPermissions(); //  All permissions groups
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.internal.workers}`,
      },
      {
        title: 'Novo Utilizador',
        href: `${routes.private.internal.newWorker}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      countries: [],
      profiles: [],
      organizations: reduxState.organizations.data,
      permissions: reduxState.permissions.data,
    };

    return <NewWorkerScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default NewOrder;
