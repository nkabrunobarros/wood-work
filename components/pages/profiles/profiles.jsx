/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as permissionsActionsRedux from '../../../store/actions/profile';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import CustomBreadcrumbs from '../../breadcrumbs/breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
// import MySelect from '../../inputs/select';
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';

const ProfilesScreen = (props) => {
  const { breadcrumbsPath, headCells } = props;
  // const [newResource, setNewResource] = useState({ name: '', codename: '' });
  const [profiles, setProfiles] = useState(props.permissions);

  const [filters, setFilters] = useState({
    id: ''
  });

  // const [resources, setResources] = useState([...props.resources].sort((a, b) => (a.name > b.name) ? 1 : -1));
  const dispatch = useDispatch();
  const deleteProfile = (data) => dispatch(permissionsActionsRedux.deleteProfile(data));
  // const deleteResource = (data) => dispatch(permissionsActionsRedux.deleteResource(data));
  // const updateResource = (data) => dispatch(permissionsActionsRedux.updateResource(data));
  // const newResourceFunc = (data) => dispatch(permissionsActionsRedux.newResource(data));

  async function onDelete (props) {
    const loading = toast.loading('');

    await deleteProfile(props).then(() => {
      ToastSet(loading, 'Perfil Apagado.', 'success');

      const old = [...profiles];
      const index = old.findIndex((item) => item.id === props);

      if (index !== -1) {
        const updatedItems = [...old];

        updatedItems.splice(index, 1);
        setProfiles(updatedItems);
        ToastSet(loading, 'Perfil apagado.', 'success');
      }
    }).catch((err) => {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
      console.log(err);
    });
  }

  // function onResourceChange (props) {
  //   const { newValue, field, index } = props;
  //   const newArray = [...resources]; // Create a copy of the original array

  //   if (index >= 0 && index < newArray.length) {
  //     const updatedItem = { ...newArray[index] }; // Create a copy of the item at the specified index

  //     updatedItem[field] = newValue; // Update the specified field with the new value
  //     newArray[index] = updatedItem; // Replace the item in the new array with the updated item
  //   }

  //   setResources(newArray);
  // }

  // async function handleResourceUpdate () {
  //   resources.map(async (resource) => {
  //     await updateResource({ id: resource.id, data: { name: resource.name, codename: resource.codename } }).then(res => console.log(res.data)).catch((err) => console.log(err));
  //   });
  // }

  // async function onResourceDelete (props) {
  //   await deleteResource(props).then(res => console.log(res.data)).catch((err) => console.log(err));
  // }

  // async function handleCreate () {
  //   resources.map(async (ele) => {
  //     if (ele.codename.includes('change_')) {
  //       const qs = require('qs');
  //       const data = qs.stringify({ name: ele.name, codename: ele.codename.replace('change_', 'update_') });

  //       await newResourceFunc({ data }).then(res => console.log(res.data)).catch((err) => console.log(err));
  //     }
  //   });
  // }

  // async function handleNewResource () {
  //   const qs = require('qs');
  //   const data = qs.stringify({ ...newResource });

  //   await newResourceFunc({ data }).then(res => {
  //     console.log(res.data);
  //   }).catch((err) => console.log(err));
  // }

  function ClearFilters () {
    setFilters({ id: '' });
  }

  return <>
    <Navbar />
    <Notification />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Grid id='pad' container md={12}>
          <Grid container md={12}>
            <Typography variant="titlexs">Filtros</Typography>
          </Grid>
          <Grid container md={4}>
            <MyInput value={filters.name} label='Nome' onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
            {/* <MySelect value={filters.id} label='Nome' options={profiles.sort((a, b) => (a.name > b.name) ? 1 : -1)} optionLabel='name' onChange={(e) => setFilters({ ...filters, id: e.target.value })} /> */}
          </Grid>
          <Grid container md={12} justifyContent={'end'}>
            <PrimaryBtn light text={'Limpar'} onClick={ClearFilters} />
          </Grid>
        </Grid>
      </Content>
      <Content>
        <Grid id='pad' md={12} container justifyContent={'space-between'}>
          <Typography variant='title'>Perfis</Typography>
          <PrimaryBtn text={'Adicionar'} hidden={!CanDo('add_profile')}
            onClick={() => Router.push(routes.private.internal.newProfile)} />
        </Grid>
        <AdvancedTable
          rows={profiles}
          headCells={headCells}
          filters={filters}
          onDelete={CanDo('delete_profile') && onDelete}
          editRoute={CanDo('update_profile') && routes.private.internal.editProfile}
          clickRoute={CanDo('see_profile') && routes.private.internal.profile}
        />

        {/* {false && <Grid container md={4} sm={12} xs={12} pb={10}>
          <PrimaryBtn text={'Create'} onClick={() => handleCreate()} />
          <PrimaryBtn text={'Guardar'} onClick={() => handleNewResource()} />
          <MyInput
            label={'Name'}
            value={newResource.name}
            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
          />
          <MyInput
            label={'codename'}
            value={newResource.codename}
            onChange={(e) => setNewResource({ ...newResource, codename: e.target.value })}
          />

        </Grid>}
        {false && <Grid container md={12} sm={12} xs={12}>
          <PrimaryBtn text={'Guardar'} onClick={() => handleResourceUpdate()} />
          {[...resources]?.map((resource, index) => {
            return <Grid container key={resource.id}>
              <Grid container md={4} sm={12} xs={12}>
                <MyInput onChange={(e) => onResourceChange({ newValue: e.target.value, field: 'name', index })} label='name' value={resource.name} />
              </Grid>
              <Grid container md={4} sm={12} xs={12}>
                <MyInput onChange={(e) => onResourceChange({ newValue: e.target.value, field: 'codename', index })} label='codename' value={resource.codename} />
              </Grid>
              <Grid container md={4} sm={12} xs={12}>
                <PrimaryBtn text={'Remove'} onClick={() => onResourceDelete(resource.id)} />
              </Grid>
            </Grid>;
          })}
        </Grid>} */}
      </Content>
    </Grid>
    <Footer />
  </>;
};

export default ProfilesScreen;
