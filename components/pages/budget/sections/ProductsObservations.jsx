/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import ConvertString from '../../../utils/ConvertString';

const ProductsObservations = (props) => {
  return <Grid id='pad' container>
    <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
      <Typography variant='title'>Observações</Typography>
    </Grid>
    <Grid container md={12} sm={12} xs={12} p={1} >
      <Typography variant='subtitle2'>{ConvertString(props.budget.obs?.value)}</Typography>
    </Grid>
  </Grid>;
};

export default ProductsObservations;
