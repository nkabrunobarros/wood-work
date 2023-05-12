/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import axios from 'axios';
import moment from 'moment';
import { parseCookies } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as moduleActions from '../../../store/actions/module';
import CustomBreadcrumbs from '../../breadcrumbs';
import Notification from '../../dialogs/Notification';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';
import ModuleCard from './ModuleCard';

const Assembly = (props) => {
  const dispatch = useDispatch();
  const updateProject = (data) => dispatch(moduleActions.updateModule(data));
  const { breadcrumbsPath } = props;
  const reduxState = useSelector((state) => state);
  const me = reduxState.auth.me;
  const [modules, setModules] = useState(props.modules);
  const { auth_token: userToken } = parseCookies();

  function CreateModules () {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://193.136.195.25/ww4/api/v1/module/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
    };

    for (let index = 0; index < 5; index++) {
      axios.request({
        ...config,
        data: {
          id: 'urn:ngsi-ld:Module:' + index + moment().diff(moment().startOf('day'), 'seconds'),
          type: 'Module',
          name: { type: 'Property', value: 'Modulo ' + index + moment().diff(moment().startOf('day'), 'seconds') },
          startTime: { type: 'Property', value: '' },
          finishTime: { type: 'Property', value: '' },
          assemblyBy: { type: 'Property', value: '' },
          client: { type: 'Property', value: 'Bruno Barros' },
          furniture: { type: 'Property', value: 'Mueble B' },
          project: { type: 'Property', value: 'Completo' },
          group: { type: 'Property', value: 'Glisy' },
          subGroup: { type: 'Property', value: 'Open Space' },
          amount: { type: 'Property', value: '4' },
        }
      })
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function onActionClick (module) {
    const loading = toast.loading('');
    const data = {};

    if (!module.startTime?.value) {
      console.log(module.finishTime?.value);
      data.startTime = { ...module.startTime, value: moment().format('DD/MM/YYYY HH:mm:ss') };
      data.assemblyBy = { ...module.assemblyBy, value: 'urn:ngsi-ld:Worker:' + me.id };
    } else {
      data.finishTime = { ...module.finishTime, value: moment().format('DD/MM/YYYY HH:mm:ss') };
    }

    await updateProject({ id: module.id, data }).then(() => {
      // Update set here
      setModules((modules) => {
        return modules.map((m) => {
          if (m.id === module.id) {
            return { ...m, ...data };
          }

          return m;
        });
      });

      ToastSet(loading, data.finishTime ? 'Módulo terminado' : 'Módulo Iniciado', 'success');
    }).catch(() => {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
    });
  }

  return <>
    <Navbar />
    <Notification />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} pt={4}>
        <Grid container md={12} p={1} >
          <Typography variant='title'>Montagens</Typography>
        </Grid>
        <Grid container md={12} p={1} >
          <Typography variant='subtitle2'>Escolha um módulo</Typography>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {modules.filter(ele => ele.finishTime.value === '')?.map((module, i) => {
            return <Grid
              key={i}
              container
              md={4}
              sm={12}
              xs={12}
              sx={{ p: 1 }}>
              <ModuleCard module={module} me={me} onActionClick={onActionClick} />
            </Grid>;
          })}
        </Grid>
        <Button onClick={() => CreateModules()} sx={{ color: 'transparent' }}>CreateModules</Button>
      </Grid>
    </Grid>
  </>;
};

export default Assembly;
