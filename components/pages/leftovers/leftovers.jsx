/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Divider, Grid, IconButton, Slider, Stack } from "@mui/material";
import { ArrowLeftRight, Send, SwitchCamera, X } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Camera } from "react-camera-pro";
import Carousel from 'react-material-ui-carousel';
import Select from "../../inputs/select";

const Leftovers = () => {
    const [imagesTaken, setImagesTaken] = useState([]);
    const camera = React.useRef(null);
    const [currentPanel, setCurrentPanel] = useState(-1);
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const [clock, setClock] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();

            setClock(date);
        }, 10000);
    }, []);


    async function SaveImg() {
        if (camera.current) {
            const photo = await camera.current.takePhoto();

            setImagesTaken([...imagesTaken, {
                data: photo,
                takenAt: Date.now()
            }]);
        }
    }


    return <Box >
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
                                <IconButton onClick={() => setCurrentPanel(-1)} >
                                    <ArrowLeftRight />
                                </IconButton>
                            </>
                        }
                    </Box>
                </Grid>
                {/* Type */}
                <Grid md={3} sx={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                    {currentPanel < 0 ?
                        <>
                            <Box sx={{ width: '100%' }}>
                                <Select fullWidth label='Tipo' />
                            </Box>
                        </>
                        :
                        <IconButton onClick={() => {
                            const data = [...imagesTaken];

                            data.splice(currentPanel, 1);
                            setImagesTaken(data);
                        }}>
                            <X />
                        </IconButton>
                    }
                </Box>
                </Grid>
                {/* Date & Time */}
                <Grid md={3} sx={3} p={1}>
                    <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                        {currentPanel < 0 ?
                            <>
                                {/* View a tirar foto */}
                                <Grid >
                                    <Grid container className='fullCenter'>{moment(clock).format('DD.MM.YYYY')}</Grid>
                                    <Divider />
                                    <Grid container className='fullCenter'>{moment(clock).format('HH:mm')}</Grid>
                                </Grid>

                            </>
                            :
                            <>
                                {/* View a ver foto */}
                                <IconButton onClick={() => setCurrentPanel(-1)} >
                                    <ArrowLeftRight />
                                </IconButton>
                            </>
                        }
                    </Box>
                </Grid>
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
                                <IconButton onClick={() => setCurrentPanel(-1)} >
                                    <ArrowLeftRight />
                                </IconButton>
                            </>
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ height: '65vh' }}>
                {currentPanel < 0 ?
                    <>
                        <Grid container md={6}>
                            <Box p={2} className="fullCenter" sx={{ width: '100%' }}>
                                <div className="fullCenter" style={{ width: '640px', height: '100%' }} >
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

                        <Grid container md={2} style={{ overflow: 'scroll', maxHeight: '100%' }}>
                            <Stack>
                                {imagesTaken?.map((imga, i) => <img onClick={() => setCurrentPanel(i)} key={i} src={imga.data} style={{ width: '100%', padding: '0.5rem' }} />)}
                            </Stack>
                        </Grid>

                        <Grid container md={1} >
                            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Box>
                                    <Slider
                                        sx={{
                                            '& input[type="range"]': {
                                                WebkitAppearance: 'slider-vertical',
                                            },
                                        }}
                                        orientation="vertical"
                                        defaultValue={1}
                                        max={5}
                                        step={.1}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={(value) => <div>{value} X</div>}
                                    />
                                </Box>
                                <Box className="fullCenter">
                                    <IconButton
                                        className='cameraSwitchBtn'
                                        onClick={() => camera.current.switchCamera()}
                                    >
                                        <Box className="fullCenter" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>  <SwitchCamera /></Box>
                                    </IconButton>
                                </Box>
                            </Stack>


                        </Grid>
                    </>
                    :
                    <Grid md={8}>
                        <Carousel
                            next={(next) => setCurrentPanel(next)}
                            prev={(prev) => setCurrentPanel(prev)}
                            active={currentPanel}
                            autoPlay
                            navButtonsAlwaysVisible
                            indicators
                            animation="slide"
                        >
                            {imagesTaken?.map((imga, i) => <img key={i} src={imga.data} style={{ width: '100vh', padding: '0.5rem' }} />)}
                        </Carousel>
                    </Grid>}
                <Grid container md={3} >
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Espessura</Box></Grid>
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Comprimento</Box></Grid>
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Largura</Box></Grid>
                    <Grid p={1}>
                        <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => SaveImg()}>
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