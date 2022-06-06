/* eslint-disable react/prop-types */
//  Nodes
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';
import { Edit, PackagePlus, Trash } from 'lucide-react';
import { FilterItem } from '../../utils/FilterItem';

import styles from '../../../styles/StockDetail.module.css';
import { Divider } from '@mui/material';

const Profile = ({ ...props }) => {
  const { product, stock, breadcrumbsPath } = props;
  return (
    <Grid component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div id='align' style={{ flex: 1 }}>
            <a className='headerTitleXl'>{product.nome}</a>
            <div className='spacer' />
            <a>{FilterItem(stock.stock)}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <PrimaryBtn text='Editar' icon={<Edit stroke-width='1' />} />
            <PrimaryBtn text='Apagar' icon={<Trash stroke-width='1' />} light />
          </div>
        </div>
        <div id='pad' className='flex'>
          {/* Product Info panels */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <div>
                <a className='lightTextSm'>Código</a>
                <br></br>
                <a className='lightTextSm black'>{stock.codigo}</a>
                <br></br>
              </div>
              <br></br>

              <div>
                <a className='lightTextSm'>Encomendas</a>
                <br></br>
                <a className='lightTextSm black'>Lorem Ipsum</a>
                <br></br>
              </div>
              <br></br>

              <div>
                <a className='lightTextSm'>Quantidade disponivel</a>
                <br></br>
                <a className='lightTextSm black'>{stock.quantidade}</a>
                <br></br>
              </div>
            </div>
            <div style={{ flex: 1, flexDirection: 'column' }}>
              <div>
                <a className='lightTextSm'>Categoria</a>
                <br></br>
                <a className='lightTextSm black'>
                  {FilterItem(product.category, 'categoria')}
                </a>
                <br></br>
              </div>
              <br></br>

              <div>
                <a className='lightTextSm'>Quantidade disponivel</a>
                <br></br>
                <a className='lightTextSm black'>{stock.quantidade}</a>
                <br></br>
              </div>
            </div>
          </div>
          {/* Supplier info panel */}
          <div style={{ flex: 1 }}>
            <div className={styles.supplierInfoContainer}>
              <div id='align' className='lightTextSm'>
                <PackagePlus style={{ marginRight: '1rem' }} size={20} />
                Fornecedor(es)
              </div>
              <div className={styles.innerInfoContainer}>
                <a id='align'>
                  <b>Lorem Ipsum</b>
                </a>
                <br></br>
                <div className='flex'>
                  <div style={{ flex: 1 }}>
                    <a className='lightTextSm'>Lorem Ipsum</a>
                    <br></br>
                    <a className='lightTextSm black'>
                      Lorem ipsum dolor sit amet, consectetur.
                    </a>
                  </div>
                  <div style={{ flex: 1 }}>
                    <a className='lightTextSm'>Lorem Ipsum</a>
                    <br></br>
                    <a className='lightTextSm black'>
                      Lorem ipsum dolor sit amet, consectetur.
                    </a>
                  </div>
                </div>
                <br></br>
                <Divider />
                <br></br>
                <a id='align'>
                  <b>Lorem Ipsum</b>
                </a>
                <br></br>
                <div className='flex'>
                  <div style={{ flex: 1 }}>
                    <a className='lightTextSm'>Lorem Ipsum</a>
                    <br></br>
                    <a className='lightTextSm black'>
                      Lorem ipsum dolor sit amet, consectetur.
                    </a>
                  </div>
                  <div style={{ flex: 1 }}>
                    <a className='lightTextSm'>Lorem Ipsum</a>
                    <br></br>
                    <a className='lightTextSm black'>
                      Lorem ipsum dolor sit amet, consectetur.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  );
};
export default Profile;