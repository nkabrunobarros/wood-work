/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Box, Chip, Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as projectsActionsRedux from '../../../store/actions/project';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import InfoCard from '../../cards/InfoCard';
import Content from '../../content/content';
import MyInput from '../../inputs/myInput';
import MySelect from '../../inputs/select';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const ProjectsScreen = (props) => {
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));
  const dispatch = useDispatch();
  const updateProject = (data) => dispatch(projectsActionsRedux.updateProject(data));
  const deleteProject = (data) => dispatch(projectsActionsRedux.deleteProject(data));
  const updateBudget = (data) => dispatch(budgetsActionsRedux.updateBudget(data));
  const deleteBudget = (data) => dispatch(budgetsActionsRedux.deleteBudget(data));

  const {
    breadcrumbsPath,
    detailPage,
    cards,
    clients,
    editPage,
    headCellsProjects,
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
  const [items, setItems] = useState(props.items);

  const States = [
    {
      subheader: true,
      label: '--- Orçamento'
    },
    {
      id: 'needs analysis',
      label: 'Pendente Análise Necessidades'
    },
    {
      id: 'waiting budget',
      label: 'Pendente Orçamentação'
    },
    {
      id: 'waiting adjudication',
      label: 'Pendente Adjudicação'
    },
    {
      id: 'canceled',
      label: 'Cancelado',
      notDefault: true
    },
    {
      subheader: true,
      label: '--- Projeto'
    },
    {
      id: 'drawing',
      label: 'Pendente Desenho'
    },
    {
      id: 'production',
      label: 'Pendente Produção'
    },
    {
      id: 'testing',
      label: 'Pendente Montagem'
    },
    {
      id: 'packaging',
      label: 'Pendente Embalamento'
    },
    {
      id: 'transport',
      label: 'Pendente Expedição'
    },
    {
      id: 'finished',
      label: 'Terminado',
      notDefault: true
    },
  ];

  const [personName, setPersonName] = useState(States.filter(ele => ele.subheader !== true).filter(ele => ele.notDefault !== true).map(ele => ele.id));

  const ClearFilters = () => {
    setProduct('');
    setReferência('');
    setNumber('');
    setClient('');
    setCategory('');
    setProducao(States.filter(ele => ele.subheader !== true).filter(ele => ele.notDefault !== true).map(ele => ele.id));
    setPersonName(States.filter(ele => ele.subheader !== true).filter(ele => ele.notDefault !== true).map(ele => ele.id));
    setFilters({});
  };

  //  Triggers when a filter input changes

  useEffect(() => {
    setFilters({
      Nome: number,
      Cliente: client,
      Estado: personName,
      telemovel: telephone,
      Numero: referencia
    });
  }, [number, producao, client, category, product, telephone, referencia, personName]);

  useEffect(() => {
    setNumber(filters.Nome || '');
    setReferência(filters.Numero || '');
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

  async function onReactivationItem (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const isProject = props.includes('urn:ngsi-ld:Project:');

    const data = {
      id: props,
      data: { status: { type: 'Property', value: isProject ? 'drawing' : 'waiting budget' } }
    };

    try {
      isProject
        ? await updateProject(data)
        : await updateBudget(data);
    } catch (err) {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...items];
    const index = old.findIndex((item) => item.id === props);

    if (index !== -1) {
      const updatedItem = {
        ...items[index], // Copy the existing item
        status: { type: 'Property', value: isProject ? 'drawing' : 'waiting budget' },
        Estado: isProject ? 'drawing' : 'waiting budget'
      };

      const updatedItems = [
        ...items.slice(0, index), // Copy the items before the updated item
        updatedItem, // Add the updated item
        ...items.slice(index + 1) // Copy the items after the updated item
      ];

      setItems(updatedItems);
      ToastSet(loading, `${isProject ? 'Projeto' : 'Projeto'} reaberto.`, 'success');
    }
  }

  async function onDeleteItem (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const toDelete = items.find(ele => ele.id === props)?.status?.value === 'canceled';
    // eslint-disable-next-line react/prop-types
    const isProject = props.includes('urn:ngsi-ld:Project:');
    const deleteItem = isProject ? deleteProject : deleteBudget;
    const updateItem = isProject ? updateProject : updateBudget;

    try {
      toDelete
        ? await deleteItem(props)
        : await updateItem({ id: props, data: { status: { type: 'Property', value: 'canceled' } } });
    } catch (err) {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...items];
    const index = old.findIndex((item) => item.id === props);

    if (toDelete) {
      if (index !== -1) {
        const updatedItems = [...old];

        updatedItems.splice(index, 1);
        setItems(updatedItems);
        ToastSet(loading, 'Projeto apagado do sistema.', 'success');
      }
    } else if (index !== -1) {
      const updatedItem = {
        ...items[index], // Copy the existing item
        status: { type: 'Property', value: 'canceled' },
        Estado: 'canceled'
      };

      const updatedItems = [
        ...items.slice(0, index), // Copy the items before the updated item
        updatedItem, // Add the updated item
        ...items.slice(index + 1) // Copy the items after the updated item
      ];

      setItems(updatedItems);
      ToastSet(loading, 'Projeto cancelado.', 'success');
    }
  }

  const theme = useSelector((state) => state.appStates.theme);

  function getStyles (name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
            <Grid container item key={card.num} lg={4} md={4} sm={6} xs={12} p={1} onClick={() => {
              setPersonName(Array.isArray(card.id) ? card.id : [card.id]);
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
            {isInternalPage && <Grid container item md={4} sm={6} xs={12} p={1}>
              <Box sx={{ width: '100%' }}>
                <InputLabel htmlFor='email'>Cliente</InputLabel>
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
                  onChange={(e, value) => {
                  // eslint-disable-next-line react/prop-types
                    setClient(value?.id || '');
                  }}
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
                      placeholder="Escrever Nome Cliente"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>}
            <Grid container item md={4} sm={6} xs={12} p={1}>
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
            <Grid container item md={4} sm={6} xs={12} p={1}>
              <MyInput
                fullWidth
                label='Número'
                id='Numero'
                name='Numero'
                autoComplete='name'
                placeholder='Escrever Número'
                value={referencia}
                onChange={(e) => setReferência(e.target.value)}
              />
            </Grid>

            <Grid container item md={4} sm={6} xs={12} p={1} display='none'>
              <MySelect
                label='Estado'
                fullWidth
                value={producao}
                onChange={(e) => setProducao(e.target.value)}
                options={States}
              />
            </Grid>
            <Grid container item md={3} sm={6} xs={12} p={1} display='none'>
              <InputLabel id="state-select">Estado</InputLabel>
              <Select
                labelId="state-select"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, overflow: 'auto', height: '35px', position: 'sticky' }}>
                    {selected.map((value) => {
                      return <Chip key={value} label={States.filter(ele => ele.subheader !== true).find(ele => ele.id === value)?.label} />;
                    })}
                  </Box>
                )}
                sx={{ width: '100%', height: '56px' }}
              >
                {States.map((value) => (
                  <MenuItem
                    key={value.id}
                    value={value.id}
                    disabled={value.subheader}
                    style={getStyles(name, personName, theme)}
                  >
                    {value.label}
                  </MenuItem>
                ))}
              </Select>

            </Grid>
            <Grid container item md={12} sm={6} xs={12} p={1}>
              <Grid container item md={12} sm={6} xs={12}>
                <InputLabel id="state-select">Estado</InputLabel>
              </Grid>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={States.filter(ele => ele.subheader !== true).find(ele => ele.id === value)?.label.replace('Pendente', '')} />
                    ))}
                  </Box>
                )}
                sx={{ width: 'fit-content', minWidth: '32.5%' }}
              >
                {States.map((value) => (
                  <MenuItem
                    key={value.id}
                    value={value.id}
                    disabled={value.subheader}
                    style={getStyles(name, personName, theme)}
                  >
                    {value.label}
                  </MenuItem>
                ))}
              </Select>

            </Grid>
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
              hidden={!isInternalPage}
              text='Adicionar projeto'
              onClick={() => Router.push(routes.private.internal.newProject)}
            />
          </Box>
          <AdvancedTable
            rows={items}
            headCells={headCellsProjects}
            filters={filters}
            clickRoute={detailPage}
            editRoute={editPage}
            setFilters={setFilters}
            onDelete={onDeleteItem}
            onReactivation={onReactivationItem}
          />
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

ProjectsScreen.propTypes = {
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string,
  cards: PropTypes.array,
  clients: PropTypes.array,
  editPage: PropTypes.string,
  headCellsProjects: PropTypes.array,
  items: PropTypes.array,
};

export default ProjectsScreen;
