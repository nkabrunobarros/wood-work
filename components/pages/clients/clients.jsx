//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';

import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import {
  Autocomplete,
  Box,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as clientsActionsRedux from '../../../store/actions/client';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const Clients = ({ ...props }) => {
  const {
    breadcrumbsPath,
    profiles,
    headCells,
    editRoute,
    detailRoute,
    newRoute,
  } = props;

  //  States
  const [nome, setNome] = useState('');
  const [clients, setClients] = useState(props.items);
  const [email, setEmail] = useState('');
  const [profilesFilter, setProfilesFilter] = useState('');
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  const updateClient = (data) => dispatch(clientsActionsRedux.updateClient(data));

  useEffect(() => {
    setFilters({
      Nome: nome,
      Email: email,
      perfilId: profilesFilter
    });
  }, [nome, email, profiles, profilesFilter]);

  useEffect(() => {
    setEmail(filters.Email || '');
    setNome(filters.Nome || '');
  }, [filters]);

  const ClearFilters = () => {
    setNome('');
    setEmail('');
    setProfilesFilter('');
  };

  async function onDelete (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const id = props.replace('urn:ngsi-ld:Owner:', '');
    const formData = new FormData();

    formData.append('user.is_active', false);

    try {
      await updateClient({ data: formData, id: props }).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...clients];
    const index = old.findIndex((item) => item.id.replace('urn:ngsi-ld:Owner:', '') === id);

    if (index !== -1) {
      const updatedItems = [...old];

      updatedItems.splice(index, 1);
      setClients(updatedItems);
      ToastSet(loading, 'Cliente Removido.', 'success');
    }
  }

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        {/* Filters */}
        <Content>
          <Box id='pad'>
            <a className='headerTitleSm'>Filtros</a>
            <Box className='filters'>
              <Box className='filterContainer'>
                <InputLabel htmlFor='email'>Cliente</InputLabel>
                <Autocomplete
                  name='client'
                  id='client'
                  fullWidth
                  disablePortal
                  options={clients.sort((a, b) =>
                    a.Nome > b.Nome ? 1 : a.Nome < b.Nome ? -1 : 0
                  )}
                  getOptionLabel={(option) => option.legalName?.value || option.name?.value}
                  getOptionValue={(option) => option.id}
                  onChange={(e, value) => setNome(value?.legalName.value || '')}
                  renderOption={(props, option) => {
                    return (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.legalName?.value || option.name?.value }
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={nome}
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
              <Box className='filterContainer'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  fullWidth
                  id='email'
                  name='email'
                  autoComplete='email'
                  placeholder='Escrever Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box className={'filterContainer'}>

              </Box>

            </Box>
            <Box
              style={{
                width: 'fit-content',
                marginLeft: 'auto',
                paddingTop: '1rem',
              }}
            >
              <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
            </Box>
          </Box>
        </Content>

        <Content>
          <Box
            id='pad'
            className='flex'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Box>
              <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
            </Box>
            <Box
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'end',
                flexDirection: 'column',
                color: 'var(--grayTexts)',
                fontSize: 'small',
              }}
            >
              <Box>
                <PrimaryBtn
                  text='Adicionar'
                  onClick={() => Router.push(`${newRoute}`)}
                />
              </Box>
            </Box>
          </Box>
          <AdvancedTable
            rows={clients.filter((item) => item.user.is_active && item).sort((a, b) =>
              a.Nome > b.Nome ? 1 : a.Nome < b.Nome ? -1 : 0
            )}
            headCells={headCells}
            clickRoute={detailRoute}
            editRoute={editRoute}
            filters={filters}
            setFilters={setFilters}
            onDelete={onDelete}
          />
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

Clients.propTypes = {
  breadcrumbsPath: PropTypes.array,
  items: PropTypes.array,
  profiles: PropTypes.array,
  headCells: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};

export default Clients;
