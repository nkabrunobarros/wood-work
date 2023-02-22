import { IconButton, Tooltip } from '@mui/material';
import { MinusCircle, Play } from 'lucide-react';
import React from 'react';
//  Proptypes
import PropTypes from 'prop-types';

export const StartBtn = (props) => {
  return !props.detailOnly
    ? (
      <IconButton onClick={() => !props.msg && props.onStart(props)} >
        <Tooltip title={props.msg || 'Iniciar'} >
          <Play />
        </Tooltip>
      </IconButton>
    )
    : <Tooltip title='Ainda não iniciou'>
      <MinusCircle color='gray' />
    </Tooltip>;
};

StartBtn.propTypes = {
  msg: PropTypes.string,
  detailOnly: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
};
