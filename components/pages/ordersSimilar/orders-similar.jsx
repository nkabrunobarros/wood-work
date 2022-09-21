//  Nodes
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import { Filter, X } from 'lucide-react';
import Content from '../../content/content';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Chip,
  TextField,
} from '@mui/material';

import PrimaryBtn from '../../buttons/primaryBtn';
import hasData from '../../utils/hasData';

import AdvancedTable from '../../advancedTable/AdvancedTable';
import dynamic from 'next/dynamic';

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
    detailPage
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

  const handleClick = (event) => {
    setModal(!modal);
  };

  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.id);
  };

  const onWoodTypeChange = (value) => {
    if (value === null) setWoodType('');
    else setWoodType(value);
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
    ApplyFilters();
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
                      getOptionLabel={(option) => option.nome}
                      onChange={(event, value) => onClientChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant='standard'
                          value={client}
                          onChange={(event, value) =>
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
                      disablePortal
                      id='combo-box-demo'
                      options={products}
                      getOptionLabel={(option) => option.nome}
                      onChange={(event, value) => onProductChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant='standard'
                          value={product}
                          onChange={(event, value) =>
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

{/* 
        <MyDataGrid title={t('tipos-operacao')} entity='tipoOperacao' entityPlural="tiposOperacao"
          columns={[{ name: 'descricao', label: t('descricao'), options: { filter: true, filterType: 'textField' } },
          { name: 'precoCusto', label: t('preco-custo'), type: 'number', options: { filter: true, filterType: 'textField' } },
          { name: 'precoVenda', label: t('preco-venda'), type: 'number', options: { filter: true, filterType: 'textField' } },
          { name: 'margem', label: t('margem'), type: 'number', options: { filter: true, filterType: 'textField' } },
          ]} editAction='/definicoes/tipos-operacao' deleteAction={true} /> */}
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
};

export default OrdersScreen;
