//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';

import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Select from '../../inputs/select';

//  PropTypes
import {
  InputLabel,
  OutlinedInput
} from '@mui/material';
import Router from 'next/router';
import PropTypes from 'prop-types';
import routes from '../../../navigation/routes';
import AdvancedTable from '../../advancedTable/AdvancedTable';

const Users = ({ ...props }) => {
  const {
    items,
    breadcrumbsPath,
    profiles,
    headCells,
    editRoute,
    detailRoute,
    newRoute,
  } = props;

  //  States
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [profilesFilter, setProfilesFilter] = useState('');

  const [filters, setFilters] = useState({
    nome,
    email,
    idPerfil: profilesFilter,
  });

  useEffect(() => {
    setFilters({
      nome,
      email,
      idPerfil: profilesFilter,
    });
  }, [nome, email, profilesFilter]);

  const ClearFilters = () => {
    setNome('');
    setEmail('');
    setProfilesFilter('');
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


              <Select
                label={'Nome'}
                options={items.filter((item) => item.ativo && item)}
                optionValue={'nome'}
                optionLabel={'nome'}
                onChange={(event) => setNome(event.target.value)}
              />

            </div>
            <div className='filterContainer'>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <OutlinedInput

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
              {Router.route !== routes.private.internal.clients &&
                <Select
                  label='Perfil'
                  options={profiles}
                  value={profilesFilter}
                  optionLabel='descricao'
                  optionValue='id'
                  onChange={(e) => setProfilesFilter(e.target.value)}
                />
              }
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
        {console.log(items)}
        {console.log(profilesFilter)}
        <AdvancedTable
          rows={items.filter((item) => item.ativo && item)}
          headCells={headCells}
          clickRoute={detailRoute}
          editRoute={editRoute}
          filters={filters}
        />
      </Content>
    </Grid>
  );
};

Users.propTypes = {
  breadcrumbsPath: PropTypes.array,
  items: PropTypes.array,
  profiles: PropTypes.array,
  headCells: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};

export default Users;
