//  Nodes
import { Tooltip, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Mail, User } from 'lucide-react';
import React from 'react';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
//  Proptypes
import PropTypes from 'prop-types';

const Account = ({ ...props}) => {
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
                <Typography className='headerTitleXl'>{user?.givenName?.value} {user?.familyName?.value}</Typography>
              </Grid>
              <Grid container md={12} sm={12} sx={12} pt={2}>
                <User /> Informações Gerais
              </Grid>
              <Grid container md={12} sm={12} sx={12} pt={2}>
                <Grid container md={6} sm={12} xs={12}>
                  <Grid container sx={12}>
                    <Grid xs={12} sm={6} container p={2} bgcolor={"lightGray.main"}>
                      <Grid item xs={12} pt={1} className='flex'>
                        <Grid container md={3} sm={2} xs={2}>
                          <Typography color='lightTextSm.main'>Nome:</Typography>
                        </Grid>
                        <Grid container md={3} sm={2} xs={2}>
                          <Typography color='lightTextSm.black'>{user?.givenName?.value}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} pt={1} className='flex'>
                        <Grid container md={3} sm={2} xs={2}>
                          <Typography color='lightTextSm.main'>Apelido:</Typography>
                        </Grid>
                        <Grid container md={3} sm={2} xs={2}>
                          <Typography color='lightTextSm.black'>{user?.familyName?.value}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} pt={1} className='flex'>
                        <Grid container md={3} sm={2} xs={2}>
                          <Typography color='lightTextSm.main'>Turno:</Typography>
                        </Grid>
                        <Grid container md={3} sm={2} xs={2}>
                        <Typography item color='lightTextSm.black'>{displayShift(user?.workerShift?.value)}</Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Typography item color='lightTextSm.main'>Perfil de Utilizador </Typography>
                        <Typography item color='lightTextSm.black'>{user?.profile?.object?.description}</Typography>
                      </Grid> */}
                    </Grid>
                    <Grid xs={12} sm={6} container p={2} spacing={2}>
                      <Grid container item>
                        <Tooltip title='Email'>
                          <a href={`mailto:${user?.email?.value}`}>
                            <Mail className='primaryIcon' size={22} />
                          </a>
                        </Tooltip>
                        <span>
                          {user?.email?.value}
                        </span>
                      </Grid>
                      {/* <Grid container item>
                        <Tooltip title='telemovel'>
                          <a href={`tel:${user?.telemovel?.value}`}>
                            <Smartphone className='primaryIcon' size={22} />
                          </a>
                        </Tooltip>
                        <span>
                          {user?.telemovel?.value}
                        </span>
                      </Grid>
                      <Grid container item>
                        <Tooltip title='Telefone'>
                          <a href={`tel:${user?.telefone?.value}`}>
                            <Phone className='primaryIcon' size={22} />
                          </a>
                        </Tooltip>
                        <span>
                          {user?.telefone?.value}
                        </span>
                      </Grid>
                      <Grid container item>
                        <Tooltip title='Pais'>
                          <Flag className='primaryIcon' size={22} />
                        </Tooltip>
                        <span>
                          pais
                        </span>
                      </Grid> */}
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