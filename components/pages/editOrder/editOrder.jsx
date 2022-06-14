//  Nodes
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';

import styles from '../../../styles/NewOrder.module.css';
import { Save, User, X } from 'lucide-react';
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
} from '@mui/material';
import Router from 'next/router';

const EditOrder = ({ ...props }) => {
  const { breadcrumbsPath, order, pageProps, clients } = props;
  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div id='align' style={{ flex: 1 }}>
            <a className='headerTitleXl'>Encomenda Nº {order.id}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <PrimaryBtn
              text='Guardar'
              icon={
                <Save
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
            />
            <PrimaryBtn
              text='Cancelar'
              icon={
                <X
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <div className='flex'>
          <div id='pad' className='filters' style={{ flex: 1 }}>
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
            />
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a id='align' className='headerTitleSm'>
              <User
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              Dados do Cliente
            </a>
            <div>
              <InputLabel htmlFor='email'>Cliente</InputLabel>
              <Select fullWidth>
                <MenuItem value={'Selecionar uma categoria'}>
                  Selecionar uma categoria
                </MenuItem>
                {clients.map((client, i) => (
                  <MenuItem key={i} value={client.id}>
                    {client.nome}
                  </MenuItem>
                ))}
              </Select>
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
EditOrder.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  order: PropTypes.object,
  pageProps: PropTypes.any,
  clients: PropTypes.array,
};

export default EditOrder;
