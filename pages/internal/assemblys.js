//  Nodes

//  Custom Components

//  Page Component
import AssemblysScreen from '../../components/pages/assembly/assembly';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../lib/AuthData';
import routes from '../../navigation/routes';
import * as projectsActionsRedux from '../../store/actions/project';
import Loader from '../../components/loader/loader';

//  Services

const Assembly = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(true);
  const reduxState = useSelector((state) => state);
  const getProjects = (data) => dispatch(projectsActionsRedux.projectsInProduction(data));
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData () {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.projects.inProduction && getProjects();
    }

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Montagens',
        href: `${routes.private.internal.assemblys}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      pageProps,
      projects: [...reduxState.projects?.inProduction ?? []],

    };

    return <AssemblysScreen {...props} />;
  }

  return <Loader center={true} />;
};

Assembly.propTypes = {
  breadcrumbsPath: PropTypes.array,
};

export default Assembly;
