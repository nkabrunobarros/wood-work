//  Nodes
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import InfoCard from '../../cards/infoCard';
// import { Edit, Trash } from 'lucide-react';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';
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

import styles from '../../../styles/Orders.module.css';
// import CustomTable from '../../table/table';
// import Router from 'next/router';
// import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage';
// import displayWithStyle from '../../utils/displayTextWithStyle';
// import DisplayCategory from '../../utils/DisplayCategory';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Router from 'next/router';

const OrdersScreen = ({ ...props }) => {
  const {
    items,
    categories,
    panelsInfo,
    breadcrumbsPath,
    detailPage,
    internalPOV,
    cards,
    clients,
    editPage,
    headCells,
  } = props;

  const rows = items;

  //  States
  const [number, setNumber] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [filters, setFilters] = useState({});

  const ClearFilters = () => {
    setNumber('');
    setClient('');
    setCategory('');
    setStock('');
    setFilters({})
  };

  useEffect(() => {
    setFilters({
      numero: number,
      categoria: category,
      stock,
      cliente: client
    })
  },[number, client, category, stock])
  
  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.id);
  };
  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}

      {panelsInfo ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          {cards.map((card) => (
            <InfoCard
              key={card.num}
              amount={card.amount}
              color={card.color}
              icon={card.icon}
              title={card.title}
            />
          ))}
        </div>
      ) : null}
      {/* Filters */}
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className={styles.filters}>
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='email'>Número</InputLabel>
              <OutlinedInput
                
                fullWidth
                id='number'
                name='number'
                autoComplete='number'
                type='number'
                placeholder='Escrever um número'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className={styles.filterContainer}>
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
            <div className={styles.filterContainer}>
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
            <div className={styles.filterContainer}>
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
      {/* Orders */}
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div>
            <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'column',
              color: 'var(--grayTexts)',
              fontSize: 'small',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              {internalPOV ? (
                <PrimaryBtn
                  text='Adicionar'
                  onClick={() => Router.push(routes.private.internal.newOrder)}
                />
              ) : null}
            </div>
          </div>
        </div>

        <AdvancedTable
          rows={rows}
          headCells={headCells}
          filters={filters}
          clickRoute={detailPage}
          editRoute={editPage}
        />
      </Content>
    </Grid>
  );
};
OrdersScreen.propTypes = {
  items: PropTypes.array,
  categories: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  internalPOV: PropTypes.any,
  cards: PropTypes.arrayOf(PropTypes.object),
  headCells: PropTypes.array,
};
export default OrdersScreen;
