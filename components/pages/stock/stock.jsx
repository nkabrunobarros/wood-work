/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import Grid from '@mui/material/Grid';
import { Edit, PackagePlus, Trash } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

import { Box, ButtonGroup, Divider, Tooltip, Typography } from '@mui/material';
import Router from 'next/router';
import routes from '../../../navigation/routes';
import styles from '../../../styles/StockDetail.module.css';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';

const Stock = ({ ...props }) => {
  const { stock, breadcrumbsPath, pageProps } = props;

  return (
    <>
      <Navbar />
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
              <a className='headerTitleXl'>{stock.material}</a>
              <Box className='spacer' />
              <Tooltip title={`${stock?.qtd} unidade(s)`}>

                {stock?.qtd > 0
                  ? <a className="successBalloon">Disponivel</a>
                  : <a className="errorBalloon">Indisponivel</a>}
              </Tooltip>
            </Box>
            <Box style={{ display: 'flex' }}>
              <ButtonGroup>
                <PrimaryBtn text='Editar' onClick={() => Router.push(routes.private.internal.editStock + stock.id)} icon={<Edit strokeWidth='1' />} />
                <PrimaryBtn text='Apagar' icon={<Trash strokeWidth={pageProps?.globalVars?.iconStrokeWidth} size={pageProps?.globalVars?.iconSize} />} light />
              </ButtonGroup>
            </Box>
          </Box>
          <Grid container id='pad' className='flex'>
            {/* Product Info panels */}
            <Grid container md={6} xs={12}>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Referencia</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.material.replace(/ /g, '_')}</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Quantidade disponivel</Typography>
                  <Typography item color='lightTextSm.black'>{stock?.qtd}</Typography>
                </Grid>
              </Grid>
              <Grid container md={6} xs={6}>
                <Grid item xs={12}>
                  <Typography item color='lightTextSm.main'>Armazem</Typography>
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
