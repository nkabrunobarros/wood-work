/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, Grid, Grow, Tooltip, Typography } from '@mui/material';
import React from 'react';
import PrimaryBtn from '../../buttons/primaryBtn';

import CustomBreadcrumbs from '../../breadcrumbs';
import Navbar from '../../layout/navbar/navbar';

const Assembly = (props) => {
  const { breadcrumbsPath } = props;
  const modules = [{ startTime: { value: 'a' } }, {}, { startTime: { value: 'a' } }];

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} >
        <Grid container md={12} p={1} >
          <Typography variant='title'>Módulos</Typography>
        </Grid>
      </Grid>
      <Grid container md={12} sm={12} xs={12}>
        {modules.map((module, i) => {
          return <Grid
            key={i}
            container
            md={4}
            sm={12}
            xs={12}
            sx={{ p: 1 }}>
            <Grow in>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Grid container md={12} sm={12} xs={12} sx={{
                  }}>
                    <Grid container md={12} sm={12} xs={12} >
                      <Tooltip title='Módulo'>
                        <Typography fontWeight={'bold'} variant="h5">
                          Name Module
                        </Typography>
                      </Tooltip>
                    </Grid>

                    <Grid container md={6} sm={6} xs={6} pb={0.5} >
                      <Tooltip title='Cliente'>
                        <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Cliente: </a></Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
                      <Tooltip title='Projeto'>
                        <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Projeto: </a></Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} pb={0.5} >
                      <Tooltip title='Grupo'>
                        <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Grupo: </a></Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
                      <Tooltip title='Subgrupo'>
                        <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Subgrupo: </a></Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} pb={0.5} >
                      <Tooltip title='Móvel'>
                        <Typography variant="subtitle1" color='primary'>
                          Móvel:
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
                      <Tooltip title='Quantidade Pedida'>
                        <Typography variant="subtitle1" color='primary'>
                          Quantidade:
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  {module.startTime?.value
                    ? <PrimaryBtn text="Iniciar" color={'success'} fullWidth sx={{ minHeight: '75px' }} />
                    : <PrimaryBtn text="Terminar" color={'error'} fullWidth sx={{ minHeight: '75px' }} />
                  }
                </CardActions>
              </Card>
            </Grow>
          </Grid>;
        })}
      </Grid>
    </Grid>
  </>;
};

export default Assembly;
