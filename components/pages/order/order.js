//  Nodes
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'
import Content from '../../content/content'

import styles from '../../../styles/Order.module.css'
//  PropTypes
import PropTypes from 'prop-types'
import { FileText, Info } from 'lucide-react'

const Order = ({ ...props }) => {
  const { orderId } = props
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.orders}`
    },
    {
      title: `Encomenda ${orderId}`,
      href: `${routes.private.profile}`
    }
  ]

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad'>
          <a className='headerTitleXl'>Encomenda Nº {orderId}</a>
          <p>Lorem Ipsum</p>
          <p>
            <b>Lorem Ipsum</b>
          </p>
          <p>Lorem Ipsum</p>
          <p>
            <b>Lorem Ipsum</b>
          </p>
        </div>
      </Content>
      <Content>
        <a className={styles.docsMain}>
          <div id='pad' className={styles.tableContainer}>
            <a className='headerTitle'>Documentos Cliente</a>
          </div>
          <div className={styles.infoContainer}>
            <a className='headerTitleSm'>Desenho 1</a>
            <div className={styles.innerInfoContainer}>
              <a id='align'>
                <Info style={{ marginRight: '1rem' }} size={20} /> Informações
              </a>
              <div
                id='align'
                style={{ justifyContent: 'center', padding: '1rem' }}
              >
                <FileText size={50} fill='#E7E8E9' stroke='#8793AB' />
              </div>
              <a id='align'>
                <FileText style={{ marginRight: '1rem' }} size={20} />
                Propriedades
              </a>
              <div id='align'>
                  <FileText
                    style={{ marginRight: '1rem' }}
                    size={20}
                    stroke='transparent'
                  />
                  <a>Salvo em</a>
              </div>
              <div id='align'>
                <a>
                  <FileText
                    style={{ marginRight: '1rem' }}
                    size={20}
                    stroke='transparent'
                  />
                  Alterado em
                </a>
              </div>
            </div>
          </div>
        </a>
      </Content>
    </Grid>
  )
}
Order.propTypes = {
  orderId: PropTypes.string
}
export default Order
