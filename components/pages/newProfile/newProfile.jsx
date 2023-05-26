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
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import ToastSet from '../../utils/ToastSet';

const NewProfileScreen = (props) => {
  const { breadcrumbsPath, pageProps, resources } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const [permission, setPermission] = useState({
    name: '',
    listPermissions: props.permissionsMap
  });

  const dispatch = useDispatch();
  const newProfile = (data) => dispatch(permissionsActionsRedux.newProfile(data));
  const updateProfile = (data) => dispatch(permissionsActionsRedux.updateProfile(data));

  function onDelete () {

  }

  const headCells = [
    { key: 'key', label: 'Opção' },
    { key: 'access', label: 'Acesso' },
    { key: 'list', label: 'Listar' },
    { key: 'view', label: 'Visualizar' },
    { key: 'add', label: 'Criar' },
    { key: 'change', label: 'Editar' },
    { key: 'delete', label: 'Apagar' },
  ];

  const cellWidth = 12 / (Object.keys(headCells).length);

  async function handleSave () {
    const loading = toast.loading('');
    const stringValues = [];

    for (const type in permission.listPermissions) {
      const permissions = permission.listPermissions[type];

      for (const action in permissions) {
        const value = permissions[action];

        if (typeof value === 'string') {
          stringValues.push(value);
        }
      }
    }

    const data = {
      name: 'teste2',
      permissions: stringValues,
    };

    const qs = require('qs');
    const data1 = qs.stringify({ ...data });

    await newProfile(data1)
      .then(async (res) => {
        await updateProfile({ id: res.data.id, data }).then(() => {
          ToastSet(loading, 'Criado!', 'success');
          Router.push(routes.private.internal.profile + res.data.id);
        });
      }).catch(() => {
        ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde', 'error');
      });
  }

  function handleCheckboxClick ({ newValue, perm, type }) {
    setPermission({
      ...permission,
      listPermissions: {
        ...permission.listPermissions,
        [perm]: {
          ...permission.listPermissions[perm],
          [type]: newValue ? resources.find(ele => ele.codename === type + '_' + perm)?.id : false
        }
      }
    });
  }

  return <>
    <ConfirmDialog
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      onConfirm={() => onDelete()}
      message={'Está prestes a apagar uma permissão o que é irreversivel, tem certeza que quer continuar?'}
    />
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
          {Object.keys(permission.listPermissions).map((perm, rowIndex) => {
            return headCells.map((cell, index) => {
              return <Grid key={cell.label} container alignItems='center' p={0} bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
                md={cellWidth}
                sm={cellWidth}
                xs={cellWidth}>
                {index === 0
                  ? <Typography pl={2} variant='subtitle2'>{perm}</Typography>
                  : <Checkbox
                    checked={!!permission.listPermissions[perm][cell.key]}
                    onChange={(e) => handleCheckboxClick({ newValue: e.target.checked, perm, type: cell.key })} />
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

NewProfileScreen.propTypes = {
  breadcrumbsPath: PropTypes.arrayOf(PropTypes.object).isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageProps: PropTypes.any,
  permission: PropTypes.any,
  permissionsMap: PropTypes.any,
};

export default NewProfileScreen;
