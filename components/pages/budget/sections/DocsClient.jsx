/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, Tooltip, Typography } from '@mui/material';
import { FilePlus, FileText } from 'lucide-react';
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
  const { pageProps, styles, isInternalPage } = props;
  const [userFiles, setUserFiles] = useState(props.folders.find(ele => ele.name === 'VF do Cliente')?.files);
  const [newFiles, setNewFiles] = useState();
  const [confirmUploadModal, setConfirmUploadModal] = useState(false);
  const dispatch = useDispatch();
  const uploadFiles = (data) => dispatch(filesActionsRedux.batchFiles(data));
  const getFile = (data) => dispatch(filesActionsRedux.file(data));

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles(acceptedFiles);
    setConfirmUploadModal(true);
  }, []);

  const { getInputProps } = useDropzone({ onDrop });

  async function handleFilesUpload () {
    const FormData = require('form-data');
    const data = new FormData();

    data.append('folder', props.folders.find(ele => ele.name === 'VF do Cliente').id);
    [...newFiles].map((file, i) => data.append(`file${i !== 0 ? i : ''}`, file));
    // data.append('budget', budget.id);

    try {
      await uploadFiles(data).then(async (res) => {
        await getFile(res.data.id).then((res) => {
          setUserFiles([...userFiles, res.data]);
          toast.success('Ficheiros carregados.');
        });
      });
    } catch (error) {
      if (error?.response?.data?.non_field_errors) if (error?.response?.data?.non_field_errors[0] === 'A file with the same name already exists in the parent folder') toast.error('Este ficheiro já existe.');

      toast.error('Algo aconteceu. Por favor tente mais tarde');
    }

    setConfirmUploadModal(false);
  }

  async function handleFileClick (file) {
    fetch(file.file)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `${file.file_name}${file.file_type}`; // Change this to the desired file name if needed
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 0);
      });
  }

  return <>
    <Notification />
    <ConfirmDialog
      open={confirmUploadModal}
      handleClose={() => setConfirmUploadModal(false)}
      onConfirm={() => handleFilesUpload()}
      message={'Carregado ' + newFiles?.length + ' ficheiro(s). Proceder com upload?' }
      icon='Check'
      iconType='success'
    />
    <Box className={styles.docsMain}>
      <Box className={styles.tableContainer}>
        <Box id='pad' style={{ display: 'flex' }}>
          <Box style={{ flex: 1 }}>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container md={12} sm={12} xs={12}><Typography variant='title'>Documentos {isInternalPage && 'Cliente'}</Typography></Grid>
              <Grid container md={12} sm={12} xs={12}><Typography variant='subtitle2'>Documentos carregados {isInternalPage && 'do cliente'}</Typography></Grid>
            </Grid>
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
                  {userFiles?.sort((a, b) => a.file_name - b.file_name).map(file => <Grid key={file.file_name} container p={2} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Grid container md={6} sm={6} xs={6} alignItems='center'>
                      <Box color='primary.main' alignItems='center'>
                        <FileText strokeWidth='1' style={{ marginRight: '1rem' }} />
                      </Box>
                      <Tooltip title='Clique para descarregar este ficheiro.'>
                        <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => handleFileClick(file)}>{file?.file_name + file?.file_type}</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} alignItems='center' justifyContent={'center'}>
                      <Typography variant="subtitle2">{moment(file.created).format('DD/MM/YYYY HH:MM')} </Typography>
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
