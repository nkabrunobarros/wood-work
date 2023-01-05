//  PropTypes
import { Box, Grid, Typography } from '@mui/material';
import { Eye } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import PrimaryBtn from '../../../buttons/primaryBtn';

export const CurrentOperation = ({ part }) => {
  return part.cncWorker ? 'CNC' : 'Nesting';
};

export const PartDone = ({ part }) => {
  const a = moment(part.startedAt);
  const b = moment();

  a.diff(b, 'minutes');
  a.diff(b, 'minutes');

  return a.diff(b, 'minutes') * -1 + ' min';
};

export const TimeDetour = ({ part, parts }) => {
  const a = moment(part.startedAt);
  const b = moment();
  const currentPartBuildTime = a.diff(b, 'minutes') * -1;
  const thisPartDetail = parts.find(ele => ele.name === part.ref.replace('MC_MUEBLETV_', ''));

  if (currentPartBuildTime < thisPartDetail.buildTime) return <Typography variant='md' className="successBalloon">+{thisPartDetail.buildTime - currentPartBuildTime} min</Typography>;
  else if (currentPartBuildTime === thisPartDetail.buildTime) return <Typography variant='md' className="warningBalloon"> 0 min</Typography>;

  return <Typography variant='md' className="errorBalloon">-{currentPartBuildTime - thisPartDetail.buildTime} min</Typography>;
};

TimeDetour.propTypes = {
  part: PropTypes.object,
  parts: PropTypes.arrayOf(PropTypes.object)
};

export const WorkerName = ({ part, workers }) => {
  let worker;

  if (part.cncWorker) worker = workers.find(worker => worker.id === part.cncWorker);
  else worker = workers.find(worker => worker.id === part.nestWorker);

  return `${worker?.givenName?.value} ${worker?.familyName?.value}`;
};

const Production = (props) => {
  const {
    pageProps, productionDetail,
    // headCellsProductionDetail, headCellsUpperProductionDetail,
    open,
    parts
  } = props;

  const cellProps = {
    md: 1.5,
    sm: 1.5,
    xs: 1.5,
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

  const headCells = [
    { label: 'Etiqueta' },
    { label: 'Peça' },
    { label: 'Operação' },
    { label: 'Inicio' },
    { label: 'Previsto' },
    { label: 'Realizado' },
    { label: 'Desvio' },
    { label: 'Responsável' },
  ];

  return open && <>
    <Box id='pad'>
      <Box style={{ display: 'flex', marginBottom: '1rem' }}>
        <Typography variant='title'>Produção</Typography>
        <Box style={{ marginLeft: 'auto' }}>
          <PrimaryBtn
            icon={
              <Eye
                strokeWidth={pageProps.globalVars.iconStrokeWidth}
                size={pageProps.globalVars.iconSize}
              />
            }
            text='Ver detalhes'
          />
        </Box>
      </Box>
    </Box>
    <Box sx={{ width: '100%', overflow: 'scroll' }}>
      <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
        <Grid container md={12} sm={12} xs={12} bgcolor={'lightGray.edges'}>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><Typography>{headCells[0].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><Typography>{headCells[1].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><Typography>{headCells[2].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><Typography>{headCells[3].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '1px solid', borderColor: 'divider' }}><Typography>{headCells[4].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '0px solid', borderColor: 'divider' }}><Typography>{headCells[5].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '0px solid', borderColor: 'divider' }}><Typography>{headCells[6].label}</Typography></Box></Grid>
          <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%', borderRight: '0px solid', borderColor: 'divider' }}><Typography>{headCells[7].label}</Typography></Box></Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12} >
          {productionDetail
            .filter(ele => ele.inProduction === true)
            .sort((a, b) => a.tag - b.tag)
            .map((part, rowIndex) => {
              return (
                <Grid
                  {...rowProps}
                  key={rowIndex}
                >
                  <Grid {...cellProps} > <Typography variant='sm'>{part.tag }</Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'>{part.ref.replace('MC_MUEBLETV_', '').replace('_', ' ') } </Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'> <CurrentOperation part={part} /> </Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'>{moment(part.startedAt).format('DD/MM/YYYY hh:mm') } </Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'>{parts.find(ele => ele.name === part.ref.replace('MC_MUEBLETV_', '')).buildTime || '?'} min</Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'><PartDone part={part} /></Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'><TimeDetour {...props} part={part} /> </Typography></Grid>
                  <Grid {...cellProps} > <Typography variant='sm'><WorkerName {...props} part={part} /> </Typography></Grid>
                  {/* <Grid {...cellProps} > <Typography variant='sm'>{part.nestWorker || part.cncWorker } </Typography></Grid> */}
                </Grid>
              );
            })}
        </Grid>
      </Grid>

    </Box>

  </>;
};

Production.propTypes = {
  pageProps: PropTypes.any,
  order: PropTypes.object,
  open: PropTypes.bool,
  productionDetail: PropTypes.array,
  parts: PropTypes.arrayOf(PropTypes.object)
};

export default Production;
