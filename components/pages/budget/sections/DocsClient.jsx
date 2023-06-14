/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Table, TableBody, TableContainer, TableHead, Tooltip, Typography } from '@mui/material';
import { ChevronDown, FilePlus, FileText } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as filesActionsRedux from '../../../../store/actions/file';
import PrimaryBtn from '../../../buttons/primaryBtn';
import Notification from '../../../dialogs/Notification';

const DocsClient = (props) => {
  const { pageProps, isInternalPage } = props;
  const [userFiles, setUserFiles] = useState(props.folders.find(ele => ele.name === 'VF do Cliente')?.files);
  const dispatch = useDispatch();
  const uploadFiles = (data) => dispatch(filesActionsRedux.batchFiles(data));
  const getFile = (data) => dispatch(filesActionsRedux.file(data));
  const [sectionExpanded, setSectionExpanded] = useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    handleFilesUpload(acceptedFiles);
  }, []);

  const { getInputProps } = useDropzone({ onDrop });

  async function handleFilesUpload (newFiles) {
    const FormData = require('form-data');
    const data = new FormData();

    data.append('folder', props.folders.find(ele => ele.name === 'VF do Cliente').id);
    [...newFiles].map((file, i) => data.append(`file${i !== 0 ? i + 1 : ''}`, file));

    try {
      await uploadFiles(data).then(async (res) => {
        await getFile(res.data.id).then((res) => {
          setUserFiles([...userFiles, res.data]);
        });

        toast.success('Ficheiros carregados.');
      });
    } catch (error) {
      if (error?.response?.data?.non_field_errors) if (error?.response?.data?.non_field_errors[0] === 'A file with the same name already exists in the parent folder') toast.error('Este ficheiro já existe.');

      toast.error('Algo aconteceu. Por favor tente mais tarde');
    }
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
    <Accordion expanded={sectionExpanded} onChange={() => setSectionExpanded(!sectionExpanded)} sx={{ width: '100%' }}>
      <AccordionSummary sx={{
        background: 'lightGray.main',
        paddingLeft: '24px',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
      bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
        <Grid container md={12} sm={12} xs={12} alignItems={'center'}>
          <Grid container md={8} sm={8} xs={12}>
            <Typography variant='title'>Documentos {isInternalPage && 'Cliente'}</Typography>
          </Grid>
          <Grid container md={4} sm={4} xs={12} justifyContent={'end'}>
            <Box pr={2}>
              <PrimaryBtn
                text='Carregar'
                onClick={(e) => e.stopPropagation()}
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
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <TableContainer>
          <Table aria-label='collapsible table'>
            <TableHead aria-label='sticky table'>
              <Grid bgcolor='lightgray.main' container md={12} sm={12} xs={12} color='white' sx={{ bp: 1, borderBottom: '1px solid', borderTop: '1px solid', borderColor: 'divider', backgroundColor: '#F9F9F9' }}>
                <Grid container md={6} sm={6} xs={6} sx={{ alignItems: 'center', p: 2 }}><Box sx={{ borderRight: '1px solid', borderColor: 'divider', width: '100%', alignItems: 'center' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Nome</Typography> </Box></Grid>
                <Grid container md={6} sm={6} xs={6} sx={{ alignItems: 'center', p: 2 }}><Box sx={{ borderRight: '0px solid', borderColor: 'divider', width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}> <Typography color='primary' fontWeight={'bold'} variant='subtitle2'>Data</Typography> </Box></Grid>
              </Grid>
            </TableHead>
            <TableBody >
              <Box sx={{ maxHeight: '350px', overflowY: 'scroll' }}>
                <Grid container >
                  {userFiles?.sort((a, b) => moment(b.created).diff(moment(a.created))).map(file =>
                    <Grid key={file.file_name} container p={2} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Grid container md={6} sm={6} xs={6} alignItems='center'>
                        <Box color='primary.main' alignItems='center'>
                          <FileText strokeWidth='1' style={{ marginRight: '1rem' }} />
                        </Box>
                        <Tooltip title='Clique para descarregar este ficheiro.'>
                          <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => handleFileClick(file)}>{file?.file_name + file?.file_type}</Typography>
                        </Tooltip>
                      </Grid>
                      <Grid container md={6} sm={6} xs={6} alignItems='center' justifyContent={'center'}>
                        <Typography variant="subtitle2">{moment(file.created).format('DD/MM/YYYY HH:mm')} </Typography>
                      </Grid>
                    </Grid>)}
                </Grid>
              </Box>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>

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
