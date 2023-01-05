import { IconButton, Tooltip } from '@mui/material';
import { Play } from 'lucide-react';
import React from 'react';
//  Proptypes
import PropTypes from 'prop-types';

export const StartBtn = (props) => {
  return !props.detailOnly && (
    <IconButton onClick={() => props.onStart(props)} >
      <Tooltip title={props.msg || 'Iniciar'} >
        <Play />
      </Tooltip>
    </IconButton>
  );
};

StartBtn.propTypes = {
  msg: PropTypes.string,
  detailOnly: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
};
