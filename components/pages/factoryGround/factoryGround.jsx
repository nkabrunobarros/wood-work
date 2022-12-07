/* eslint-disable react/prop-types */
import { AppBar, Box, Card, CardActions, CardContent, Dialog, Grid, IconButton, Slide, TablePagination, TableSortLabel, Toolbar, Typography } from '@mui/material';
import { Edit2, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import CustomBreadcrumbs from '../../breadcrumbs';
import ProjectCard from '../../cards/ProjectCard';
import Content from '../../content/content';
import MomentJsConfig from '../../utils/MomentJsConfig';

export const ClockTime = ()  => {
    const [clock, setClock] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();

            setClock(date);
        }, 1000);
    }, []);

    return moment(clock).format('HH:mm:ss');
};

export const ProjectDetails = (props) => {
    const {setChosenProject, chosenProject, headCellsUpper, headCells, activeRow , setActiveRow } = props;
    const me = JSON.parse(localStorage.getItem('user'));

    moment.locale(MomentJsConfig());

    const rows = [
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        { id: Math.random()},
        ];

    const cellProps = {
        md: 1,
        sm: 1,
        xs: 1,
        paddingTop: '1rem',
        paddingBottom: '1rem',
        className: 'fullCenter',
        container: true
    };

    const rowProps = {
        md: 12,
        sm: 12,
        xs: 12,
        sx: { cursor: 'pointer' },
        className: 'hoverOpacity',
        container: true
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return <Dialog
    fullScreen
    open={!!chosenProject}
    onClose={() => setChosenProject()}
    TransitionComponent={Transition}
    sx={{ display: !chosenProject && 'none'}}
>
    <AppBar position='sticky' component="nav" sx={{ backgroundColor: localStorage.getItem('theme') === 'light' && 'var(--primary-dark)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setChosenProject()}
                    aria-label="close"
                >
                    <X />
                </IconButton>
                <Image
                    src={companyLogo}
                    placeholder='blur'
                    width='75px'
                    height='75px'
                />
            </Box>
           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Card>
                        <CardContent className='fullCenter' sx={{ padding: .5}}>
                            <Image   
                                width='40px'
                                height='40px'
                                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'  />
                        </CardContent>
                        <CardActions sx={{textAlign: 'center'}}>
                            <Typography>{me.givenName.value} {me.familyName.value}</Typography>
                        </CardActions>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center'}}>
                            <Typography>
                                Nome do projeto
                            </Typography>
                            <Typography>
                                {chosenProject?.name?.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Card sx={{ marginTop: 0}}>
                        <CardContent>
                            Armazem
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Card sx={{ padding: 0}}>
                        <CardContent sx={{ textAlign: 'center',padding: .5 }}>
                            <Typography>{moment().format('dddd')}</Typography>
                            <Typography>{moment().format('Do MMMM [de] YYYY')}</Typography>
                            <Typography><ClockTime /></Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image   
                        width='75px'
                        height='75px'
                        src='https://cdn.pixabay.com/photo/2018/04/11/19/48/3d-printer-3311587__480.png'  />
                </Box>

           </Box>
           
        </Toolbar>
    </AppBar>
    <Box sx={{ height: '100%' }}>
    <AdvancedTable rows={rows} headCells={headCells} headCellsUpper={headCellsUpper} /> 
    <Grid container sx={{ minWidth: '1024px', overflow: 'scroll', display: 'none'}}>
        {/* Headers */}
        <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[0].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[1].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[2].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[3].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[4].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[5].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[6].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[7].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[8].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[9].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[10].label} </TableSortLabel></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{  width: '100%', borderRight: '0px solid' }}><TableSortLabel active={false} direction='desc'> <Edit2 /> </TableSortLabel></Box></Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
            {[...Array(10)].map((x, rowIndex) => {
                return (
                    <Grid
                        {...rowProps}
                        key={rowIndex}
                        bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'primary.main' : "lightGray.edges") : (rowIndex === activeRow && "primary.main")}
                        onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                    >
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ><X /></Grid>
                        <Grid {...cellProps} ></Grid>
                        <Grid {...cellProps} ></Grid>
                    </Grid>
                );
            })}
            <Grid
                {...rowProps}>
                    <TablePagination
                    showFirstButton
                    showLastButton
                    component='div'
                    sx={{ marginLeft: 'auto' }}
                    rowsPerPageOptions={[5, 10, 25]}
                    count={50}
                    // count={filteredItems ? filteredItems?.length : rows?.length}
                    rowsPerPage={1}
                    // page={page}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={'Mostrar'}
                />
            </Grid>
        </Grid>
    </Grid>

    </Box>

</Dialog >;
};

const FactoryGround = ({ ...props }) => {
    const {  breadcrumbsPath, projects } = props;
    const [activeRow, setActiveRow] = useState(0);
    const [chosenProject, setChosenProject] = useState();

    return <>
      {chosenProject && 
      <ProjectDetails 
        {...props} 
        activeRow={activeRow} 
            chosenProject={chosenProject}
        setActiveRow={setActiveRow} setChosenProject={setChosenProject} />
         }
        <CustomBreadcrumbs path={breadcrumbsPath} /> 
        <Content>
            <Grid container md={12}  >
                <Grid container md={12} p={1} >
                    <Typography variant='title'>Escolha Projeto</Typography>  
                </Grid>
                {projects?.map((proj, i) => 
                    <Grid key={i} container md={3} sm={6} xs={12} p={1} >
                        <ProjectCard proj={proj} setChosenProject={setChosenProject} {...props}/>
                    </Grid>
                )}

            </Grid>
        </Content>
    </>;
};


export default FactoryGround;