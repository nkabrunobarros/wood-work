/* eslint-disable react/no-unknown-property */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import stylesMessage from '../../../styles/Messages.module.css';
import styles from '../../../styles/Order.module.css';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import routes from '../../../navigation/routes';
import Notification from '../../dialogs/Notification';
import Docs from './sections/Docs';
import DocsClient from './sections/DocsClient';
import Head from './sections/Head';
import Messages from './sections/Messages';
import Production from './sections/Production';

const Order = ({ ...props }) => {
  const { breadcrumbsPath } = props;
  const [order, setOrder] = useState(props.order);
  const [refresh, setRefresh] = useState(new Date());
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Page Header */}
      <Content id={refresh}>
        <Head {...props} order={order} setOrder={setOrder}/>
      </Content>
      {/* Produção section */}
      <Content>
        <Production {...props} open={isInternalPage && order.status.value !== 'in drawing'} />
      </Content>
      {/* Docs */}
      <Content>
        <Docs open={isInternalPage} styles={styles} onNewFolder={setRefresh} {...props} />
      </Content>
      {/* Messages */}
      <Content>
        <Messages stylesMessage={stylesMessage}{...props} />
      </Content>
      {/* Docs Cliente */}
      <Content id={refresh}>
        <DocsClient styles={styles} {...props} isInternalPage={isInternalPage} />
      </Content>
    </Grid >
  );
};

Order.propTypes = {
  breadcrumbsPath: PropTypes.array,
  order: PropTypes.object,
};

export default Order;
