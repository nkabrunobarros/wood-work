//  PropTypes
import { Box, ButtonGroup, Grid, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { Edit, File, FilePlus, FileText, Info, Trash, View } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as FileActions from '../../../../pages/api/actions/file';
import * as FolderActions from '../../../../pages/api/actions/folder';
import AdvancedTable from '../../../advancedTable/AdvancedTable';
import PrimaryBtn from '../../../buttons/primaryBtn';
import UploadImagesModal from '../../../modals/UploadImages';
import GetFileSize from '../../../utils/GetFileSize';

const DocsClient = (props) => {
  const { pageProps, styles, headCellsDocs, order, isInternalPage } = props;
  const [activeRow, setActiveRow] = useState();
  const [docsModalClient, setDocsModalClient] = useState(false);
  const [folders, setFolders] = useState(props.folders);

  async function onImagesUpload () {
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

    setDocsModalClient(false);
  }

  async function deleteDoc (id) {
    try {
      await FileActions.removeFile({ id }).then((res) => {
        toast.success(`${res.data.payload.filename} removido!`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return <>
    <UploadImagesModal open={docsModalClient} client folders={folders} {...pageProps} orderId={order.id} onClose={() => onImagesUpload()} />

    <Box className={styles.docsMain}>
      <div className={styles.tableContainer}>
        <div id='pad' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Typography variant='title'>Documentos {isInternalPage && 'Cliente'} </Typography>
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
                {activeRow === i
                  ? (
                    <Tooltip title='Ver Imagem'>
                      <IconButton>
                        <View className='link'
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                      </IconButton>
                    </Tooltip>
                  )
                  : null}
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
    </Box>

  </>;
};

DocsClient.propTypes = {
  folders: PropTypes.array,
  styles: PropTypes.any,
  pageProps: PropTypes.any,
  headCellsDocs: PropTypes.array,
  order: PropTypes.object,
  isInternalPage: PropTypes.bool,
};

export default DocsClient;
