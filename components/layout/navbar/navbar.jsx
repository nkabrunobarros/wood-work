// Node modules
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../public/logo_bw_ww40_inv-big.png';
import styles from '../../../styles/components/navbar.module.css';

const Navbar = ({ openDrawer, ...pageProps }) => {
  // const [theme, setTheme] = useState('light');
  const open = Boolean();
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  // function toggleThemeHere() {
  //   // const res = toggleTheme()
  //   setTheme(toggleTheme());
  // }

  return (
    <>
      <AppBar position='sticky' sx={{ backgroundColor: 'default.sides' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Box className={styles.logos} sx={{ p: 1 }}>
              <Image
                src={companyLogo}
                alt={'company Logo'}
                width={50}
                height={50}
                placeholder='blur'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title='Menu'>
                <IconButton
                  id='drawerToggleBtn'
                  className={styles.menuBtn}
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  sx={{ ml: 2, ...(open && { display: 'none' }) }}
                  onClick={openDrawer}
                >
                  <Menu
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    style={{ color: 'var(--white)' }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box id='align' justifyContent={'end'}>
            <Box pr={3}>
              <Typography variant='md'>{loggedUser.name?.value}</Typography>
            </Box>
            <Box className={styles.logos} >
              <Image
                src={woodWorkyLogo}
                alt={'App Logo'}
                width={50}
                height={50}
                placeholder='blur'
                loading='lazy'
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

Navbar.propTypes = {
  openDrawer: PropTypes.any,
  toggleTheme: PropTypes.any,
};

export default Navbar;
