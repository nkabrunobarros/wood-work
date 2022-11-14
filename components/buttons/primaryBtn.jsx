//  Nodes
import React from 'react';

import PropTypes from 'prop-types';

import { Button, Tooltip } from '@mui/material';
import styles from '../../styles/components/primaryBtn.module.css';
import GetStyles from './styles';

const PrimaryBtn = ({ text, icon, light, onClick, disabled, noBorder, children, title, hidden, fullWidth, type, id }) => {
  const styles2 = GetStyles();

  const style = {
    color: light ? 'palette.primary.main' : 'var(--white)',
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? '0.5' : '1',
    backgroundColor: light && 'white',
    border: noBorder && 'none',
    maxHeight: '20px'
  };

  return !hidden && (
    <Tooltip title={title || ''}>
      <Button id={id} fullWidth={fullWidth} type={type} sx={styles2.main} className={styles.main} style={style} onClick={onClick} component='label'>
        {icon}
        {text}
        {/* Children is for file Inputs */}
        {children}
      </Button>
    </Tooltip>
  );
};

PrimaryBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  light: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hidden: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.any,
  noBorder: PropTypes.any,
  type: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
};

export default PrimaryBtn;
