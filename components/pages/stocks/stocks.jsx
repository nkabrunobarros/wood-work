//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import CustomBreadcrumbs from '../../breadcrumbs';

import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
//  PropTypes
import { Autocomplete, Box, Grid, InputLabel, Slider, TextField } from '@mui/material';
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
                    placeholder='Material'
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
                  value={sizesFilter.height.values}
                  name='height'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.height.max}
                  min={sizesFilter.height.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.height.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.height.min,
                      label: `${sizesFilter.height.values[0]} mm`
                    },
                    {
                      value: sizesFilter.height.max,
                      label: `${sizesFilter.height.values[1]} mm`
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
                  value={sizesFilter.width.values}
                  name='width'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.width.max}
                  min={sizesFilter.width.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.width.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.width.min,
                      label: `${sizesFilter.width.values[0]} mm`
                    },
                    {
                      value: sizesFilter.width.max,
                      label: `${sizesFilter.width.values[1]} mm`
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
                  value={sizesFilter.thickness.values}
                  name='thickness'
                  onChange={(e) => onFilterChange({ e })}
                  disableSwap
                  max={sizesFilter.thickness.max}
                  min={sizesFilter.thickness.min}
                  sx={{ width: '90%' }}
                  valueLabelDisplay="none"
                  step={sizesFilter.thickness.max / 10}
                  valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                  marks={[
                    {
                      value: sizesFilter.thickness.min,
                      label: `${sizesFilter.thickness.values[0]} mm`
                    },
                    {
                      value: sizesFilter.thickness.max,
                      label: `${sizesFilter.thickness.values[1]} mm`
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
              <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
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
