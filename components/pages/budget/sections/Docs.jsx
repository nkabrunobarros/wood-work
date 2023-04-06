/* eslint-disable array-callback-return */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { ChevronDown, FilePlus, FileText, Folder, FolderOpen, FolderPlus, X } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as filesActionsRedux from '../../../../store/actions/file';
import * as foldersActionsRedux from '../../../../store/actions/folder';
import PrimaryBtn from '../../../buttons/primaryBtn';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import MySelect from '../../../inputs/select';
import UploadImagesModal from '../../../modals/UploadImages';
import Row from '../Row/Row';

const Docs = (props) => {
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [activeFolder, setActiveFolder] = useState(0);
  const [newFiles, setNewFiles] = useState();
  const [uploadFolder, setUploadFolder] = useState();
  const [confirmUploadModal, setConfirmUploadModal] = useState(false);
  const reduxState = useSelector((state) => state);
  const me = reduxState.auth.me;

  const [newFolderName, setNewFolderName] = useState({
    value: '',
    error: ''
  });

  const newFolder = (data) => dispatch(foldersActionsRedux.newFolder(data));
  const dispatch = useDispatch();
  const uploadFiles = (data) => dispatch(filesActionsRedux.batchFiles(data));
  const [docsModal, setDocsModal] = useState(false);
  const [folders, setFolders] = useState(props.folders);
  const getFolders = (data) => dispatch(foldersActionsRedux.folders(data));
  const getFiles = (data) => dispatch(filesActionsRedux.budgetFiles(data));

  const {
    pageProps,
    budget,
    open,
    styles,
  } = props;

  async function onImagesUpload () {

  }

  async function handleCreateFolder () {
    if (!newFolderName.value) setNewFolderName({ ...newFolderName, error: 'Não pode ser vazio' });
    else {
      await newFolder({
        folder_name: newFolderName.value,
        parent_folder: null,
        user: me.id,
      }).then((res) => {
        const folds = [...folders];

        folds.push(res.data);
        setCreatingFolder(false);
        setNewFolderName({ value: '', error: '' });
        setFolders(folds);
      });
    }
  }

  const [hoverDrop, setHoverDrop] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles(acceptedFiles);
    setConfirmUploadModal(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  function renderAccordionFolders (folders, parentId = null) {
    return folders
      .filter((folder) => folder.parent_folder === parentId)
      .map((folder) => (
        <Accordion key={folder.id} {...getRootProps()} ondrop={() => console.log('e')}sx={{ padding: 0, margin: 0, boxShadow: 'none', border: '0.5px solid', borderColor: 'divider' }}>
          <Tooltip title='Arrastar ficheiros para esta pasta' {...getRootProps()}>
            <AccordionSummary expandIcon={<ChevronDown />} >
              <Grid container bgcolor={'default.main'} >
                <Grid container md={6} sm={6} xs={6} alignItems='center'>
                  <Box id='align' color='primary.main' >
                    {open
                      ? (
                        <FolderOpen strokeWidth='1' style={{ marginRight: '1rem' }} />
                      )
                      : (
                        <Folder strokeWidth='1' style={{ marginRight: '1rem' }} />
                      )}
                  </Box>
                  <Typography>{!isDragActive ? folder.folder_name : 'Carregar ficheiros para esta pasta'} </Typography>
                </Grid>
                <Grid container md={6} sm={6} xs={6} justifyContent='center' p={1}>{moment(folder.created).format('DD/MM/YYYY')}</Grid>
              </Grid>

            </AccordionSummary>
          </Tooltip>
          <input {...getInputProps()} type='file' hidden multiple webkitdirectory mozdirectory directory onDrag={() => console.log()} onChange={() => console.log('')} />
          <AccordionDetails sx={{ background: '#FAFAFA', padding: 0, paddingLeft: 1 }} >
            {folder.files.length === 0 && folders.find(fold => fold.parent_folder === folder.id) === undefined ? <Typography variant='subtitle'>Sem ficheiros ou pastas</Typography> : null}
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

      await getFiles(budget.id).then((resFiles) => {
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
    data.append('budget', budget.id);

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
    setNewFolderName({ value: '', error: '' });
  }

  return open && <>
    <UploadImagesModal open={docsModal} folders={folders.filter(ele => ele.name !== budget.id)} orderId={folders[activeFolder]?.id} {...pageProps} onClose={() => onImagesUpload()} />

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
    <Box className={styles.docsMain} >
      <Box className={styles.tableContainer} onMouseLeave={() => setHoverDrop(false)} onMouseEnter={() => setHoverDrop(true)} sx={{ background: hoverDrop && 'var(--greenLight)' }}>
        <Box id='align' style={{ display: 'flex', padding: '24px' }} bgcolor={'lightGray.main'}>
          <Box style={{ flex: 1 }}>
            <Typography variant='title'>Documentos</Typography>
          </Box>
          <Box className='flex'>
            {!creatingFolder
              ? <PrimaryBtn
                disabled={!folders.filter(ele => !(ele.name === budget.id))[0]}
                text='Carregar'
                onClick={() => setDocsModal(true)}
                icon={
                  <FilePlus
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                }
              />
              : <Box id='align'>
                <span style={{ paddingRight: '.5rem' }}>Nome</span>
                <TextField
                  error={!!newFolderName.error}
                  label={newFolderName.error}
                  inputProps={{
                    maxlength: 20
                  }}
                  helperText={`${newFolderName.value.length}/20`}

                  value={newFolderName.value}
                  onChange={(e) => {
                    setNewFolderName({
                      value: e.target.value,
                      error: ''
                    });
                  }}
                  variant='standard'
                />
              </Box>
            }
            <Box>
              <PrimaryBtn
                light
                text='Criar Pasta'
                onClick={() => !creatingFolder ? setCreatingFolder(true) : handleCreateFolder()}
                icon={
                  <FolderPlus
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                }
              />
              {creatingFolder && <IconButton onClick={() => {
                setCreatingFolder(false);

                setNewFolderName({
                  value: '',
                  error: ''
                });
              }}>
                <X
                  strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                  size={pageProps?.globalVars?.iconSize}
                  color='var(--red)'
                />
              </IconButton> }
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
              {folders && false && folders.filter(ele => !(ele.name === budget.id)).map((row, i) => (
                <Row key={i} row={row} setActiveFolder={setActiveFolder} index={i} {...props} styles={styles} onRowClick={setActiveFolder} />
              ))}
              {!folders && <>
                <TableCell></TableCell>
                <TableRow sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span>Sem pastas, <a className='link' onClick={() => setCreatingFolder(true)}>Crie uma</a></span></TableRow>
                <TableCell></TableCell>
              </>}
              <Box sx={{ maxHeight: '350px', overflowY: 'scroll' }}>
                {renderAccordionFolders(folders)}
              </Box>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Box className={styles.infoContainer}>
        <Typography className='headerTitleSm'>{folders[activeFolder]?.name}</Typography>
        <Grid container md={12} bgcolor={'lightGray.main'} className={styles.innerInfoContainer}>
          <Grid container md={12}>
            <Grid md={2}>
              <Info
                style={{ marginRight: '1rem' }}
                strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                size={pageProps?.globalVars?.iconSize}
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
                strokeWidth={pageProps?.globalVars?.iconXlStrokeWidth}
                size={pageProps?.globalVars?.iconSizeXxl}
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
                strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                size={pageProps?.globalVars?.iconSize}
              />
            </Grid>
            <Grid md={10}>Propriedades</Grid>
          </Grid>
          <Grid container md={12}>
            <Grid md={6}> <Typography fontSize={'14px'} color={'lightTextSm.black'} >Salvo em</Typography></Grid>
            <Grid md={6}> <Typography fontSize={'14px'} color={'lightTextSm.main'} >CreatedAT</Typography></Grid>
          </Grid>
          <Grid container md={12}>
            <Grid md={6}> <Typography fontSize={'14px'} color={'lightTextSm.black'} >Alterado em</Typography></Grid>
            <Grid md={6}> <Typography fontSize={'14px'} color={'lightTextSm.main'} >AlteradoEm</Typography></Grid>
          </Grid>
        </Grid>
      </Box> */}

    </Box>
  </>;
};

Docs.propTypes = {
  pageProps: PropTypes.any,
  budget: PropTypes.any,
  styles: PropTypes.object,
  folders: PropTypes.array,
  open: PropTypes.bool,
  activeFolder: PropTypes.number,
  onImagesUpload: PropTypes.func,

};

export default Docs;
