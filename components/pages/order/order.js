/* eslint-disable react/prop-types */
//  Nodes
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import routes from '../../../navigation/routes'
import Content from '../../content/content'

import styles from '../../../styles/Order.module.css'
import stylesMessage from '../../../styles/Messages.module.css'

//  PropTypes
import PropTypes from 'prop-types'
import {
  Edit,
  FilePlus,
  FileText,
  Info,
  MessageSquare,
  Trash
} from 'lucide-react'
import CustomTable from '../../table/table'
import PrimaryBtn from '../../buttons/primaryBtn'
import { Avatar } from '@mui/material'
import Router from 'next/router'

const Order = ({ ...props }) => {
  const { orderId, docs, breadcrumbsPath } = props
  const [activeRow, setActiveRow] = useState(0)

  const DocRow = ({ doc, num }) => {
    let style = {}
    if (activeRow === num) {
      style = {
        backgroundColor: 'var(--primary-light-opacity)',
        borderColor: 'var(--primary)'
      }
    }
    return (
      <tr
        key={doc.id}
        className={styles.docRow}
        style={style}
        onClick={() => setActiveRow(num)}
      >
        <td id='align' data-label='Nome' className='link'>
          <FileText style={{ marginRight: '1rem' }} />
          {doc.name}
        </td>
        <td data-label='Data'> {doc.data} </td>
        <td data-label='Ações'>
          <Edit className='link' />
          <Trash className='link' />
        </td>
        <td>{activeRow === num ? <div className='dot'></div> : null}</td>
      </tr>
    )
  }

  // eslint-disable-next-line react/prop-types
  const MessageRow = ({ num }) => {
    return (
      <tr
        className={stylesMessage.messageRow}
        onClick={() => Router.push(routes.private.messages)}
      >
        <td data-label='Mensagem' className={stylesMessage.messageRowContent}>
          <div className={stylesMessage.avatarContainer}>
            <Avatar className={stylesMessage.avatar}>N</Avatar>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <div className={stylesMessage.sender}> Order Nº 17212</div>
            <div>
              Hey man this is a dummy text just to see how far this goes and how
              it goes and still goes futher than this omg what the hell
            </div>
          </div>
        </td>
        <td data-label='Data'>
          <a>11/02/2022</a>
        </td>
        <td data-label='Ações'>
          <Edit className='link' />
          <Trash className='link' />
        </td>
      </tr>
    )
  }
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
          <div className={styles.tableContainer}>
            <div id='pad' style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <a className='headerTitle'>Documentos Cliente</a>
              </div>
              <div>
                <PrimaryBtn
                  style={{ float: 'right' }}
                  text='Carregar'
                  icon={<FilePlus />}
                />
              </div>
            </div>
            <CustomTable columns={['Nome', 'Data', 'Ações', '']}>
              {docs.map((doc, i) => (
                <DocRow key={doc.id} doc={doc} num={i} />
              ))}
            </CustomTable>
          </div>
          <div className={styles.infoContainer}>
            <a className='headerTitleSm'>Desenho 1</a>
            <div className={styles.innerInfoContainer}>
              <a id='align'>
                <Info style={{ marginRight: '1rem' }} size={20} />
                <b>Informações</b>
              </a>
              <div
                id='align'
                style={{
                  justifyContent: 'center',
                  padding: '1rem',
                  flexDirection: 'column',
                  color: '#8793AB',
                  fontWeight: 'bold'
                }}
              >
                <FileText size={54} stroke='#8793AB' />
                151 MB
              </div>
              <a id='align'>
                <FileText style={{ marginRight: '1rem' }} size={20} />
                <b>Propriedades</b>
              </a>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#8793AB',
                  fontWeight: 'bold',
                  paddingTop: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                <div>
                  <div id='align'>
                    <FileText
                      style={{ marginRight: '1rem' }}
                      size={20}
                      stroke='transparent'
                    />
                    <a>11 de Fevereiro 2022</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText
                        style={{ marginRight: '1rem' }}
                        size={20}
                        stroke='transparent'
                      />
                      <a>02 de Março 2022</a>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Content>
      <Content>
        <div
          id='pad'
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--grayTexts)'
          }}
        >
          <div>
            <a className='headerTitleXl'>Mensagens</a>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <PrimaryBtn icon={<MessageSquare />} text={'Criar Nova'} />
          </div>
        </div>
        <div>
          <CustomTable
            columns={['Mensagem', 'Data', 'Ações']}
            style={{ overflow: 'scroll' }}
          >
            {[...Array(2)].map((x, i) => (
              <MessageRow key={i} num={i} />
            ))}
          </CustomTable>
        </div>
      </Content>
    </Grid>
  )
}
Order.propTypes = {
  orderId: PropTypes.string,
  docs: PropTypes.arrayOf(PropTypes.object)
}
export default Order
