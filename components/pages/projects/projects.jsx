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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as projectsActionsRedux from '../../../store/actions/project';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const ProjectsScreen = (props) => {
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));
  const dispatch = useDispatch();
  const updateProject = (data) => dispatch(projectsActionsRedux.updateProject(data));
  const updateBudget = (data) => dispatch(budgetsActionsRedux.updateBudget(data));

  const {
    breadcrumbsPath,
    detailPage,
    cards,
    clients,
    editPage,
    headCellsBudget,
    headCellsProjects,
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
  const [projects, setProjects] = useState(props.projects);
  const [budgets, setBudgets] = useState(props.budgets);
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

  async function onDeleteBudget (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const id = props;

    const data = {
      id,
      status: { type: 'Property', value: 'canceled' },
      Estado: 'canceled'
    };

    try {
      await updateBudget(data).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...budgets];
    const index = old.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedItems = [...old];

      setBudgets(updatedItems);
      ToastSet(loading, 'Orçamento Removido.', 'success');
    }
  }

  async function onDeleteProject (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const id = props;

    const data = {
      id,
      status: { type: 'Property', value: 'canceled' }
    };

    try {
      await updateProject(data).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...projects];
    const index = old.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedItem = {
        ...projects[index], // Copy the existing item
        status: { type: 'Property', value: 'canceled' },
        Estado: 'canceled'
      };

      const updatedItems = [
        ...projects.slice(0, index), // Copy the items before the updated item
        updatedItem, // Add the updated item
        ...projects.slice(index + 1) // Copy the items after the updated item
      ];

      setProjects(updatedItems);
      ToastSet(loading, 'Utilizador Removido.', 'success');
    }
  }

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }} >
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
                    id: 'canceled',
                    label: 'Cancelado'
                  },
                  {
                    subheader: true,
                    label: '--- Projeto'
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
              text='Adicionar pedido'
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
            <AdvancedTable
              rows={projects}
              headCells={headCellsProjects}
              filters={filters}
              clickRoute={detailPage}
              editRoute={editPage}
              setFilters={setFilters}
              onDelete={onDeleteProject}
            />
          </TabPanel>
          {/* Tab Budgets */}
          {isInternalPage && <TabPanel value={currentTab} index={1}>
            <AdvancedTable
              rows={budgets?.filter(ele => ele.approvedDate?.value === '')}
              headCells={headCellsBudget}
              filters={filters}
              setFilters={setFilters}
              clickRoute={detailPageBudgetTab}
              editRoute={editPage}
              onDelete={onDeleteBudget}
            />
          </TabPanel>}
        </Content>
      </Grid>
      <Footer/>
    </>
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
