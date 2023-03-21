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
  Button,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as WorkerActions from '../../../pages/api/actions/worker';
import * as workersActionsRedux from '../../../store/actions/worker';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';

const Workers = ({ ...props }) => {
  const {
    breadcrumbsPath,
    profiles,
    editRoute,
    detailRoute,
    newRoute,
    headCellsWorkers,
  } = props;

  const dispatch = useDispatch();
  const updateWorker = (data) => dispatch(workersActionsRedux.updateWorker(data));
  const userPermissions = useSelector((state) => state.auth.userPermissions);
  //  States
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [workers, setWorkers] = useState(props.workers);
  const [profilesFilter, setProfilesFilter] = useState('');

  const [filters, setFilters] = useState({
    Nome: nome,
    Email: email,
    Perfil: profilesFilter,
  });

  useEffect(() => {
    setFilters({
      Nome: nome,
      Email: email,
      Perfil: profilesFilter,
    });
  }, [nome, email, profilesFilter]);

  const ClearFilters = () => {
    setNome('');
    setEmail('');
    setProfilesFilter('');
  };

  async function Fix () {
    const fixedWorkers = [...workers].map((worker) => {
      worker.name = worker.givenName.value + ' ' + worker.familyName.value;
      delete worker.Email;
      delete worker.Nome;
      delete worker.Perfil;

      return {
        id: worker.id,
        name: { type: 'Property', value: worker.givenName.value + ' ' + worker.familyName.value },
        type: 'Worker',
        '@context': [
          'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
          'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
        ]
      };
    });

    await WorkerActions.updateWorker(fixedWorkers)
      .then(() => console.log('success'))
      .catch(() => console.log('error'));
  }

  async function onDelete (props) {
    const loading = toast.loading('');
    // eslint-disable-next-line react/prop-types
    const id = props.replace('urn:ngsi-ld:Worker:', '');

    const data = {
      id,
      is_active: false
    };

    try {
      false && await updateWorker(data).then((res) => console.log(res));
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
        {false && <Button onClick={() => Fix()}>fix</Button>}
        {/* Filters */}
        <Content>
          <div id='pad'>
            <a className='headerTitleSm'>Filtros</a>
            <div className='filters'>
              <div className='filterContainer'>
                <Select
                  label={'Nome'}
                  options={workers.filter((item) => item.active && item)}
                  optionValue={'Nome'}
                  optionLabel={'Nome'}
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
                  label='Função'
                  options={profiles}
                  value={profilesFilter}
                  optionLabel='label'
                  optionValue='value'
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
                  hidden={!CanDo(['write', 'workers', userPermissions])}
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
