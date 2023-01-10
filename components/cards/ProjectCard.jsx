import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
//  PropTypes
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FilterItem } from '../utils/FilterItem';

const ProjectCard = (props) => {
  const { setChosenProject, proj } = props;

  return (
    <Card
      sx={{ width: '100%', cursor: 'pointer' }}
      onClick={() => setChosenProject(proj)}
    >
      <Box className='fullCenter'>
        <Image
          alt="green iguana"
          height={140}
          width={140}
          src="https://cdn.pixabay.com/photo/2014/12/21/23/43/table-575911_960_720.png"
        />
      </Box>
      <CardContent>
        <Grid container sx={{ width: '100%' }}>
          <Grid container md={6} sm={6} xs={6} p={1}>
            <Typography variant="h5" component="div">
              {proj.name.value}
            </Typography>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1} justifyContent='end'>
            <Typography variant="md" component="div">
              {FilterItem([{}], proj, 'status.value')}
            </Typography>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1} >
            <Typography variant="md">
                            Qtd: {proj.amount?.value}
            </Typography>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1} justifyContent='end'>
            <Typography variant="md">
                            Feito: 0 / {proj.amount?.value}
            </Typography></Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
      {/* <CardActions>
                <Button size="small" onClick={() => {
                    setChosenProject(rowIndex + 1);
                    console.log(rowIndex);
                    }}>Escolher</Button>
                <Button size="small">Finalizar Produção</Button>
            </CardActions> */}
    </Card>
  );
};

ProjectCard.propTypes = {
  proj: PropTypes.object.isRequired,
  setChosenProject: PropTypes.func.isRequired,
};

export default ProjectCard;
