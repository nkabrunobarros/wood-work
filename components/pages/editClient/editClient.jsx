//  Nodes
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';

import styles from '../../../styles/NewOrder.module.css';
import { Edit2, Save, User, X } from 'lucide-react';
import { InputLabel, OutlinedInput, TextareaAutosize } from '@mui/material';
import Router from 'next/router';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, client } = props;
  const [name, setName] = useState(client.nome);
  const [email, setEmail] = useState(client.email);
  const [contactName, setContactName] = useState(client.contactName);
  const [telemovel, setTelemovel] = useState(client.telemovel);

  const [address, setAddress] = useState(client.address);
  const [postalCode, setPostalCode] = useState(client.postalCode);
  const [nif, setNif] = useState(client.nif);
  const [obs, setObs] = useState(client.obs);
  const [otherData, setOtherData] = useState(client.otherData);
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
            <a className='headerTitleXl'>{client.nome}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <PrimaryBtn text='Guardar' icon={<Save stroke-width='1' />} />
            <PrimaryBtn
              text='Cancelar'
              icon={<X stroke-width='1' />}
              light
              onClick={() => Router.back()}
            />
          </div>
        </div>
        <div className='flex'>
          <div style={{ flex: 1 }}>
            <a id='pad' className='lightTextSm'>
              <User size={20} stroke-width='1' /> Dados Gerais
            </a>
            <div id='pad' className='filters'>
              <div className='filterContainer2'>
                <InputLabel htmlFor='email'>Nome</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='nome'
                  name='nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='nome'
                  placeholder='Escrever nome'
                />
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                  placeholder='Escrever Email'
                />
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='contact'>Pessoa de Contacto</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='contact'
                  name='contact'
                  autoComplete='contact'
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder='Escrever pessoa de contacto'
                />
              </div>
              <div className='filterContainer2'>
                <InputLabel htmlFor='telemovel'>Telemovel</InputLabel>
                <OutlinedInput
                  margin='normal'
                  required
                  fullWidth
                  id='telemovel'
                  name='telemovel'
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                  autoComplete='telemovel'
                  placeholder='Escrever telemovel'
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
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a className='lightTextSm'>
              <Edit2 strokeWidth={1} size={20} stroke-width='1' /> Dados de
              Faturação
            </a>
            <div>
              <InputLabel htmlFor='email'>Morada Fiscal</InputLabel>
              <OutlinedInput
                margin='normal'
                required
                fullWidth
                id='address'
                name='address'
                autoComplete='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Escrever morada'
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>Codigo Postal</InputLabel>
              <OutlinedInput
                margin='normal'
                required
                fullWidth
                id='postalCode'
                name='postalCode'
                autoComplete='postalCode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>
                Número de Indentificação Fiscal (Nif)
              </InputLabel>
              <OutlinedInput
                margin='normal'
                required
                fullWidth
                id='nif'
                name='nif'
                value={nif}
                autoComplete='nif'
                onChange={(e) => setNif(e.target.value)}
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
            <div>
              <InputLabel htmlFor='email'>Outros Dados</InputLabel>
              <OutlinedInput
                margin='normal'
                required
                fullWidth
                id='otherData'
                name='otherData'
                autoComplete='otherData'
                value={otherData}
                onChange={(e) => setOtherData(e.target.value)}
                placeholder='Lorem Ipsum dolor sit'
              />
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  );
};
EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object,
};

export default EditClient;
