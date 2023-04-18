import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import FactoryGroundScreen from '../../components/pages/factoryGround/factoryGround';
import AuthData from '../../lib/AuthData';
import routes from '../../navigation/routes';
import * as machinesActionsRedux from '../../store/actions/machine';
import * as projectsActionsRedux from '../../store/actions/project';

const FactoryGround = () => {
  const [loaded, setLoaded] = useState(true);
  const reduxState = useSelector((state) => state);
  const getProjects = (data) => dispatch(projectsActionsRedux.projectsInProduction(data));
  const getMachines = (data) => dispatch(machinesActionsRedux.machines(data));
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData () {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.projects.inProduction && getProjects();
      !reduxState.machines.data && getMachines();
    }

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && reduxState.projects.inProduction && reduxState.machines.data) {
    const breadcrumbsPath = [
      {
        title: 'Chão de Fabrica',
        href: `${routes.private.internal.factoryLevel}`,
      }
    ];

    const props = {
      breadcrumbsPath,
      projects: [...reduxState?.projects?.inProduction ?? []],
      machines: [...reduxState?.machines?.data ?? []],
    };

    return <FactoryGroundScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default FactoryGround;
