/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Grid, IconButton, Slider, Stack } from "@mui/material";
import { Camera, Send, SwitchCamera } from "lucide-react";
import React, { useState } from "react";
import Webcam from "react-webcam";

const Leftovers = () => {
    const [imageTaken, setImageTaken] = useState();
    const webcamRef = React.useRef(null);
    const [cameraPosition, setCameraPosition] = useState('user');

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current?.getScreenshot();

            setImageTaken(imageSrc);
        },
        [webcamRef]
    );

    return <Box >
        <Grid container>
            <Grid container md={12} sm={12} sx={{ height: '10vh' }}>
                <Grid md={3} sx={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                <Grid md={3} sx={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                <Grid md={3} sx={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                <Grid md={3} sx={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
            </Grid>
            <Grid container sx={{ height: '60vh' }}>
                <Grid container md={8}>
                    <Box p={2} className="fullCenter" sx={{ width: '100%' }}>
                        {imageTaken ? <img src={imageTaken} /> :
                            <Webcam
                                audio={false}
                                height={'450px'}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                imageSmoothing
                                async
                                videoConstraints={{
                                    facingMode: "user" // OR 'environment'
                                }}
                            />
                        }
                    </Box>
                </Grid>
                <Grid container md={1} >
                    {!imageTaken &&
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
                                <IconButton onClick={() => setCameraPosition(cameraPosition === 'user' ? 'user' : 'environment')}>
                                    <Box className="fullCenter" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>  <SwitchCamera /></Box>
                                </IconButton>
                            </Box>
                        </Stack>
                    }

                </Grid>

                <Grid container md={3} >
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                    <Grid p={1} bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" m={1}><Box bgcolor={"default.main"} className="fullCenter" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                </Grid>
            </Grid>
            <Grid container sx={{ height: '10vh' }}>
                <Grid container md={12}>
                    <Grid md={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                    <Grid md={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                    <Grid md={3} p={1}><Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>Content Panel</Box></Grid>
                    <Grid md={3} p={1}>
                        <Box bgcolor={"default.main"} className="fullCenter infoContainerLeftOvers" sx={{ height: '100%' }}>
                            <Button sx={{ width: '100%', height: '100%' }} onClick={() => !imageTaken ? capture() : setImageTaken()}>
                                {imageTaken ?
                                    <Box className="fullCenter infoContainerLeftOvers" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>
                                        <Send />
                                    </Box>
                                    :
                                    <Box className="fullCenter infoContainerLeftOvers" sx={{ border: '2px solid', padding: '.5rem', borderRadius: '50%' }}>
                                        <Camera />
                                    </Box>}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>


    </Box>;

};

export default Leftovers;