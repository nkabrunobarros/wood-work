/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { X } from 'lucide-react';
import FormGenerator from '../../../../formGenerator';

const FurnitureForm2 = (props) => {
  function onChange (index, e) {
    props.onChange({
      subGroupIndex: props.subGroupIndex,
      groupIndex: props.groupIndex,
      itemIndex: props.itemIndex,
      newValue: e.target.value,
      property: e.target.name
    });
  }

  function removeThisRow () {
    props.onRemove({
      subGroupIndex: props.subGroupIndex,
      groupIndex: props.groupIndex,
      itemIndex: props.itemIndex
    });
  }

  return <Grid container>

    {props.index !== 0 && <Box p={4} sx={{ width: '100%' }} ><Divider sx={{ width: '100%' }} /></Box>}
    <Typography variant='subtitle1' pl={1}> Móvel</Typography>
    <Box sx={{ marginLeft: 'auto', alignSelf: 'center', display: props.lines[props.lineIndex]?.items?.length === 1 && 'none' }}>
      <Tooltip title='Remover esta linha'>
        <IconButton onClick={() => removeThisRow()} >
          <X color='red' />
        </IconButton>
      </Tooltip>
    </Box>
    <FormGenerator
      perRow={4}
      fields={Object.keys(props.field).map((key) => {
        return props.field[key];
      }).sort((a, b) => a.displayOrder - b.displayOrder)}
      onFormChange={onChange}
    />

  </Grid>;
};

export default FurnitureForm2;
