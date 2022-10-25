import PropTypes from 'prop-types';
import React from 'react';

import { Box } from '@mui/material';
import styles from '../../styles/components/content.module.css';

const Content = ({ children }) => (
  <Box bgcolor={"default.main"} className={styles.main}>
    {children}
  </Box>
);

Content.propTypes = {
  children: PropTypes.any
};

export default Content;
