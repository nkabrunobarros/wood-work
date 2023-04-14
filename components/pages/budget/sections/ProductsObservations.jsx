/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import React from 'react';

const ProductsObservations = (props) => {
  return <Grid id='pad' container>
    <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
      <Typography variant='title'>Observações</Typography>
    </Grid>
    <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-line' }}>{props.budget.obs?.value || 'Não tem observações.'}</Typography>
  </Grid>;
};

export default ProductsObservations;
