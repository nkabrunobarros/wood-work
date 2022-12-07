/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { ArrowLeftRight, Send, XCircle } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Camera } from "react-camera-pro";
import LeftOversDialog from '../../dialogs/LeftOversDialog';
import Select from "../../inputs/select";
import HeightModal from "./modals/HeightModal";

const Leftovers = () => {
    const [imagesTaken, setImagesTaken] = useState();
    const camera = React.useRef(null);
    const [currentPanel, setCurrentPanel] = useState(-1);
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [heightModal, setHeightModal] = useState(false);
    const [height, setHeight] = useState();
    const [clock, setClock] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();

            setClock(date);
        }, 10000);
    }, []);

    async function onConfirm(e) {
        //  e has the manual sizes, veryfi if it brings them
        setDialogOpen(false);
        console.log(e);
    }

    async function SaveImg() {
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
        setHeight(e);

    }

    return <Box >
           <LeftOversDialog
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            onConfirm={(e) => onConfirm(e)}
            type='alert'
            message={'Está prestes a apagar um cliente o que é irreversivel, tem certeza que quer continuar?'}
        />
        <HeightModal open={heightModal} onClose={() => setHeightModal(false)} onConfirm={(e) => onHeightChange(e)}  />
      
        <Grid container>
            <Grid container md={12} sm={12} sx={{ height: '15vh' }}>
                {/* Worker Name */}
                <Grid md={3} sx={3} p={1}>
                    <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                        {currentPanel < 0 ?
                            <>
                                {/* View a tirar foto */}
                                {loggedUser.nome}
                            </>
                            :
                            <>
                                {/* View a ver foto */}
                                {loggedUser.nome}
                            </>
                        }
                    </Box>
                </Grid>
                {/* Type */}
                <Grid md={3} sx={3} p={1}>
                    <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                        <Box sx={{ width: '100%', paddingLeft: 3, paddingRight: 3 }} >
                            <Select fullWidth label='Tipo' />
                        </Box>
                    </Box>
                </Grid>
                {/* Date & Time */}
                <Grid md={3} sx={3} p={1}>
                    <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                        {currentPanel < 0 ?
                            <>
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
                            :
                            <>
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
                {/* Project */}
                <Grid md={3} sx={3} p={1}>
                    <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                        {currentPanel < 0 ?
                            <>
                                {/* View a tirar foto */}
                                Project
                            </>
                            :
                            <>
                                {/* View a ver foto */}
                                Project
                            </>
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ height: '65vh' }}>
                {currentPanel < 0 ?
                    <>
                        <Grid container md={10} >
                            <Box p={2} className="fullCenter" sx={{ width: '100%' }}>
                                <div className="fullCenter" style={{ width: '100%', height: '100%' }} >
                                    {/* <Camera ref={webcamRef} aspectRatio={16 / 9} facingMode='user' /> */}
                                    <Camera
                                        ref={camera}
                                        aspectRatio={16 / 9}
                                        async
                                        errorMessages={{
                                            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                                            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                                            switchCamera:
                                                'It is not possible to switch camera to different one because there is only one video device accessible.',
                                            canvas: 'Canvas is not supported.',
                                        }}
                                    />
                                </div>
                            </Box>
                        </Grid>


                    </>
                    :
                    <>
                        <Grid md={8} >
                            {/* <Carousel
                                next={(next) => setCurrentPanel(next)}
                                prev={(prev) => setCurrentPanel(prev)}
                                active={currentPanel}
                                autoPlay
                                navButtonsAlwaysVisible
                                indicators
                                animation="slide"
                            >
                            </Carousel> */}
                            <img src={imagesTaken?.data} style={{ width: '100%', padding: '0.5rem' }} />
                        </Grid>
                        <Grid container md={2} >
                            <Grid container p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}>

                                <Button onClick={() => {
                                    setCurrentPanel(-1);
                                    setImagesTaken();
                                }} sx={{ width: '100%', height: '100%' }} >
                                    <XCircle size={40} strokeWidth={1} />
                                </Button>

                            </Grid>
                            <Grid container p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}>
                                <Box>
                                    <Typography item color='lightTextSm.main'>Comprimento Min:</Typography>
                                    <Typography item color='lightTextSm.black' >0cm</Typography>
                                </Box>
                            </Grid>
                            <Grid p={1} container bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}>
                                <Box>
                                    <Typography item color='lightTextSm.main'>Largura Min:</Typography>
                                    <Typography item color='lightTextSm.black' >0cm</Typography>
                                </Box>
                            </Grid>
                            <Grid p={1} md={12}>
                                <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                                    <Button >
                                        <Box className="fullCenter " sx={{ border: '2px solid transparent', padding: '.5rem', borderRadius: '50%' }}>

                                            <ArrowLeftRight color={'transparent'} />
                                        </Box>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                }
                <Grid container md={2} >
                    <Grid  onClick={() => setHeightModal(true)} container p={1} bgcolor={"default.main"} className={`fullCenter infoContainerLeftOvers ${!height && 'breathingBackgroundWarning'}` } m={1}>
                        <Box >
                            <Typography item color='lightTextSm.main'>Espessura</Typography>
                            <Typography item color='lightTextSm.black' > {height} cm</Typography>
                        </Box>
                    </Grid>
                    <Grid container p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}>
                        <Box>
                            <Typography item color='lightTextSm.main'>{imagesTaken ? 'Comprimento Max:' : 'Comprimento'}</Typography>
                            <Typography item color='lightTextSm.black' >0cm</Typography>
                        </Box>
                    </Grid>
                    <Grid p={1} container bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}>
                        <Box>
                            <Typography item color='lightTextSm.main'>{imagesTaken ? 'Largura Max:' : 'Largura'}</Typography>
                            <Typography item color='lightTextSm.black' >0cm</Typography>
                        </Box>
                    </Grid>
                    <Grid p={1}>
                        <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => !imagesTaken ? SaveImg() : setDialogOpen(true)}>
                                <Box className="fullCenter infoContainerLeftOvers" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>
                                    <Send />
                                </Box>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>


    </Box >;

};

export default Leftovers;