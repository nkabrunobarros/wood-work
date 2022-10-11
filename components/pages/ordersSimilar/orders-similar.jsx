//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  MenuItem, TextField
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Filter, X } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

import PrimaryBtn from '../../buttons/primaryBtn';
import hasData from '../../utils/hasData';

import AdvancedTable from '../../advancedTable/AdvancedTable';

// const MyDataGrid = dynamic(() => import('../../datagrid/DataGrid'), { ssr: false })


const OrdersScreen = ({ ...props }) => {
  const {
    items,
    breadcrumbsPath,
    woodTypes,
    products,
    clients,
    operations,
    headCells,
    headCellsUpper,
    editPage,
    detailPage,
    pageProps
  } = props;

  const rows = items;
  //  Modal State
  const [modal, setModal] = useState(false);
  // Filters States
  const [client, setClient] = useState('');
  const [woodType, setWoodType] = useState(null);
  const [totalTime, setTotalTime] = useState('');
  const [orderId, setOrderId] = useState('');
  const [product, setProduct] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [cost, setCost] = useState('');
  const [operation, setOperation] = useState(null);
  const [filters, setFilters] = useState({});
  const [costDenominator, setCostDenominator] = useState('equal');

  const handleClick = () => {
    setModal(!modal);
  };

  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.id);
  };

  const onWoodTypeChange = (value) => {
    if (value === null) setWoodType('');
    else setWoodType(value.id);
  };

  const onProductChange = (value) => {
    if (value === null) setProduct('');
    else setProduct(value.id);
  };

  const onOperationChange = (value) => {
    if (value === null) setOperation('');
    else setOperation(value.value);
  };

  const ApplyFilters = () => {
    // Set Filters
    setFilters({
      cliente: client,
      productId: product,
      numEncomenda: orderId,
      operation,
      cost,
      totalArea,
      totalTime,
      woodType
    });
  };

  const ClearFilters = () => {
    setClient('');
    setWoodType(null);
    setProduct('');
    setOperation(null);
    setTotalTime('');
    setOrderId('');
    setTotalArea('');
    setCost('');

    setFilters({
      cliente: '',
      productId: '',
      setOrderId: '',
    });
  };

  const DisplayBalloonFilter = (item, property, onRemove) => {
    if (hasData(item)) {
      if (property === 'client')
        item = clients.find((element) => element.id === item);

      if (property === 'product')
        item = products.find((element) => element.id === item);

      return (
        <Chip
          label={typeof item === 'object' ? <> {item.nome}</> : <> {item}</>}
          deleteIcon={<X />}
          onDelete={onRemove}
        />
      );
    }
  };

  useEffect(() => {
    // ApplyFilters();
  }, [client, product, operation, orderId]);

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
              {DisplayBalloonFilter(filters.cliente, 'client', () =>
                setClient('')
              )}
              {DisplayBalloonFilter(filters.woodType, 'woodType', () =>
                setWoodType(null)
              )}
              {DisplayBalloonFilter(filters.productId, 'product', () =>
                setProduct('')
              )}
              {DisplayBalloonFilter(filters.operacao, 'operacao', () =>
                setOperation(null)
              )}
              {DisplayBalloonFilter(filters.totalTime, 'totalTime', () =>
                setTotalTime('')
              )}
              {DisplayBalloonFilter(filters.orderId, 'orderId', () =>
                setOrderId('')
              )}
              {DisplayBalloonFilter(filters.totalArea, 'totalArea', () =>
                setTotalArea('')
              )}
              {DisplayBalloonFilter(filters.cost, 'cost', () => setCost(''))}
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
                      disablePortal
                      id='combo-box-demo'
                      options={clients}
                      getOptionLabel={(option) => option.legalName}
                      onChange={(event, value) => onClientChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant='standard'
                          value={client}
                          onChange={(event) =>
                            setClient(event.target.value)
                          }
                          placeholder='Cliente'
                        />
                      )}
                    />
                    <Autocomplete
                      id='country-select-demo'
                      options={woodTypes}
                      autoHighlight
                      value={woodType || null}
                      onChange={(event, value) => onWoodTypeChange(value)}
                      getOptionLabel={(option) => option.description}
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
                      disablePortal
                      id='combo-box-demo'
                      options={products}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => onProductChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant='standard'
                          value={product}
                          onChange={(event) =>
                            setClient(event.target.value)
                          }
                          placeholder='Produto'
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
                    <Box sx={{ display: 'flex' }}>
                   
                      <Box>
                        <TextField
                          label='Custo'
                          variant='standard'
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                        />

                      </Box>
                      <Box>
                        <TextField
                          value={costDenominator}
                          select
                          label='  '
                          variant='standard'
                          SelectProps={{ IconComponent: () => null }}
                          onChange={(e) => setCostDenominator(e.target.value)}
                        >
                          <MenuItem value='equal'>{'='}</MenuItem>
                          <MenuItem value='bigger'>{'=>'}</MenuItem>
                          <MenuItem value='smaller'>{'<='}</MenuItem>
                        </TextField>
                      </Box>
                    </Box>
                    <Autocomplete
                      id='country-select-demo'
                      options={operations}
                      autoHighlight
                      onChange={(event, value) => onOperationChange(value)}
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
              <IconButton onClick={handleClick}>
                <Filter />
              </IconButton>
            </div>
          </div>
        </div>
        <AdvancedTable
          rows={rows}
          headCells={headCells}
          headCellsUpper={headCellsUpper}
          filters={filters}
          editRoute={editPage}
          clickRoute={detailPage}
        />
      </Content>
    </Grid>
  );
};

OrdersScreen.propTypes = {
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  clients: PropTypes.array,
  headCells: PropTypes.array,
  headCellsUpper: PropTypes.array,
  items: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  woodTypes: PropTypes.arrayOf(PropTypes.object),
  operations: PropTypes.arrayOf(PropTypes.object),
  breadcrumbsPath: PropTypes.arrayOf(PropTypes.object),
  pageProps: PropTypes.object,
};

export default OrdersScreen;
