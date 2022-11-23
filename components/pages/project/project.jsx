/* eslint-disable react/no-unknown-property */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import stylesMessage from '../../../styles/Messages.module.css';
import styles from '../../../styles/Order.module.css';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import IsInternal from '../../utils/IsInternal';

//  PropTypes
import PropTypes from 'prop-types';

import Notification from '../../dialogs/Notification';
import Docs from './sections/Docs';
import DocsClient from './sections/DocsClient';
import Head from './sections/Head';
import Messages from './sections/Messages';
import Production from './sections/Production';

const Order = ({ ...props }) => {
  const { breadcrumbsPath } = props;
  const internalPOV = !IsInternal(JSON.parse(localStorage.getItem('user')).profile.object.description);
  const [refresh, setRefresh] = useState(new Date());

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Page Header */}
      <Content id={refresh}>
        <Head {...props} />
      </Content>
      {/* Produção section */}
      <Content>
        <Production {...props} open={internalPOV} />
      </Content>
      {/* Docs */}
      <Content>
        <Docs open={internalPOV}  styles={styles} onNewFolder={setRefresh} {...props}  />
      </Content>
      {/* Messages */}
      <Content>
        <Messages stylesMessage={stylesMessage}{...props} />
      </Content>
      {/* Docs Cliente */}
      <Content id={refresh}>
        <DocsClient styles={styles} {...props} />
      </Content>
    </Grid >
  );
};

Order.propTypes = {
  breadcrumbsPath: PropTypes.array,
};

export default Order;
