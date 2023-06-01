import { ButtonGroup, Checkbox, Grid, Typography } from '@mui/material';
import { Save, X } from 'lucide-react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as permissionsActionsRedux from '../../../store/actions/profile';
import CustomBreadcrumbs from '../../breadcrumbs/breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import MyInput from '../../inputs/myInput';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const EditProfileScreen = (props) => {
  const { breadcrumbsPath, pageProps, resources } = props;
  const [permission, setPermission] = useState(props.permission);
  const [permissionName, setPermissionName] = useState({ value: props.permission.name, error: '' });
  const dispatch = useDispatch();
  const updateProfile = (data) => dispatch(permissionsActionsRedux.updateProfile(data));

  const headCells = [
    { key: 'key', label: 'Recurso' },
    { key: 'list', label: 'Listar' },
    { key: 'see', label: 'Visualizar' },
    { key: 'create', label: 'Criar' },
    { key: 'update', label: 'Editar' },
    { key: 'delete', label: 'Apagar' },
  ];

  const cellWidth = 12 / (Object.keys(headCells).length);

  async function handleSave () {
    if (!permissionName.value) {
      setPermissionName({ ...permissionName, error: 'Campo obrigatório' });
      toast.error('Preencha todos os campos.');

      return;
    }

    const loading = toast.loading('');
    const stringValues = [];

    for (const type in permission.listPermissions) {
      const permissions = permission.listPermissions[type];

      for (const action in permissions) {
        if (action !== 'view') {
          const value = permissions[action];

          if (typeof value === 'string') {
            stringValues.push(value);
          }
        }
      }
    }

    for (const type in permission.listPermissions) {
      const permissions = permission.listPermissions[type];

      switch (type) {
      case 'Projetos': {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_expedition');
          resourcesRequired.add('view_assembly');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_project');
        }

        if (permissions.see) {
          resourcesRequired.add('view_expedition');
          resourcesRequired.add('view_assembly');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_furniture');
          resourcesRequired.add('view_workerTask');
          resourcesRequired.add('see_budget');
        }

        if (permissions.update) {
          resourcesRequired.add('change_expedition');
          resourcesRequired.add('change_assembly');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_project');
          resourcesRequired.add('change_budget');
          resourcesRequired.add('change_project');
          resourcesRequired.add('update_budget');
          resourcesRequired.add('change_furniture');
          //
          resourcesRequired.add('change_consumable');
        }

        if (permissions.create) {
          resourcesRequired.add('add_project');
          resourcesRequired.add('add_budget');
          resourcesRequired.add('add_furniture');
          resourcesRequired.add('add_expedition');
          resourcesRequired.add('add_assembly');
          resourcesRequired.add('view_owner');
        }

        if (permissions.delete) {
          resourcesRequired.add('delete_budget');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Projetos Similares': {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_expedition');
          resourcesRequired.add('view_assembly');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_furniture');
          resourcesRequired.add('view_workerTask');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Stocks': {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_leftover');
          resourcesRequired.add('view_stock');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Máquinas': {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_machine');
        }

        if (permissions.see) {
          resourcesRequired.add('view_machine');
          resourcesRequired.add('view_workerTask');
          resourcesRequired.add('view_worker');
        }

        if (permissions.update) {
          resourcesRequired.add('change_machine');
          resourcesRequired.add('view_machine');
        }

        if (permissions.create) {
          resourcesRequired.add('view_organization');
          resourcesRequired.add('add_machine');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Chão de Fábrica': {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_machine');
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_furniture');
        }

        if (permissions.see) {
          resourcesRequired.add('view_machine');
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('view_furniture');
          resourcesRequired.add('view_workerTask');
          resourcesRequired.add('view_part');
          resourcesRequired.add('view_consumable');
        }

        if (permissions.create) {
          resourcesRequired.add('add_workerTask');
          resourcesRequired.add('change_workerTask');
          resourcesRequired.add('change_machine');
          resourcesRequired.add('change_part');
          resourcesRequired.add('change_project');
          resourcesRequired.add('add_factory');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Montagens' : {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_module');
          resourcesRequired.add('add_module');
        }

        if (permissions.create) {
          resourcesRequired.add('change_module');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Embalamentos' : {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_budget');
        }

        if (permissions.create) {
          resourcesRequired.add('view_part');
          resourcesRequired.add('view_project');
          resourcesRequired.add('view_budget');
          resourcesRequired.add('add_package');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Clientes' : {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_owner');
          resourcesRequired.add('list_client');
        }

        if (permissions.see) {
          resourcesRequired.add('view_owner');
          resourcesRequired.add('see_client');
        }

        if (permissions.create) {
          resourcesRequired.add('add_owner');
          resourcesRequired.add('add_client');
          resourcesRequired.add('view_organization');
        }

        if (permissions.update) {
          resourcesRequired.add('change_owner');
          resourcesRequired.add('change_client');
          resourcesRequired.add('view_organization');
        }

        if (permissions.delete) {
          resourcesRequired.add('delete_owner');
          resourcesRequired.add('delete_client');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }

      case 'Utilizadores' : {
        const resourcesRequired = new Set();

        if (permissions.list) {
          resourcesRequired.add('view_worker');
          resourcesRequired.add('view_group');
        }

        if (permissions.see) {
          resourcesRequired.add('view_owner');
        }

        if (permissions.create) {
          resourcesRequired.add('add_worker');
          resourcesRequired.add('add_owner');
          resourcesRequired.add('add_client');
          resourcesRequired.add('view_organization');
        }

        if (permissions.update) {
          resourcesRequired.add('change_worker');
          resourcesRequired.add('view_organization');
        }

        if (permissions.delete) {
          resourcesRequired.add('delete_owner');
          resourcesRequired.add('delete_client');
        }

        resourcesRequired.forEach(codename => {
          const resource = resources.find(ele => ele.codename === codename);

          if (resource && !stringValues.includes(resource.id)) {
            stringValues.push(resource.id);
          }
        });

        break;
      }
      }
    }

    const data = {
      name: permissionName.value,
      permissions: stringValues,
    };

    await updateProfile({ id: permission.id, data })
      .then((res) => {
        ToastSet(loading, 'Atualizado.', 'success');
        Router.push(routes.private.internal.profile + res.data.id);
      }).catch(() => {
        ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde', 'error');
      });
  }

  function handleCheckboxClick ({ newValue, perm, type }) {
    const thisPermKey = resources.find(ele => ele.name === perm).codename.split('_')[1];

    setPermission({
      ...permission,
      listPermissions: {
        ...permission.listPermissions,
        [perm]: {
          ...permission.listPermissions[perm],
          [type]: newValue ? resources.find(ele => ele.codename === type + '_' + thisPermKey)?.id : false
        }
      }
    });
  }

  return <>
    <Navbar />
    <Notification />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Grid container id='pad' md={12} justifyContent={'space-between'} >
          <Typography variant='title'>{breadcrumbsPath[1].title}</Typography>
          <ButtonGroup>
            <PrimaryBtn
              text='Guardar'
              icon={
                <Save
                  strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                  size={pageProps?.globalVars?.iconSize}
                />
              }
              onClick={handleSave}
            />
            <PrimaryBtn
              text='Cancelar'
              icon={
                <X
                  strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                  size={pageProps?.globalVars?.iconSize}
                />
              }
              light
              onClick={() => Router.back()}
            />
          </ButtonGroup>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          <Grid container md={4} sm={6} xs={12} p={1}>
            <MyInput label='Nome' required value={permissionName.value} error={permissionName.error} onChange={(e) => setPermissionName({ ...permission, value: e.target.value, error: '' })}/>
          </Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {/* Header */}
          <Grid container md={12} sm={12} xs={12} bgcolor={'primary.main'} color='white'>
            {headCells.map((cell) => {
              return <Grid key={cell.label} container alignItems='center' p={2}
                md={cellWidth}
                sm={cellWidth}
                xs={cellWidth}>
                {cell.label}
              </Grid>;
            })}
          </Grid>
          {Object.keys(permission.listPermissions).sort((a, b) => (a > b) ? 1 : -1).map((perm, rowIndex) => {
            return headCells.map((cell, index) => {
              return <Grid key={cell.label} container alignItems='center' p={0} bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
                md={cellWidth}
                sm={cellWidth}
                xs={cellWidth}>
                {index === 0
                  ? <Typography pl={2} variant='subtitle2'>{perm}</Typography>
                  : <>
                    {/* {cell.key}_{perm} */}
                    {resources.find(ele => ele.codename === `${cell.key}_${resources.find(ele => ele.name === perm).codename.split('_')[1]}`) && <Checkbox
                      checked={!!permission.listPermissions[perm][cell.key]}
                      onChange={(e) => handleCheckboxClick({ newValue: e.target.checked, perm, type: cell.key })} />}
                  </>
                }
              </Grid>;
            });
          })}
        </Grid>
      </Content>
    </Grid>
    <Footer />
  </>;
};

EditProfileScreen.propTypes = {
  breadcrumbsPath: PropTypes.arrayOf(PropTypes.object).isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageProps: PropTypes.any,
  permission: PropTypes.any,
};

export default EditProfileScreen;
