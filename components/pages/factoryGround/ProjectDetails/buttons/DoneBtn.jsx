import { IconButton, Tooltip } from '@mui/material';
import { Check } from 'lucide-react';
import React from 'react';
//  Proptypes
import PropTypes from 'prop-types';

export const DoneBtn = (props) => {
  return !props.detailOnly && (
    <IconButton>
      <Tooltip title={'Feito'} >
        <Check color='green' />
      </Tooltip>
    </IconButton>
  );
};

DoneBtn.propTypes = {
  onFinish: PropTypes.func.isRequired,
  detailOnly: PropTypes.bool
};
