/* eslint-disable react/prop-types */
import { Forward, Tag } from 'lucide-react';
import React, { useState } from 'react';
import PrimaryBtn from '../../../buttons/primaryBtn';

//  PropTypes
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../../navigation/routes';
import * as expeditionsActionsRedux from '../../../../store/actions/expedition';
import * as projectsActionsRedux from '../../../../store/actions/project';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import ToastSet from '../../../utils/ToastSet';
import FinishProjectModal from '../modal/finishProjectModal';

const Head = (props) => {
  const { order, pageProps, setOrder, finishProject, breadcrumbsPath } = props;
  const [changeToProdModal, setChangeToProdModal] = useState(false);
  const [changeToAssemblyModal, setChangeToAssemblyModal] = useState(false);
  const [changeToTransportModal, setChangeToTransportModal] = useState(false);
  const [changeToFinishedModal, setChangeToFinishedModal] = useState(false);
  const [finishModal, setFinishModal] = useState(finishProject === '1');
  const path = useRouter();
  const internalPOV = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));
  const dispatch = useDispatch();
  const updateProject = (data) => dispatch(projectsActionsRedux.updateProject(data));
  const updateExpedition = (data) => dispatch(expeditionsActionsRedux.updateExpedition(data));

  const commonProps = {
    sx: {
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: 'divider',
      padding: '.5rem',
      textAlign: 'center',
    },
    md: 12 / 14,
    sm: 12 / 14,
    xs: 12 / 14
  };

  const upperCells = {
    ...commonProps,
    sx: {
      ...commonProps.sx,
      backgroundColor: '#F9F9F9',
      textAlign: 'center',
    },
  };

  const cells = {
    ...commonProps,
  };

  async function handleChangeToProd (props) {
    setChangeToProdModal(false);

    const processing = toast.loading('');

    try {
      await updateProject({
        id: order.id,
        type: order.type,
        status: { value: `${props}`, type: 'Property' }
      }).then(async () => {
        setOrder({ ...order, status: { type: 'Property', value: `${props}` } });
        setChangeToProdModal(false);
        setChangeToAssemblyModal(false);
        setChangeToTransportModal(false);
        setFinishModal(false);

        if (props === 'finished') await updateExpedition({ id: order.expedition.id, deliveryFlag: 1, expeditionTime: moment().format('DD/MM/YYYY HH:mm:ss') }).then(res => setOrder({ ...order, expedition: { ...order.expedition, deliveryFlag: 1, expeditionTime: res.data.expeditionTime } }));

        ToastSet(processing, `Projeto passou a ${props === 'production' ? 'produção' : (props === 'testing' ? 'montagem' : (props === 'testing' ? 'transporte' : 'terminado'))}`, 'success');
      });
    } catch (err) { console.log(err); }
  }

  function onProjectScanned () {
    setChangeToFinishedModal(false);
    setFinishModal(true);
  }

  return <Box id='pad'>
    <Notification />
    <FinishProjectModal open={changeToFinishedModal} handleClose={() => setChangeToFinishedModal(false)} onConfirm={(e) => onProjectScanned(e)} />
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
    <ConfirmDialog
      open={finishModal}
      handleClose={() => setFinishModal(false)}
      onConfirm={() => handleChangeToProd('finished')}
      message={'Está prestes a terminar este projeto. Tem a certeza que quer continuar?'}
    />
    <Box style={{ display: 'flex', marginBottom: '1rem' }}>
      <Typography variant='title'> {breadcrumbsPath[1].title}</Typography>
      <Box pl={2}>
        {order.status?.value === 'drawing' && <Typography className='successBalloon'>Em desenho</Typography>}
        {order.status?.value === 'production' && <Typography className='warningBalloon'>Em produção</Typography>}
        {order.status?.value === 'testing' && <Typography className='infoBalloon'>Em montagem</Typography>}
        {order.status?.value === 'transport' && <Typography className='alertBalloon'>Em transporte</Typography>}
        {order.status?.value === 'finished' && <Typography className='successBalloon'>Terminado</Typography>}
        {order.status?.value === 'canceled' && <Typography className='errorBalloon'>Cancelado</Typography>}
      </Box>
      <Box style={{ marginLeft: 'auto' }}>
        <PrimaryBtn
          text='Gerar Etiquetas'
          hidden={!(internalPOV && order.status.value === 'production')}
          icon={ <Tag strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} /> } />
        <PrimaryBtn
          text='Passar a produção'
          onClick={() => setChangeToProdModal(true) }
          hidden={!(internalPOV && order.status.value === 'drawing')}
          icon={ <Forward strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} /> } />
        <PrimaryBtn
          text='Passar a montagem'
          onClick={() => setChangeToAssemblyModal(true) }
          hidden={!(internalPOV && order.status.value === 'production')}
          icon={ <Forward strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} /> }
          sx={{ marginLeft: 1 }}
        />
        <PrimaryBtn
          text='Passar a transporte'
          onClick={() => setChangeToTransportModal(true) }
          hidden={!(internalPOV && order.status.value === 'testing')}
          icon={ <Forward strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} /> }
          sx={{ marginLeft: 1 }}
        />
        <PrimaryBtn
          text='Terminar projeto'
          onClick={() => setChangeToFinishedModal(true) }
          hidden={!(internalPOV && order.status.value === 'transport')}
          icon={ <Forward strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} /> }
          sx={{ marginLeft: 1 }}
        />
      </Box>
    </Box>
    <Grid container md={12}>
      <Grid container md={12} p={1} >
        {/* <Grid container md={12} sm={12} xs={12} >
          <Grid container { ...upperCells } md={10} sm={10} xs={10}>Datas</Grid>
          <Grid container { ...upperCells } md={2} sm={2} xs={2}>Informação</Grid>
        </Grid> */}
        <Grid container md={12} sm={12} xs={12} >
          <Grid container { ...upperCells } md={(12 / 14) * 8} sm={(12 / 14) * 8} xs={(12 / 14) * 8}>Orçamento</Grid>
          <Grid container { ...upperCells } md={(12 / 14) * 3} sm={(12 / 14) * 3} xs={(12 / 14) * 3}>Produção</Grid>
          <Grid container { ...upperCells } md={(12 / 14) * 3} sm={(12 / 14) * 3} xs={(12 / 14) * 3}>Expedição</Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          <Grid container { ...upperCells }><Typography variant='sm' >Referência</Typography> </Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Categoria</Typography> </Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Quantidade</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Pedido</Typography> </Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Criação</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Entrega Acordada</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Valor</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Entregue</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Inicio</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Fim</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Quantidade</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Entrada</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Entrega Acordada</Typography></Grid>
          <Grid container { ...upperCells }><Typography variant='sm' >Entregue</Typography></Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          <Grid container { ...cells }><Typography variant='sm' >{`${order.budgetId.object?.name?.value.replace(/_/g, ' ')} ECL 2023/000100`}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{props.categories.find(ele => ele.id === order?.budgetId?.object?.category.value).label}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object.amount?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.dateRequest?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{moment(order?.budgetId?.object?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.dateAgreedDelivery?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.price?.value} €</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.dateDelivery?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{moment(order?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.dateDeliveryProject?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.completed?.value || 0}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.expedition?.expeditionTime.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.budgetId?.object?.dateDeliveryProject?.value}</Typography></Grid>
          <Grid container { ...cells }><Typography variant='sm' >{order?.expedition?.expeditionTime.value}</Typography></Grid>
        </Grid>
      </Grid>
      <Grid md={12} container>
        <Grid md={12} sm={6}>
          {internalPOV &&
          <Box style={{ width: 'fit-content' }}>
            <Typography color={'lightTextSm.main'} >Cliente</Typography>
            <Tooltip title='Ver cliente'>
              <a href={routes.private.internal.client + order.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                <Typography color={'primary.main'}>{order.orderBy?.object?.legalName?.value}</Typography>
              </a>
            </Tooltip>
          </Box>}
        </Grid>
        <Box>
          <Typography color={'lightTextSm.main'} >Morada Entrega</Typography>
          <Typography>
            {order?.budgetId?.object?.deliveryAddress?.value?.streetAddress + ', '}
            {order?.budgetId?.object?.deliveryAddress?.value?.postalCode + ', '}
            {order?.budgetId?.object?.deliveryAddress?.value?.addressLocality + ', '}
            {order?.budgetId?.object?.deliveryAddress?.value?.addressRegion + ', '}
            {order?.budgetId?.object?.deliveryAddress?.value?.addressCountry}
          </Typography>
        </Box>
        <Grid md={12} sm={6}>
          <Typography color={'lightTextSm.main'} >Observações</Typography>
          <Typography color={'lightTextSm.black'} >{order?.budgetId?.object?.obs?.value || 'Não tem observações.'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Box>;
};

export default Head;
