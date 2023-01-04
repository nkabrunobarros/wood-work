import React from 'react';

//  PropTypes
import PropTypes from 'prop-types';

import { Backdrop } from '@mui/material';
import styles from '../../styles/components/loader.module.css';

const Loader = ({ center, backdrop }) => {
  let style = {};

  if (center) {
    style = {
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      height: '50px',
      width: '50px',
      margin: '-25px 0 0 -25px'
    };
  }

  return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={backdrop}
  >
    <div style={style}>
      <div className={styles.bars5}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

  </Backdrop>;
};

Loader.propTypes = {
  center: PropTypes.any,
  backdrop: PropTypes.bool
};

export default Loader;
