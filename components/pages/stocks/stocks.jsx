//  Nodes
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';

import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import routes from '../../../navigation/routes';
const Stock = ({ ...props }) => {
  const { items, breadcrumbsPath, categories, headCells, products } = props;
  const rows = items;

  //  States
  const [productId, setProductId] = useState('');
  const [codigo, setCodigo] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [filters, setFilters] = useState({});

  const onProductChange = (value) => {
    if (value === null) setProductId('');
    else setProductId(value.id);
  };

  const ClearFilters = () => {
    setProductId('');
    setCodigo('');
    setCategory('');
    setStock('');
    setFilters({});
  };

  const ApplyFilters = () => {
    // Set Filters
    setFilters({
      productId,
      categoria: category,
      codigo,
      stock,
    });
  };
  useEffect(() => {
    ApplyFilters();
  }, [productId, category, codigo, stock]);
  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className='filters'>
            <div className='filterContainer4'>
              <InputLabel htmlFor='name'>Nome</InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={products}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => onProductChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder='Produto'
                  />
                )}
              />
            </div>
            <div className='filterContainer4'>
              <InputLabel htmlFor='codigo'>Codigo</InputLabel>
              <Select
                labelId='codigo'
                id='codigo'
                fullWidth
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Selecionar um codigo
                </MenuItem>
                {items.map((item) => (
                  <MenuItem key={item.codigo} value={item.product.code}>
                    {item.product.code}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className='filterContainer4'>
              <InputLabel htmlFor='Categoria'>Categoria {category}</InputLabel>
              <Select
                labelId='Categoria'
                id='Categoria'
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Selecionar uma categoria
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                    {/* [{item.id}] */}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className='filterContainer4'>
              <InputLabel htmlFor='Stock'>Stock</InputLabel>
              <Select
                labelId='Stock'
                id='Stock'
                fullWidth
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Selecionar uma estado de stock
                </MenuItem>
                <MenuItem value={'Disponível'}>Disponível</MenuItem>
                <MenuItem value={'Indisponível'}>Indisponível</MenuItem>
              </Select>
            </div>
          </div>
          <div
            style={{
              width: 'fit-content',
              marginLeft: 'auto',
              paddingTop: '1rem',
            }}
          >
            <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
          </div>
        </div>
      </Content>
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div>
            <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
          </div>
        </div>
        <AdvancedTable
          
          rows={rows}
          headCells={headCells}
          clickRoute={routes.private.internal.stockId}
          filters={filters}
        ></AdvancedTable>
      </Content>
    </Grid>
  );
};
Stock.propTypes = {
  product: PropTypes.any,
  categories: PropTypes.array,
  items: PropTypes.array,
  clients: PropTypes.array,
  headCells: PropTypes.array,
  products: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  docs: PropTypes.arrayOf(PropTypes.object),
};
export default Stock;
