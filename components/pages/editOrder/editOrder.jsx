//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  PropTypes
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  InputLabel, OutlinedInput,
  Typography
} from '@mui/material';
import { Package, Save, User, X } from 'lucide-react';
import Router from 'next/router';
import styles from '../../../styles/NewOrder.module.css';
import Notification from '../../dialogs/Notification';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import { toast } from 'react-toastify';
import * as OrdersActions from '../../../pages/api/actions/order';
import Loader from '../../loader/loader';
import Select from '../../inputs/select';

const EditOrder = ({ ...props }) => {
  const { breadcrumbsPath, order, pageProps, clients, products } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [product, setProduct] = useState(order.product.id);
  const [client, setClient] = useState(order.client.id);
  const [errorProd, setErrorProd] = useState('');
  const [errorClient, setErrorClient] = useState('');
  const [obs, setObs] = useState('');

  async function CreateOrder() {
    const builtOrder = {
      productId: product,
      status: 'Em orçamentação',
      clientId: client,
      createdAt: Date.now(),
    }

    setProcessing(true)

    try {
      await OrdersActions.saveOrder(builtOrder).then(() => {
        setDialogOpen(false)
        setProcessing(false)

      })
    } catch (err) {
      toast.error('Algo Aconteceu')
      setProcessing(false)
      setDialogOpen(false)

    }
  }

  function ClearAll() {
    setClient()
    setProduct()
    setObs("")
    setErrorClient()
    setErrorProd()
  }

  return (
    <Grid component='main' >
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Confirm Create Order Modal */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => CreateOrder()}
        message={`Está prestes a criar uma encomenda, tem certeza que quer continuar?`}
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What do do after Create Modal */}

      <Content>
        <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Typography item className='headerTitleXl'>{breadcrumbsPath[1].title}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <PrimaryBtn
              text='Guardar'
              icon={<Save size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />} />
            <PrimaryBtn
              text='Cancelar'
              icon={<X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
              light
              onClick={() => Router.back()}
            />
          </Box>
        </Box>
        <Grid container sx={{ p: 2 }}>
          <Grid container md={8} sm={12} p={2}>
            <Box fullWidth sx={{ width: '100%' }}>
              <Grid container spacing={1} sm={12} xs={12}>
                <Grid container item md={12} sm={12} xs={12}>
                  <Typography id='align' className='headerTitleSm'>
                    <Package size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados do Produto
                  </Typography>
                </Grid>
                <Grid container item md={6} sm={12} xs={12}>
                  <Select
                    error={errorProd}
                    label={'Produto'}
                    optionLabel="name"
                    required
                    fullWidth
                    options={products}
                    value={product}
                    onChange={(e) => {
                      setErrorProd()
                      setProduct(e.target.value)
                    }}
                  />
                </Grid>
                <Grid container item md={6} sm={12} xs={12}>
                  <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
                  <OutlinedInput

                    required
                    fullWidth
                    id='email'
                    name='email'
                    autoComplete='email'
                    placeholder='Lorem Ipsum dolor sit'
                  />
                </Grid>
                <Grid container item md={6} sm={12} xs={12}>

                  <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
                  <OutlinedInput

                    required
                    fullWidth
                    id='email'
                    name='email'
                    autoComplete='email'
                    placeholder='Lorem Ipsum dolor sit'
                  />

                </Grid>
                <Grid container item md={6} sm={12} xs={12}>

                  <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
                  <OutlinedInput

                    required
                    fullWidth
                    id='email'
                    name='email'
                    autoComplete='email'
                    placeholder='Lorem Ipsum dolor sit'
                  />

                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container md={4} spacing={1} sm={12} p={2} bgcolor={"lightGray.main"} className={styles.clientContainer}>
            <Grid container item sm={12} xs={12} >
              <Typography id='align' className='headerTitleSm'>
                <User size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados do Cliente
              </Typography>
            </Grid>
            <Grid container item sm={12} xs={12} >
              <Select
                error={errorClient}
                label={'Cliente'}
                required
                fullWidth
                options={clients}
                optionValue={'id'}
                optionLabel="giveName"
                value={client}
                onChange={(e) => {
                  setErrorClient()
                  setClient(e.target.value)
                }}
              />
            </Grid>
            <Grid container item sm={12} xs={12} >
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </Grid>
            <Grid container item sm={12} xs={12} >
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </Grid>
          </Grid>
          <Button onClick={ClearAll} style={{ marginLeft: 'auto' }}>
            Limpar
          </Button>
        </Grid>
      </Content>
    </Grid>
  );
};

EditOrder.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  order: PropTypes.object,
  pageProps: PropTypes.any,
  clients: PropTypes.array,
  products: PropTypes.array,
};

export default EditOrder;
