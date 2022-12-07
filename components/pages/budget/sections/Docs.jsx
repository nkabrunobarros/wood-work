//  PropTypes
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { FilePlus, FileText, Folder, FolderPlus, Info, X } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as FileActions from '../../../../pages/api/actions/file';
import * as FolderActions from '../../../../pages/api/actions/folder';
import PrimaryBtn from "../../../buttons/primaryBtn";
import UploadImagesModal from '../../../modals/UploadImages';
import Row from '../Row/Row';

const Docs = (props) => {
    const [creatingFolder, setCreatingFolder] = useState(false);

    const [newFolder, setNewFolder] = useState({
        value: '',
        error: ''
    });

    const [docsModal, setDocsModal] = useState(false);
    const [folders, setFolders] = useState(props.folders);
    const [activeFolder, setActiveFolder] = useState(0);

    const { 
        pageProps,
        budget,
        open, 
        styles ,
        onNewFolder,
        
    } = props;

    async function onImagesUpload() {

        await FolderActions
          .folders({ id: budget.id })
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
    
    
      }

    async function handleCreateFolder() {

        if (!newFolder.value) {
            const old = newFolder;

            old.error = 'Não pode ser vazio';
            setNewFolder(old);
    
          return;
        }

        const builtFolder = {
          name: newFolder.value,
          orderDetailId: budget.id
        };
    
        setFolders([...folders, {...builtFolder, files: [] ,id: Math.random()}]);
        setNewFolder({value: '', error: ''});
        onNewFolder(new Date());

        false && await FolderActions
          .saveFolder(builtFolder)
          .then((response) => {
            response.data.payload.files = [];
            setFolders([...folders, response.data.payload]);
            setNewFolder({value: '', error: ''});
            onNewFolder(new Date());
          })
          .catch((err) => console.log(err));
    
        setCreatingFolder(false);
      }

      const [hoverDrop, setHoverDrop] = useState(false);

        return open && <>
            <UploadImagesModal open={docsModal} folders={folders.filter(ele => ele.name !== budget.id)} orderId={folders[activeFolder]?.id} {...pageProps} onClose={() => onImagesUpload()} />
            <Box className={styles.docsMain} >
              <Box className={styles.tableContainer} onMouseLeave={() =>setHoverDrop(false)} onMouseEnter={() =>setHoverDrop(true)} sx={{ background: hoverDrop && 'var(--greenLight)'}}>
                <Box id='align' style={{ display: 'flex', padding: '24px' }} bgcolor={"default.main"}>
                  <Box style={{ flex: 1 }}>
                    <Typography variant='title'>Documentos</Typography>
                  </Box>
                  <Box className='flex'>
                    {!creatingFolder ?
                      <PrimaryBtn
                        disabled={!folders.filter(ele => !(ele.name === budget.id))[0]}
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
                      <Box id='align'>
                        <span style={{ paddingRight: '.5rem' }}>Nome</span>
                        <TextField
                          error={!!newFolder.error}
                          label={newFolder.error}
                          inputProps={{
                            maxlength: 20
                          }}
                          helperText={`${newFolder.value.length}/20`}

                          value={newFolder.value}
                          onChange={(e) => {
                            setNewFolder({
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
                            strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        }
                      />
                      {creatingFolder && <IconButton onClick={() => {
                        setCreatingFolder(false);

                        setNewFolder({
                          value: '',
                          error: ''
                      });
                      }}>
                         <X
                            strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                            color='var(--red)'
                          />
                        </IconButton> }
                    </Box>
                  </Box>
                </Box>

                <TableContainer component={Paper}>
                  <Table aria-label='collapsible table'>
                    <TableHead aria-label='sticky table'>
                      <TableRow>
                        <TableCell width={!!folders && '70%'}>Nome</TableCell>
                        <TableCell width={!!folders && '30%'}>Data</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {folders && folders.filter(ele => !(ele.name === budget.id)).map((row, i) => (
                        <Row key={i} row={row} setActiveFolder={setActiveFolder} index={i} {...props} styles={styles} onRowClick={setActiveFolder} />
                      ))}
                      {!folders && <>
                        <TableCell></TableCell>
                        <TableRow sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span>Sem pastas, <a className='link' onClick={() => setCreatingFolder(true)}>Crie uma</a></span></TableRow>
                        <TableCell></TableCell>
                      </>}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
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
    onNewFolder: PropTypes.func,
    onImagesUpload: PropTypes.func,

};

export default Docs;