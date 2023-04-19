/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import React from 'react';

const ProductsObservations = (props) => {
  function cleanup (text) {
    const a = text?.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    const cleanedText = a.replace(/[\u00e0\u2019\u00e9]/g, function (match) {
      return {
        à: 'à',
        '\u2019': '’',
        é: 'é'
      }[match];
    });

    return cleanedText;
  }

  return <Grid id='pad' container>
    <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
      <Typography variant='title'>Observações</Typography>
    </Grid>
    <Grid container md={12} sm={12} xs={12} p={1}>
      <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap' }}>{cleanup(props.order?.hasBudget?.object?.obs?.value)}</Typography>
    </Grid>
  </Grid>;
};

export default ProductsObservations;
