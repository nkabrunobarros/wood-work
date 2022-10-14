/* eslint-disable react/prop-types */
import { Box, CircularProgress, Grid, IconButton, ImageList, ImageListItem, Modal, Tooltip } from "@mui/material";
import { ImagePlus, X, XCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as FileActions from '../../pages/api/actions/file';
import * as FolderActions from '../../pages/api/actions/folder';
import PrimaryBtn from "../buttons/primaryBtn";
import MyInput from "../inputs/myInput";
import Select from "../inputs/select";
import GetFileSize from "../utils/GetFileSize";
import IsInternal from "../utils/IsInternal";

const UploadImagesModal = ({ open, onClose, orderId, folders, client, ...pageProps }) => {
  const [newImages, setNewImages] = useState();
  const [newImageDescription, setNewImageDescription] = useState('');
  const [folders2, setFolders] = useState(folders);
  const [selectedFolder, setSelectedFolder] = useState(folders2.find(ele => ele.name === orderId)?.id);
  const [uploading, setUploading] = useState(false);
  const [errorFolder, setErrorFolder] = useState('');

  function getBase64(file) {
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


  async function handleModalImageUpload(e) {
    const arr = [];

    for (let index = 0; index < Object.keys(e.target.files).length; index++) {
      const file = e.target.files[index];

      await getBase64(file)
        .then(result => {
          file.base64 = result;
          arr.push(file);
        })
        .catch(err => {
          console.log(err);
        });

    }

    setNewImages(arr);
  }

  async function handleSaveImages() {

    if (!selectedFolder && !client) {
      setErrorFolder('Campo Obrigatório');

      return toast.warning('Escolha uma pasta');
    }

    if (!newImages) return toast.warning('Sem imagens escolhidas');

    setUploading(true);

    const errors = [];

    //  If client folder does not existe, create it (folder name === orderId)
    if (client && folders.find(ele => ele.name === orderId) === undefined) {
      const builtFolder = {
        name: orderId,
        orderDetailId: orderId
      };

      const newFolder = await FolderActions
        .saveFolder(builtFolder)
        .catch((err) => console.log(err));

      newFolder.data.payload.files = [];
      setFolders([...folders, newFolder.data.payload]);

      newImages.map(async (file) => {
        const builtFile = {
          descricao: newImageDescription,
          url: "",
          data: file.base64,
          filename: file.name,
          filesize: JSON.stringify(file.size),
          folderId: newFolder.id,
        };

        try {
          await FileActions.saveFile(builtFile).then((res) => console.log(res));
        } catch (err) {
          errors.push(err);
        }
      });

      onClose();

    } else {
      newImages.map(async (file) => {
        const builtFile = {
          descricao: newImageDescription,
          url: "",
          data: file.base64,
          filename: file.name,
          filesize: JSON.stringify(file.size),
          folderId: selectedFolder,
        };

        try {
          await FileActions.saveFile(builtFile).then((res) => console.log(res));
        } catch (err) {
          errors.push(err);
        }
      });

      onClose();
    }

    if (errors[0]) toast.error('Algo aconteceu');
    else toast.success('Ficheiros carregados!');

    setNewImages();
    setUploading(false);
    onClose();
  }


  return <Modal open={open} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box bgcolor={"default.main"} sx={{ maxWidth: '600px', padding: '1rem', borderRadius: '8px', boxShadow: '0px 0px 20px -6px #5A5A5A' }}>
      <Grid container>
        <Grid container md={12} sx={{ display: 'flex' }}>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={() => {
              setNewImages();
              setNewImageDescription();
              onClose(false);
            }}>
              <X
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid container md={12} sx={{ width: '100%' }}>
          <Grid p={1} md={folders[0] && 6} sx={{ width: '100%' }}>
            <MyInput
              placeholder='Descricão.'
              value={newImageDescription}
              onChange={(e) => setNewImageDescription(e.target.value)}
              iconTooltip='jpeg / png / pdf'
              adornmentIcon={
                <>
                  <ImagePlus
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                  <input multiple type='file' accept='image/*,.pdf' name='file' hidden onChange={(e) => handleModalImageUpload(e)} />
                </>
              }
              label='Descrição'
            />
            <span style={{ fontSize: 'small' }}>Tamanho Maximo 1 MB</span>
          </Grid>
          {folders && !client && IsInternal(JSON.parse(localStorage.getItem('user')).perfil.descricao) ? <Grid md={6} p={1}>
            <Select
              required
              label='Pasta'
              error={errorFolder}
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              optionLabel={'name'}
              options={folders}
            />
          </Grid>
            : null}
        </Grid>

        <Grid container md={12} sx={{ padding: '1rem', maxHeight: '400px', overflow: 'scroll', overflowX: 'hidden' }}>
          <ImageList cols={3} sx={{ width: '100%' }} rowHeight={164} >
            {newImages?.map(image => (
              <Tooltip key={image.name} title={`${image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE ? 'Imagem demasiado grande' : image.name}   tamanho ${GetFileSize(image.size)}`}>
                <ImageListItem container md={6} style={{ maxWidth: '100%', borderRadius: '8px', backgroundColor: image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE && 'red' }}>
                  <Box sx={{
                    position: 'absolute',
                    top: image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE ? '25%' : '-5px',
                    left: image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE ? '25%' : '-5px',
                    zIndex: 12
                  }}>
                    <Tooltip title='Remover' >
                      <IconButton onClick={() => setNewImages(newImages.filter(item => item.name !== image.name))}>
                        <XCircle fill='var(--white)' color='var(--primary)' size={image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE ? 60 : 30} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <img src={image.base64} style={{ opacity: image.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE && '0.6', borderRadius: '8px', zIndex: 11 }} />
                </ImageListItem>
              </Tooltip>
            )
            )}
          </ImageList>
        </Grid>
        <Grid md={12} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box style={{ marginLeft: 'auto' }}>
              <PrimaryBtn disabled={uploading || newImages?.find(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)} text={uploading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Guardar'} onClick={() => handleSaveImages()} />
              <PrimaryBtn light text={'Cancelar'} onClick={() => {
                setNewImages();
                setNewImageDescription('');
                onClose();
              }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Modal>;

};

export default UploadImagesModal;