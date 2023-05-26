import { Grid, Typography } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as permissionsActionsRedux from '../../../store/actions/profile';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import CustomBreadcrumbs from '../../breadcrumbs/breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';
import PropTypes from 'prop-types';

const ProfilesScreen = (props) => {
  const { breadcrumbsPath, permissions, headCells } = props;
  const dispatch = useDispatch();
  const deleteProfile = (data) => dispatch(permissionsActionsRedux.deleteProfile(data));

  async function onDelete (props) {
    const loading = toast.loading('');

    await deleteProfile(props).then(() => {
      ToastSet(loading, 'Perfil Apagado.', 'success');
      Router.push(routes.private.internal.profiles);
    }).catch((err) => {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
      console.log(err);
    });
  }

  return <>
    <Navbar />
    <Notification />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Grid id='pad' md={12} container justifyContent={'space-between'}>
          <Typography variant='title'>Perfis</Typography>
          <PrimaryBtn text={'Adicionar'} hidden={!CanDo('add_profile')}
            onClick={() => Router.push(routes.private.internal.newProfile)} />
        </Grid>
        <AdvancedTable
          rows={permissions}
          headCells={headCells}
          onDelete={onDelete}
          editRoute={routes.private.internal.editProfile}
          clickRoute={routes.private.internal.profile}
        />
      </Content>
    </Grid>
    <Footer />
  </>;
};

ProfilesScreen.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
  breadcrumbsPath: PropTypes.any,
  permissions: PropTypes.any,
};

export default ProfilesScreen;
