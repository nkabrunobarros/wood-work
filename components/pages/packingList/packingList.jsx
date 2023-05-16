/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Grid, Grow, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { Calendar } from 'lucide-react';
import Router from 'next/router';
import routes from '../../../navigation/routes';
import CustomBreadcrumbs from '../../breadcrumbs';
import Navbar from '../../layout/navbar/navbar';
import Footer from '../../layout/footer/footer';

const PackingList = ({ ...props }) => {
  const { breadcrumbsPath, projects } = props;

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12} pt={4} >
        <Grid container md={12} p={1} >
          <Typography variant='title'>Embalamentos</Typography>
        </Grid>
        <Grid container md={12} pl={1} pb={4} >
          <Typography variant='subtitle2'>Escolha um projeto para embalar</Typography>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {projects
            .map((proj, i) => {
              return <>
                { projects[i - 1]?.budget.dateDeliveryProject.value !== proj.budget.dateDeliveryProject.value && <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
                  <Box container md={12} sm={12} xs={12} color='lightTextSm.main'>
                    <Calendar strokeWidth={1.5} />
                  </Box>
                  <Typography variant="h5" textAlign={'center'} pl={1}>{proj.budget.dateDeliveryProject.value}</Typography>
                </Grid>}
                <Grid
                  container
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{ p: 1 }}>
                  <Grow in>
                    <Card sx={{ cursor: 'pointer', width: '100%', p: 2 }} onClick={() => {
                      Router.push(routes.private.internal.newPackage + proj.id);
                    }}>
                      <CardContent>
                        <Grid container md={12} sm={12} xs={12} >
                          <Grid container md={12} sm={12} xs={12} >
                            <Tooltip title='Projeto'>
                              <Typography fontWeight={'bold'} variant="h5">
                                {proj.name.value}
                              </Typography>
                            </Tooltip>
                          </Grid>

                          <Grid container md={6} sm={6} xs={6} pb={0.5} >
                            <Tooltip title='Cliente'>
                              <Typography variant='subtitle1' ><a style={{ fontWeight: 'bold' }}>Cliente: </a>{proj?.client.user?.first_name} {proj?.client.user?.last_name}</Typography>
                            </Tooltip>
                          </Grid>
                          <Grid container md={6} sm={6} xs={6} justifyContent={'end'}>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              </>;
            })}
        </Grid>
      </Grid>
    </Grid>
    <Footer/>

  </>;
};

export default PackingList;
