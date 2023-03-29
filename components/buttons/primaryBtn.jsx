//  Nodes
import React from 'react';

import PropTypes from 'prop-types';

import { Button, Grow, Tooltip } from '@mui/material';

const PrimaryBtn = ({ text, icon, light, onClick, disabled, noBorder, children, title, hidden, fullWidth, type, id, sx, breathing, otherProps }) => {
  const style = {
    color: light ? 'palette.primary.main' : 'var(--white)',
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? '0.5' : '1',
    border: noBorder && 'none',
    maxHeight: '30px'
  };

  return !hidden && (
    <Grow in={true}>
      <Tooltip title={title || ''}>
        <Button {...otherProps} className={breathing && 'breathingBackgroundWarning'} id={id} fullWidth={fullWidth} variant={!light && 'contained'} type={type} style={style} onClick={onClick} component='label' sx={sx}>
          {icon}
          {text}
          {/* Children is for file Inputs */}
          {children}
        </Button>
      </Tooltip>
    </Grow>
  );
};

PrimaryBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.any,
  light: PropTypes.bool,
  breathing: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hidden: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  noBorder: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  sx: PropTypes.object,
  otherProps: PropTypes.object,
};

export default PrimaryBtn;
