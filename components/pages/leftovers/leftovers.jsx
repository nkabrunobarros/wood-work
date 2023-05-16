/* eslint-disable react/jsx-props-no-spreading */
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import tabuas from '../../../public/Tabuas.jpeg';
import CustomBreadcrumbs from '../../breadcrumbs/breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import MyInput from '../../inputs/myInput';
import Navbar from '../../layout/navbar/navbar';
import Canvas from './Canvas';

const Leftovers = (props) => {
  // eslint-disable-next-line react/prop-types
  const { breadcrumbsPath } = props;

  return <>
    <Navbar />
    <Grid component='main'sx={{ padding: '0rem 2rem 0rem 2rem' }} >
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Grid id={'pad'} container md={12} sm={12} xs={12}>
          {/* Title */}
          <Grid container md={12} sm={12} xs={12}><Typography variant='title'>Novo Sobrante</Typography></Grid>
          {/* Content */}
          <Grid container md={12} sm={12} xs={12}>
            <Grid container md={9} sm={9} xs={9} >
              <Canvas />
              {false && <Image src={tabuas} />}
            </Grid>
            <Grid container md={3} sm={3} xs={3} >
              <Box>
                <Grid container md={12} sm={12} xs={12} pt={3}>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2' color={'primary'} >Material</Typography></Grid>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2'>Madeira</Typography></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12} pt={3}>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2' color={'primary'} >Largura</Typography></Grid>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2'>1530mm</Typography></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12} pt={3}>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2' color={'primary'} >Comprimento</Typography></Grid>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2'>1000mm</Typography></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12} pt={3}>
                  <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2' color={'primary'} >Espessura</Typography></Grid>
                  <Grid container md={12} sm={12} xs={12}><MyInput type='number' /></Grid>
                </Grid>
                <Grid container md={12} sm={12} xs={12} pt={3}>
                  <PrimaryBtn text={'Guardar'} />
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Grid>
  </>;
};

export default Leftovers;
