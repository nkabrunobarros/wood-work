/* eslint-disable react/prop-types */
//  PropTypes
import { Box, Grid, Grow, Typography } from '@mui/material';
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
  const thisPartDetail = parts.find(ele => ele.name === part?.part?.productionDetail?.replace('MC_MUEBLETV_', ''));

  if (currentPartBuildTime < thisPartDetail?.buildTime) return <Typography variant='md' className="successBalloon">+{thisPartDetail?.buildTime - currentPartBuildTime} min</Typography>;
  else if (currentPartBuildTime === thisPartDetail?.buildTime) return <Typography variant='md' className="warningBalloon"> 0 min</Typography>;

  return <Typography variant='md' className="errorBalloon">-{currentPartBuildTime - thisPartDetail?.buildTime || 0} min</Typography>;
};

TimeDetour.propTypes = {
  part: PropTypes.object,
  parts: PropTypes.arrayOf(PropTypes.object)
};

export const WorkerName = ({ part, workers }) => {
  const worker = workers.find(worker => worker.id === part.workerId);

  return worker ? `${worker?.givenName?.value} ${worker?.familyName?.value}` : part.workerName;
};

const Production2 = (props) => {
  const furnitures = props.furnitures.flatMap(obj => obj.items);

  const cellProps = {
    container: true,
    md: 12 / 4,
    sm: 12 / 4,
    xs: 12 / 4,
    alignItems: 'center'
  };

  function getGreenToRed (percent) {
    const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    const g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);

    return 'rgb(' + r + ',' + g + ',0)';
  }

  return <>
    <Grow in={true}>
      <Grid>
        <Grid container md={12} sm={12} xs={12} id='pad'>
          <Box style={{ display: 'flex', marginBottom: '1rem' }}>
            <Typography variant='title'>Produção</Typography>
          </Box>
        </Grid>
        <Grid container md={12} sm={12} xs={12} >
          <Grid container md={12} sm={12} xs={12} p={1} bgcolor={'#F9F9F9'}>
            <Grid {...cellProps}><Typography variant='subtitle2'>Nome</Typography></Grid>
            <Grid {...cellProps}><Typography variant='subtitle2'>Quantidade</Typography></Grid>
            <Grid {...cellProps}><Typography variant='subtitle2'>Peças Produzidas</Typography></Grid>
            <Grid {...cellProps}></Grid>
          </Grid>
          {furnitures.map((furn, index) => {
            return <Grid key={furn.id} container md={12} sm={12} xs={12} p={1} bgcolor={index % 2 !== 0 && 'lightGray.edges'} >
              <Grid {...cellProps}><Typography variant='sm'>{furn.name?.value}</Typography></Grid>
              <Grid {...cellProps}><Typography variant='sm'>{furn.amount?.value}</Typography></Grid>
              <Grid {...cellProps} sx={{ color: getGreenToRed((furn?.completed?.value * 100 || 0) / furn?.amount?.value) }} ><Typography variant='sm'>{furn.completed?.value || 0}</Typography></Grid>
              <Grid {...cellProps} justifyContent={'end'}>
                <PrimaryBtn
                  icon={
                    <Eye
                    />
                  }
                  text='Ver detalhes'
                />
              </Grid>
            </Grid>;
          })}
        </Grid>
      </Grid>
    </Grow>
  </>;
};

Production2.propTypes = {
  pageProps: PropTypes.any,
  order: PropTypes.object,
  open: PropTypes.bool,
  productionDetail: PropTypes.array,
  parts: PropTypes.arrayOf(PropTypes.object)
};

export default Production2;
