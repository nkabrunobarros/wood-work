//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import routes from '../../../navigation/routes';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';

import Paper from '@mui/material/Paper';
import stylesMessage from '../../../styles/Messages.module.css';
import styles from '../../../styles/Order.module.css';
import GetFileSize from '../../utils/GetFileSize';
import IsInternal from '../../utils/IsInternal';

//  PropTypes
import {
  Avatar, Box, ButtonGroup, Collapse,
  IconButton, Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Edit,
  Eye,
  File,
  FilePlus,
  FileText,
  Folder,
  FolderOpen,
  FolderPlus, Info,
  MessageSquare,
  Tag,
  Trash,
  View
} from 'lucide-react';
import moment from 'moment';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as FileActions from '../../../pages/api/actions/file';
import * as FolderActions from '../../../pages/api/actions/folder';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import PrimaryBtn from '../../buttons/primaryBtn';
import Notification from '../../dialogs/Notification';
import UploadImagesModal from '../../modals/UploadImages';

const Order = ({ ...props }) => {
  const {
    headCellsUpperProductionDetail,
    headCellsProductionDetail,
    headCellsUpperOrderDetail,
    headCellsOrderDetail,
    headCellsMessages,
    productionDetail,
    breadcrumbsPath,
    headCellsDocs,
    orderDetail,
    pageProps,
    order,
  } = props;

  const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).perfil.descricao);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState(props.folders);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [refresh, setRefresh] = useState(new Date());
  const [docsModal, setDocsModal] = useState(false);
  const [docsModalClient, setDocsModalClient] = useState(false);
  const [errorMessageFolderName, setErrorMessageFolderName] = useState();
  const [activeFolder, setActiveFolder] = useState(0);

  function Row({ row, index }) {
    const [open, setOpen] = useState(false);

    function onRowClick() {
      setOpen(!open);
      setActiveFolder(index);
    }

    return (
      <React.Fragment>
        <TableRow
          sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
          className={styles.docRow}
          style={{ borderColor: open && 'var(--primary)' }}
          onClick={() => onRowClick()}
        // styles={open && style}
        >
          <TableCell >
            <div id='align' style={{ color: 'var(--primary)' }}>
              {open ? (
                <FolderOpen strokeWidth='1' style={{ marginRight: '1rem' }} />
              ) : (
                <Folder strokeWidth='1' style={{ marginRight: '1rem' }} />
              )}
              {row.name}
            </div>
          </TableCell>
          <TableCell onClick={() => setOpen(!open)}>{moment(row.createdAt).format('DD/MM/YYYY')}</TableCell>
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
                {row.files[0] && row.files[0].map((file) => (
                  <TableRow key={file.id} fullWidth style={{ backgroundColor: '#F1FBFF' }}>
                    <TableCell width='70%'>
                      <div id='align' style={{ color: 'var(--primary)' }}>
                        <FileText
                          strokeWidth='1'
                          style={{ marginRight: '1rem' }}
                        />
                        {file.filename}
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

                ))}
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.any,
    index: PropTypes.number,
  };

  async function handleCreateFolder() {

    if (!newFolderName) {
      setErrorMessageFolderName('Não pode ser vazio');

      return;
    }

    const builtFolder = {
      name: newFolderName,
      orderDetailId: order.id
    };

    await FolderActions
      .saveFolder(builtFolder)
      .then((response) => {
        response.data.payload.files = [];
        setFolders([...folders, response.data.payload]);
        setNewFolderName('');
        setRefresh(new Date());
      })
      .catch((err) => console.log(err));

    setCreatingFolder(false);
  }

  async function deleteDoc(id) {
    try {
      await FileActions.removeFile({ id }).then((res) => {
        toast.success(`${res.data.payload.filename} removido!`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onImagesUpload() {

    await FolderActions
      .folders({ id: order.id })
      .then(async (res) => {

        res.data.payload.data.map(async (fold, i) => {
          res.data.payload.data[i].files = [];

          await FileActions
            .files({ id: fold.id })
            .then((result) => res.data.payload.data[i].files.push(result.data.payload.data))
            .catch((err) => console.log(err));
        });

        setFolders(res.data.payload.data);
      })
      .catch((err) => console.log(err));

    setDocsModal(false);
    setDocsModalClient(false);

  }


  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <UploadImagesModal open={docsModalClient} client folders={folders} {...pageProps} orderId={order.id} onClose={() => onImagesUpload()} />
      <UploadImagesModal open={docsModal} folders={folders.filter(ele => ele.name !== order.id)} {...pageProps} onClose={() => onImagesUpload()} />
      <Content id={refresh}>
        <div id='pad'>
          <div style={{ display: 'flex', marginBottom: '1rem' }}>
            <a className='headerTitleXl'>Encomenda Nº {order.order.id}</a>
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
              <Grid container md={12}>
                <Grid md={4} container>
                  <Grid md={12} sm={6}>
                    <Typography color={"lightTextSm.main"} >Cliente</Typography>
                    <Typography color={"lightTextSm.black"} >{order.order.client.legalName}</Typography>
                  </Grid>
                  <Grid md={12} sm={6}>
                    <Typography color={"lightTextSm.main"} >Produto</Typography>
                    <Typography color={"lightTextSm.black"} >{order.product.name}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  md={8}
                  container>
                  <AdvancedTable
                    noPagination
                    rows={orderDetail}
                    headCells={headCellsOrderDetail}
                    headCellsUpper={headCellsUpperOrderDetail}
                  />
                </Grid>
              </Grid>
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
      {
        internalPOV ? (
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
        ) : null
      }
      {/* Docs */}
      {
        internalPOV && (
          <Content>
            <div className={styles.docsMain}>
              <div className={styles.tableContainer}>
                <div id='align' style={{ display: 'flex', padding: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <a className='headerTitle'>Documentos</a>
                  </div>
                  <div className='flex'>
                    {!creatingFolder ?
                      <PrimaryBtn
                        disabled={!folders.filter(ele => !(ele.name === order.id))[0]}
                        text='Carregar'
                        onClick={() => setDocsModal(true)}
                        icon={
                          <FilePlus
                            strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        }
                      />
                      :
                      <div id='align'>
                        <span style={{ paddingRight: '.5rem' }}>Nome</span>
                        <TextField
                          error={!!errorMessageFolderName}
                          label={errorMessageFolderName}
                          inputProps={{
                            maxlength: 20
                          }}
                          helperText={`${newFolderName.length}/20`}

                          value={newFolderName}
                          onChange={(e) => {
                            setErrorMessageFolderName();
                            setNewFolderName(e.target.value);
                          }}
                          variant='standard'
                        />
                      </div>
                    }
                    <div>
                      <PrimaryBtn
                        light
                        text='Criar Pasta'
                        onClick={() => !creatingFolder ? setCreatingFolder(true) : handleCreateFolder()}
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
                    <TableHead aria-label='sticky table'>
                      <TableRow>
                        <TableCell width={!!folders && '70%'}>Nome</TableCell>
                        <TableCell width={!!folders && '30%'}>Data</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {folders && folders.filter(ele => !(ele.name === order.id)).map((row, i) => (
                        <Row key={i} row={row} index={i} />
                      ))}
                      {!folders && <>
                        <TableCell></TableCell>
                        <TableRow sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span>Sem pastas, <a className='link' onClick={() => setCreatingFolder(true)}>Crie uma</a></span></TableRow>
                        <TableCell></TableCell>
                      </>}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <Box className={styles.infoContainer}>
                <Typography className='headerTitleSm'>{folders[activeFolder]?.name}</Typography>
                <Grid container md={12} bgcolor={"lightGray.main"} className={styles.innerInfoContainer}>
                  <Grid container md={12}>
                    <Grid md={2}>
                      <Info
                        style={{ marginRight: '1rem' }}
                        strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    </Grid>
                    <Grid md={10}>Informações</Grid>
                  </Grid>
                  <Grid container md={12} id="fullCenter">
                    <Box
                      id='align'
                      style={{
                        justifyContent: 'center',
                        padding: '1rem',
                        flexDirection: 'column',
                        color: '#8793AB',
                        fontWeight: 'bold',
                        width: '100%',
                      }}>
                      <Folder
                        strokeWidth={pageProps.globalVars.iconXlStrokeWidth}
                        size={pageProps.globalVars.iconSizeXxl}
                        stroke='#8793AB'
                        fill='#E7E8E9'
                      />
                      <Typography fontSize={'14px'} >{folders[activeFolder]?.files ? Object.keys(folders[activeFolder]?.files).length : '0'} Ficheiro(s)</Typography>
                    </Box>
                  </Grid>
                  <Grid container md={12}>
                    <Grid md={2}>
                      <FileText
                        style={{ marginRight: '1rem' }}
                        strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    </Grid>
                    <Grid md={10}>Propriedades</Grid>
                  </Grid>
                  <Grid container md={12}>
                    <Grid md={6}> <Typography fontSize={'14px'} color={"lightTextSm.black"} >Salvo em</Typography></Grid>
                    <Grid md={6}> <Typography fontSize={'14px'} color={"lightTextSm.main"} >CreatedAT</Typography></Grid>
                  </Grid>
                  <Grid container md={12}>
                    <Grid md={6}> <Typography fontSize={'14px'} color={"lightTextSm.black"} >Alterado em</Typography></Grid>
                    <Grid md={6}> <Typography fontSize={'14px'} color={"lightTextSm.main"} >AlteradoEm</Typography></Grid>
                  </Grid>
                </Grid>
              </Box>

            </div>
          </Content>
        )
      }

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
                    <div className={stylesMessage.sender}>Encomenda Nº {i + 1}</div>
                    <div>Conteudo</div>
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
      <Content id={refresh}>
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
                    onClick={() => setDocsModalClient(true)}
                    icon={
                      <FilePlus
                        strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <AdvancedTable headCells={headCellsDocs} rows={[]}>
              {folders.find(ele => ele.name === order.id)?.files[0]?.map((doc, i) => (
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
                  onClick={() => setActiveRow(i)}
                >
                  <TableCell className='link'>
                    <Box id='align'>
                      <File
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                      {doc.filename}
                    </Box>
                  </TableCell>
                  <TableCell>{moment(doc.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Tooltip title='Editar'>
                        <IconButton>
                          <Edit
                            className='link'
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Remover'>
                        <IconButton onClick={() => deleteDoc(doc.id)}>
                          <Trash
                            className='link'
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>
                    {activeRow === i ? (
                      <Tooltip title='Ver Imagem'>
                        <IconButton>
                          <View className='link'
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </AdvancedTable>

          </div>
          {/* {folders.files && */}
          {false &&
            <div className={styles.infoContainer}>
              <a className='headerTitleSm'>{folders[activeRow]?.filename}</a>
              <div className={styles.innerInfoContainer}>
                <a id='align' target='#'>
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
                  {GetFileSize(folders[activeRow]?.filesize)}
                </div>
                {/* <Image src={files[activeRow].data} width={200} height={200} layout='responsive' /> */}
                <Grid container >
                  <Grid container>
                    <Grid id='align' item sm={12}>
                      <FileText
                        strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                        style={{ marginRight: '1rem' }}
                      />
                      <Typography className='lightTextSm black' fontSize={'small'} >Propriedades</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item sm={6}>Salvo em</Grid>
                    <Grid item sm={6}>{moment(folders[activeRow]?.dataCriacao).format('DD/MM/YYYY hh:mm')}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item sm={6}>Alterado em</Grid>
                    <Grid item sm={6}>{moment(folders[activeRow]?.dataCriacao).format('DD/MM/YYYY hh:mm ')}</Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          }

        </a>
      </Content>
    </Grid >
  );
};

Order.propTypes = {
  order: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.object),
  breadcrumbsPath: PropTypes.array,
  internalPOV: PropTypes.bool,
  productionDetail: PropTypes.array,
  headCellsUpperProductionDetail: PropTypes.array,
  headCellsProductionDetail: PropTypes.array,
  headCellsOrderDetail: PropTypes.array,
  headCellsUpperOrderDetail: PropTypes.array,
  headCellsMessages: PropTypes.array,
  headCellsDocs: PropTypes.array,
  pageProps: PropTypes.object,
  orderDetail: PropTypes.array,
  folders: PropTypes.array,
};

export default Order;
