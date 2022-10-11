//  Nodes
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

//  Material UI
import {
  Autocomplete,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
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
  } = props;

  //  States
  const [number, setNumber] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [producao, setProducao] = useState('');
  const [filters, setFilters] = useState({});

  const ClearFilters = () => {
    setNumber('');
    setClient('');
    setCategory('');
    setCategory('');
    setFilters({});
  };

  //  Triggers when a filter input changes
  useEffect(() => {
    setFilters({
      id: number,
      categoria: category,
      status: producao,
      cliente: client,
    });
  }, [number, client, category, producao]);

  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}
      <Grid container md={12} sx={12} xs={12}>
        {cards.map((card) => (
          <Grid container item key={card.num} lg={3} md={6} sm={12} p={1}>
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
          <Grid container item md={4} sm={6} xs={12} p={1}>
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
          <Grid container item md={4} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='email'>Cliente</InputLabel>
            <Autocomplete
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={clients}
              getOptionLabel={(option) => option.giveName}
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
          <Grid container item md={4} sm={6} xs={12} p={1}>
            <InputLabel htmlFor='Stock'>Producao</InputLabel>
            <Select
              fullWidth
              value={producao}
              onChange={(e) => setProducao(e.target.value)}
            >
              <MenuItem value={''} disabled>
                Selecionar um estágio
              </MenuItem>
              <MenuItem value={'Em orçamentação'}>Não Iniciada</MenuItem>
              <MenuItem value={'Iniciada'}>Iniciada</MenuItem>
              <MenuItem value={'Terminada'}>Terminada</MenuItem>
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
          <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
          <PrimaryBtn
            hidden={!CanDo(['write', 'orders'])}
            text='Adicionar'
            onClick={() => Router.push(routes.private.internal.newOrder)}
          />
        </Box>
        <AdvancedTable
          rows={items}
          headCells={headCells}
          filters={filters}
          clickRoute={detailPage}
          editRoute={editPage}
        />
      </Content>
    </Grid>
  );
};

OrdersScreen.propTypes = {
  items: PropTypes.array,
  categories: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  clients: PropTypes.array,
  detailPage: PropTypes.string,
  editPage: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  headCells: PropTypes.array,
};

export default OrdersScreen;
