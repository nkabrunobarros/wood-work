/* eslint-disable no-constant-condition */
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
import Navbar from '../../layout/navbar/navbar';
import Docs from './sections/Docs';
import DocsClient from './sections/DocsClient';
import Head from './sections/Head';
import Messages from './sections/Messages';
import Production from './sections/Production';
import Production2 from './sections/Production2';
import Products from './sections/Products';
import ProductsObservations from './sections/ProductsObservations';

const Order = ({ ...props }) => {
  const { breadcrumbsPath } = props;
  const [order, setOrder] = useState(props.order);
  const [refresh, setRefresh] = useState(new Date());
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem', height: '100%' }}>
        <CssBaseline />
        <Notification />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        {/* Page Header */}
        <Content id={refresh}>
          <Head {...props} order={order} setOrder={setOrder} isInternalPage={isInternalPage} />
        </Content>
        {/* Products */}
        <Content>
          <Products open={isInternalPage} styles={styles} onNewFolder={setRefresh} {...props} />
        </Content>
        {/* Products */}
        <Content>
          <ProductsObservations open={isInternalPage} styles={styles} {...props} />
        </Content>
        {/* Production section */}
        <Content>
          <Production {...props} open={isInternalPage && order.status.value !== 'drawing'} />
        </Content>
        {/* Production per furniture section */}
        {false && <Content>
          <Production2 {...props} open={isInternalPage && order.status.value !== 'drawing'} />
        </Content>}
        {/* Docs */}
        <Content>
          <Docs open={isInternalPage} styles={styles} onNewFolder={setRefresh} {...props} />
        </Content>
        {/* Messages */}
        <Content>
          <Messages stylesMessage={stylesMessage} {...props} />
        </Content>
        {/* Docs Client */}
        <Content id={refresh}>
          <DocsClient styles={styles} {...props} isInternalPage={isInternalPage} />
        </Content>
      </Grid >
    </>
  );
};

Order.propTypes = {
  breadcrumbsPath: PropTypes.array,
  order: PropTypes.object,
};

export default Order;
