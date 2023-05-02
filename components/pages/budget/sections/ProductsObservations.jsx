/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import ConvertString from '../../../utils/ConvertString';

const ProductsObservations = (props) => {
  const [sectionExpanded, setSectionExpanded] = useState(false);

  return <>
    <Accordion expanded={sectionExpanded} onChange={() => setSectionExpanded(!sectionExpanded)} sx={{ width: '100%' }}>
      <AccordionSummary sx={{ background: 'lightGray.main', paddingLeft: '24px' }} bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
        <Typography variant='title'>Observações</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid id='pad' container>
          <Grid container md={12} sm={12} xs={12} p={1} >
            <Typography variant='subtitle2'>{ConvertString(props.budget.obs?.value)}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </>;
};

export default ProductsObservations;
