/* eslint-disable react/prop-types */
//  Nodes
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import routes from '../../../navigation/routes';
import Content from '../../content/content';

import tableStyles from '../../../styles/components/customTable.module.css';
import styles from '../../../styles/Order.module.css';
import stylesMessage from '../../../styles/Messages.module.css';
import displayWithStyle from '../../utils/displayTextWithStyle';

//  PropTypes
import PropTypes from 'prop-types';
import {
  Edit,
  Eye,
  FilePlus,
  FileText,
  FolderPlus,
  Info,
  MessageSquare,
  Tag,
  Trash,
  Folder,
  Code,
} from 'lucide-react';
import CustomTable from '../../table/table';
import PrimaryBtn from '../../buttons/primaryBtn';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from '@mui/material';
import Router from 'next/router';

const Order = ({ ...props }) => {
  const { orderId, docs, breadcrumbsPath, internalPOV } = props;
  const [activeRow, setActiveRow] = useState(0);
  const DockFolderRow = ({ doc, num }) => {
    let style = {};
    if (activeRow === num) {
      style = {
        backgroundColor: 'var(--primary-light-opacity)',
        borderColor: 'var(--primary)',
        padding: '1rem',
      };
    }
    return (
      <div
        key={doc.id}
        className={styles.docFolderRow}
        style={style}
        onClick={() => setActiveRow(num)}
      >
        <div
          id='align'
          style={{ width: '70%', paddingLeft: '2rem' }}
          data-label='Nome'
          className='link'
        >
          <FileText style={{ marginRight: '1rem' }} />
          {doc.name}
        </div>
        <div data-label='Data' style={{ width: '15%' }}>
          {doc.data}
        </div>
        <div data-label='Ações' style={{ width: '15%' }}>
          <Edit className='link' />
          <Trash className='link' />
        </div>
      </div>
    );
  };
  const DocRow = ({ doc, num }) => {
    let style = {};
    if (activeRow === num) {
      style = {
        backgroundColor: 'var(--primary-light-opacity)',
        borderColor: 'var(--primary)',
      };
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
    );
  };
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
    );
  };
  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div id='pad'>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <a className='headerTitleXl'>Encomenda Nº {orderId}</a>
            <div style={{ marginLeft: 'auto' }}>
              <PrimaryBtn icon={<Tag />} text='Gerar Etiquetas' />
            </div>
          </div>
          {internalPOV ? (
            <div className='flex'>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              >
                <div>
                  <a className='lightTextSm'>Client</a>
                  <br></br>
                  <a className='lightTextSm black'>Constrea Lda</a>
                  <br></br>
                </div>

                <div>
                  <a className='lightTextSm'>Produto</a>
                  <br></br>
                  <a className='lightTextSm black'>Tampão de cozinha</a>
                  <br></br>
                </div>
              </div>
              <div
                style={{
                  flex: 3,
                  borderStyle: 'solid',
                  borderWidth: '0px 2px 2px 2px',
                  borderColor: 'var(--grayEdges)',
                }}
              >
                <CustomTable
                  columns={['Cliente', 'Real', 'inicio', 'fim', 'tempo']}
                  doubleHeader={[
                    'Data de Entrega',
                    'Produção',
                    'Quantidade Encomenda: 25 un',
                  ]}
                  doubleHeaderSizes={[2, 2, 1]}
                  fullBorders={[2, 3]}
                >
                  <tr>
                    <td data-label='Cliente'>04 abril 2022</td>
                    <td data-label='Real'>06 abril 2022</td>
                    <td
                      data-label='inicio'
                      style={{ borderLeft: '2px solid var(--grayEdges)' }}
                    >
                      17 março 2022
                    </td>
                    <td
                      data-label='fim'
                      style={{ borderRight: '2px solid var(--grayEdges)' }}
                    >
                      03 abril 2022
                    </td>
                    <td data-label='tempo'>37 horas</td>
                  </tr>
                </CustomTable>
              </div>
            </div>
          ) : (
            <div>
              <p>Lorem Ipsum</p>
              <p>
                <b>Lorem Ipsum</b>
              </p>
              <p>Lorem Ipsum</p>
              <p>
                <b>Lorem Ipsum</b>
              </p>
            </div>
          )}
        </div>
      </Content>

      {/* Produção section */}
      {internalPOV ? (
        <Content>
          <div id='pad'>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <a className='headerTitle'>Produção</a>
              <div style={{ marginLeft: 'auto' }}>
                <PrimaryBtn icon={<Eye />} text='Ver detalhes' />
              </div>
            </div>
          </div>
          <CustomTable
            columns={[
              'operação',
              'previsto',
              'realizado',
              'desvio',
              'previsto (Atual)',
              'previsto',
              'realizado',
              'desvio',
            ]}
            doubleHeader={[
              'Quantidade Produzida: 12 un',
              'Quantidade Encomenda: 25 un',
              'Por Unidade',
            ]}
            doubleHeaderSizes={[4, 1, 3]}
            fullBorders={[4]}
          >
            <tr>
              <td data-label='operação'>Corte</td>
              <td data-label='previsto'>18 horas</td>
              <td data-label='realizado'>17 horas</td>
              <td data-label='desvio'>{displayWithStyle(-1, 'desvio')}</td>
              <td
                data-label='previsto(atual)'
                style={{
                  borderLeft: '2px solid var(--grayEdges)',
                  borderRight: '2px solid var(--grayEdges)',
                }}
              >
                34 horas
              </td>
              <td data-label='previsto'>1 hora</td>
              <td data-label='realizado'>50 min.</td>
              <td data-label='desvio'>
                {displayWithStyle(-25, 'desvio')} min.
              </td>
            </tr>
          </CustomTable>
        </Content>
      ) : null}
      {/* Docs */}
      <Content>
        <a className={styles.docsMain}>
          <div className={styles.tableContainer}>
            <div id='pad' style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <a className='headerTitle'>Documentos</a>
              </div>
              <div className='flex'>
                <div>
                  <PrimaryBtn text='Carregar' icon={<FilePlus />} />
                </div>
                <div>
                  <PrimaryBtn light text='Criar Pasta' icon={<FolderPlus />} />
                </div>
              </div>
            </div>
            <div className={tableStyles.table}>
              <div style={{ display: 'flex', width: '100%' }}>
                <th style={{ display: 'flex', width: '70%' }}>
                  Nome
                  <a
                    id='align'
                    style={{ maxWidth: '150px', marginLeft: 'auto' }}
                  >
                    <Code
                      style={{
                        height: '14px',
                        width: '14px',
                        transform: 'rotate(-90deg)',
                      }}
                    />
                  </a>
                </th>
                <th style={{ width: '15%', display: 'flex' }}>
                  Data
                  <a
                    id='align'
                    style={{ maxWidth: '150px', marginLeft: 'auto' }}
                  >
                    <Code
                      style={{
                        height: '14px',
                        width: '14px',
                        transform: 'rotate(-90deg)',
                      }}
                    />
                  </a>
                </th>
                <th style={{ width: '15%' }}>Ações</th>
                <th style={{ width: '2%' }}></th>
              </div>
              <div className='scrollableZone' style={{ overflowX: 'hidden' }}>
                {[...Array(10)].map((x, i) => (
                  <div key={i}>
                    <Accordion
                      expanded={expanded === `panel${i}`}
                      onChange={handleChange(`panel${i}`)}
                    >
                      <AccordionSummary
                        className={styles.docRow}
                        aria-controls='panel1bh-content'
                        sx={{ padding: '0.5rem' }}
                      >
                        <Typography
                          id='align'
                          sx={{
                            width: '70%',
                            flexShrink: 0,
                            color: 'var(--primary)',
                            fontFamily: 'Montserrat',
                            fontSize: 'small',
                          }}
                        >
                          <Folder style={{ marginRight: '1rem' }} />
                          Desenho {i + 1}
                        </Typography>
                        <Typography
                          sx={{
                            width: '15%',
                            fontFamily: 'Montserrat',
                            fontSize: 'small',
                          }}
                        >
                          11/09/2022
                        </Typography>
                        <Typography
                          id='align'
                          sx={{
                            color: 'text.secondary',
                            width: '15%',
                            paddingRight: '1rem',
                          }}
                        >
                          <Edit className='link' />
                          <Trash className='link' />
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                        <DockFolderRow
                          key={docs[0].id}
                          doc={docs[0]}
                          num={10 + i}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
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
                  fontWeight: 'bold',
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
                  paddingTop: '0.5rem',
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
      {/* Messages */}
      <Content>
        <div
          id='pad'
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <a className='headerTitle'>Mensagens</a>
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
      {/* Docs Cliente */}
      <Content>
        <a className={styles.docsMain}>
          <div className={styles.tableContainer}>
            <div id='pad' style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <a className='headerTitle'>Documentos Cliente</a>
              </div>
              <div className='flex'>
                <div>
                  <PrimaryBtn text='Carregar' icon={<FilePlus />} />
                </div>
                <div>
                  <PrimaryBtn light text='Criar Pasta' icon={<FolderPlus />} />
                </div>
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
                  fontWeight: 'bold',
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
                  paddingTop: '0.5rem',
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
    </Grid>
  );
};
Order.propTypes = {
  orderId: PropTypes.string,
  docs: PropTypes.arrayOf(PropTypes.object),
};
export default Order;
