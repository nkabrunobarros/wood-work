/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { AppBar, Box, Card, CardActions, CardContent, Dialog, Grid, IconButton, Slide, TablePagination, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { Check, CheckCircle, Edit2, Play, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import CustomBreadcrumbs from '../../breadcrumbs';
import ProjectCard from '../../cards/ProjectCard';
import Content from '../../content/content';
import MomentJsConfig from '../../utils/MomentJsConfig';
import { ClockTime } from './ClockTime';

export const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const StartBtn = (props) => {
  return (
    <IconButton onClick={() => props.onStart(props)} >
      <Tooltip title={props.msg || 'Iniciar'} >
        <Play />
      </Tooltip>
    </IconButton>
  );
};

export const FinishBtn = (props) => {
  return (
    <IconButton onClick={() => props.onFinish(props)} >
      <Tooltip title={'Terminar'} >
        <CheckCircle color='green' />
      </Tooltip>
    </IconButton>
  );
};

export const DoneBtn = () => {
  return (
    <IconButton>
      <Tooltip title={'Feito'} >
        <Check color='green' />
      </Tooltip>
    </IconButton>
  );
};

export const OperationState = (props) => {
  const { part, field } = props;

  if (part[field]) {
    switch (field) {
    case 'nest' : {
    //  Case to Start
      if (part.nest === true && part.inProduction === false) return <StartBtn {...props} />;

      //  Case to finish
      if (part.nest === true && part.inProduction === true) return <FinishBtn {...props} />;

      //  Case done
      if (part.nest === 'done') return <DoneBtn {...props} />;

      break;
    }

    case 'cnc' : {
    //  Case to Start & nest not done
      if (part.nest === true && part.cnc === true && part.inProduction === true) return <StartBtn {...props} msg={'Tem que acabar Nesting 1º'} />;

      if (part.nest === false && part.cnc === true && part.inProduction === false) return <StartBtn {...props} />;

      //  Case to Start & nest not done
      if (part.nest === true && part.cnc && part.inProduction === false) return <StartBtn {...props} msg={'Tem que fazer Nesting 1º'} />;

      //  Case to Start
      if (part.nest === 'done' && part.cnc === true && part.inProduction === false) return <StartBtn {...props} />;

      //  Case to Finish
      if (part.nest === 'done' && part.cnc === true && part.inProduction === true) return <FinishBtn {...props} />;

      //  Case to Finish
      if (part.nest === false && part.cnc === true && part.inProduction === true) return <FinishBtn {...props} />;

      //  Case cnc and nesting done
      if (part.cnc === 'done' && (part.inProduction === false || part.inProduction === 'done')) return <DoneBtn {...props} />;
    }
    }
  }

  // return part[field] && <IconButton onClick={() => part.inProduction ? onFinish() : onStart()} >
  //         <Tooltip title={part.inProduction ? 'Terminar' : 'Iniciar'} >
  //             {part.inProduction ? <X color='red' /> : <Play color='green' />}
  //         </Tooltip>
  // </IconButton>;
};

export const ProjectDetails = (props) => {
  const { setChosenProject, chosenProject, headCells, activeRow, setActiveRow } = props;
  const me = JSON.parse(localStorage.getItem('user'));

  const [rows, setRows] = useState([
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 1, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 2, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 3, nest: false, cnc: 'done', obs: '', inProduction: 'done' },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 4, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 5, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 6, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 7, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 8, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 9, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 10, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', qtd: 1, comp: 2400, larg: 926, esp: 19, tag: 11, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 12, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', qtd: 8, comp: 940, larg: 70, esp: 19, tag: 13, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 14, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19, tag: 15, nest: 'done', cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19, tag: 16, nest: 'done', cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19, tag: 17, nest: 'done', cnc: 'done', obs: '', inProduction: 'done' },
    { ref: 'MC_MUEBLETV_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 18, nest: 'done', cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 19, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1678, larg: 444, esp: 19, tag: 20, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 21, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 22, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 23, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 24, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 924, larg: 283, esp: 19, tag: 25, nest: true, cnc: true, obs: '', inProduction: true },
    { ref: 'MC_MUEBLETV_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 907, larg: 76, esp: 19, tag: 26, nest: true, cnc: false, obs: '', inProduction: true },
  ]);

  moment.locale(MomentJsConfig());

  const cellProps = {
    md: 1,
    sm: 1,
    xs: 1,
    paddingTop: '1rem',
    paddingBottom: '1rem',
    className: 'fullCenter',
    container: true,
    overflow: 'hidden'
  };

  const rowProps = {
    md: 12,
    sm: 12,
    xs: 12,
    sx: { cursor: 'pointer' },
    className: 'hoverOpacity',
    container: true
  };

  function onStartPart (props) {
    const old = [...rows];

    old[props.index].inProduction = true;
    setRows(old);
    //  Trocar para inProduction: true
  }

  function onFinishPart (props) {
    console.log(props);

    const old = [...rows];

    old[props.index].inProduction = false;
    old[props.index][props.field] = 'done';

    if (props.field === 'cnc') old[props.index].inProduction = 'done';
    else old[props.index].inProduction = false;

    setRows(old);
    //  Trocar para inProduction: false
    //  Trocar o field desta row para done
    //  Caso seja a ultima operação, InProduction: done
  }

  return <Dialog
    fullScreen
    open={!!chosenProject}
    onClose={() => setChosenProject()}
    TransitionComponent={Transition}
    sx={{ display: !chosenProject && 'none' }}
  >
    <AppBar position='sticky' component="nav" sx={{ backgroundColor: localStorage.getItem('theme') === 'light' && 'var(--primary-dark)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Card>
              <CardContent className='fullCenter' sx={{ padding: 0.5 }}>
                <Image
                  width='40px'
                  height='40px'
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
              </CardContent>
              <CardActions sx={{ textAlign: 'center' }}>
                <Typography>{me.givenName.value} {me.familyName.value}</Typography>
              </CardActions>
            </Card>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
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
            <Card sx={{ marginTop: 0 }}>
              <CardContent>
                            Armazem
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ padding: 0 }}>
              <CardContent sx={{ textAlign: 'center', padding: 0.5 }}>
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
              src='https://cdn.pixabay.com/photo/2018/04/11/19/48/3d-printer-3311587__480.png' />
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
    <Box sx={{ height: '100%', overflowX: 'scroll' }}>
      {/* <AdvancedTable rows={rows} headCells={headCells} headCellsUpper={headCellsUpper} />  */}
      <Grid container sx={{ minWidth: '1024px', overflow: 'scroll' }}>
        {/* Headers */}
        <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[0].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[1].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[2].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[3].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[4].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[5].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[6].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[7].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[8].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[9].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid' }}><TableSortLabel active={false} direction='desc'> {headCells[10].label} </TableSortLabel></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '0px solid' }}><TableSortLabel active={false} direction='desc'> <Edit2 /> </TableSortLabel></Box></Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {rows.map((part, rowIndex) => {
            return (
              <Grid
                {...rowProps}
                key={rowIndex}
                bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'primary.main' : 'lightGray.edges') : (rowIndex === activeRow && 'primary.main')}
                onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
              >
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[0].id] } </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[1].id] } </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[2].id] } </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[3].id] } mm </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[4].id] } mm </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[5].id] } mm </Typography></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[6].id] } </Typography></Grid>
                <Grid {...cellProps} > <OperationState part={part} index={rowIndex} field={headCells[7].id} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                <Grid {...cellProps} > <OperationState part={part} index={rowIndex} field={headCells[8].id} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                <Grid {...cellProps} > <OperationState part={part} index={rowIndex} field={headCells[9].id} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                <Grid {...cellProps} > <Typography variant='sm'>{ part[headCells[10].id] } </Typography></Grid>
                <Grid {...cellProps} > {part.inProduction === 'done' && <Typography variant='sm' className='successBalloon'>Completo</Typography>}</Grid>
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
  const { breadcrumbsPath, projects } = props;
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
      <Grid container md={12} >
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
