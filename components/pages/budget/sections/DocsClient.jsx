/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, Tooltip, Typography } from '@mui/material';
import { FilePlus, Image } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as filesActionsRedux from '../../../../store/actions/file';
import PrimaryBtn from '../../../buttons/primaryBtn';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';

const DocsClient = (props) => {
  const { pageProps, styles, budget, isInternalPage } = props;
  const [userFiles, setUserFiles] = useState(props.folders.find(ele => ele.folder_name === budget.id.replace('Budget', 'Folder'))?.files);
  const [newFiles, setNewFiles] = useState();
  const [confirmUploadModal, setConfirmUploadModal] = useState(false);
  const dispatch = useDispatch();
  const uploadFiles = (data) => dispatch(filesActionsRedux.batchFiles(data));
  const getFile = (data) => dispatch(filesActionsRedux.file(data));
  const downloadFile = (data) => dispatch(filesActionsRedux.downloadFile(data));

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles(acceptedFiles);
    setConfirmUploadModal(true);
  }, []);

  const { getInputProps } = useDropzone({ onDrop });

  async function handleFilesUpload () {
    const FormData = require('form-data');
    const data = new FormData();

    data.append('folder', props.folders.find(ele => ele.folder_name === budget.id.replace('Budget', 'Folder')).id);
    [...newFiles].map((file, i) => data.append(`file${i !== 0 ? i : ''}`, file));
    data.append('budget', budget.id);

    try {
      await uploadFiles(data).then(async (res) => {
        await getFile(res.data.id).then((res) => {
          setUserFiles([...userFiles, res.data]);
          toast.success('Ficheiros carregados.');
        }).catch(() => console.log('erro cat'));
      });
    } catch (error) {
      console.log('erro');
      toast.error('erro');
    }

    setConfirmUploadModal(false);
  }

  async function handleFileClick (file) {
    downloadFile(file.file)
      .then((res) => res.blob())
      .then((res) => {
        const blobUrl = window.URL.createObjectURL(new Blob([res.blob()]));
        const fileName = 'teste.jpg';
        const aTag = document.createElement('a');

        aTag.href = blobUrl;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        toast.success('Consegui buscar ficheiro.');
        console.log(res);
      })
      .catch((err) => {
        toast.error('Algo aconteceu. Por favor tente mais tarde.');
        console.log(err);
      });
  }

  return <>
    <Notification />
    <ConfirmDialog
      open={confirmUploadModal}
      handleClose={() => setConfirmUploadModal(false)}
      onConfirm={() => handleFilesUpload()}
      message={'Carregados ' + newFiles?.length + ' ficheiros. Proceder com upload?' }
      icon='Check'
      iconType='success'
    />
    <Box className={styles.docsMain}>
      <Box className={styles.tableContainer}>
        <Box id='pad' style={{ display: 'flex' }}>
          <Box style={{ flex: 1 }}>
            <Typography variant='title'>Documentos {isInternalPage && 'Cliente'} </Typography>
          </Box>
          <Box className='flex'>
            <Box>
              <PrimaryBtn
                text='Carregar'
                icon={
                  <FilePlus
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                }
              >
                <input {...getInputProps()} hidden multiple onChange={(e) => onDrop(e.target.files) } />
              </PrimaryBtn>
            </Box>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead aria-label='sticky table'>
              <Grid container p={2} bgcolor='lightgray.main'>
                <Grid container md={6} sm={6} xs={6}>Nome</Grid>
                <Grid container md={6} sm={6} xs={6} justifyContent='center'>Data</Grid>
              </Grid>
            </TableHead>
            <TableBody >
              <Box sx={{ maxHeight: '350px', overflowY: 'scroll' }}>
                <Grid container >
                  {userFiles?.map(file => <Grid key={file.file_name} container p={2} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Grid container md={6} sm={6} xs={6} alignItems='center'>
                      <Box color='primary.main' alignItems='center'>
                        <Image strokeWidth='1' style={{ marginRight: '1rem' }} />
                      </Box>
                      {true && <Tooltip title='get'>
                        <Typography sx={{ cursor: 'pointer' }}><a onClick={() => handleFileClick(file)} >{file.file_name + file.file_type}</a></Typography>
                      </Tooltip>}
                      <Tooltip title='Clique para descarregar este ficheiro.'>
                        <Typography><a href={file?.file} download target='_blank' rel="noreferrer">{file?.file_name + file?.file_type}</a></Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} alignItems='center' justifyContent={'center'}>
                      <Typography>{moment(file.created).format('DD/MM/YYYY')}</Typography>
                    </Grid>
                  </Grid>)}
                </Grid>
              </Box>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </>;
};

DocsClient.propTypes = {
  folders: PropTypes.array,
  styles: PropTypes.any,
  pageProps: PropTypes.any,
  headCellsDocs: PropTypes.array,
  budget: PropTypes.object,
  isInternalPage: PropTypes.bool,
};

export default DocsClient;
