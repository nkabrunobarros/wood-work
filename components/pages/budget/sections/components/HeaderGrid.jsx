/* eslint-disable no-unused-vars */
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const HeaderGrid = (props) => {
  const [grids, setGrids] = useState(props.grids);

  const commonProps = {
    sx: {
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: 'divider',
      padding: '.5rem',
      textAlign: 'center',
    },
  };

  const upperCells = {
    ...commonProps,
    sx: {
      ...commonProps.sx,
      backgroundColor: '#F9F9F9',
      textAlign: 'center',
    },
  };

  const [windowWidth, setWindowWidth] = useState(1000);

  function countColls (data) {
    return data.reduce((count, obj) => count + obj.colls.length, 0);
  }

  const collCount = countColls(grids);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return grids.map((grid) => {
    const headCellsLabels = grid.colls.map(item => item.label);
    const headCellsValues = grid.colls.map(item => item.value);

    return (
      <Grid key={grid.title} container md={12 / collCount * headCellsLabels.length} pt={2} sx={{ pl: 0.5, pr: 0.5 }}>
        <Grid item md={12}>
          <Grid container {...upperCells}>
            <Typography variant='subtitle1' fontWeight='bold'>
              {grid.title}
            </Typography>
          </Grid>
        </Grid>
        {windowWidth > 600
          ? (
            <>
              <Grid container md={12}>
                {headCellsLabels.map((headCell) => (
                  <Grid key={headCell} {...upperCells} md={12 / headCellsLabels.length} sm={12 / headCellsLabels.length} xs={12}>
                    <Typography variant='sm'>{headCell}</Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid container md={12}>
                {headCellsValues.map((headCellValue) => (
                  <Grid key={headCellValue} {...commonProps} md={12 / headCellsValues.length} sm={12 / headCellsValues.length} xs={12}>
                    <Typography variant='sm'>{headCellValue || '\u00A0'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          )
          : (
            <>
              {grid.colls.map(item => (
                <Grid key={item.label} container md={12}>
                  <Grid {...commonProps} md={6} sm={6} xs={6} sx={{ ...commonProps.sx, justifyContent: 'start', backgroundColor: '#F9F9F9' }}>
                    {item.label}
                  </Grid>
                  <Grid {...commonProps} md={6} sm={6} xs={6} sx={{ ...commonProps.sx, backgroundColor: 'white' }}>
                    <Typography variant='sm'>{item.value || '\u00A0'}</Typography>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
      </Grid>
    );
  });
};

export default HeaderGrid;
