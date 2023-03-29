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
import Navbar from '../../layout/navbar/navbar';

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

  console.log(user);

  return (
    <>
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }} >
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Grid id='pad'>
            <Grid container md={12} sm={12} sx={12}>
              <Typography variant='title'>{user?.givenName?.value || user.first_name || user.username} {user?.familyName?.value || user.last_name}</Typography>
            </Grid>
            <Grid container md={12} sm={12} sx={12} pt={2}>
              <User /> Informações Gerais
            </Grid>
            <Grid container md={12} sm={12} sx={12} pt={2}>
              <Grid container md={8} sm={12} xs={12}>
                <Grid container sx={12}>
                  <Grid xs={12} sm={6} container p={2} bgcolor={'lightGray.main'}>
                    <Grid item md={12} sm={12} xs={12} pt={1} className='flex'>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.main'>Nome de utilizador:</Typography>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.black'>{user?.user?.username || user?.username}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} pt={1} className='flex'>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.main'>Primeiro nome:</Typography>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.black'>{user?.user?.first_name || user?.first_name}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} pt={1} className='flex'>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.main'>Ultimo nome:</Typography>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.black'>{user?.user?.last_name || user?.last_name}</Typography>
                      </Grid>
                    </Grid>
                    { user?.user?.vat && <Grid item xs={12} pt={1} className='flex'>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.main'>Nif:</Typography>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.black'>{user?.user?.vat}</Typography>
                      </Grid>
                    </Grid>}
                    {user?.isCompany && <Grid item xs={12} pt={1} className='flex'>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.main'>Tipo conta:</Typography>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6}>
                        <Typography color='lightTextSm.black'>{user?.isCompany?.value ? 'Empresarial' : 'Particular'}</Typography>
                      </Grid>
                    </Grid>}
                    {user.type === 'Worker' &&
                  <Grid item xs={12} pt={1} className='flex'>
                    <Grid container md={6} sm={6} xs={6}>
                      <Typography color='lightTextSm.main'>Turno:</Typography>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6}>
                      <Typography item color='lightTextSm.black'>{displayShift(user?.workerShift?.value)}</Typography>
                    </Grid>
                  </Grid>
                    }
                  </Grid>
                  <Grid xs={12} sm={6} container p={2} spacing={2}>
                    <Grid container item>
                      <Grid className='fullCenter' container md={2} sm={2} xs={2} >
                        <Tooltip title='Email'>
                          <a href={`mailto:${user?.email?.value || user?.email}`}>
                            <Mail className='primaryIcon' size={22} />
                          </a>
                        </Tooltip>
                      </Grid>
                      <Grid alignItems={'center'} container md={10} sm={10} xs={10} >
                        {user?.email?.value || user?.email}
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid className='fullCenter' container md={2} sm={2} xs={2} >
                        <Tooltip title='Contacto'>
                          <a href={`tel:${user?.telephone?.value}`}>
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
                        <Typography sx={{ display: !user.address && 'none' }}>
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
    </>
  );
};

Account.propTypes = {
  user: PropTypes.object,
  breadcrumbsPath: PropTypes.object
};

export default Account;
