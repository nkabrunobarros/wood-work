/* eslint-disable react/prop-types */
//  Nodes
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import routes from '../../../navigation/routes';
import Content from '../../content/content';

import styles from '../../../styles/Order.module.css';
import stylesMessage from '../../../styles/Messages.module.css';
import Paper from '@mui/material/Paper';

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
} from 'lucide-react';
import CustomTable from '../../table/table';
import PrimaryBtn from '../../buttons/primaryBtn';
import {
  Avatar,
  ButtonGroup,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import Router from 'next/router';
import AdvancedTable from '../../advancedTable/AdvancedTable';
// import Snackbar from '@mui/material/Snackbar';

const Order = ({ ...props }) => {
  const { orderId, docs, breadcrumbsPath, internalPOV, orders } = props;
  const [activeRow, setActiveRow] = useState(0);

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
          <FileText stroke-width="1" style={{ marginRight: '1rem' }} />
          {doc.name}
        </td>
        <td data-label='Data'> {doc.data} </td>
        <td data-label='Ações'>
          <Edit stroke-width="1" className='link' />
          <Trash stroke-width="1" className='link' />
        </td>
        <td>{activeRow === num ? <div className='dot'></div> : null}</td>
      </tr>
    );
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
          <Edit stroke-width="1" className='link' />
          <Trash stroke-width="1" className='link' />
        </td>
      </tr>
    );
  };

  const rows = orders;

  function Row({ row, index }) {
    const [open, setOpen] = useState(false);
    let style = {};
    if (open)
      style = {
        borderColor: 'var(--primary)',
        backgroundColor: 'red',
      };

    return (
      <React.Fragment>
        <TableRow
          onClick={() => setOpen(!open)}
          sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
          className={styles.docRow}
          styles={style}
        >
          <TableCell>
            <div id='align' style={{ color: 'var(--primary)' }}>
              <Folder stroke-width="1" style={{ marginRight: '1rem' }} /> Orçamentação {index}
            </div>
          </TableCell>
          <TableCell>11/06/2022</TableCell>
          <TableCell align='right'>
            <ButtonGroup aria-label='outlined primary button group'>
              <Tooltip title='Edit'>
                <IconButton>
                  <Edit stroke-width="1" className='link' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton>
                  <Trash stroke-width="1" className='link' />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={12}>
            <Collapse
              sx={{
                borderTop: '1px solid var(--grayEdges)',
                margin: 'none',
                padding: 'none',
              }}
              in={open}
              timeout='auto'
              unmountOnExit
            >
              <Table sx={{ padding: 0, margin: 0 }}>
                <TableRow fullWidth style={{ backgroundColor: '#F1FBFF' }}>
                  <TableCell width='70%'>
                    <div id='align' style={{ color: 'var(--primary)' }}>
                      <FileText stroke-width="1" style={{ marginRight: '1rem' }} /> Documento 1
                    </div>
                  </TableCell>
                  <TableCell width='30%'>11/03/2022</TableCell>
                  <TableCell>
                    <ButtonGroup aria-label='outlined primary button group'>
                      <Tooltip title='Edit'>
                        <IconButton>
                          <Edit stroke-width="1" className='link' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete'>
                        <IconButton>
                          <Trash stroke-width="1" className='link' />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  const orderDetail = [
    {
      id: Math.random(),
      clienteTime: '04 abril 2022',
      real: '06 abril 2022',
      start: '17 março 2022',
      end: '06 abril 2022',
      time: 37,
    },
  ];

  const headCellsUpperOrderDetail = [
    {
      id: 'deadline',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Data de Entrega',
      span: 2,
    },
    {
      id: 'production',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Produção',
      span: 2,
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Quantidade Encomendada: 25 Un',
      span: 1,
    },
  ];

  const headCellsOrderDetail = [
    {
      id: 'clienteTime',
      label: 'Cliente',
    },
    {
      id: 'real',
      label: 'Real',
    },
    {
      id: 'start',
      label: 'Inicio',
      borderLeft: true,
    },
    {
      id: 'end',
      label: 'Fim',
      borderRight: true,
    },
    {
      id: 'time',
      disablePadding: false,
      label: 'Tempo',
    },
  ];
  const headCellsProductionDetail = [
    {
      id: 'operacao',
      label: 'Operação',
    },
    {
      id: 'previsto1',
      label: 'Previsto',
    },
    {
      id: 'realizado',
      label: 'Realizado',
    },
    {
      id: 'desvio',
      label: 'Desvio',
    },
    {
      id: 'previstoAtual',
      label: 'Previsto (Atual)',
      borderLeft: true,
      borderRight: true,
    },
    {
      id: 'previsto2',
      label: 'Previsto',
    },
    {
      id: 'realizado2',
      label: 'Realizado',
    },
    {
      id: 'desvio2',
      label: 'Desvio',
    },
  ];
  const headCellsUpperProductionDetail = [
    {
      id: 'amountDone',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Quantidade Produzida: 12 Un',
      span: 4,
    },
    {
      id: 'orderedAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Quantidade Encomendada: 25 Un',
      span: 1,
    },
    {
      id: 'perUnit',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Por Unidade',
      span: 3,
    },
  ];
  const productionDetail = [
    {
      id: Math.random(),
      operacao: 'Corte',
      previsto1: 18,
      realizado: 17,
      desvio: -1,
      previstoAtual: 34,
      previsto2: 1,
      realizado2: 1,
      desvio2: 0,
    },
  ];
  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />

      <Content>
        <div id='pad'>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <a className='headerTitleXl'>Encomenda Nº {orderId}</a>
            <div style={{ marginLeft: 'auto' }}>
              <PrimaryBtn icon={<Tag stroke-width="1"/>} text='Gerar Etiquetas' />
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
                }}
              >
                <AdvancedTable
                  noPagination
                  rows={orderDetail}
                  headCells={headCellsOrderDetail}
                  headCellsUpper={headCellsUpperOrderDetail}
                />
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

      <Content></Content>

      {/* Produção section */}
      {internalPOV ? (
        <Content>
          <div id='pad'>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <a className='headerTitle'>Produção</a>
              <div style={{ marginLeft: 'auto' }}>
                <PrimaryBtn icon={<Eye stroke-width="1" />} text='Ver detalhes' />
              </div>
            </div>
          </div>
          <AdvancedTable
            noPagination
            rows={productionDetail}
            headCells={headCellsProductionDetail}
            headCellsUpper={headCellsUpperProductionDetail}
          />
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
                  <PrimaryBtn text='Carregar' icon={<FilePlus stroke-width="1" />} />
                </div>
                <div>
                  <PrimaryBtn light text='Criar Pasta' icon={<FolderPlus stroke-width="1" />} />
                </div>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label='collapsible table'>
                <TableHead stickyHeader aria-label='sticky table'>
                  <TableRow style={{ backgroundColor: 'var(--grayBG)' }}>
                    <TableCell width='70%'>Nome</TableCell>
                    <TableCell width='30%'>Data</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <Row key={row.name} row={row} index={i} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                <Folder stroke-width="0.5" size={54} stroke='#8793AB' fill='#E7E8E9' />
                15 Ficheiros
              </div>
              <a id='align'>
                <FileText stroke-width="1" style={{ marginRight: '1rem' }} size={20} />
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
                    <FileText stroke-width="1"
                      style={{ marginRight: '1rem' }}
                      size={20}
                      stroke='transparent'
                    />
                    <a>Salvo em</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText stroke-width="1"
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
                    <FileText stroke-width="1"
                      style={{ marginRight: '1rem' }}
                      size={20}
                      stroke='transparent'
                    />
                    <a>11 de Fevereiro 2022</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText stroke-width="1"
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
                  <PrimaryBtn text='Carregar' icon={<FilePlus stroke-width="1" />} />
                </div>
                <div>
                  <PrimaryBtn light text='Criar Pasta' icon={<FolderPlus stroke-width="1" />} />
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
                <FileText stroke-width="0.5" size={54} stroke='#8793AB' />
                151 MB
              </div>
              <a id='align'>
                <FileText stroke-width="1" style={{ marginRight: '1rem' }} size={20} />
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
                    <FileText stroke-width="1"
                      style={{ marginRight: '1rem' }}
                      size={20}
                      stroke='transparent'
                    />
                    <a>Salvo em</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText stroke-width="1"
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
                    <FileText stroke-width="1"
                      style={{ marginRight: '1rem' }}
                      size={20}
                      stroke='transparent'
                    />
                    <a>11 de Fevereiro 2022</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText stroke-width="1"
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
  orders: PropTypes.arrayOf(PropTypes.object),
};
export default Order;
