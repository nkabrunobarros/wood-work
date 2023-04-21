//  PropTypes
import { Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectDetails from '../../factoryGround/ProjectDetails/projectDetails';

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

const Production = (props) => {
  const propsHere = {
    ...props,
    open: false
  };

  return props.open && <>
    <ProjectDetails
      {...propsHere}
      chosenProject={props.order}
      detailOnly
    />

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
