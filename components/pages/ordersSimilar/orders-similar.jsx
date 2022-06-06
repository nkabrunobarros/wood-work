//  Nodes
import React, {
  // useEffect,
  useState,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import {
  // Eye,
  Filter,
  X,
} from 'lucide-react';
import Content from '../../content/content';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Chip,
  // MenuItem,
  // Pagination,
  // Select,
  TextField,
} from '@mui/material';

// import CustomTable from '../../table/table';
// import Router from 'next/router';
// import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage';
import PrimaryBtn from '../../buttons/primaryBtn';
import hasData from '../../utils/hasData';

import AdvancedTable from '../../advancedTable/AdvancedTable';
// import { FilterItem } from '../../utils/FilterItem';
const OrdersScreen = ({ ...props }) => {
  const {
    items,
    // tableCols,
    breadcrumbsPath,
    // detailPage,
    woodTypes,
    products,
    clients,
    operations,
  } = props;
  const rows = items;
  //  States Pagination
  // const [page, setPage] = useState(1);
  // const [entries, setEntries] = useState(5);
  // const [totalPages, setTotalPages] = useState(0);
  // const [showingMin, setShowingMin] = useState(0);
  // const [showingMax, setShowingMax] = useState(entries);
  // const [itemsPerPage, setItemsPerPage] = useState([]);
  //  Modal State
  const [modal, setModal] = useState(false);
  // Filters States
  const [client, setClient] = useState(null);
  const [woodType, setWoodType] = useState(null);
  const [totalTime, setTotalTime] = useState('');
  const [orderId, setOrderId] = useState('');
  const [product, setProduct] = useState(null);
  const [totalArea, setTotalArea] = useState('');
  const [cost, setCost] = useState('');
  const [operation, setOperation] = useState(null);

  const headCellsUpper = [
    {
      id: 'orderAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Quantidade Produzida:12 Un',
      span: 6,
    },
    {
      id: 'orderAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Quantidade Encomendada:12 Un',
      span: 1,
    },
    {
      id: 'orderAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Por unidade',
      span: 5,
    },
  ];
  const headCells = [
    {
      id: 'productId',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'cliente',
      numeric: false,
      disablePadding: true,
      label: 'Cliente',
    },
    {
      id: 'numero',
      numeric: false,
      disablePadding: false,
      label: 'Num. Encomenda',
    },
    {
      id: 'previsto',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'realizado',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'horasAtuais',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Horas Atuais',
    },
    {
      id: 'previsto2',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'custo',
      numeric: false,
      disablePadding: false,
      label: 'Custo',
    },
    {
      id: 'realizado2',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio2',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];

  // const handleChangePage = (event, value) => {
  //   setPage(value);
  // };
  const handleClick = (event) => {
    setModal(!modal);
  };
  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value);
  };
  const onWoodTypeChange = (value) => {
    if (value === null) setWoodType('');
    else setWoodType(value);
  };
  const onProductChange = (value) => {
    if (value === null) setProduct('');
    else setProduct(value);
  };
  const onOperationChange = (value) => {
    if (value === null) setOperation('');
    else setOperation(value.value);
  };
  const ApplyFilters = () => {
    // Set Filters
    setModal(!modal);
  };
  const ClearFilters = () => {
    setClient(null);
    setWoodType(null);
    setProduct(null);
    setOperation(null);
    setTotalTime('');
    setOrderId('');
    setTotalArea('');
    setCost('');
  };

  const DisplayBalloonFilter = (item, onRemove) => {
    if (hasData(item))
      return (
<Chip
         label= {typeof item === 'object' ? <> {item.nome}</> : <> {item}</>}
         deleteIcon={<X />}
         onDelete={onRemove}
       />
      );
  };
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

  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Orders */}
      <Content>
        <div id='pad' className='flex' style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
            </div>
            <div className='activeFilterBalloonContainer'>
              {/* Filter Balloons here */}
              {DisplayBalloonFilter(client, () => setClient(null))}
              {DisplayBalloonFilter(woodType, () => setWoodType(null))}
              {DisplayBalloonFilter(product, () => setProduct(null))}
              {DisplayBalloonFilter(operation, () => setOperation(null))}
              {DisplayBalloonFilter(totalTime, () => setTotalTime(''))}
              {DisplayBalloonFilter(orderId, () => setOrderId(''))}
              {DisplayBalloonFilter(totalArea, () => setTotalArea(''))}
              {DisplayBalloonFilter(cost, () => setCost(''))}
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--grayTexts)',
              fontSize: 'small',
            }}
          >
            {modal ? (
              <div className='filterPopupMain'>
                <h2 className='black' style={{ marginLeft: '1rem' }}>
                  Filtros
                  <Button sx={{ float: 'right' }} onClick={handleClick}>
                    <X />
                  </Button>
                </h2>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  <div className='filterPopupCol'>
                    <Autocomplete
                      id='country-select-demo'
                      options={clients}
                      autoHighlight
                      value={client || null}
                      onChange={(event, value) => onClientChange(value)}
                      getOptionLabel={(option) => option.nome}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          value={client}
                          label='Cliente'
                        />
                      )}
                    />
                    <Autocomplete
                      id='country-select-demo'
                      options={woodTypes}
                      autoHighlight
                      value={woodType || null}
                      onChange={(event, value) => onWoodTypeChange(value)}
                      getOptionLabel={(option) => option.nome}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          value={woodType}
                          label='Tipo de Madeira'
                        />
                      )}
                    />
                    <TextField
                      id='standard-basic'
                      label='Tempo total'
                      variant='standard'
                      value={totalTime}
                      onChange={(e) => setTotalTime(e.target.value)}
                    />
                    <TextField
                      id='standard-basic'
                      label='Nº de Encomenda'
                      variant='standard'
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </div>
                  <div className='filterPopupCol'>
                    <Autocomplete
                      id='country-select-demo'
                      options={products}
                      autoHighlight
                      getOptionLabel={(option) => option.nome}
                      value={product || null}
                      onChange={(event, value) => onProductChange(value)}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          label='Produto'
                          value={product}
                        />
                      )}
                    />
                    <TextField
                      id='standard-basic'
                      label='Area total'
                      variant='standard'
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                    />
                    <TextField
                      id='standard-basic'
                      label='Custo'
                      variant='standard'
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Autocomplete
                      id='country-select-demo'
                      options={operations}
                      autoHighlight
                      onChange={(event, value) => onOperationChange(value)}
                      getOptionLabel={(option) => option.label}
                      value={operation || null}
                      renderInput={(params) => (
                        <TextField
                          variant='standard'
                          {...params}
                          label='Operação'
                          value={operation}
                        />
                      )}
                    />
                  </div>
                </div>
                <div id='pad'>
                  <ButtonGroup>
                    <PrimaryBtn text='Aplicar Filtros' onClick={ApplyFilters} />
                    <PrimaryBtn
                      text='Redefinir'
                      light
                      noBorder
                      onClick={ClearFilters}
                    />
                  </ButtonGroup>
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginLeft: 'auto' }}>
              <Button onClick={handleClick}>
                <Filter />
              </Button>
            </div>
            {/* <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
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
              </Select>{' '}
              Itens
              <div className='spacer'>|</div>
              Mostrar {showingMin} a {showingMax} de {Object.keys(items).length}
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
        <AdvancedTable
          rows={rows}
          headCells={headCells}
          headCellsUpper={headCellsUpper}
        ></AdvancedTable>
      </Content>
    </Grid>
  );
};
OrdersScreen.propTypes = {
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  detailPage: PropTypes.string,
  clients: PropTypes.array,
  items: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  woodTypes: PropTypes.arrayOf(PropTypes.object),
  operations: PropTypes.arrayOf(PropTypes.object),
  breadcrumbsPath: PropTypes.arrayOf(PropTypes.object),
};
export default OrdersScreen;
