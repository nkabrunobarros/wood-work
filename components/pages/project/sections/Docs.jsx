/* eslint-disable array-callback-return */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, Tooltip, Typography } from '@mui/material';
import { ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as filesActionsRedux from '../../../../store/actions/file';
import * as foldersActionsRedux from '../../../../store/actions/folder';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import MySelect from '../../../inputs/select';

const Docs = (props) => {
  const [newFiles, setNewFiles] = useState();
  const [uploadFolder, setUploadFolder] = useState();
  const [confirmUploadModal, setConfirmUploadModal] = useState(false);
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const dispatch = useDispatch();
  const uploadFiles = (data) => dispatch(filesActionsRedux.batchFiles(data));
  const [folders, setFolders] = useState(props.folders);
  const getFolders = (data) => dispatch(foldersActionsRedux.folders(data));
  const getFiles = (data) => dispatch(filesActionsRedux.budgetFiles(data));

  const {
    order,
    open,
  } = props;

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles(acceptedFiles);
    setConfirmUploadModal(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });
  const [expandedGroups, setExpandedGroups] = useState([]);

  const toggleValueInArray = (value, array) => {
    const index = array.indexOf(value);

    if (index === -1) {
      return [...array, value];
    }

    return [...array.slice(0, index), ...array.slice(index + 1)];
  };

  const handleChange = (expandedGroups, setExpandedGroups) => (panel) => {
    setExpandedGroups((prevExpandedGroups) =>
      toggleValueInArray(panel, prevExpandedGroups)
    );
  };

  const handlePanelChange = handleChange(expandedGroups, setExpandedGroups);

  function renderAccordionFolders (folders, parentId = null) {
    return folders?.filter((folder) => folder.parent_folder === parentId)
      .map((folder) => (
        <Accordion expanded={expandedGroups.includes(folder.id)} onChange={() => handlePanelChange(folder.id)} key={folder.id} {...getRootProps()} ondrop={() => console.log('')}sx={{ padding: 0, margin: 0, boxShadow: 'none', border: '0.5px solid', borderColor: 'divider' }}>
          <AccordionSummary expandIcon={<ChevronDown />} >
            <Grid container bgcolor={'default.main'} >
              <Grid container md={6} sm={6} xs={6} alignItems='center'>
                <Box id='align' color='primary.main' >
                  {expandedGroups.includes(folder.id)
                    ? (
                      <FolderOpen strokeWidth='1' style={{ marginRight: '1rem' }} />
                    )
                    : (
                      <Folder strokeWidth='1' style={{ marginRight: '1rem' }} />
                    )}
                </Box>
                <Typography>{folder.folder_name} </Typography>
              </Grid>
              <Grid container md={6} sm={6} xs={6} justifyContent='center' p={1}>{moment(folder.created).format('DD/MM/YYYY')}</Grid>
            </Grid>
          </AccordionSummary>
          <input {...getInputProps()} type='file' hidden multiple webkitdirectory mozdirectory directory onDrag={() => console.log()} onChange={() => console.log('')} />
          <AccordionDetails sx={{ background: '#FAFAFA', padding: 0, paddingLeft: 1 }} >
            {folder.files.length === 0 && folders.find(fold => fold.parent_folder === folder.id) === undefined ? <Typography variant='subtitle'>Vazia</Typography> : null}
            {folder.files.filter(file => typeof file !== 'undefined').map((file) => (
              <Box key={file?.id} display='flex' alignItems={'center'} p={1}>
                <FileText
                  strokeWidth='1'
                  style={{ marginRight: '1rem' }}
                />
                <Tooltip title='Clique para descarregar este ficheiro.'>
                  <Typography sx={{ cursor: 'pointer' }}><a href={file?.file} download target='_blank' rel="noreferrer">{file?.file_name + file?.file_type}</a></Typography>
                </Tooltip>
              </Box>
            ))}
            <Box bgcolor='lightGray.secondary'>
              {renderAccordionFolders(folders, folder.id)}
            </Box>
          </AccordionDetails>
        </Accordion>

      ));
  }

  const RefreshFolders = async () => {
    getFolders().then(async (res) => {
      const builtFolders = [];

      await getFiles(order.id).then((resFiles) => {
        res.data.results.map((folder) => {
          const folder2 = { ...folder };

          folder2.files = [...folder.files].map((file) => {
            const thisFile = resFiles.data.results.find((ele) => ele.id === file);

            return thisFile;
          });

          builtFolders.push(folder2);
        });

        setFolders(builtFolders);
      });
    });
  };

  async function handleFilesUpload () {
    const FormData = require('form-data');
    const data = new FormData();

    data.append('folder', uploadFolder);
    newFiles.map((file, i) => data.append(`file${i !== 0 ? i : ''}`, file));

    try {
      await uploadFiles(data).then(() => {
        RefreshFolders();
        toast.success('Ficheiros carregados.');
      });

      setConfirmUploadModal(false);
    } catch (error) {
      toast.error(error);
    }

    setConfirmUploadModal(false);
  }

  return open && <>
    <Notification />
    <ConfirmDialog
      open={confirmUploadModal}
      handleClose={() => setConfirmUploadModal(false)}
      onConfirm={() => handleFilesUpload()}
      message={'Carregados ' + newFiles?.length + ' ficheiros. Em que pasta deseja os guardar?' }
      icon='Check'
      iconType='success'
      inputs={<Box>
        <MySelect label='Escolha a pasta destino' options={folders} optionLabel='folder_name' onChange={(e) => setUploadFolder(e.target.value)} />
      </Box>}
    />
    <Accordion expanded={sectionExpanded} onChange={() => setSectionExpanded(!sectionExpanded)} sx={{ width: '100%' }}>
      <AccordionSummary sx={{ background: 'lightGray.main', paddingLeft: '24px' }} bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
        <Typography variant='title'>Documentos</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
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
                {renderAccordionFolders(props.folders)}
              </Box>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  </>;
};

Docs.propTypes = {
  pageProps: PropTypes.any,
  order: PropTypes.any,
  styles: PropTypes.object,
  folders: PropTypes.array,
  open: PropTypes.bool,
  activeFolder: PropTypes.number,
  onImagesUpload: PropTypes.func,

};

export default Docs;
