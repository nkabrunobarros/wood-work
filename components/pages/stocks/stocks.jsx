//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import CustomBreadcrumbs from '../../breadcrumbs';

import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
//  PropTypes
import { Autocomplete, Box, Grid, InputLabel, Slider, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import routes from '../../../navigation/routes';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const Stock = ({ ...props }) => {
  const { breadcrumbsPath, headCells, stocks } = props;
  //  States
  const [filters, setFilters] = useState({});
  const [material, setMaterial] = useState('');
  const [sizesFilter, setSizesFilter] = useState(props.filtersSizes);

  function onMaterialChange ({ value, event }) {
    if (typeof value === 'object') setMaterial(value?.material || '');
    else if (typeof value === 'undefined') setMaterial(event.target.value || '');
  }

  const ClearFilters = () => {
    setSizesFilter(props.filtersSizes);
    setMaterial('');
  };

  const ApplyFilters = () => {
    // Set Filters
    setFilters({
      material,
    });
  };

  function onFilterChange (props) {
    const sizes = { ...sizesFilter };

    // eslint-disable-next-line react/prop-types
    sizes[props.e.target.name].values = props.e.target.value;
    setSizesFilter(sizes);
  }

  useEffect(() => {
    ApplyFilters();
  }, [sizesFilter, material]);

  useEffect(() => {
    setMaterial(filters?.material || '');
  }, [filters]);

  function SliderValueLabel (value) {
    return value + ' mm';
  }

  return (
    <>

      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Grid container md={12} id='pad'>
            <Grid container md={12} sm={12} xs={12} >
              <a className='headerTitleSm'>Filtros</a>
            </Grid>
            <Grid container md={3} sm={6} xs={12} p={1}>
              <InputLabel htmlFor='name'>Material</InputLabel>
              <Autocomplete
                options={stocks.sort((a, b) => a.material - b.material) }
                fullWidth
                getOptionLabel={(option) => option.material}
                onChange={(event, value) => onMaterialChange({ value, event })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    onChange={(event, value) => onMaterialChange({ event, value })}
                  />
                )}
              />
            </Grid>
            <Grid container md={3} sm={6} xs={12} p={1}>
              <InputLabel>Comprimento</InputLabel>
              <Box sx={{ width: '100%', display: 'flex' }} justifyContent='center'>
                <Slider
                  getAriaLabel={() => 'Width range'}
                  value={sizesFilter.Comprimento.values}
                  name='Comprimento'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.Comprimento.max}
                  min={sizesFilter.Comprimento.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.Comprimento.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.Comprimento.min,
                      label: `${sizesFilter.Comprimento.values[0]} mm`
                    },
                    {
                      value: sizesFilter.Comprimento.max,
                      label: `${sizesFilter.Comprimento.values[1]} mm`
                    },
                  ]}
                />
              </Box>
            </Grid>
            <Grid container md={3} sm={6} xs={12} p={1}>
              <InputLabel>Largura</InputLabel>
              <Box sx={{ width: '100%', display: 'flex' }} justifyContent='center'>
                <Slider
                  getAriaLabel={() => 'Width range'}
                  value={sizesFilter.Largura.values}
                  name='Largura'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.Largura.max}
                  min={sizesFilter.Largura.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.Largura.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.Largura.min,
                      label: `${sizesFilter.Largura.values[0]} mm`
                    },
                    {
                      value: sizesFilter.Largura.max,
                      label: `${sizesFilter.Largura.values[1]} mm`
                    },
                  ]}
                />
              </Box>
            </Grid>
            <Grid container md={3} sm={6} xs={12} p={1}>
              <InputLabel>Espessura</InputLabel>
              <Box sx={{ width: '100%', display: 'flex' }} justifyContent='center'>
                <Slider
                  getAriaLabel={() => 'Width range'}
                  value={sizesFilter.Espessura.values}
                  name='Espessura'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.Espessura.max}
                  min={sizesFilter.Espessura.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.Espessura.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.Espessura.min,
                      label: `${sizesFilter.Espessura.values[0]} mm`
                    },
                    {
                      value: sizesFilter.Espessura.max,
                      label: `${sizesFilter.Espessura.values[1]} mm`
                    },
                  ]}
                />
              </Box>
            </Grid>
            <Grid container md={12} sm={12} xs={12} justifyContent='end'>
              <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
            </Grid>
          </Grid>
        </Content>
        <Content>
          <Box
            id='pad'
            className='flex'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Box>
              <Typography variant='title'>{breadcrumbsPath[0].title}</Typography>
            </Box>
          </Box>
          <AdvancedTable
            rows={stocks}
            headCells={headCells}
            clickRoute={routes.private.internal.stock}
            filters={filters}
            setFilters={setFilters}
            rangeFilters={sizesFilter}
            setRangeFilters={setSizesFilter}
          />
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

Stock.propTypes = {
  breadcrumbsPath: PropTypes.array,
  headCells: PropTypes.array,
  stocks: PropTypes.array,
  filtersSizes: PropTypes.object
};

export default Stock;
