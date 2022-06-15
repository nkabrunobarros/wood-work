// Node modules
import { useRouter } from 'next/router';
import React, { useState } from 'react';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Custom Components
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import DrawerMobile from './drawer/drawer';

//  Material UI
import { CssBaseline, Hidden } from '@mui/material';

// Pages without layout (sidebar || navbar (these have footer inbued in the page)  )
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`,
  `${routes.public.internal.signInClient}`,
];

const Layout = ({ children, ...pageProps }) => {
  const path = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

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
      <Navbar openDrawer={handleDrawerToggle} {...pageProps} />
      <Hidden implementation='css'>
        <DrawerMobile
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          {...pageProps}
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
