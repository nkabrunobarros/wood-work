//  Nodes
import React, { useState } from 'react';
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
    // tableCols,
    breadcrumbsPath,
    detailPage,
    internalPOV,
    cards,
    clients,
  } = props;

  const rows = items;

  const headCells = [
    {
      id: 'numero',
      numeric: false,
      disablePadding: false,
      label: 'Numero',
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
      id: 'produção',
      numeric: false,
      disablePadding: false,
      label: 'Produção',
    },
    {
      id: 'distribuição',
      numeric: false,
      disablePadding: false,
      label: 'Em distribuição',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];

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
  // const [page, setPage] = useState(1);
  // const [entries, setEntries] = useState(5);
  // const [totalPages, setTotalPages] = useState(0);
  // const [showingMin, setShowingMin] = useState(0);
  // const [showingMax, setShowingMax] = useState(entries);

  // const [itemsPerPage, setItemsPerPage] = useState([]);
  //  Clear Filters to default

  // const handleChangePage = (event, value) => {
  //   setPage(value);
  // };

  // useEffect(() => {
  //   const calculatePages = () => {
  //     const numPages = Math.ceil(items.length / entries);
  //     setTotalPages(numPages);
  //     const res = PaginateItemsPerPage(items, entries, page - 1);
  //     setItemsPerPage(res.array);
  //     setShowingMax(res.showingMax);
  //     setShowingMin(res.showingMin);
  //   };
  //   calculatePages();
  // }, [entries, page]);
  // eslint-disable-next-line react/prop-types
  // const DisplayCol = (col, item, index) => {
  //   if (col === 'em distribuição') {
  //     return <a>{displayWithStyle(item.distribuição)}</a>;
  //   } else if (index === 0) {
  //     return <a className='link'>Nº {displayWithStyle(item[`${col}`])}</a>;
  //   }
  //   switch (col) {
  //     case 'categoria':
  //       return <a>{DisplayCategory(item[`${col}`])}</a>;
  //     case 'ações':
  //       return (
  //         <>
  //           <Edit stroke-width="1" className='link' />
  //           <Trash stroke-width="1" className='link' />
  //         </>
  //       );
  //     default:
  //       return <a>{displayWithStyle(item[`${col}`])}</a>;
  //   }
  // };
  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.label);
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
                margin='normal'
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
              {internalPOV ? <PrimaryBtn text='Adicionar' onClick={() => Router.push(routes.private.internal.newOrder)} /> : null}
            </div>
            {/* <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}
            >
              Visualizar
              <Select
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
              Itens
              <div className='spacer'>|</div>
              Mostrar {showingMin} a {showingMax} de {Object.keys(items).length}{' '}
              itens
              <div className='spacer'></div>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                siblingCount={0}
                color='primary'
                className={'pagination'}
              />
            </div> */}
          </div>

          {/* <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
            color='primary'
            className={'pagination mobile'}
          /> */}
        </div>
        {/* <CustomTable columns={tableCols}>
          {itemsPerPage
            .filter((item) => item.stock.includes(stock))
            .map((item, i) => (
              <tr
                key={item.numero}
                onClick={() =>
                  Router.push({ pathname: `${detailPage}${item.numero}` })
                }
              >
                {tableCols.map((element, i) => (
                  <td key={element.id} data-label={tableCols[i].toUpperCase()}>
                    {DisplayCol(element, item, i)}
                  </td>
                ))}
              </tr>
            ))}
        </CustomTable> */}
        <AdvancedTable rows={rows} headCells={headCells} clickRoute={detailPage}></AdvancedTable>
      </Content>
    </Grid>
  );
};
OrdersScreen.propTypes = {
  items: PropTypes.array,
  categories: PropTypes.array,
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  internalPOV: PropTypes.boolean,
  cards: PropTypes.arrayOf(PropTypes.object),
};
export default OrdersScreen;
