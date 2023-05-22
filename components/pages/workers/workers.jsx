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
  TextField,
  Typography
} from '@mui/material';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as workersActionsRedux from '../../../store/actions/worker';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Notification from '../../dialogs/Notification';
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';

const Workers = ({ ...props }) => {
  const {
    breadcrumbsPath,
    editRoute,
    detailRoute,
    newRoute,
    headCellsWorkers,
  } = props;

  const dispatch = useDispatch();
  const deleteWorker = (data) => dispatch(workersActionsRedux.deleteWorker(data));
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [workers, setWorkers] = useState(props.workers);

  const [filters, setFilters] = useState({
    Nome: nome,
    Email: email,
  });

  useEffect(() => {
    setFilters({
      Nome: nome,
      Email: email,
    });
  }, [nome, email]);

  async function onDelete (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const id = props.replace('urn:ngsi-ld:Worker:', '');

    try {
      await deleteWorker(id);
    } catch (err) {
      console.log(err);
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    }

    const old = [...workers];
    const index = old.findIndex((item) => item.id.replace('urn:ngsi-ld:Worker:', '') === id);

    if (index !== -1) {
      const updatedItems = [...old];

      updatedItems.splice(index, 1);
      setWorkers(updatedItems);
      ToastSet(loading, 'Utilizador Removido.', 'success');
    }
  }

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <Notification />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        {/* Filters */}
        <Content>
          <Grid id='pad' container md={12} sm={12} xs={12}>
            <Grid container md={12} sm={12} xs={12}>
              <Typography variant='title'>Filtros</Typography>
            </Grid>
            <Grid container md={4} sm={6} xs={12} p={1}>
              <InputLabel htmlFor='email'>Utilizador</InputLabel>
              <Autocomplete
                name='client'
                id='client'
                fullWidth
                disablePortal
                options={workers.sort((a, b) =>
                  a.Nome > b.Nome ? 1 : a.Nome < b.Nome ? -1 : 0
                )}
                getOptionLabel={(option) => option.Nome }
                getOptionValue={(option) => option.id}
                onChange={(e, value) => setNome(value?.Nome || '')}
                renderOption={(props, option) => {
                  return (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.Nome}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    value={nome}
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid container md={4} sm={6} xs={12} p={1}>
              <MyInput label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </Grid>
          </Grid>
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
                  hidden={!CanDo('add_worker')}
                  text='Adicionar'
                  onClick={() => Router.push(`${newRoute}`)}
                />
              </div>
            </div>
          </div>
          <AdvancedTable
            rows={workers}
            // rows={workers.filter((item) => item.active?.value && item)}
            headCells={headCellsWorkers}
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

Workers.propTypes = {
  breadcrumbsPath: PropTypes.array,
  items: PropTypes.array,
  workers: PropTypes.array,
  profiles: PropTypes.array,
  headCells: PropTypes.array,
  headCellsWorkers: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};

export default Workers;
