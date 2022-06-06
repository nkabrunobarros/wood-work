/* eslint-disable react/prop-types */
//  Nodes
import React, { useState } from 'react';
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
  OutlinedInput,
  // Pagination,
  Select,
  TextField,
} from '@mui/material';
import routes from '../../../navigation/routes';
const Stock = ({ ...props }) => {
  const { items, breadcrumbsPath, categories, clients } = props;
  const rows = items;
  const headCells = [
    {
      id: 'productId',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'codigo',
      numeric: false,
      disablePadding: false,
      label: 'Codigo',
    },
    {
      id: 'fornecedor',
      numeric: false,
      disablePadding: false,
      label: 'Fornecedor',
    },
    {
      id: 'categoria',
      numeric: false,
      disablePadding: true,
      label: 'Categoria',
    },
    {
      id: 'stock',
      numeric: false,
      disablePadding: false,
      label: 'Stock',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];
  console.log(items);
  //  States
  const [number, setNumber] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState();
  const [stock, setStock] = useState('');

  const ClearFilters = () => {
    setNumber('');
    setClient('');
    setCategory('');
    setStock('');
  };
  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.label);
  };
  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className='filters'>
            <div className='filterContainer4'>
              <InputLabel htmlFor='email'>Número</InputLabel>
              <OutlinedInput
                margin='normal'
                fullWidth
                id='number'
                name='number'
                type='number'
                placeholder='Escrever um número'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className='filterContainer4'>
              <InputLabel htmlFor='email'>Cliente</InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={clients}
                getOptionLabel={(option) => option.nome}
                onChange={(event, value) => onClientChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    value={client}
                    onChange={(event, value) => setClient(event.target.value)}
                    placeholder='Escrever um nome'
                  />
                )}
              />
            </div>
            <div className='filterContainer4'>
              <InputLabel htmlFor='Categoria'>Categoria</InputLabel>
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
                    {item.title}[{item.id}]
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
        ></AdvancedTable>
      </Content>
    </Grid>
  );
};
Stock.propTypes = {
  product: PropTypes.any,
  docs: PropTypes.arrayOf(PropTypes.object),
};
export default Stock;
