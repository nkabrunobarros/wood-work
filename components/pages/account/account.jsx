//  Nodes
import { Tooltip, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Mail, Map, Phone, User } from 'lucide-react';
import React from 'react';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
//  Proptypes
import PropTypes from 'prop-types';

const Account = ({ ...props }) => {
  const { user, breadcrumbsPath } = props;

  function displayShift (value) {
    switch (JSON.stringify(value)) {
    case '[1,2]': return 'Manhã';
    case '[2,3]': return 'Tarde';
    case '[3,4]': return 'Noite';
    default: return 'Nenhum';
    }
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Grid id='pad'>
          <Grid container md={12} sm={12} sx={12}>
            <Typography variant='title'>{user?.givenName?.value} {user?.familyName?.value}</Typography>
          </Grid>
          <Grid container md={12} sm={12} sx={12} pt={2}>
            <User /> Informações Gerais
          </Grid>
          <Grid container md={12} sm={12} sx={12} pt={2}>
            <Grid container md={6} sm={12} xs={12}>
              <Grid container sx={12}>
                <Grid xs={12} sm={6} container p={2} bgcolor={'lightGray.main'}>
                  <Grid item xs={12} pt={1} className='flex'>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography color='lightTextSm.main'>Nome:</Typography>
                    </Grid>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography color='lightTextSm.black'>{user?.name?.value}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} pt={1} className='flex'>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography color='lightTextSm.main'>Nif:</Typography>
                    </Grid>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography color='lightTextSm.black'>{user?.taxId?.value}</Typography>
                    </Grid>
                  </Grid>
                  {user.type === 'Worker' &&
                  <Grid item xs={12} pt={1} className='flex'>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography color='lightTextSm.main'>Turno:</Typography>
                    </Grid>
                    <Grid container md={3} sm={2} xs={2}>
                      <Typography item color='lightTextSm.black'>{displayShift(user?.workerShift?.value)}</Typography>
                    </Grid>
                  </Grid>
                  }
                </Grid>
                <Grid xs={12} sm={6} container p={2} spacing={2}>
                  <Grid container item>
                    <Grid className='fullCenter' container md={2} sm={2} xs={2} >

                      <Tooltip title='Email'>
                        <a href={`mailto:${user?.email?.value}`}>
                          <Mail className='primaryIcon' size={22} />
                        </a>
                      </Tooltip>
                    </Grid>
                    <Grid alignItems={'center'} container md={10} sm={10} xs={10} >
                      {user?.email?.value}
                    </Grid>
                  </Grid>
                  <Grid container item>
                    <Grid className='fullCenter' container md={2} sm={2} xs={2} >
                      <Tooltip title='Contacto'>
                        <a href={`tel:${user?.cellphone?.value}`}>
                          <Phone className='primaryIcon' size={22} />
                        </a>
                      </Tooltip>

                    </Grid>
                    <Grid alignItems={'center'} container md={10} sm={10} xs={10} >
                      {user?.cellphone?.value}
                    </Grid>
                  </Grid>
                  <Grid container item>
                    <Grid className='fullCenter' container md={2} sm={2} xs={2} >
                      <Tooltip title='Morada'>
                        <Map className='primaryIcon' size={22} />
                      </Tooltip>
                    </Grid>
                    <Grid container md={10} sm={10} xs={10} >
                      <Typography >
                        {user.address?.value?.streetAddress + ', '}
                        {user.address?.value?.postalCode + ', '}
                        {user.address?.value?.addressLocality + ', '}
                        {user.address?.value?.addressRegion + ', '}
                        {user.address?.value?.addressCountry}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Grid>
  );
};

Account.propTypes = {
  user: PropTypes.object,
  breadcrumbsPath: PropTypes.object
};

export default Account;
