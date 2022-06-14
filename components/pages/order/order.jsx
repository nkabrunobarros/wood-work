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
  FolderOpen,
} from 'lucide-react';
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

const Order = ({ ...props }) => {
  const {
    order,
    docs,
    breadcrumbsPath,
    internalPOV,
    productionDetail,
    headCellsUpperProductionDetail,
    headCellsProductionDetail,
    headCellsOrderDetail,
    headCellsUpperOrderDetail,
    headCellsMessages,
    headCellsDocs,
    pageProps,
    orderDetail,
  } = props;
  const [activeRow, setActiveRow] = useState(0);

  // const DocRow = ({ doc, num }) => {
  //   let style = {};
  //   if (activeRow === num) {
  //     style = {
  //       backgroundColor: 'var(--primary-light-opacity)',
  //       borderColor: 'var(--primary)',
  //     };
  //   }
  //   return (
  //     <tr
  //       key={doc.id}
  //       className={styles.docRow}
  //       style={style}
  //       onClick={() => setActiveRow(doc.id - 1)}
  //     >
  //       <td id='align' data-label='Nome' className='link'>
  //         <FileText strokeWidth='1' style={{ marginRight: '1rem' }} />
  //         {doc.name}
  //       </td>
  //       <td data-label='Data'> {doc.data} </td>
  //       <td data-label='Ações'>
  //         <Edit strokeWidth='1' className='link' />
  //         <Trash strokeWidth='1' className='link' />
  //       </td>
  //       <td>{activeRow === num ? <div className='dot'></div> : null}</td>
  //     </tr>
  //   );
  // };
  // eslint-disable-next-line react/prop-types
  // const MessageRow = ({ num }) => {
  //   return (
  //     <tr
  //       className={stylesMessage.messageRow}
  //       onClick={() => Router.push(routes.private.messages)}
  //     >
  //       <td data-label='Mensagem' className={stylesMessage.messageRowContent}>
  //         <div className={stylesMessage.avatarContainer}>
  //           <Avatar className={stylesMessage.avatar}>N</Avatar>
  //         </div>
  //         <div style={{ paddingLeft: '1rem' }}>
  //           <div className={stylesMessage.sender}> Order Nº 17212</div>
  //           <div>
  //             Hey man this is a dummy text just to see how far this goes and how
  //             it goes and still goes futher than this omg what the hell
  //           </div>
  //         </div>
  //       </td>
  //       <td data-label='Data'>
  //         <a>11/02/2022</a>
  //       </td>
  //       <td data-label='Ações'>
  //         <Edit strokeWidth='1' className='link' />
  //         <Trash strokeWidth='1' className='link' />
  //       </td>
  //     </tr>
  //   );
  // };

  function Row({ row, index }) {
    Row.propTypes = {
      row: PropTypes.any,
      index: PropTypes.number,
    };
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
              {open ? (
                <FolderOpen strokeWidth='1' style={{ marginRight: '1rem' }} />
              ) : (
                <Folder strokeWidth='1' style={{ marginRight: '1rem' }} />
              )}
              Orçamentação {index}
            </div>
          </TableCell>
          <TableCell>11/06/2022</TableCell>
          <TableCell>
            <ButtonGroup>
              <Tooltip title='Edit'>
                <IconButton>
                  <Edit
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                    className='link'
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton>
                  <Trash
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                    className='link'
                  />
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
                      <FileText
                        strokeWidth='1'
                        style={{ marginRight: '1rem' }}
                      />
                      Documento 1
                    </div>
                  </TableCell>
                  <TableCell width='30%'>11/03/2022</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Tooltip title='Edit'>
                        <IconButton>
                          <Edit
                            className='link'
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete'>
                        <IconButton>
                          <Trash
                            className='link'
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
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
  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />

      <Content>
        <div id='pad'>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <a className='headerTitleXl'>Encomenda Nº {order.id}</a>
            <div style={{ marginLeft: 'auto' }}>
              <PrimaryBtn
                icon={
                  <Tag
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
                text='Gerar Etiquetas'
              />
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

      {/* Produção section */}
      {internalPOV ? (
        <Content>
          <div id='pad'>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <a className='headerTitle'>Produção</a>
              <div style={{ marginLeft: 'auto' }}>
                <PrimaryBtn
                  icon={
                    <Eye
                      strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                    />
                  }
                  text='Ver detalhes'
                />
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
      {internalPOV ? (
        <Content>
          <a className={styles.docsMain}>
            <div className={styles.tableContainer}>
              <div id='pad' style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <a className='headerTitle'>Documentos</a>
                </div>
                <div className='flex'>
                  <div>
                    <PrimaryBtn
                      text='Carregar'
                      icon={
                        <FilePlus
                          strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                      }
                    />
                  </div>
                  <div>
                    <PrimaryBtn
                      light
                      text='Criar Pasta'
                      icon={
                        <FolderPlus
                          strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                      }
                    />
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
                    {[...Array(2)].map((row, i) => (
                      <Row key={i} row={row} index={i} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.infoContainer}>
              <a className='headerTitleSm'>Desenho 1</a>
              <div className={styles.innerInfoContainer}>
                <a id='align'>
                  <Info
                    style={{ marginRight: '1rem' }}
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
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
                  <Folder
                    strokeWidth={pageProps.globalVars.iconXlStrokeWidth}
                    size={pageProps.globalVars.iconSizeXxl}
                    stroke='#8793AB'
                    fill='#E7E8E9'
                  />
                  15 Ficheiros
                </div>
                <a id='align'>
                  <FileText
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                    style={{ marginRight: '1rem' }}
                  />
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
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                        style={{ marginRight: '1rem' }}
                        stroke='transparent'
                      />
                      <a>Salvo em</a>
                    </div>
                    <div id='align'>
                      <a>
                        <FileText
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                          style={{ marginRight: '1rem' }}
                          stroke='transparent'
                        />
                        Alterado em
                      </a>
                    </div>
                  </div>
                  <div>
                    <div id='align'>
                      <FileText
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                        style={{ marginRight: '1rem' }}
                        stroke='transparent'
                      />
                      <a>11 de Fevereiro 2022</a>
                    </div>
                    <div id='align'>
                      <a>
                        <FileText
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                          style={{ marginRight: '1rem' }}
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
      ) : null}

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
            <PrimaryBtn
              icon={
                <MessageSquare
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              }
              text={'Criar Nova'}
            />
          </div>
        </div>
        <div>
          <AdvancedTable
            rows={Array(2)}
            headCells={headCellsMessages}
            noPagination
          >
            {[...Array(2)].map((x, i) => (
              <TableRow key={i} className={styles.docRow}>
                <TableCell
                  className={stylesMessage.messageRowContent}
                  onClick={() => Router.push(routes.private.messages)}
                >
                  <div className={stylesMessage.avatarContainer}>
                    <Avatar className={stylesMessage.avatar}>N</Avatar>
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>
                    <div className={stylesMessage.sender}>Order Nº {i + 1}</div>
                    <div>Mensagem contents</div>
                  </div>
                </TableCell>
                <TableCell>11/02/2022</TableCell>
                <TableCell>
                  <Tooltip title='Edit'>
                    <IconButton>
                      <Edit
                        className='link'
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <IconButton>
                      <Trash
                        className='link'
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </AdvancedTable>
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
                  <PrimaryBtn
                    text='Carregar'
                    icon={
                      <FilePlus
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    }
                  >
                    <input type='file' hidden />
                  </PrimaryBtn>
                </div>
              </div>
            </div>

            <AdvancedTable headCells={headCellsDocs} rows={docs} noPagination>
              {docs.map((doc, i) => (
                <TableRow
                  key={i}
                  style={{
                    backgroundColor:
                      activeRow === doc.id - 1
                        ? 'var(--primary-light-opacity)'
                        : null,
                    borderColor:
                      activeRow === doc.id - 1 ? 'var(--primary)' : null,
                  }}
                  className={styles.docRow}
                  onClick={() => setActiveRow(doc.id - 1)}
                >
                  <TableCell className='link'>{doc.name}</TableCell>
                  <TableCell>{doc.data}</TableCell>
                  <TableCell>
                    <Tooltip title='Edit'>
                      <IconButton>
                        <Edit
                          className='link'
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                      <IconButton>
                        <Trash
                          className='link'
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {activeRow === doc.id - 1 ? (
                      <div className='dot'></div>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </AdvancedTable>
          </div>
          <div className={styles.infoContainer}>
            <a className='headerTitleSm'>{docs[activeRow].name}</a>
            <div className={styles.innerInfoContainer}>
              <a id='align'>
                <Info
                  style={{ marginRight: '1rem' }}
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
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
                <FileText
                  strokeWidth={pageProps.globalVars.iconXlStrokeWidth}
                  size={pageProps.globalVars.iconSizeXxl}
                  stroke='#8793AB'
                />
                {docs[activeRow].fileSize}
              </div>
              <a id='align'>
                <FileText
                  strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                  style={{ marginRight: '1rem' }}
                />
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
                      strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                      style={{ marginRight: '1rem' }}
                      stroke='transparent'
                    />
                    <a>Salvo em</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                        style={{ marginRight: '1rem' }}
                        stroke='transparent'
                      />
                      Alterado em
                    </a>
                  </div>
                </div>
                <div>
                  <div id='align'>
                    <FileText
                      strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize}
                      style={{ marginRight: '1rem' }}
                      stroke='transparent'
                    />
                    <a>{docs[activeRow].createdAt}</a>
                  </div>
                  <div id='align'>
                    <a>
                      <FileText
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                        style={{ marginRight: '1rem' }}
                        stroke='transparent'
                      />
                      <a>{docs[activeRow].updatedAt}</a>
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
  order: PropTypes.string,
  docs: PropTypes.arrayOf(PropTypes.object),
  orders: PropTypes.arrayOf(PropTypes.object),
  breadcrumbsPath: PropTypes.array,
  internalPOV: PropTypes.boolean,
  productionDetail: PropTypes.array,
  headCellsUpperProductionDetail: PropTypes.array,
  headCellsProductionDetail: PropTypes.array,
  headCellsOrderDetail: PropTypes.array,
  headCellsUpperOrderDetail: PropTypes.array,
  headCellsMessages: PropTypes.array,
  headCellsDocs: PropTypes.array,
  pageProps: PropTypes.object,
  orderDetail: PropTypes.array,
};
export default Order;
