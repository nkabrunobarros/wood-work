//  Nodes
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

//  Material UI
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

//  PropTypes
import PropTypes from 'prop-types';

//  Custom Components
import CustomBreadcrumbs from '../../breadcrumbs';
import InfoCard from '../../cards/infoCard';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';
import AdvancedTable from '../../advancedTable/AdvancedTable';

//  Navigation
import routes from '../../../navigation/routes';

//  Styles
import styles from '../../../styles/Orders.module.css';

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


  //  States
  const [rows, setRows] = useState(items);
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
    setFilters({});
  };

  //  Triggers when a filter input changes
  useEffect(() => {
    setFilters({
      numero: number,
      categoria: category,
      stock,
      cliente: client,
    });
  }, [number, client, category, stock]);

  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.id);
  };

  const onDeleteOrder = (orderId) => {
    console.log('deleting order nº ' + orderId);
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
            </div>{console.log(clients)}
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='email'>Cliente</InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={clients}
                getOptionLabel={(option) => option.giveName}
                onChange={(event, value) => onClientChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    value={client}
                    onChange={(event) => setClient(event.target.value)}
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
                    {item.name}
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
          onDeleteClickFunc={onDeleteOrder}
          setRows={() => setRows}
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
