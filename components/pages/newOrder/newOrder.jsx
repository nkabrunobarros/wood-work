/* eslint-disable react/prop-types */
//  Nodes
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

import styles from '../../../styles/NewOrder.module.css';

const Profile = ({ ...props }) => {
  const { breadcrumbsPath } = props;
  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>hi</Content>
    </Grid>
  );
};
export default Profile;
