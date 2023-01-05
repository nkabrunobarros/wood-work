/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { AppBar, Box, Card, CardActions, CardContent, Dialog, Grid, IconButton, TableSortLabel, Toolbar, Typography } from '@mui/material';
import { Check, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react';
import companyLogo from '../../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../../public/logo_bw_ww40_inv-big.png';
import { Transition } from '../factoryGround';
import { DoneBtn } from './buttons/DoneBtn';
import { FinishBtn } from './buttons/FinishBtn';
import { StartBtn } from './buttons/StartBtn';
import { ClockTime } from './clock/ClockTime';

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
};

export const TopCard = (props) => {
  const { title, children, textCenter } = props;

  return <Card sx={{ width: '100%', height: '100%' }}>
    <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center', display: !title && 'none' }}>
      <Typography variant='subtitle'>{title}</Typography>
    </Box>
    <CardContent>
      <Grid container md={12}>
        <Grid container md={12} sm={12} xs={12}>
          <Box sx={{ textAlign: textCenter && 'center', width: '100%' }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>;
};

export const PartStatus = ({ part }) => {
  if (part.inProduction === 'done') return <Typography variant='sm' className='successBalloon'>Completo</Typography>;
  else if (part.inProduction === true) return <Typography variant='sm' className='infoBalloon'>Em produção</Typography>;
};

const ProjectDetails = (props) => {
  const { setChosenProject, chosenProject, headCells, activeRow, setActiveRow, open } = props;
  const me = JSON.parse(localStorage.getItem('user'));
  const [productionDetails, setProductionDetails] = useState({});

  const [rows, setRows] = useState([
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 1, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 2, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 3, nest: false, cnc: true, obs: '', inProduction: false },
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
    { ref: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19, tag: 15, nest: true, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19, tag: 16, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19, tag: 17, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 18, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 19, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1678, larg: 444, esp: 19, tag: 20, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 21, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 22, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 23, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 24, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 924, larg: 283, esp: 19, tag: 25, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 907, larg: 76, esp: 19, tag: 26, nest: true, cnc: false, obs: '', inProduction: false },
  ]);

  const cellProps = {
    md: 1,
    sm: 1,
    xs: 1,
    paddingTop: '1rem',
    paddingBottom: '1rem',
    className: 'fullCenter',
    container: true,
    overflow: 'hidden',
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

    //  Add production Log
    const productionLog = { ...productionDetails };

    //  If theres no log of this part yet
    if (productionLog[old[props.index].ref] === undefined) productionLog[old[props.index].ref] = { startedAt: new Date(), ref: old[props.index].ref, material: old[props.index].material };

    if (props.field === 'cnc') {
      productionLog[old[props.index].ref].cncWorker = me.id;
      productionLog[old[props.index].ref].cncUsed = 'ab1';
      productionLog[old[props.index].ref].cncStarted = new Date();
    } else if (props.field === 'nest') {
      productionLog[old[props.index].ref].nestStarted = new Date();
      productionLog[old[props.index].ref].nestUsed = 'ab2';
      productionLog[old[props.index].ref].nestWorker = me.id;
    }

    setProductionDetails(productionLog);
  }

  function onFinishPart (props) {
    const old = [...rows];

    old[props.index].inProduction = false;
    old[props.index][props.field] = 'done';

    if (props.field === 'cnc') old[props.index].inProduction = 'done';
    else old[props.index].inProduction = false;

    setRows(old);

    //  Update productionLogs
    const productionLog = { ...productionDetails };

    if (props.field === 'cnc') productionLog[old[props.index].ref].cncEnded = new Date();

    if (props.field === 'nest') {
      productionLog[old[props.index].ref].nestEnded = new Date();
      productionLog[old[props.index].ref].endedAt = new Date();
    }

    setProductionDetails(productionLog);
  }

  return open && <Dialog
    fullScreen
    open={!!chosenProject}
    onClose={() => setChosenProject()}
    TransitionComponent={Transition}
    sx={{ display: !chosenProject && 'none' }}
  >
    <AppBar position='sticky' component="nav" sx={{ backgroundColor: localStorage.getItem('theme') === 'light' && 'var(--primary-dark)' }}>
      <Toolbar>
        <Grid container>
          <Grid container md={1} sm={1} xs={1} p={1} >
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
          </Grid>
          <Grid container md={2.5} sm={2} xs={2} p={1} >
            <Card sx={{ width: '100%' }}>
              <CardContent className='fullCenter' sx={{ padding: 0.5 }}>
                <Image
                  width='40px'
                  height='40px'
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
              </CardContent>
              <CardActions >
                <Typography sx={{ textAlign: 'center', width: '100%' }}>{me?.givenName?.value} {me?.familyName?.value}</Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={2.5} p={1} >
            <TopCard title='Projeto' textCenter >{chosenProject?.name?.value}</TopCard>
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={2.5} p={1} >
            <TopCard title='Maquina em uso' textCenter >
              <Typography variant='h4'>CNC</Typography>
            </TopCard>
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={2.5} p={1} >
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                <Typography variant='subtitle'>Data</Typography>
              </Box>
              <CardContent>
                <Grid container md={12}>
                  <Grid container md={12} sm={12} xs={12}>
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                      <Typography>{moment().format('dddd Do MMMM [de] YYYY')} <ClockTime /></Typography>
                      {/* <Typography><ClockTime /></Typography> */}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid container md={1} sm={1} xs={1} p={1} >
            <Box className='fullCenter' sx={{ width: '100%' }}>
              <Image
                src={woodWorkyLogo}
                placeholder='blur'
                width='75px'
                height='75px'
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Box sx={{ height: '100%', overflowX: 'scroll' }}>
      <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
        {/* Headers */}
        <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
          {headCells.map(headCell => { return <Grid {...cellProps} key={headCell.label}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><TableSortLabel active={false} direction='desc'> {headCell.label} </TableSortLabel></Box></Grid>; })}
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'> <Check /> </TableSortLabel></Box></Grid>
          {console.log(headCells)}
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          {rows
            .sort((a, b) => a.tag - b.tag)
            .map((part, rowIndex) => {
              return (
                <Grid
                  {...rowProps}
                  key={rowIndex}
                  bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'lightblue' : 'lightGray.edges') : (rowIndex === activeRow && 'lightblue')}
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
                  <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  </Dialog >;
};

export default ProjectDetails;
