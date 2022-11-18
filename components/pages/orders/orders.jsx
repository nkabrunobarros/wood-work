//  Nodes
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Material UI
import {
  Autocomplete,
  Box,
  Grid,
  InputLabel, OutlinedInput,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

//  PropTypes
import PropTypes from 'prop-types';

//  Custom Components
import AdvancedTable from '../../advancedTable/AdvancedTable';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import InfoCard from '../../cards/infoCard';
import Content from '../../content/content';
import Select from '../../inputs/select';

//  Utils
import CanDo from '../../utils/CanDo';

//  Navigation
import routes from '../../../navigation/routes';

const OrdersScreen = ({ ...props }) => {
  const {
    items,
    breadcrumbsPath,
    detailPage,
    cards,
    clients,
    editPage,
    headCells,
    products,
    budgets,
    headCellsBudget,
    headCellsProjects,
    projects
    // categories
  } = props;

  const router = useRouter();
  //  States
  const [number, setNumber] = useState(router.query.order || '');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [producao, setProducao] = useState('');
  const [filters, setFilters] = useState({});
  const [product, setProduct] = useState('');
  const [currentTab, setCurrentTab] = useState(0);


  const ClearFilters = () => {
    setProduct('');
    setNumber('');
    setClient('');
    setCategory('');
    setProducao('');
    setFilters({});
  };

  //  Triggers when a filter input changes
  useEffect(() => {
    setFilters({
      orderId: number,
      categoria: category,
      status: producao,
      clientId: client,
      productId: product
    });
  }, [number, client, category, producao, product]);


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}
      <Grid container md={12} sx={12} xs={12}>
        {cards.map((card) => (
          <Grid container item key={card.num} lg={3} md={3} sm={6} xs={12} p={1}>
            <InfoCard
              key={card.num}
              amount={card.amount}
              color={card.color}
              icon={card.icon}
              title={card.title}
            />
          </Grid>
        ))}
      </Grid>
      {/* Filters */}
      <Content>
        <Grid id='pad' md={12} container>
          <Grid container item md={12}><a className='headerTitleSm'>Filtros</a></Grid>
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <Select
              label='Produto'
              options={products}
              fullWidth
              optionLabel={'name'}
            />
          </Grid>
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='email'>Número encomenda</InputLabel>
            <OutlinedInput
              fullWidth
              id='number'
              name='number'
              autoComplete='number'
              placeholder='Escrever um número'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Grid>
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <Autocomplete
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={clients}
              getOptionLabel={(option) => option.givenName?.value}
              onChange={(e) => setClient(e.target.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder='Escrever um nome'
                />
              )}
            />
          </Grid>
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='Stock'>Producão</InputLabel>
            <Select
              fullWidth
              value={producao}
              onChange={(e) => setProducao(e.target.value)}
              options={[
                {
                  id: 'Iniciada',
                  label: 'Iniciada'
                },
                {
                  id: 'Terminada',
                  label: 'Terminada'
                },
              ]}
            >
              {/* <MenuItem value={'Em orçamentação'}>Não Iniciada</MenuItem>
              <MenuItem value={'Iniciada'}>Iniciada</MenuItem>
              <MenuItem value={'Terminada'}>Terminada</MenuItem> */}
            </Select>

          </Grid>
          <Grid container item md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryBtn text={'Limpar'} light onClick={() => ClearFilters()} />
          </Grid>
        </Grid>
      </Content>
      {/* Orders */}
      <Content>
        <Box id='pad' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='titlexxl'>{breadcrumbsPath[0].title}</Typography>
          <PrimaryBtn
            hidden={!CanDo(['write', 'orders'])}
            text='Adicionar'
            onClick={() => Router.push(routes.private.internal.newOrder)}
          />
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="basic tabs example">
            <Tab label="Em Produção" {...a11yProps(0)} />
            <Tab label="Por Confirmar" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Tab Projects */}
        <TabPanel value={currentTab} index={0}>
          <AdvancedTable
            rows={projects}
            headCells={headCellsProjects}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
          />
          <AdvancedTable
            rows={items}
            headCells={headCells}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
          />
        </TabPanel>
        {/* Tab Budgets */}
        <TabPanel value={currentTab} index={1}>
          <AdvancedTable
            rows={budgets.filter( ele => ele.aprovedDate.value === '')}
            headCells={headCellsBudget}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
          />
        </TabPanel>
      </Content>
    </Grid>
  );
};

OrdersScreen.propTypes = {
  items: PropTypes.array,
  products: PropTypes.array,
  categories: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  headCells: PropTypes.array,
  budgets: PropTypes.array,
  headCellsBudget: PropTypes.array,
  headCellsProjects: PropTypes.array,
  projects: PropTypes.array,
};

export default OrdersScreen;
