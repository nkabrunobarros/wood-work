/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Card, CardContent, Grid, Grow, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Box, Calendar } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import ProjectCard from '../../cards/ProjectCard';
import Navbar from '../../layout/navbar/navbar';
import ProjectAssembly from './projectAssembly';

const Assembly = (props) => {
  const { breadcrumbsPath, projects } = props;
  const [chosenProject, setChosenProject] = useState();

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} >
        <Grid container md={12} p={1} >
          <Typography variant='title'>Escolha Móvel</Typography>
        </Grid>
      </Grid>
      <Grid container md={12} sm={12} xs={12}>
        {projects
          .map((proj, i) => {
            return <>
              {projects[i - 1]?.budget?.dateDeliveryProject.value !== proj.budget?.dateDeliveryProject.value && <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
                <Box container md={12} sm={12} xs={12} color='lightTextSm.main'>
                  <Calendar strokeWidth={1.5} />
                </Box>
                <Typography variant="h5" textAlign={'center'} pl={1}>{proj.budget?.dateDeliveryProject?.value}</Typography>
              </Grid>}
              {proj.furnitures?.map((furnit) => {
                return <Grid key={furnit.id}
                  container
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ p: 1 }}>
                  <Grow in>
                    <Card sx={{ cursor: 'pointer', width: '100%', p: 2 }} onClick={() => {
                      // setChosenFurniture(furnit);
                      // setFurnitureProject(proj);
                      setChosenProject(furnit);
                    }}>
                      <CardContent>
                        <Grid container md={12} sm={12} xs={12} >
                          <Grid container md={12} sm={12} xs={12} >
                            <Tooltip title='Movel'>
                              <Typography fontWeight={'bold'} variant="h5">
                                {furnit.name.value}
                              </Typography>
                            </Tooltip>
                          </Grid>

                          <Grid container md={6} sm={6} xs={6} pb={0.5} >
                            <Tooltip title='Projeto'>
                              <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Projeto: </a>{proj?.name?.value}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
                            <Tooltip title='Cliente'>
                              <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Cliente: </a>{proj?.client.user?.first_name} {proj?.client.user?.last_name}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} pb={0.5} >
                            <Tooltip title='Grupo'>
                              <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Grupo: </a>{furnit?.group?.value}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
                            <Tooltip title='Subgrupo'>
                              <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Subgrupo: </a>{furnit?.subGroup?.value || 'cozinha'}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} pb={0.5} >
                            <Tooltip title='Quantidade ainda para montar'>
                              <Typography variant='subtitle1' color='primary'>A Montar: {furnit.produced?.value ? '0' : furnit.amount.value}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} justifyContent={'end'}>
                            <Tooltip title='Quantidade Pedida'>
                              <Typography variant="subtitle1" color='lightTextSm.main'>
                                Quantidade Pedida: {furnit.amount.value}
                              </Typography>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>;
              })}
            </>;
          })}
      </Grid>
      <Grid container md={12} >
        {false && projects
          ? projects?.map((proj, i) =>
            <Grid key={i} container md={3} sm={6} xs={12} p={1} >
              <ProjectCard proj={proj} setChosenProject={setChosenProject} {...props}/>
            </Grid>
          )
          : false && <Grid container md={3} sm={6} xs={12} p={1} >
            <ProjectCard proj={{ id: 1, name: { value: 'teste' }, amount: { value: 0 } }} setChosenProject={setChosenProject} {...props}/>
          </Grid>}
      </Grid>
      <ProjectAssembly open={chosenProject} chosenProject={chosenProject} onClose={() => setChosenProject()} />
    </Grid>
  </>;
};

export default Assembly;
