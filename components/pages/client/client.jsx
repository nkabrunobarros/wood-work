//  Nodes
import React from 'react';
import Router from 'next/router';

//  Material UI
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { InputLabel } from '@mui/material';

//  Custom Components
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';

//  PropTypes
import PropTypes from 'prop-types';

//  Styles
import styles from '../../../styles/NewOrder.module.css';

//  Icons
import { Edit, PackagePlus, Trash, User } from 'lucide-react';

const EditClient = ({ ...props }) => {
  const { breadcrumbsPath, client, editRoute, pageProps } = props;
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
            <PrimaryBtn
              text='Editar'
              icon={
                <Edit
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              onClick={() => Router.push(`${editRoute}${client.id}`)}
            />
            <PrimaryBtn
              text='Apagar'
              icon={
                <Trash
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              light
            />
          </div>
        </div>
        <div className='flex'>
          <div style={{ flex: 1 }}>
            <a id='pad' className='lightTextSm'>
              <User
                strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              Dados Gerais
            </a>
            <div id='pad' style={{ display: 'flex', height: '100%' }}>
              <div
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around  ',
                }}
              >
                <div>
                  <a className='lightTextSm'>Email</a>
                  <br></br>
                  <a className='lightTextSm black'>{client.email}</a>
                </div>
                <div>
                  <a className='lightTextSm'>Pessoa de Contacto</a>
                  <br></br>
                  <a className='lightTextSm black'>{client.contactName}</a>
                </div>
                <div>
                  <a className='lightTextSm'>Observações</a>
                  <br></br>
                  <a className='lightTextSm black'>{client.obs}</a>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around  ',
                }}
              >
                <div>
                  <a className='lightTextSm'>Telefone</a>
                  <br></br>
                  <a className='lightTextSm black'>{client.telemovel}</a>
                </div>
                <div>
                  <a className='lightTextSm'>Contacto</a>
                  <br></br>
                  <a className='lightTextSm black'>{client.telemovel}</a>
                </div>
              </div>
            </div>
          </div>
          <div id='pad' className={styles.clientContainer}>
            <a id='align' className='lightTextSm'>
              <PackagePlus
                strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
              Dados de Faturação
            </a>
            <br></br>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1 }}>
                <div>
                  <InputLabel className='lightTextSm'>Morada Fiscal</InputLabel>
                  <InputLabel className='lightTextSm black'>
                    {client.address}
                  </InputLabel>
                </div>
                <br></br>
                <div>
                  <InputLabel className='lightTextSm' htmlFor='email'>
                    Número de Indentificação Fiscal (Nif){' '}
                  </InputLabel>
                  <InputLabel className='lightTextSm black' htmlFor='email'>
                    {client.nif}{' '}
                  </InputLabel>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <InputLabel className='lightTextSm' htmlFor='email'>
                    Codigo Postal
                  </InputLabel>
                  <InputLabel className='lightTextSm black' htmlFor='email'>
                    {client.email}
                  </InputLabel>
                </div>
                <br></br>

                <div>
                  <InputLabel className='lightTextSm' htmlFor='email'>
                    Outros Dados
                  </InputLabel>
                  <InputLabel className='lightTextSm black' htmlFor='email'>
                    {client.obs}
                  </InputLabel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  );
};
EditClient.propTypes = {
  breadcrumbsPath: PropTypes.array.isRequired,
  client: PropTypes.object.isRequired,
  editRoute: PropTypes.string,
  pageProps: PropTypes.any,
};

export default EditClient;
