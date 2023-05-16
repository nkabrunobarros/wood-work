/* eslint-disable consistent-return */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  MenuItem, TextField, Tooltip, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowLeftRight, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
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
    breadcrumbsPath,
    woodTypes,
    products,
    projects,
    clients,
    operations,
    headCells,
    detailPage,
    setDatesDiferencesFormat,
    datesDiferencesFormat
  } = props;

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

  const cellProps = {
    sm: 12 / 10,
    md: 12 / 10,
    xs: 12 / 10,
    container: true,
    p: 2,
    onClick: () => {
      // e.stopPropagation();
    },
    // sx: { cursor: 'auto' }
  };

  const toggleValueInArray = (value, array) => {
    const index = array.indexOf(value);

    if (index === -1) {
      return [...array, value];
    }

    return [...array.slice(0, index), ...array.slice(index + 1)];
  };

  const [expandedGroups, setExpandedGroups] = useState([]);

  const handleChange = (expandedGroups, setExpandedGroups) => (panel) => {
    setExpandedGroups((prevExpandedGroups) =>
      toggleValueInArray(panel, prevExpandedGroups)
    );
  };

  const handlePanelChange = handleChange(expandedGroups, setExpandedGroups);

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
          {false && <AdvancedTable
            rows={props.items}
            headCells={headCells}
            // headCellsUpper={headCellsUpper}
            filters={filters}
            clickRoute={detailPage}
          />}
          <Grid container md={12} sm={12} xs={12}>
            <Grid container md={12} sm={12} xs={12} bgcolor={'primary.main'} color='white'>
              <Grid {...cellProps}><Typography variant='subtitle2'>Cliente</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Nome</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Num</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Previsto</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Realizado</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Qtd. Móveis</Typography></Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Inicio</Typography> </Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Fim </Typography> </Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'></Typography> </Grid>
              <Grid {...cellProps}><Typography variant='subtitle2'>Desvio</Typography></Grid>
            </Grid>
            {projects?.map((proj, index) => {
              return <>
                <Accordion
                  expanded={expandedGroups.includes(proj.id)}
                  onChange={() => handlePanelChange(proj.id)}
                  sx={{ width: '100%' }}>
                  <AccordionSummary sx={{ padding: 0, height: '20px' }} aria-controls="panel1d-content" id="panel1d-header"
                    bgcolor={index % 2 !== 0 && 'lightGray.edges'}
                  >
                    <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.client.user.first_name} {proj.client.user.last_name}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.name.value}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.budget.num.value}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.predicted}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.done}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.amount.value}</Typography></Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.begin?.value}</Typography> </Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> {proj.end?.value}</Typography> </Grid>
                      <Grid {...cellProps}><Typography variant='subtitle2'> Desvio</Typography></Grid>
                      <Grid {...cellProps} onClick={() => {}} justifyContent={'end'} sx={{ cursor: 'pointer' }}>
                        <Tooltip title={expandedGroups.includes(proj.id) ? 'Fechar detalhes' : 'Mostrar detalhes'}>
                          <IconButton> {expandedGroups.includes(proj.id) ? <ChevronUp /> : <ChevronDown /> } </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                      {/* <Divider sx={{ marginTop: '1rem', marginBottom: '1rem', borderBottomWidth: 2 }} /> */}
                    </Box>
                    <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', borderTop: '1px solid', borderColor: 'divider' }} >
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Móvel</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Quantidade</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Inicio Prod.</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Fim Prod.</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Inicio Mont.</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Fim Mont.</Typography> </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Inicio Emb.</Typography>  </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Fim Emb.</Typography>  </Box></Grid>
                      <Grid {...cellProps} ><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Valor total</Typography> </Box></Grid>
                      <Grid {...cellProps}><Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Valor por móvel</Typography></Grid>
                    </Grid>
                    {proj.furnitures?.map((furni, index) => {
                      return <Grid key={furni.id} container md={12} sm={12} xs={12} bgcolor={index % 2 !== 0 && 'lightGray.edges'}>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.name.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.amount.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.beginProd?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.endProd?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.beginAssembly?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.endAssembly?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.beginPackaging?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.endPackaging?.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.price.value}</Typography></Grid>
                        <Grid {...cellProps}><Typography variant='subtitle2'>{furni.price.value && parseInt(furni.price.value.replace(/\D/g, '')) / furni.amount.value + '€'} </Typography></Grid>
                      </Grid>;
                    })}
                  </AccordionDetails>
                </Accordion>
              </>;
            })}
          </Grid>
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

OrdersScreen.propTypes = {
  tableCols: PropTypes.array,
  projects: PropTypes.array,
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
