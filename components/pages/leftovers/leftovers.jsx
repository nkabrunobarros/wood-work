/* eslint-disable react/jsx-props-no-spreading */
import { AddAPhoto } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Divider, Fab, Grid, Tooltip, Typography } from '@mui/material';
import { Send, X, XCircle } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { Camera } from 'react-camera-pro';
import { toast } from 'react-toastify';
import LeftOversDialog from '../../dialogs/LeftOversDialog';
import Notification from '../../dialogs/Notification';
import Navbar from '../../layout/navbar/navbar';
import Loader from '../../loader/loader';
import ToastSet from '../../utils/ToastSet';
import HeightModal from './modals/HeightModal';
import PartModal from './modals/PartModal';

const Leftovers = (props) => {
  const [imagesTaken, setImagesTaken] = useState();
  const camera = React.useRef(null);
  const [currentPanel, setCurrentPanel] = useState(-1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heightModal, setHeightModal] = useState(false);
  const clock = new Date();
  // const [clock, setClock] = useState();
  const [partModal, setPartModal] = useState(false);
  const [partChosen, setPartChosen] = useState();
  const [querying, setQuerying] = useState(false);

  const [dummySizes, setDummySizes] = useState({
    larg: 0,
    esp: 0,
    comp: 0
  });

  async function onConfirm () {
    //  Trás os 3 valores da peça

    //  e has the manual sizes, verify if it brings them
    const loading = toast.loading('');

    setTimeout(() => {
      setDialogOpen(false);
      setImagesTaken();
      setCurrentPanel(-1);
      setPartChosen();

      setDummySizes({
        larg: 0,
        esp: 0,
        comp: 0
      });
      //  Add to stock

      //  Success Msg
      ToastSet(loading, 'Adicionado ao stock.', 'success');
    }, 1000);
  }

  async function SaveImg () {
    if (camera.current) {
      const photo = await camera.current.takePhoto();

      setImagesTaken({
        data: photo,
        takenAt: Date.now()
      });

      setCurrentPanel(0);
    }
  }

  function onHeightChange (e) {
    setHeightModal(false);

    const old = { ...partChosen };

    old.esp = e;
    setPartChosen(old);
  }

  function onPartChosen (partChosen) {
    setPartChosen(partChosen);
    setPartModal(false);
  }

  function handleGetSizes () {
    setQuerying(true);

    setTimeout(() => {
      setDummySizes({ larg: 2000, esp: 16, comp: 200 });
      setDialogOpen(true);
      setQuerying(false);
    }, 3000);
  }

  return <>
    <Navbar />
    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }}>
      <Notification />
      <LeftOversDialog
        sizes={dummySizes} setSizes={setDummySizes}
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={(e) => onConfirm(e)}
        type='alert'
        message={'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'}
      />
      <HeightModal open={heightModal} height={partChosen?.esp} onClose={() => setHeightModal(false)} onConfirm={(e) => onHeightChange(e)} />
      <PartModal {...props} open={partModal} onClose={() => setPartModal(false)} onSubmit={onPartChosen} />
      <Box style={{ position: 'fixed', bottom: '20%', right: '5%', zIndex: 999999999, display: !imagesTaken && 'none' }}>
        <Fab
          aria-label="like"
          size={'big'}
          color={'primary'}
          onClick={() => {
            setCurrentPanel(-1);
            setImagesTaken();
          }} >
          <X color="white" />
        </Fab>
      </Box>
      <Box style={{ position: 'fixed', bottom: '10%', right: '5%', zIndex: 999999999 }}>
        <Fab
          disabled={!partChosen}
          aria-label="like"
          size={'big'}
          color={'primary'}
          onClick={() => !imagesTaken ? SaveImg() : handleGetSizes()} >
          {!imagesTaken ? <AddAPhoto color="white" /> : <Send color="white" />}
        </Fab>
      </Box>
      <Grid container>
        <Grid container md={12} sm={12} >
          {/* Part */}
          <Grid md={3} sx={3} p={1}>
            <Tooltip title='Clique para escolher peça'>
              <Card onClick={() => setPartModal(true)} sx={{ width: '100%', height: '100%', backgroundColor: !partChosen && 'primary.light' }} className={` ${!partChosen && 'breathingBackgroundWarning'}`} >
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Peça</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    {!partChosen
                      ? <Box sx={{ width: '100%', textAlign: 'center' }}><Typography variant='md'>Escolher peça</Typography></Box>
                      : <Box>
                        <Grid container md={12}>
                          <Grid container md={4}>
                            <CardMedia
                              component="img"
                              alt={partChosen?.material}
                              height="100%"
                              image={partChosen?.image}
                            />
                          </Grid>
                          <Grid container md={8} >
                            <Box className='fullCenter' sx={{ width: '100%', height: '100%', textAlign: 'center' }}>
                              <Typography variant='subtitle1'>
                                {partChosen?.material}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    }
                  </Grid>
                </CardContent>
              </Card>

            </Tooltip>
          </Grid>
          {/* ESPESSURA */}
          <Grid md={3} sx={3} p={1}>
            <Tooltip title='Clique para escolher espessura'>
              <Card onClick={() => setHeightModal(true)} sx={{ width: '100%', height: '100%', backgroundColor: !partChosen && 'primary.light' }} className={` ${partChosen?.esp === 0 || partChosen?.esp === undefined ? 'breathingBackgroundWarning' : null}`}>
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Espessura</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Min</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Real</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.esp}</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{dummySizes?.esp}</Typography></Box></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Tooltip>

          </Grid>
          {/* Comprimento */}
          <Grid md={3} sx={3} p={1}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                <Typography variant='subtitle'>Comprimento</Typography>
              </Box>
              <CardContent>
                <Grid container md={12}>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Min</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Real</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.comp}</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{dummySizes?.comp}</Typography></Box></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} sx={3} p={1}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                <Typography variant='subtitle'>Largura</Typography>
              </Box>
              <CardContent>
                <Grid container md={12}>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Min</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Real</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.larg}</Typography></Box></Grid>
                  <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{dummySizes?.larg}</Typography></Box></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date & Time */}
          <Grid md={3} xs={3} p={1} sx={{ display: 'none' }}>
            <Box bgcolor={'default.main'} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
              {currentPanel < 0
                ? <>
                  {/* View a tirar foto */}
                  <Grid >
                    <Grid container className='fullCenter'>
                      <Box>
                        {/* <Typography item color='lightTextSm.main'>Data</Typography> */}
                        <Typography item color='lightTextSm.black' >{moment(clock).format('DD.MM.YYYY')}</Typography>
                      </Box>
                    </Grid>
                    <Divider />

                    <Grid container className='fullCenter'>
                      <Box>
                        <Typography item color='lightTextSm.main'>Hora</Typography>
                        <Typography item color='lightTextSm.black' > {moment(clock).format('HH:mm')}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                </>
                : <>
                  {/* View a ver foto */}
                  <Grid >
                    <Grid container className='fullCenter'>
                    Data
                      {moment(clock).format('DD.MM.YYYY')}
                    </Grid>
                    <Divider />
                    <Grid container className='fullCenter'>{moment(clock).format('HH:mm')}</Grid>
                  </Grid>

                </>
              }
            </Box>
          </Grid>

        </Grid>
        <Grid container sx={{ height: '65vh' }}>
          {currentPanel < 0
            ? <Grid container md={12} >
              <Box p={2} className="fullCenter" sx={{ width: '100%', height: '90%', overflow: 'hidden' }}>
                <div className="fullCenter" style={{ width: '100%', height: '100%' }} >
                  {/* <Camera ref={webcamRef} aspectRatio={16 / 9} facingMode='user' /> */}
                  <Camera
                    ref={camera}
                    aspectRatio={16 / 9}
                    async
                    errorMessages={{
                      noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                      permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                      switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
                      canvas: 'Canvas is not supported.',
                    }}
                  />
                </div>
              </Box>
            </Grid>

            : <Grid md={12} >
              { querying && <Loader center backdrop /> }
              <img src={imagesTaken?.data} style={{ width: '100%', padding: '0.5rem' }} />
            </Grid>
          }
          {/* Container Sizes */}
          <Grid container md={2} sx={{ display: 'none' }}>
            <Grid p={1}>
              <Card onClick={() => setHeightModal(true)} sx={{ width: '100%', height: '100%' }} className={` ${dummySizes.esp === 0 && 'breathingBackgroundWarning'}`}>
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Espessura</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    <Grid container md={12}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.esp}</Typography></Box></Grid>
                  </Grid>
                </CardContent>
              </Card>

            </Grid>
            <Grid p={1} >
              <Card sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Comprimento</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Min</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Real</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.comp}</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography></Typography></Box></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid p={1} >
              <Card sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Largura</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Min</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>Real</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography>{partChosen?.larg}</Typography></Box></Grid>
                    <Grid container md={6} sm={6} xs={6}> <Box sx={{ textAlign: 'center', width: '100%' }}> <Typography></Typography></Box></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid p={1}>
              <Box bgcolor={'default.main'} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                <Button sx={{ width: '100%', height: '100%' }} onClick={() => !imagesTaken ? SaveImg() : setDialogOpen(true)}>
                  <Box className="fullCenter infoContainerLeftOvers" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>
                    <Send />
                  </Box>
                </Button>
              </Box>
            </Grid>
            <Grid container p={1} bgcolor={'default.main'} className="fullCenter infoContainerLeftOvers" m={1}>
              <Button onClick={() => {
                setCurrentPanel(-1);
                setImagesTaken();
              }} sx={{ width: '100%', height: '100%' }} >
                <XCircle size={40} strokeWidth={1} />
              </Button>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid >;
  </>;
};

export default Leftovers;
