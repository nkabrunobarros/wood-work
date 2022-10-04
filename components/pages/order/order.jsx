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
import AdvancedTable from '../../advancedTable/AdvancedTable';
import PrimaryBtn from '../../buttons/primaryBtn';
import Notification from '../../dialogs/Notification';
import UploadImagesModal from '../../modals/UploadImages';

const Order = ({ ...props }) => {
  const {
    order,
    breadcrumbsPath,
    productionDetail,
    headCellsUpperProductionDetail,
    headCellsProductionDetail,
    headCellsOrderDetail,
    headCellsUpperOrderDetail,
    headCellsMessages,
    headCellsDocs,
    pageProps,
    orderDetail
  } = props;

  const [files, setFiles] = useState(props.files)
  const internalPOV = IsInternal(pageProps.loggedUser?.perfil.descricao)
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [refresh, setRefresh] = useState(new Date());
  const [docsModal, setDocsModal] = useState(false)
  const [errorMessageFolderName, setErrorMessageFolderName] = useState()

  function Row({ row }) {

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
          sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
          className={styles.docRow}
          styles={style}
        >
          <TableCell onClick={() => setOpen(!open)}>
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

  async function getBase64(file) {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };

    });
  }

  function handleFileInputChange(e) {

    const file = e.target.files[0];

    getBase64(file)
      .then(async (result) => {
        file.base64 = result;
        console.log(file)

        const builtFile = {
          descricao: "Description here",
          url: "a",
          data: file.base64,
          filename: file.name,
          filesize: JSON.stringify(file.size),
        }

        await FileActions.saveFile(builtFile).then((res) => console.log(res))
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCreateFolder() {

    if (!newFolderName) {
      setErrorMessageFolderName('Não pode ser vazio')

      return;
    }

    const builtFolder = {
      id: Math.random().toString(),
      name: newFolderName,
      createdAt: Date.now()
    }

    const allFolders = folders;

    allFolders.push(builtFolder);
    setFolders(allFolders);
    setNewFolderName('');
    setCreatingFolder(false);
    setRefresh(new Date())
  }

  async function deleteDoc(id) {
    try {
      await FileActions.removeFile({ id }).then((res) => {
        setFiles(files.filter(item => item.id !== id))
        toast.success(`${res.data.payload.filename} removido!`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid component='main' sx={{ height: '100%' }}>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <UploadImagesModal open={docsModal} folders={folders} {...pageProps} onClose={() => setDocsModal(false)} />
      <Content id={refresh}>
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
                  <a className='lightTextSm black'>{order.client.legalName}</a>
                  <br></br>
                </div>

                <div>
                  <a className='lightTextSm'>Produto</a>
                  <br></br>
                  <a className='lightTextSm black'>{order.product.name}</a>
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
        internalPOV ? (
          <Content>
            <a className={styles.docsMain}>
              <div className={styles.tableContainer}>
                <div id='align' style={{ display: 'flex', padding: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <a className='headerTitle'>Documentos</a>
                  </div>
                  <div className='flex'>
                    {!creatingFolder ?
                      <PrimaryBtn
                        disabled={folders[0] === undefined}
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
                            maxlength: 30
                          }}
                          helperText={`${newFolderName.length}/20`}

                          value={newFolderName}
                          onChange={(e) => {
                            setErrorMessageFolderName()
                            setNewFolderName(e.target.value)
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
                      <TableRow style={{ backgroundColor: 'var(--grayBG)' }}>
                        <TableCell width={!!folders[0] && '70%'}>Nome</TableCell>
                        <TableCell width={!!folders[0] && '30%'}>Data</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {folders?.map((row, i) => (
                        <Row key={i} row={row} index={i} />
                      ))}
                      {!folders[0] && <>
                        <TableCell></TableCell>
                        <TableRow sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span>Sem pastas, <a className='link' onClick={() => setCreatingFolder(true)}>Crie uma</a></span></TableRow>
                        <TableCell></TableCell>
                      </>}
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
        ) : null
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
                    onClick={() => setDocsModal(true)}
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
              {files.map((doc, i) => (
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
          {files[activeRow]?.filename &&
            <div className={styles.infoContainer}>
              <a className='headerTitleSm'>{files[activeRow]?.filename}</a>
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
                  {GetFileSize(files[activeRow]?.filesize)}
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
                    <Grid item sm={6}>{moment(files[activeRow]?.dataCriacao).format('DD/MM/YYYY hh:mm')}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item sm={6}>Alterado em</Grid>
                    <Grid item sm={6}>{moment(files[activeRow]?.dataCriacao).format('DD/MM/YYYY hh:mm ')}</Grid>
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
  files: PropTypes.array,
};

export default Order;
