//  Nodes
import {
  Box, ButtonGroup, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Edit, Trash } from 'lucide-react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as machinesActionsRedux from '../../../store/actions/machine';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';

const MachineScreen = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, machine } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteMachine = (data) => dispatch(machinesActionsRedux.deleteMachine(data));

  async function onDelete () {
    const loading = toast.loading('');

    await deleteMachine(machine.id).then(() => {
      ToastSet(loading, 'Máquina Apagada.', 'success');
      Router.push(routes.private.internal.machines);
    }).catch((err) => {
      ToastSet(loading, 'Algo aconteceu. Por favor tente mais tarde.', 'error');
      console.log(err);
    });
  }

  return (
    <>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDelete()}
        message={'Está prestes a apagar uma máquina o que é irreversivel, tem certeza que quer continuar?'}
      />
      <Navbar />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <Notification />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Grid id='pad' md={12} sm={12} xs={12} >
            <Grid container md={12} justifyContent={'space-between'} alignItems={'center'} >
              <Box >
                <Box id='align'>
                  <Typography variant='title'>{breadcrumbsPath[1].title}</Typography>
                  <Box pl={2} display='flex' alignItems='center'>
                    {machine.currentlyOn?.value && <Typography variant='sm' className="packingBalloon">Em utilização</Typography>}
                    {!machine.currentlyOn?.value && <Typography variant='sm' className="successBalloon">Disponível</Typography>}
                  </Box>
                </Box>
              </Box>
              <ButtonGroup>
                <PrimaryBtn
                  text='Editar'
                  hidden={!CanDo('change_machine')}
                  icon={
                    <Edit
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth || 1}
                      size={pageProps?.globalVars?.iconSize || 20}
                    />
                  }
                  onClick={() => Router.push(routes.private.internal.editMachine + machine.id)}
                />
                <PrimaryBtn
                  text='Apagar'
                  hidden={!CanDo('delete_machine')}
                  onClick={() => setDialogOpen(true)}
                  icon={
                    <Trash
                      strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth || 1}
                      size={pageProps?.globalVars?.iconSize || 20}
                    />
                  }
                  light
                />
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid id='pad' md={12} sm={12} xs={12} container>
            <Grid item md={6} sm={6} xs={12} pb={1} pt={1} >
              <Typography item variant="subtitle2"color='lightTextSm.main'>Tipo</Typography>
              <Typography item variant="subtitle2"color='lightTextSm.black' >{machine?.machineType?.value }</Typography>
            </Grid>
          </Grid>
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

MachineScreen.propTypes = {
  breadcrumbsPath: PropTypes.arrayOf(PropTypes.object).isRequired,
  machine: PropTypes.object.isRequired,
  pageProps: PropTypes.any,
};

export default MachineScreen;
