/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import { PackagePlus, Save } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

import { Box, Divider, Tooltip } from '@mui/material';
import styles from '../../../styles/StockDetail.module.css';
import MyInput from '../../inputs/myInput';

const EditStock = ({ ...props }) => {
  const { stock, breadcrumbsPath, pageProps } = props;
  const [newStock, setNewStock] = useState(stock);

  function OnFieldChange (props) {
    setNewStock({ ...newStock, [props.target.name]: props.target.value })
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Box
          id='pad'
          className='flex'
          alignItems={'center'}
          justifyContent='space-between'
        >
          <Box id='align'>
            <a className='headerTitleXl'>{stock.material}</a>
            <Box className='spacer' />
            <Tooltip title={`${stock?.qtd} unidade(s)`}>

              {stock?.qtd > 0
                ? <a className="successBalloon">Disponivel</a>
                : <a className="errorBalloon">Indisponivel</a>}
            </Tooltip>
          </Box>
          <PrimaryBtn text='Guardar' icon={<Save strokeWidth={pageProps.globalVars.iconStrokeWidth} size={pageProps.globalVars.iconSize} />} />
        </Box>
        <Grid container id='pad' className='flex'>
          {/* Product Info panels */}
          <Grid container md={6} xs={12}>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='material' label={'Material'} value={newStock?.material} />
              </Grid>
            </Grid>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='qtd' label={'Quantidade disponivel'} value={newStock?.qtd} type='number' />
              </Grid>
            </Grid>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='warehouse' label={'Armazem'} value={newStock?.warehouse} />
              </Grid>
            </Grid>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='comp' label={'Comprimento'} value={newStock?.comp} type='number'/>
              </Grid>
            </Grid>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='larg' label={'Largura'} value={newStock?.larg} type='number'/>
              </Grid>
            </Grid>
            <Grid container md={6} xs={6} p={0.5}>
              <Grid item xs={12}>
                <MyInput onChange={(e) => OnFieldChange(e)} name='esp' label={'Espessura'} value={newStock?.esp} type='number'/>
              </Grid>
            </Grid>
          </Grid>
          {/* Supplier info panel */}
          <Grid container md={6} xs={12}>
            <Grid container bgcolor={'lightGray.main'} className={styles.supplierInfoContainer}>
              <Grid container item md={12} p={1} id='align' className='lightTextSm'>
                <PackagePlus style={{ marginRight: '1rem' }} size={20} />
                Fornecedor(es)
              </Grid>
              <Grid container item md={6} sm={6} xs={12} p={1}>
                <Grid item xs={12}>
                  <MyInput label={'Lorem Ipsum'} />
                </Grid>
              </Grid>
              <Grid container item md={6} sm={6} xs={12} p={1}>
                <Grid item xs={12}>
                  <MyInput label={'Lorem Ipsum'} />
                </Grid>
              </Grid>
              <Grid md={12}>
                <Divider />
              </Grid>
              <Grid container item md={6} sm={6} xs={12} p={1}>
                <Grid item xs={12}>
                  <MyInput label={'Lorem Ipsum'} />
                </Grid>
              </Grid>
              <Grid container item md={6} sm={6} xs={12} p={1}>
                <Grid item xs={12}>
                  <MyInput label={'Lorem Ipsum'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Content>
    </Grid>
  );
};

export default EditStock;
