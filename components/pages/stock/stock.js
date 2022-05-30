/* eslint-disable react/prop-types */
//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'

import Content from '../../content/content'
import PrimaryBtn from '../../buttons/primaryBtn'

//  PropTypes
import PropTypes from 'prop-types'
import { Edit, PackagePlus, Trash } from 'lucide-react'
import { Divider } from '@mui/material'
import getCategory from '../../utils/getCategory'
import displayWithStyle from '../../utils/displayTextWithStyle'

const Stock = ({ ...props }) => {
  const { product, breadcrumbsPath } = props

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad' className='flex'>
          <div id="align" style={{ flex: 1 }}>
            <a className='headerTitleXl'>{breadcrumbsPath[1].title}</a>
            <a style={{ marginLeft: '1rem' }}>{displayWithStyle(product.stock)} </a>
          </div>
          <div id='align'>
            <PrimaryBtn text='Editar' icon={<Edit />} />
            <PrimaryBtn text='Apagar' icon={<Trash />} light />
          </div>
        </div>
        <div id='pad' className='flex'>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <div className='infoBox' style={{ flex: 1 }}>
              <div>
                <a className='lightTextSm'>Código</a>
                <br></br>
                <a className='lightTextSm black'>{product.codigo}</a>
              </div>
              <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
              <div>
                <a className='lightTextSm'>Encomendas</a>
                <br></br>
                <a className='lightTextSm black'>Lorem Ipsum</a>
              </div>
              <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
              <div>
                <a className='lightTextSm'>Quantidade Disponivel</a>
                <br></br>
                <a className='lightTextSm black'>1232</a>
              </div>
            </div>
            <div className='infoBox' style={{ flex: 1 }}>
              <div>
                <a className='lightTextSm'>Categoria</a>
                <br></br>
                <a className='lightTextSm black'>{getCategory(product.categoria)}</a>
              </div>
              <div>
                <a className='lightTextSm'>Custo Unitario</a>
                <br></br>
                <a className='lightTextSm black'>Lorem Ipsum</a>
              </div>
            </div>
          </div>
          <div id='pad' className='infoBox dark' style={{ flex: 1 }}>
            <a id='align' className='headerTitleSm light'>
              <PackagePlus /> Fornecedor(es)
            </a>
            <div className='flex'>
              <div style={{ flex: 1 }}>
                <a className="lightText bold black">Lorem Ipsum</a>
                <br></br>
                <br></br>
                <a className='lightTextSm'>Lorem Ipsum</a>
                <br></br>
                <a className='lightTextSm black'>Lorem Ipsum</a>
              </div>

              <div style={{ flex: 1 }}>
                <br></br>
                <br></br>
                <a className='lightTextSm'>Lorem Ipsum</a>
                <br></br>
                <a className='lightTextSm black'>Lorem Ipsum</a>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Grid>
  )
}
Stock.propTypes = {
  product: PropTypes.any,
  docs: PropTypes.arrayOf(PropTypes.object)
}
export default Stock
