/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

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
          <Typography variant='title'>Escolha Projeto</Typography>
        </Grid>
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
      <ProjectAssembly open={chosenProject} chosenProject={chosenProject} onClose={() => setChosenProject()} />
    </Grid>
  </>;
};

export default Assembly;
