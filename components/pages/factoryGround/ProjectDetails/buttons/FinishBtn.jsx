import { IconButton, Tooltip } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import React from 'react';
//  Proptypes
import PropTypes from 'prop-types';

export const FinishBtn = (props) => {
  return (
    <IconButton onClick={() => props.onFinish(props)} >
      <Tooltip title={'Terminar'} >
        <CheckCircle color='green' />
      </Tooltip>
    </IconButton>
  );
};

FinishBtn.propTypes = {
  onFinish: PropTypes.func.isRequired,
};
