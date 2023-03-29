//  Nodes
import React from 'react';

//  Custom Components

//  Page Component
import AssemblysScreen from '../../components/pages/assembly/assembly';

//  Proptypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Services

const Assembly = ({ ...pageProps }) => {
  const breadcrumbsPath = [
    {
      title: 'Montagens',
      href: `${routes.private.internal.assemblys}`,
    },
  ];

  const props = {
    breadcrumbsPath,
    pageProps
  };

  return <AssemblysScreen {...props} />;
};

Assembly.propTypes = {
  breadcrumbsPath: PropTypes.array,
};

export default Assembly;
