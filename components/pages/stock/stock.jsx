/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import { Edit, PackagePlus, Trash } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

import { Box, ButtonGroup, Divider, Tooltip, Typography } from '@mui/material';
import Router from 'next/router';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import styles from '../../../styles/StockDetail.module.css';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import CanDo from '../../utils/CanDo';
import ToastSet from '../../utils/ToastSet';

const Stock = ({ ...props }) => {
  const { stock, breadcrumbsPath, pageProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  function onDelete () {
    setDialogOpen(false);

    const loading = toast.loading('');

    ToastSet(loading, 'Stock apagado.', 'success');
    Router.push(routes.private.internal.stocks);
  }

  return (
    <>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => onDelete()}
        message={'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'}
      />
      <Navbar />
      <Notification />
      <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
        <CssBaseline />
        <CustomBreadcrumbs path={breadcrumbsPath} />
        <Content>
          <Box
            id='pad'
            className='flex'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Box id='align' style={{ flex: 1 }}>
              <a className='headerTitleXl'>{stock?.material}</a>
              <Box className='spacer' />
              <Tooltip title={`${stock?.qtd} unidade(s)`}>
                {stock?.qtd > 0
                  ? <a className="successBalloon">Disponível</a>
                  : <a className="errorBalloon">Indisponível</a>}
              </Tooltip>
            </Box>
            <Box style={{ display: 'flex' }}>
              <ButtonGroup>
                <PrimaryBtn hidden={!CanDo('change_stock')} text='Editar' onClick={() => Router.push(routes.private.internal.editStock + stock?.id)} icon={<Edit strokeWidth='1' />} />
                <PrimaryBtn hidden={!CanDo('delete_stock')} text='Apagar' onClick={() => setDialogOpen(true)} icon={<Trash strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} />} light />
              </ButtonGroup>
            </Box>
          </Box>
          <Grid container id='pad' className='flex'>
            {/* Product Info panels */}
            <Grid container md={6} xs={12}>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Material</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.material.replace(/ /g, '_')}</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Quantidade disponível</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.qtd}</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Armazém</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.warehouse}</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Comprimento</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.comp} mm</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Largura</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.larg} mm</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Espessura</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.esp} mm </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* Supplier info panel */}
            <Grid container md={6} xs={12} display='none'>
              <Grid container bgcolor={'lightGray.main'} className={styles.supplierInfoContainer}>
                <Grid container item md={12} p={1} id='align' className='lightTextSm'>
                  <PackagePlus style={{ marginRight: '1rem' }} size={20} />
                Fornecedor(es)
                </Grid>
                <Grid container item md={6} sm={6} xs={12} p={1}>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Lorem Ipsum</Typography>
                    <Typography item color='lightTextSm.black'>Lorem ipsum dolor sit amet, consectetur.</Typography>
                  </Grid>
                </Grid>
                <Grid container item md={6} sm={6} xs={12} p={1}>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Lorem Ipsum</Typography>
                    <Typography item color='lightTextSm.black'>Lorem ipsum dolor sit amet, consectetur.</Typography>
                  </Grid>
                </Grid>
                <Grid md={12}>
                  <Divider />
                </Grid>
                <Grid container item md={6} sm={6} xs={12} p={1}>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Lorem Ipsum</Typography>
                    <Typography item color='lightTextSm.black'>Lorem ipsum dolor sit amet, consectetur.</Typography>
                  </Grid>
                </Grid>
                <Grid container item md={6} sm={6} xs={12} p={1}>
                  <Grid item xs={12}>
                    <Typography item color='lightTextSm.main'>Lorem Ipsum</Typography>
                    <Typography item color='lightTextSm.black'>Lorem ipsum dolor sit amet, consectetur.</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Grid>
      <Footer/>
    </>
  );
};

export default Stock;
