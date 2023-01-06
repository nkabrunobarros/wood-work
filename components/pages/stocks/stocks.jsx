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
    <Grid component='main' sx={{ height: '100%' }}>
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
                value={sizesFilter.comp.values}
                name='comp'
                onChange={(e) => onFilterChange({ e })}
                disableSwap
                max={sizesFilter.comp.max}
                min={sizesFilter.comp.min}
                sx={{ width: '90%' }}
                valueLabelDisplay="none"
                step={sizesFilter.comp.max / 10}
                valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                marks={[
                  {
                    value: sizesFilter.comp.min,
                    label: `${sizesFilter.comp.values[0]} mm`
                  },
                  {
                    value: sizesFilter.comp.max,
                    label: `${sizesFilter.comp.values[1]} mm`
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
                value={sizesFilter.larg.values}
                name='larg'
                onChange={(e) => onFilterChange({ e })}
                disableSwap
                max={sizesFilter.larg.max}
                min={sizesFilter.larg.min}
                sx={{ width: '90%' }}
                valueLabelDisplay="none"
                step={sizesFilter.larg.max / 10}
                valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                marks={[
                  {
                    value: sizesFilter.larg.min,
                    label: `${sizesFilter.larg.values[0]} mm`
                  },
                  {
                    value: sizesFilter.larg.max,
                    label: `${sizesFilter.larg.values[1]} mm`
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
                value={sizesFilter.esp.values}
                name='esp'
                onChange={(e) => onFilterChange({ e })}
                disableSwap
                max={sizesFilter.esp.max}
                min={sizesFilter.esp.min}
                sx={{ width: '90%' }}
                valueLabelDisplay="none"
                step={sizesFilter.esp.max / 10}
                valueLabelFormat={value => <>{SliderValueLabel(value)}</>}
                marks={[
                  {
                    value: sizesFilter.esp.min,
                    label: `${sizesFilter.esp.values[0]} mm`
                  },
                  {
                    value: sizesFilter.esp.max,
                    label: `${sizesFilter.esp.values[1]} mm`
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
          clickRoute={routes.private.internal.stockId}
          filters={filters}
          setFilters={setFilters}
          rangeFilters={sizesFilter}
          setRangeFilters={setSizesFilter}
          actionId='productId'
        />
      </Content>
    </Grid>
  );
};

Stock.propTypes = {
  breadcrumbsPath: PropTypes.array,
  headCells: PropTypes.array,
  stocks: PropTypes.array,
  filtersSizes: PropTypes.object
};

export default Stock;
