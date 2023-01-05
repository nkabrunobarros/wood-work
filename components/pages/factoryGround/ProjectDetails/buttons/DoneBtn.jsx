import { IconButton, Tooltip } from '@mui/material';
import { Check } from 'lucide-react';
import React from 'react';

export const DoneBtn = () => {
  return (
    <IconButton>
      <Tooltip title={'Feito'} >
        <Check color='green' />
      </Tooltip>
    </IconButton>
  );
};
