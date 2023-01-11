import { Forward, Tag } from 'lucide-react';
import React, { useState } from 'react';
import PrimaryBtn from '../../../buttons/primaryBtn';

//  PropTypes
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import routes from '../../../../navigation/routes';
import * as ProjectActions from '../../../../pages/api/actions/project';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import IsInternal from '../../../utils/IsInternal';
import ToastSet from '../../../utils/ToastSet';

const Head = (props) => {
  const { order, pageProps, setOrder } = props;
  const [changeToProdModal, setChangeToProdModal] = useState(false);
  const [changeToAssemblyModal, setChangeToAssemblyModal] = useState(false);
  const [changeToTransportModal, setChangeToTransportModal] = useState(false);
  const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).profile.object.description);

  const upperCells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    backgroundColor: '#F9F9F9',
    border: '1px solid',
    borderColor: 'divider',
    textAlign: 'center'
  };

  const cells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    border: '1px solid',
    borderColor: 'divider',
  };

  async function handleChangeToProd (props) {
    setChangeToProdModal(false);

    const processing = toast.loading('');

    const updatedOrder = {
      id: order.id,
      type: order.type,
      status: { value: `in ${props}`, type: 'Property' },
    };

    try {
      await ProjectActions.updateProject([updatedOrder]).then(() => {
        setOrder({ ...order, status: { type: 'Property', value: `in ${props}` } });
        setChangeToProdModal(false);
        setChangeToAssemblyModal(false);
        setChangeToTransportModal(false);
        ToastSet(processing, `Projeto passou a ${props === 'production' ? 'produção' : (props === 'testing' ? 'montagem' : 'transporte')}`, 'success');
      });
    } catch (err) { console.log(err); }
  }

  return <Box id='pad'>
    <Notification />
    <ConfirmDialog
      open={changeToProdModal}
      handleClose={() => setChangeToProdModal(false)}
      onConfirm={() => handleChangeToProd('production')}
      message={'Está prestes a passar este projeto para produção. Tem a certeza que quer continuar?'}
    />
    <ConfirmDialog
      open={changeToAssemblyModal}
      handleClose={() => setChangeToAssemblyModal(false)}
      onConfirm={() => handleChangeToProd('testing')}
      message={'Está prestes a passar este projeto para montagem. Tem a certeza que quer continuar?'}
    />
    <ConfirmDialog
      open={changeToTransportModal}
      handleClose={() => setChangeToTransportModal(false)}
      onConfirm={() => handleChangeToProd('transport')}
      message={'Está prestes a passar este projeto para transporte. Tem a certeza que quer continuar?'}
    />
    <Box style={{ display: 'flex', marginBottom: '1rem' }}>
      <Typography variant='title'> {internalPOV ? 'Projeto' : 'Encomenda'} {order.name.value}</Typography>
      <Box pl={2} sx={{ display: !internalPOV && 'none' }}>
        {order.status?.value === 'in drawing' && <Typography className='successBalloon'>Em desenho</Typography>}
        {order.status?.value === 'in production' && <Typography className='warningBalloon'>Em produção</Typography>}
        {order.status?.value === 'in testing' && <Typography className='infoBalloon'>Em montagem</Typography>}
        {order.status?.value === 'in transport' && <Typography className='alertBalloon'>Em transporte</Typography>}
      </Box>
      <Box style={{ marginLeft: 'auto' }}>
        <PrimaryBtn
          text='Gerar Etiquetas'
          hidden={!(internalPOV && order.status.value === 'in production')}
          icon={ <Tag strokeWidth={pageProps.globalVars.iconStrokeWidth} size={pageProps.globalVars.iconSize} /> } />
        <PrimaryBtn
          text='Passar a produção'
          onClick={() => setChangeToProdModal(true) }
          hidden={!(internalPOV && order.status.value === 'in drawing')}
          icon={ <Forward strokeWidth={pageProps.globalVars.iconStrokeWidth} size={pageProps.globalVars.iconSize} /> } />
        <PrimaryBtn
          text='Passar a montagem'
          onClick={() => setChangeToAssemblyModal(true) }
          hidden={!(internalPOV && order.status.value === 'in production')}
          icon={ <Forward strokeWidth={pageProps.globalVars.iconStrokeWidth} size={pageProps.globalVars.iconSize} /> }
          sx={{ marginLeft: 1 }}
        />
        <PrimaryBtn
          text='Passar a transporte'
          onClick={() => setChangeToTransportModal(true) }
          hidden={!(internalPOV && order.status.value === 'in testing')}
          icon={ <Forward strokeWidth={pageProps.globalVars.iconStrokeWidth} size={pageProps.globalVars.iconSize} /> }
          sx={{ marginLeft: 1 }}
        />
      </Box>
    </Box>
    {internalPOV
      ? (
        <Grid container md={12}>
          <Grid md={4} container>
            <Grid md={12} sm={6}>
              <Box style={{ width: 'fit-content' }}>
                <Typography color={'lightTextSm.main'} >Cliente</Typography>
                <Tooltip title='Ver cliente'>
                  <a href={routes.private.internal.client + order.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                    <Typography color={'primary.main'}>{order.orderBy?.object?.legalName?.value}</Typography>
                  </a>
                </Tooltip>
              </Box>
            </Grid>
            <Grid md={12} sm={6}>
              <Typography color={'lightTextSm.main'} >Observações</Typography>
              <Typography color={'lightTextSm.black'} >{order.budgetId.object.obs.value || 'Não tem observações.'}</Typography>
            </Grid>
          </Grid>
          <Grid container md={8} p={1} >
            <Grid container md={12} sm={12} xs={12} >
              <Grid container sx={{ ...upperCells }} md={10} sm={10} xs={10}>Datas</Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}>Informação</Grid>
            </Grid>
            <Grid container md={12} sm={12} xs={12} >
              <Grid container sx={{ ...upperCells }} md={8} sm={8} xs={8}>Orçamento</Grid>
              <Grid container sx={{ ...upperCells }} md={4} sm={4} xs={4}>Produção</Grid>
            </Grid>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Solicitação</Typography> </Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Criação</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Entregue</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Inicio</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={1} sm={1} xs={1}><Typography variant='sm' >Fim</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={1} sm={1} xs={1}><Typography variant='sm' >Quantidade</Typography></Grid>
            </Grid>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{order?.budgetId.object.dateRequest?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{order?.budgetId.object.dateCreation?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{order?.budgetId.object.dateAgreedDelivery?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{order?.budgetId.object.dateDelivery?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{order?.budgetId.object.aprovedDate?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={1} sm={1} xs={1}><Typography variant='sm' >{order?.budgetId.object.dateDeliveryProject?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={1} sm={1} xs={1}><Typography variant='sm' >{order?.budgetId?.object.amount?.value}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      )
      : <>
      </>}
  </Box>;
};

Head.propTypes = {
  pageProps: PropTypes.object,
  order: PropTypes.object,
  setOrder: PropTypes.func,
};

export default Head;
