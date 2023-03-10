import { Hidden } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrawerMobile from '../../../components/layout/drawer/drawer';
import Navbar from '../../../components/layout/navbar/navbar';
import OrderScreen from '../../../components/pages/project/project';
import routes from '../../../navigation/routes';
import * as appStatesActions from '../../../store/actions/appState';

const Test2 = () => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const toggleDrawer = () => dispatch(appStatesActions.toggleDrawer());

  const breadcrumbsPath = [
    {
      title: 'Pedidos',
      href: `${routes.private.internal.projects}`,
    },
    {
      title: `${reduxState.projects.displayedProject?.name?.value}`,
      href: `${routes.private.internal.project}`,
    },
  ];

  return <>
    <Navbar toggleDrawer={toggleDrawer} />
    {true && <Hidden>
      <DrawerMobile
        state={reduxState}
        toggleDrawer={toggleDrawer}
      />
    </Hidden>}
    <button onClick={() => Router.push('/internal/test')} >GO TO TEST</button>
    <OrderScreen breadcrumbsPath={breadcrumbsPath} order={reduxState.projects.displayedProject} />
  </>;
  // return <Test />;
};

export default Test2;
