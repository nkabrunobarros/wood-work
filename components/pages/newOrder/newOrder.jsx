/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

import {
  InputLabel, OutlinedInput, TextareaAutosize
} from '@mui/material';
import { Save, User, X } from 'lucide-react';
import Router from 'next/router';
import styles from '../../../styles/NewOrder.module.css';
import Select from '../../inputs/select';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Loader from '../../loader/loader';
import { toast } from 'react-toastify';

const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, clients, products } = props;
  const [client, setClient] = useState(" ");
  const [product, setProduct] = useState(" ");
  const [obs, setObs] = useState();
  const [errorProd, setErrorProd] = useState('');
  const [errorClient, setErrorClient] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  function ValidateData() {
    if (!client || client === ' ') setErrorClient('Campo Obrigatório');

    if (!product || product === ' ') setErrorProd('Campo Obrigatório');

    if (!client || client === ' ' || !product || product === ' ') toast.error('Prencha todos os campos.')
    else setDialogOpen(true)
  }

  function CreateOrder() {

    //  Creates order

    //  closes dialog modal
    setDialogOpen(false)
    //  open success modal && success toast
    setProcessing(true)
    setProcessing(false)
    setSuccessOpen(true)
  }

  function ClearAll() {
    setSuccessOpen(false)
    setClient()
    setProduct()
    setObs("")
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
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearAll()}
        onConfirm={() => window.warning('going to order detail')}
        message={`Encomenda Criada com sucesso, que deseja fazer a agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Encomenda'
        cancelTxt='Criar nova Encomenda'
      />


      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div id='align' style={{ flex: 1 }}>
            <a className='headerTitleXl'>{breadcrumbsPath[1].title}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <PrimaryBtn
              onClick={() => ValidateData()}
              text='Guardar'
              icon={<Save size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />} />
            <PrimaryBtn
              text='Cancelar'
              icon={<X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <div className='flex'>
          <div id='pad' className='filters' style={{ flex: 1 }}>
            <div className='filterContainer2'>
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
            </div>
            <div className='filterContainer2'>
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput

                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <div className='filterContainer2'>
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <div className='filterContainer2'>
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <InputLabel htmlFor='email'>Observações</InputLabel>
            <TextareaAutosize
              placeholder='Escrever Texto'
              className={styles.textarea}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a id='align' className='headerTitleSm'>
              <User size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados do Cliente
            </a>
            <div>
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
            </div>
            <div>
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>Lorem Ipsum</InputLabel>
              <OutlinedInput
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  );
};

export default NewOrder;
