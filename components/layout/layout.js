// Node modules
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import routes from '../../navigation/routes';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import DrawerMobile from './drawer/drawer';
import { CssBaseline, Hidden } from '@mui/material';

// Pages without layout (sidebar || navbar (these have footer inbued in the page)  )
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`,
  `${routes.public.internal.signInClient}`,
];

const Layout = ({ children }) => {
  const path = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const allRoutes = routes.private
  const test = Object.keys(allRoutes).reduce((object, key) => {
    if (key !== 'internal') {
      object[key] = allRoutes[key]
    }
    return object
  }, {})

  console.log(test)
  const clientPages = [
    `${routes.private.messages}`,
    `${routes.private.order}`,
    `${routes.private.orders}`,
    `${routes.private.profile}`,
  ];

  let footer = '';
  if (clientPages.includes(path.route)) footer = 'client';
  if (noLayoutScreens.includes(path.route)) return <>{children}</>;

  return (
    <div>
      <CssBaseline />
      <Navbar openDrawer={handleDrawerToggle} />
      <Hidden implementation='css'>
        <DrawerMobile
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Hidden>
      <div style={{ padding: '0rem 2rem 4rem 2rem', overflow: 'hidden' }}>
        {children}
      </div>
      <div style={{ width: '100%' }}>
        <Footer section={footer} />
      </div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
