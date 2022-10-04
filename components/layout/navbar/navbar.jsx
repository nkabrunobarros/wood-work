// Node modules
import { Box, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../public/logo_bw_ww40_inv.png';
import styles from '../../../styles/components/navbar.module.css';

const Navbar = ({ openDrawer, ...pageProps }) => {
  const open = Boolean();

  return (
    <>
      <Box className={styles.main}>
        <Box sx={{ display: 'flex' }}>
          <Box className={styles.logos}>
            <Image
              src={companyLogo}
              layout='responsive'
              placeholder='blur'
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Tooltip title='Menu'>
              <IconButton
                className={styles.menuBtn}
                color='inherit'
                aria-label='open drawer'
                edge='start'
                sx={{ ml: 2, ...(open && { display: 'none' }) }}
                onClick={openDrawer}
              >
                <Menu
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSizeMd}
                  style={{ color: 'var(--white)' }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box className={styles.logos} sx={{ marginRight: '2rem' }}>
          <Image
            src={woodWorkyLogo}
            layout='responsive'
            placeholder='blur'
          />
        </Box>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  openDrawer: PropTypes.any,
};

export default Navbar;
