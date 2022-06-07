// Node modules
import {
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../styles/components/navbar.module.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Navbar = ({ openDrawer }) => {
  const open = Boolean();
  return (
    <div className={styles.main}>
      <div className={styles.navigationButtons}>
        <div className='flexRow'>
          <div
            className='logoImg'
            style={{marginLeft:'2rem', width: '80px', height: '80px' }}
          ></div>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ ml: 2, ...(open && { display: 'none' }) }}
            onClick={openDrawer}
          >
            <MenuOutlinedIcon
              style={{ fontSize: '3vh', color: 'var(--white)' }}
            />
          </IconButton>
        </div>
        <div
          className={styles.userDropdown}
          style={{marginRight: '2rem', width: '80px', height: '80px', marginLeft: 'auto' }}
        ></div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  openDrawer: PropTypes.any,
};

export default Navbar;
