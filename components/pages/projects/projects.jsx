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
  Tooltip,
  Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MyInput from '../../inputs/myInput';

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
import IsInternal from '../../utils/IsInternal';

const ProjectsScreen = ({ ...props }) => {
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

  const {
    breadcrumbsPath,
    detailPage,
    cards,
    clients,
    editPage,
    budgets,
    headCellsBudget,
    headCellsProjects,
    projects,
    detailPageBudgetTab
  } = props;

  const router = useRouter();
  //  States
  const [number, setNumber] = useState(router.query.order || '');
  const [client, setClient] = useState('');
  const [telephone, setTelephone] = useState('');
  const [category, setCategory] = useState('');
  const [producao, setProducao] = useState('');
  const [filters, setFilters] = useState({});
  const [product, setProduct] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).profile.object.description);

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
      Nome: number,
      Cliente: client,
      // categoria: category,
      Estado: producao,
      telemovel: telephone
    });
  }, [number, producao, client, category, product, telephone]);

  useEffect(() => {
    setNumber(filters.Nome || '');
    setClient(filters.Cliente || '');
    setProducao(filters.Estado || '');
    setTelephone(filters.telemovel || '');
  }, [filters]);

  function TabPanel (props) {
    const { children, value, index, ...other } = props;

    return (
      <Box
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
      </Box>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps (index) {
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
          <Grid container item key={card.num} lg={isInternalPage ? 4 : 3} md={isInternalPage ? 4 : 3} sm={6} xs={12} p={1}>
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
            <InputLabel htmlFor='email'>Nome {/* isInternalPage ? 'projeto' : 'Encomenda' */} </InputLabel>
            <OutlinedInput
              fullWidth
              id='name'
              name='name'
              autoComplete='name'
              placeholder='Escrever um nome'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Grid>
          {isInternalPage && <Grid container item md={3} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <Autocomplete
              fullWidth
              disablePortal
              options={clients}
              getOptionLabel={(option) => option.legalName?.value}
              getOptionValue={(option) => option.id}
              onChange={(e, value) => {
                // eslint-disable-next-line react/prop-types
                setClient(value?.id || '');
              }}
              renderOption={(props, option) => {
                return (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option?.legalName?.value}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  value={client}
                  {...params}
                  placeholder="Escrever Nome Cliente"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}

            />
          </Grid>}
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <Select
              label='Estado'
              fullWidth
              value={producao}
              onChange={(e) => setProducao(e.target.value)}
              options={[
                {
                  id: 'waiting budget',
                  label: 'Espera Orçamento'
                },
                {
                  id: 'waiting adjudication',
                  label: 'Espera Adjudicação'
                },
                {
                  subheader: true,
                  label: 'Produção'
                },
                {
                  id: 'in drawing',
                  label: 'Em Desenho'
                },
                {
                  id: 'in production',
                  label: 'Em Produção'
                },
                {
                  id: 'in testing',
                  label: 'Em Montagem'
                },
                {
                  subheader: true,
                  label: 'Distribuição'
                },
                {
                  id: 'em transporte',
                  label: 'Em Transporte'
                },
                {
                  id: 'finished',
                  label: 'Terminada'
                },

              ]}
            />
          </Grid>
          {isInternalPage && <Grid container item md={3} sm={6} xs={12} p={1}>
            <MyInput label='Número telefone' value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </Grid>}
          <Grid container item md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryBtn text={'Limpar'} light onClick={() => ClearFilters()} />
          </Grid>
        </Grid>
      </Content>
      {/* Projects */}
      <Content>
        <Box id='pad' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='titlexxl'>{breadcrumbsPath[0].title}</Typography>
          <PrimaryBtn
            hidden={!CanDo(['write', 'projects']) || !isInternalPage}
            text='Adicionar orçamento'
            onClick={() => Router.push(routes.private.internal.newProject)}
          />
        </Box>
        {internalPOV && <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="basic tabs example">
            <Tooltip title='Confirmadas'>
              <Tab label="Projetos" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title='Por confirmar'>
              <Tab label="Orçamentos" {...a11yProps(1)} />
            </Tooltip>
          </Tabs>
        </Box> }

        {/* Tab Projects */}
        <TabPanel value={currentTab} index={0}>
          <AdvancedTable
            rows={projects.filter(ele => ele.status.value.toLowerCase() !== 'canceled')}
            headCells={headCellsProjects}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
            setFilters={setFilters}
          />
        </TabPanel>
        {/* Tab Budgets */}
        {internalPOV && <TabPanel value={currentTab} index={1}>
          <AdvancedTable
            rows={budgets.filter(ele => ele.aprovedDate?.value === '' && ele.status.value.toLowerCase() !== 'canceled')}
            headCells={headCellsBudget}
            filters={filters}
            clickRoute={detailPageBudgetTab}
            editRoute={editPage}
            setFilters={setFilters}
          />
        </TabPanel>}
      </Content>
    </Grid>
  );
};

ProjectsScreen.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  detailPageBudgetTab: PropTypes.string,
  editPage: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  headCells: PropTypes.array,
  budgets: PropTypes.array,
  headCellsBudget: PropTypes.array,
  headCellsProjects: PropTypes.array,
  projects: PropTypes.array,
};

export default ProjectsScreen;
