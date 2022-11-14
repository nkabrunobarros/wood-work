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
import AdvancedTable from '../../advancedTable/AdvancedTable';

const Clients = ({ ...props }) => {
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
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters({
      legalName: nome,
      email,
      perfilId: profilesFilter
    });
  }, [nome, email, profiles, profilesFilter]);

  const ClearFilters = () => {
    setNome('');
    setEmail('');
    setProfilesFilter('');
  };

  console.log(items);

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
                options={items}
                optionValue={'legalName'}
                optionLabel={'legalName'}
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
          // rows={items.filter((item) => item.active?.value === 'True' && item)}
          headCells={headCells}
          clickRoute={detailRoute}
          editRoute={editRoute}
          filters={filters}
        />
      </Content>
    </Grid>
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
