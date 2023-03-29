/* eslint-disable consistent-return */
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
  MenuItem, TextField, Tooltip, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowLeftRight, Filter, X } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

import PrimaryBtn from '../../buttons/primaryBtn';
import hasData from '../../utils/hasData';

import AdvancedTable from '../../advancedTable/AdvancedTable';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

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
    detailPage,
    setDatesDiferencesFormat,
    datesDiferencesFormat
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
      if (property === 'client') { item = clients.find((element) => element.id === item); }

      if (property === 'product') { item = products.find((element) => element.id === item); }

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
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        {/* Breadcrumbs */}
        <CustomBreadcrumbs path={breadcrumbsPath} />
        {/* Orders */}
        <Content>
          <Box id='pad' className='flex' style={{ alignItems: 'center' }}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography variant='title' >{breadcrumbsPath[0].title}</Typography>
              </Box>
              <Box className='activeFilterBalloonContainer'>
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
              </Box>
            </Box>
            <Box
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--grayTexts)',
                fontSize: 'small',
              }}
            >
              {modal
                ? (
                  <Box className='filterPopupMain'>
                    <Typography variant="h2" className='black' style={{ marginLeft: '1rem' }}>
                  Filtros
                      <Button sx={{ float: 'right' }} onClick={handleClick}>
                        <X />
                      </Button>
                    </Typography>
                    <Box
                      style={{
                        display: 'flex',
                        flex: 1,
                      }}
                    >
                      <Box className='filterPopupCol'>
                        <Autocomplete
                          name='client'
                          id='client'
                          fullWidth
                          disablePortal
                          options={clients.sort((a, b) =>
                            a.Nome > b.Nome ? 1 : a.Nome < b.Nome ? -1 : 0
                          )}
                          getOptionLabel={(option) => option.Nome }
                          getOptionValue={(option) => option.id}
                          onChange={(e, value) => onClientChange(value)}
                          renderOption={(props, option) => {
                            return (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.Nome}
                              </Box>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              value={client}
                              {...params}
                              variant="standard"
                              placeholder="Cliente"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
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
                          label='Projeto'
                          variant='standard'
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                        />
                      </Box>
                      <Box className='filterPopupCol'>
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
                      </Box>
                    </Box>
                    <Box id='pad'>
                      <ButtonGroup>
                        <PrimaryBtn text='Aplicar Filtros' onClick={ApplyFilters} />
                        <PrimaryBtn
                          text='Redefinir'
                          light
                          noBorder
                          onClick={ClearFilters}
                        />
                      </ButtonGroup>
                    </Box>
                  </Box>
                )
                : null}
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                  <Tooltip title={`Trocar para ${datesDiferencesFormat === 'days' ? 'horas' : 'dias'}`}>
                    <IconButton onClick={() => setDatesDiferencesFormat(datesDiferencesFormat === 'days' ? 'hours' : 'days')} >
                      <Box color='primary.main' >
                        <ArrowLeftRight />
                      </Box>
                    </IconButton>
                  </Tooltip>
                  <Typography variant='subtitle2'>{datesDiferencesFormat === 'days' ? 'Dia(s)' : 'Hora(s)'}</Typography>
                </Box>
                <IconButton onClick={handleClick}>
                  <Filter />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <AdvancedTable
            rows={rows}
            headCells={headCells}
            headCellsUpper={headCellsUpper}
            filters={filters}
            clickRoute={detailPage}
          />
        </Content>
      </Grid>
      <Footer/>
    </>
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
  setDatesDiferencesFormat: PropTypes.func,
  datesDiferencesFormat: PropTypes.string,
};

export default OrdersScreen;
