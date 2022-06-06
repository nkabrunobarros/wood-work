//  Nodes
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';

import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';
import {
  Autocomplete,
  Box,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Router from 'next/router';

const Users = ({ ...props }) => {
  const {
    items,
    breadcrumbsPath,
    // tableCols,
    countries,
    headCells,
    editRoute,
    detailRoute,
    newRoute,
  } = props;

  //  States
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pais, setPais] = useState('');

  const ClearFilters = () => {
    setNome('');
    setEmail('');
    setPais('');
  };

  const onCountryChange = (value) => {
    if (value === null) setPais('');
    else setPais(value.label);
  };
  const onNameChange = (value) => {
    if (value === null) setNome('');
    else setNome(value.nome);
  };

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Filters */}
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className='filters'>
            <div className='filterContainer'>
              <InputLabel htmlFor='email'>Nome</InputLabel>
              <Autocomplete
                id='country-select-demo'
                fullWidth
                options={items}
                autoHighlight
                getOptionLabel={(option) => option.nome}
                onChange={(event, value) => onNameChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Escrever um nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className='filterContainer'>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <OutlinedInput
                margin='normal'
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Escrever um email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={'filterContainer'}>
              <InputLabel htmlFor='Categoria'>País</InputLabel>
              <Autocomplete
                id='country-select-demo'
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => onCountryChange(value)}
                renderOption={(props, option) => (
                  <Box
                    component='li'
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading='lazy'
                      width='20'
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=''
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Escrever um país'
                    value={pais}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div
            style={{
              width: 'fit-content',
              marginLeft: 'auto',
              paddingTop: '1rem',
            }}
          >
            <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
          </div>
        </div>
      </Content>

      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div>
            <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'end',
              flexDirection: 'column',
              color: 'var(--grayTexts)',
              fontSize: 'small',
            }}
          >
            <div>
              <PrimaryBtn
                text='Adicionar'
                onClick={() => Router.push(`${newRoute}`)}
              />
            </div>
          </div>
        </div>
        <AdvancedTable
          rows={items}
          headCells={headCells}
          clickRoute={detailRoute}
          editRoute={editRoute}
        />
      </Content>
    </Grid>
  );
};
Users.propTypes = {
  breadcrumbsPath: PropTypes.array,
  items: PropTypes.array,
  countries: PropTypes.array,
  headCells: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};
export default Users;
