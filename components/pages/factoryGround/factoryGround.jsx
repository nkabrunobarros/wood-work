/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Grid, Grow, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Calendar } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import Navbar from '../../layout/navbar/navbar';
import FurnitureDetails from './ProjectDetails/furnitureDetails';
import ProjectDetails from './ProjectDetails/projectDetails';

const FactoryGround = ({ ...props }) => {
  const { breadcrumbsPath, projects } = props;
  const [chosenProject, setChosenProject] = useState();
  const [chosenFurniture, setChosenFurniture] = useState();
  const [furnitureProject, setFurnitureProject] = useState();

  function getGreenToRed (percent) {
    const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    const g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);

    return 'rgb(' + r + ',' + g + ',0)';
  }

  return <>
    {chosenFurniture && <FurnitureDetails
      {...props}
      open={chosenFurniture}
      furnitureProject={furnitureProject}
      chosenFurniture={chosenFurniture}
      setChosenProject={setChosenFurniture}
      onClose={setChosenFurniture}
    />}
    {chosenProject && <ProjectDetails
      {...props}
      open={chosenProject}
      chosenProject={chosenProject}
      setChosenProject={setChosenProject}
      onClose={setChosenProject}
    />}
    <Navbar />

    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} pt={4} >
        <Grid container md={12} p={1} pb={4}>
          <Typography variant='title'>Chão de Fábrica</Typography>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {projects
            .map((proj, i) => {
              return <>
                {projects[i - 1]?.budget.dateDeliveryProject.value !== proj.budget.dateDeliveryProject.value && <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
                  <Box container md={12} sm={12} xs={12} color='lightTextSm.main'>
                    <Calendar strokeWidth={1.5} />
                  </Box>
                  <Typography variant="h5" textAlign={'center'} pl={1}>{proj.budget.dateDeliveryProject.value}</Typography>
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
                        setChosenFurniture(furnit);
                        setFurnitureProject(proj);
                      }}>
                        <CardContent>
                          <Grid container md={12} sm={12} xs={12} >
                            <Grid container md={6} sm={6} xs={6} >
                              <Tooltip title='Movel'>
                                <Typography fontWeight={'bold'} variant="h5">
                                  {furnit.name.value}
                                </Typography>
                              </Tooltip>
                            </Grid>
                            <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'} >
                              <Tooltip title='Quantidade ainda para produzir'>
                                <Typography variant='subtitle1' color='primary'>A Produzir: {furnit.produced?.value ? '0' : furnit.amount.value}</Typography>
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
                          </Grid>
                          <Grid container md={12} sm={12} xs={12} >
                            <Grid container md={6} sm={6} xs={6} >
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
          {false && projects?.map((proj) => {
            return <>
              <Typography variant="h6">{proj.name.value}</Typography>
              <Box
                key={proj.id} sx={{
                  width: '100%',
                  overflow: 'auto',
                  whiteSpace: 'nowrap'
                }}>
                <Box sx={{ display: 'inline-block', width: '100%' }} >
                  {proj.furnitures?.map((furnit) => {
                    return <Box key={furnit.id} sx={{ width: '33%', display: 'inline-block', p: 1 }}>
                      <Grow in={true}>
                        <Card
                          sx={{ cursor: 'pointer', width: '100%', p: 2 }}
                        >
                          <CardContent>
                            <Grid container md={12} sm={12} xs={12} >
                              <Grid container md={6} sm={6} xs={6} >
                                <Tooltip title='Móvel'>
                                  <Typography variant="h6">
                                    {furnit.name.value}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                              <Grid container md={6} sm={6} xs={6} justifyContent={'end'} >
                                <Tooltip title='Projeto'>
                                  <Typography variant='subtitle1' color='primary'>{proj?.name?.value}</Typography>
                                </Tooltip>
                              </Grid>
                            </Grid>
                            <Grid container md={12} sm={12} xs={12} >
                              <Grid container md={6} sm={6} xs={6} >
                                <Tooltip title='Quantidade'>
                                  <Typography variant="subtitle1">
                                  Qtd: {furnit.amount.value}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                              <Grid container md={6} sm={6} xs={6} justifyContent={'end'} >
                                <Tooltip title='Peças produzidas'>
                                  <Typography variant='subtitle1' >
                                  Feito: <a style={{ color: getGreenToRed((proj?.completed?.value * 100) / proj?.amount?.value) }}>{proj?.completed?.value || 0}</a> / {proj?.amount?.value || 0}
                                  </Typography>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </CardContent>

                        </Card>
                      </Grow>
                    </Box>;
                  })}
                </Box>
              </Box>
            </>;
          }
          )}
        </Grid>

      </Grid>
    </Grid>
  </>;
};

export default FactoryGround;
