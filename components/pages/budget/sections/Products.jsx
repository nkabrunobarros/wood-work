/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Grow, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const Products = (props) => {
  const { furnitures } = props;
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return <Grid id='pad' container>
    <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
      <Grid container md={6} sm={6} xs={6}>
        <Box id='align'>
          <Typography variant='title'> Produtos</Typography>
        </Box>
      </Grid>
    </Grid>
    <Grid container md={12} sm={12} xs={12}>
      {/* Lines */}
      {furnitures.map((line, i) => {
        return <Grow key={i} in={true}><Accordion key={i} expanded={expanded === line.id} onChange={handleChange(line.id)} sx={{ width: '100%' }}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
            <Typography>{line.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {line.items.map((field, index) => {
              return <Grow key={index}in={true}>
                <Grid container>
                  {index !== 0 && <Box p={4} sx={{ width: '100%' }} ><Divider sx={{ width: '100%' }} /></Box>}

                  <Grid container md={12} sm={12} xs={12}>
                    <Typography variant='subtitle2' fontWeight={'bold'}>{field.amount.value} {field.name.value} {field?.description?.value && ','} {field?.description?.value}</Typography>
                  </Grid>
                  <Grid container md={12} sm={12} xs={12} p={1}>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-line' }}> {field?.obs?.value}</Typography>
                  </Grid>
                  <Grid container md={12} sm={12} xs={12}>
                    <Grid container md={4}sm={4}xs={4} justifyContent={'center'}><Typography variant='subtitle2'>Largura [mm]: {field?.width?.value} </Typography> </Grid>
                    <Grid container md={4}sm={4}xs={4} justifyContent={'center'}><Typography variant='subtitle2'>Altura [mm]: {field?.height?.value} </Typography></Grid>
                    <Grid container md={4}sm={4}xs={4} justifyContent={'center'}><Typography variant='subtitle2'>Profundidade [mm]: {field?.thickness?.value} </Typography></Grid>
                  </Grid>
                  <Grid container md={12} sm={12} xs={12} p={1}>
                    <Divider sx={{ width: '100%', borderStyle: 'dotted' }} />
                    <Typography p={1} variant='subtitle2' sx={{ whiteSpace: 'pre-line' }}>Preço: {field?.price?.value}</Typography>

                  </Grid>
                </Grid>
              </Grow>;
            })}
          </AccordionDetails>
        </Accordion>
        </Grow>;
      })}
    </Grid>
  </Grid>;
};

export default Products;
