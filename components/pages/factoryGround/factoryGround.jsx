/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import CustomBreadcrumbs from '../../breadcrumbs';
import ProjectCard from '../../cards/ProjectCard';
import Content from '../../content/content';
import ProjectDetails from './ProjectDetails/projectDetails';

const FactoryGround = ({ ...props }) => {
  const { breadcrumbsPath, projects } = props;
  const [activeRow, setActiveRow] = useState(0);
  const [chosenProject, setChosenProject] = useState();

  return <>
    <ProjectDetails
      {...props}
      open={chosenProject}
      activeRow={activeRow}
      chosenProject={chosenProject}
      setActiveRow={setActiveRow}
      setChosenProject={setChosenProject}
      onClose={setChosenProject}
    />
    <CustomBreadcrumbs path={breadcrumbsPath} />
    <Content>
      <Grid container md={12} >
        <Grid container md={12} p={1} >
          <Typography variant='title'>Escolha Projeto</Typography>
        </Grid>
        {projects?.map((proj, i) =>
          <Grid key={i} container md={3} sm={6} xs={12} p={1} >
            <ProjectCard proj={proj} setChosenProject={setChosenProject} {...props}/>
          </Grid>
        )}
      </Grid>
    </Content>
  </>;
};

export default FactoryGround;
