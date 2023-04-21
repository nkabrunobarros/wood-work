/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Grid, Grow, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import * as furnituresActionsRedux from '../../../store/actions/furniture';
import CustomBreadcrumbs from '../../breadcrumbs';
import ProjectCard from '../../cards/ProjectCard';
import Navbar from '../../layout/navbar/navbar';
import ProjectDetails from './ProjectDetails/projectDetails';

const FactoryGround = ({ ...props }) => {
  const { breadcrumbsPath } = props;
  const [projects, setProjects] = useState(props.projects);
  const [activeRow, setActiveRow] = useState(0);
  const [chosenProject, setChosenProject] = useState();
  const dispatch = useDispatch();
  const getFurnitures = (data) => dispatch(furnituresActionsRedux.furnitures(data));

  useEffect(() => {
    async function loadFurnitures () {
      await getFurnitures().then((res) => {
        const builtProjects = props.projects?.map((proj) => {
          return { ...proj, furnitures: res.data.filter(ele => ele.hasBudget?.value === proj.hasBudget?.object && ele.rowType.value === 'furniture').sort((a, b) => (a.num.value > b.num.value) ? 1 : -1) };
        });

        setProjects(builtProjects);
      });
    }

    loadFurnitures();
  }, []);

  function getGreenToRed (percent) {
    const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    const g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);

    return 'rgb(' + r + ',' + g + ',0)';
  }

  console.log(getGreenToRed(20));

  return <>
    {chosenProject && <ProjectDetails
      {...props}
      open={chosenProject}
      activeRow={activeRow}
      chosenProject={chosenProject}
      setActiveRow={setActiveRow}
      setChosenProject={setChosenProject}
      onClose={setChosenProject}
    />}
    <Navbar />

    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} >
        <Grid container md={12} p={1} >
          <Typography variant='title'>Escolha Projeto</Typography>
        </Grid>
        {projects
          ? projects?.map((proj, i) =>
            <Grid key={i} container md={3} sm={6} xs={12} p={1} >
              <ProjectCard proj={proj} setChosenProject={setChosenProject} {...props}/>
            </Grid>
          )
          : <Grid container md={3} sm={6} xs={12} p={1} >
            <ProjectCard proj={{ id: 1, name: { value: 'teste' }, amount: { value: 0 } }} setChosenProject={setChosenProject} {...props}/>
          </Grid>}
        <Grid container md={12} sm={12} xs={12}>

          {false && projects.map((proj) => {
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
                                <Tooltip title='Movel'>
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
