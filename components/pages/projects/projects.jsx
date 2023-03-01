//  Nodes
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Material UI
import {
  Autocomplete,
  Box, Grid,
  InputLabel, Tab,
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
// import * as ProjectActions from '../../../pages/api/actions/project';
import { useSelector } from 'react-redux';

const ProjectsScreen = (props) => {
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
  const [referencia, setReferência] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const userPermissions = useSelector((state) => state.auth.userPermissions);

  const ClearFilters = () => {
    setProduct('');
    setReferência('');
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
      Estado: producao,
      telemovel: telephone,
      Referência: referencia
    });
  }, [number, producao, client, category, product, telephone, referencia]);

  useEffect(() => {
    setNumber(filters.Nome || '');
    setReferência(filters.Referência || '');
    setClient(filters.Cliente || '');
    setProducao(filters.Estado || '');
    setTelephone(filters.telemovel || '');
  }, [filters]);

  function TabPanel ({ children, value, index }) {
    return (
      <Box hidden={value !== index}>
        {value === index && <Box>{children}</Box>}
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
      {/* <Button onClick={() => fixAll()}>fix</Button> */}
      <CssBaseline />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}
      <Grid container md={12} sx={12} xs={12}>
        {cards?.map((card) => (
          <Grid container item key={card.num} lg={isInternalPage ? 4 : 3} md={isInternalPage ? 4 : 3} sm={6} xs={12} p={1} onClick={() => {
            setProducao(card.id);
          }}>
            <InfoCard
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
            <MyInput
              fullWidth
              label='Referência cliente'
              id='Referência'
              name='Referência'
              autoComplete='name'
              placeholder='Escrever Referência cliente'
              value={referencia}
              onChange={(e) => setReferência(e.target.value)}
            />
          </Grid>
          <Grid container item md={3} sm={6} xs={12} p={1}>
            <MyInput
              fullWidth
              label='Nome'
              id='name'
              name='name'
              autoComplete='name'
              placeholder='Escrever Nome'
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
                  subheader: true,
                  label: '--- Orçamento'
                },
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
                  label: isInternalPage ? '--- Projeto' : '--- Pedido'
                },
                {
                  id: 'drawing',
                  label: 'Em Desenho'
                },
                {
                  id: 'production',
                  label: 'Em Produção'
                },
                {
                  id: 'testing',
                  label: 'Em Montagem'
                },
                {
                  id: 'transport',
                  label: 'Em Transporte'
                },
                {
                  id: 'finished',
                  label: 'Terminado'
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
            hidden={!CanDo(['write', 'projects', userPermissions]) || !isInternalPage}
            text='Adicionar orçamento'
            onClick={() => Router.push(routes.private.internal.newProject)}
          />
        </Box>
        {isInternalPage && <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          {true && <AdvancedTable
            rows={projects?.filter(ele => ele?.status?.value?.toLowerCase() !== 'canceled')}
            headCells={headCellsProjects}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
            setFilters={setFilters}
          />}
        </TabPanel>
        {/* Tab Budgets */}
        {isInternalPage && <TabPanel value={currentTab} index={1}>
          <AdvancedTable
            rows={budgets?.filter(ele => ele.approvedDate?.value === '' && ele.status.value.toLowerCase() !== 'canceled')}
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
