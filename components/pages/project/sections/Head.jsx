import { Tag } from 'lucide-react';
import React from 'react';
import PrimaryBtn from '../../../buttons/primaryBtn';

//  PropTypes
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
import IsInternal from '../../../utils/IsInternal';

const Head = (props) => {
  const { order, pageProps } = props;
  const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).profile.object.description);

  const upperCells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    backgroundColor: '#F9F9F9',
    border: '1px solid',
    borderColor: 'divider'
  };

  const cells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    border: '1px solid',
    borderColor: 'divider',
  };

  const text = {
    textAlign: 'center'
  };

  return <>
    <Box id='pad'>
      <Box style={{ display: 'flex', marginBottom: '1rem' }}>
        <Typography className='headerTitleXl'> {internalPOV ? 'Projeto' : 'Encomenda'} {order.name.value}</Typography>
        <Box style={{ marginLeft: 'auto' }}>
          <PrimaryBtn
            hidden={!internalPOV}
            icon={
              <Tag
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
            }
            text='Gerar Etiquetas'
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
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Solicitação</Typography> </Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Criação</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Entrega Acordada</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Entregue</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Inicio</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={1} sm={1} xs={1}><Typography variant='sm' sx={{ ...text }}>Fim</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={1} sm={1} xs={1}><Typography variant='sm' sx={{ ...text }}>Quantidade</Typography></Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId.object.dateRequest?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId.object.dateCreation?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId.object.dateAgreedDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId.object.dateDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId.object.aprovedDate?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1} sm={1} xs={1}><Typography variant='sm' sx={{ ...text }}> ? </Typography></Grid>
                <Grid container sx={{ ...cells }} md={1} sm={1} xs={1}><Typography variant='sm' sx={{ ...text }}>{order?.budgetId?.object.amount?.value}</Typography></Grid>
              </Grid>
            </Grid>
          </Grid>
        )
        : <>
        </>}
    </Box></>;
};

Head.propTypes = {
  pageProps: PropTypes.any,
  order: PropTypes.object,
  orderDetail: PropTypes.array,
  headCellsOrderDetail: PropTypes.array,
  headCellsUpperOrderDetail: PropTypes.array
};

export default Head;
