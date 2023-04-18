/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { AppBar, Box, Card, CardContent, Dialog, Grid, Grow, IconButton, Tab, TableSortLabel, Tabs, Toolbar, Tooltip, Typography } from '@mui/material';
import { Check, CheckCircle, HardDrive, Package, Play, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lenghtanyLogo from '../../../../public/Logo-NKA.png';
import woodWorkyLogo from '../../../../public/logo_bw_ww40_inv-big.png';
import * as consumablesActionsRedux from '../../../../store/actions/consumable';
import * as machineTasksActionsRedux from '../../../../store/actions/machineTask';
import * as partsActionsRedux from '../../../../store/actions/part';
import * as workerTasksActionsRedux from '../../../../store/actions/workerTask';
import Content from '../../../content/content';
import Loader from '../../../loader/loader';
import TabPanel from '../../dashboard/TabPanel';
import { Transition } from '../factoryGround';
import { DoneBtn } from './buttons/DoneBtn';
import { FinishBtn } from './buttons/FinishBtn';
import { StartBtn } from './buttons/StartBtn';

export const OperationState = (props) => {
  const { part, field } = props;
  const isNest = field === 'nestingFlag';
  const isCnc = field === 'cncFlag';
  const isorla = field === 'orla';
  const isFuroFace = field === 'f';

  if (!part[field]) {
    return null;
  }

  if (isNest) {
    if (part.nestingFlag === true && part.inProduction === false) {
      return <StartBtn {...props} />;
    }

    if (part.nestingFlag === true && part.inProduction === true) {
      return <FinishBtn {...props} />;
    }

    if (part.nestingFlag === 'done') {
      return <DoneBtn {...props} />;
    }
  }

  if (isCnc) {
    if (part.cncFlag === 'done' && (part.inProduction || part.inProduction === 'done')) {
      return <DoneBtn {...props} />;
    }

    if (part.cncFlag === 'done' && (part.inProduction === false || part.inProduction === 'done')) {
      return <DoneBtn {...props} />;
    }

    if (part.nestingFlag === false && part.cncFlag === true && part.inProduction === false) {
      return <StartBtn {...props} />;
    }

    if (part.nestingFlag === true && part.cncFlag && part.inProduction === false) {
      return <StartBtn {...props} msg={'Tem que fazer etapas anteriores 1º'} />;
    }

    if (part.nestingFlag === 'done' && part.cncFlag === true && part.inProduction === false) {
      return <StartBtn {...props} />;
    }

    if (part.nestingFlag === true && part.cncFlag === true && part.inProduction === true) {
      return <StartBtn {...props} msg={'Tem que fazer etapas anteriores 1º'} />;
    }

    if (part.nestingFlag === 'done' && part.cncFlag === true && part.inProduction === true) {
      return <FinishBtn {...props} />;
    }

    if (part.nestingFlag === false && part.cncFlag === true && part.inProduction === true) {
      return <FinishBtn {...props} />;
    }
  }

  if (isorla) {
    //  case nestingFlag and cncFlag true and not done
    if (part.nestingFlag === true || part.cncFlag === true) return <StartBtn {...props} msg={'Tem que fazer etapas anteriores 1º'} />;

    if (!part.nestingFlag && !part.cncFlag && part.orla === true && part.inProduction === false) return <StartBtn {...props} />;

    if (!part.nestingFlag && !part.cncFlag && part.orla === true && part.inProduction === true) return <FinishBtn {...props} />;

    if (!part.nestingFlag && !part.cncFlag && part.orla === 'done') return <DoneBtn {...props} />;

    //  case nestingFlag is done or not needed and cncFlag is done or not needed
    if (part.nestingFlag === 'done' && part.cncFlag === 'done' && part.orla === true && part.inProduction === false) return <StartBtn {...props} />;

    if (part.nestingFlag === 'done' && !part.cncFlag && part.orla && part.inProduction === false) return <StartBtn {...props} />;

    if (!part.nestingFlag && part.cncFlag === 'done' && part.orla === true && part.inProduction === false) return <StartBtn {...props} />;

    if (!part.nestingFlag && part.cncFlag === 'done' && part.orla === true && part.inProduction === true) return <FinishBtn {...props} />;

    if (!part.nestingFlag && part.cncFlag === 'done' && part.orla === 'done') return <DoneBtn {...props} />;

    if (part.nestingFlag === 'done' && !part.cncFlag && part.orla === true && part.inProduction === true) return <FinishBtn {...props} />;

    if (part.nestingFlag === 'done' && part.cncFlag === 'done' && part.orla === true && part.inProduction === true) return <FinishBtn {...props} />;

    if (part.nestingFlag === 'done' && part.cncFlag === 'done' && part.orla === 'done') return <DoneBtn {...props} />;

    if (part.nestingFlag === 'done' && !part.cncFlag && part.orla === 'done') return <DoneBtn {...props} />;
  }

  if (isFuroFace) {
    //  case nestingFlag and cncFlag true and not done
    if (part.nestingFlag === true || part.cncFlag === true || part.orla === true) return <StartBtn {...props} msg={'Tem que fazer etapas anteriores 1º'} />;

    if (part.nestingFlag === 'done' && part.cncFlag === 'done' && part.orla === 'done' && !part.inProduction) return <StartBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === 'done' && part.orla === 'done' && !part.inProduction) return <StartBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === false && part.orla === 'done' && !part.inProduction) return <StartBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === false && part.orla === false && !part.inProduction) return <StartBtn {...props} />;

    //
    if (part.nestingFlag === 'done' && part.cncFlag === 'done' && part.orla === 'done' && part.inProduction === true) return <FinishBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === 'done' && part.orla === 'done' && part.inProduction === true) return <FinishBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === false && part.orla === 'done' && part.inProduction === true) return <FinishBtn {...props} />;

    if (part.nestingFlag === false && part.cncFlag === false && part.orla === false && part.inProduction === true) return <FinishBtn {...props} />;

    //
    if (part.f === 'done') return <DoneBtn {...props} />;
  }

  return null;
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
  const { chosenProject, activeRow, setActiveRow, open, onClose, detailOnly } = props;
  const reduxState = useSelector((state) => state);
  const me = reduxState.auth.me;
  const [consumables, setConsumables] = useState();
  const [productionDetails, setProductionDetails] = useState({});
  const [productionDetailsTest, setProductionDetailsTest] = useState(props.productionDetails || []);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const dispatch = useDispatch();
  const getWorkerTasks = (data) => dispatch(workerTasksActionsRedux.workerTasks(data));
  const newWorkerTask = (data) => dispatch(workerTasksActionsRedux.newWorkerTask(data));
  const updateWorkerTask = (data) => dispatch(workerTasksActionsRedux.updateWorkerTask(data));
  const newMachineTask = (data) => dispatch(machineTasksActionsRedux.newMachineTask(data));
  const getParts = (data) => dispatch(partsActionsRedux.parts(data));
  const newPart = (data) => dispatch(partsActionsRedux.newPart(data));
  const getMachineTasks = (data) => dispatch(machineTasksActionsRedux.machineTasks(data));
  const getConsumables = (data) => dispatch(consumablesActionsRedux.projectConsumables(data));

  const [projectParts, setProjectParts] = useState(props?.projectParts || [
    { id: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', partName: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 1, nestingFlag: true, cncFlag: true, orla: true, f: true, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', partName: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 2, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', partName: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 3, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', partName: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 4, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 5, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 6, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', partName: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 7, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 8, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 9, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 10, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_PAINEL2', partName: 'MC_MUEBLETV_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', amount: 1, lenght: 2400, width: 926, thickness: 19, tag: 11, nestingFlag: false, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 12, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', amount: 8, lenght: 940, width: 70, thickness: 19, tag: 13, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 14, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_PAINEL1', partName: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', amount: 1, lenght: 2394, width: 560, thickness: 19, tag: 15, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A1_PAINEL3', partName: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 2400, width: 566, thickness: 19, tag: 16, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_CIMA', partName: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1716, width: 466, thickness: 19, tag: 17, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_DIV_DIR', partName: 'MC_MUEBLETV_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 18, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_DIV_ESQ', partName: 'MC_MUEBLETV_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 19, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_FUNDO', partName: 'MC_MUEBLETV_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1678, width: 444, thickness: 19, tag: 20, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', partName: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 21, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 22, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_LAT_DIR', partName: 'MC_MUEBLETV_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 23, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_LAT_ESQ', partName: 'MC_MUEBLETV_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 24, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_PORTA_BASC', partName: 'MC_MUEBLETV_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 924, width: 283, thickness: 19, tag: 25, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { id: 'MC_MUEBLETV_A2_RIPA_TRAS', partName: 'MC_MUEBLETV_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 907, width: 76, thickness: 19, tag: 26, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
  ]);

  function createParts () {
    const newParts = [
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_FUNDO', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 1, nestingFlag: true, cncFlag: true, orla: true, f: true, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_FUNDO', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 2, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_COSTA', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 3, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_FRT_INT', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 4, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_LAT_DIR', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 5, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_LAT_ESQ', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 6, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_COSTA', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 7, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_FRT_INT', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 8, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_LAT_DIR', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 9, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_LAT_ESQ', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 10, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_PAINEL2', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', amount: 1, lenght: 2400, width: 926, thickness: 19, tag: 11, nestingFlag: false, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_RIPAS_SUP_ME_1', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 12, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_RIPAS_SUP_ME_2', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', amount: 8, lenght: 940, width: 70, thickness: 19, tag: 13, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_RIPAS_SUP_ME_3', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 14, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_PAINEL1', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_PAINEL1', material: 'MDF Folheado Carv 19', amount: 1, lenght: 2394, width: 560, thickness: 19, tag: 15, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A1_PAINEL3', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 2400, width: 566, thickness: 19, tag: 16, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_CIMA', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1716, width: 466, thickness: 19, tag: 17, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_DIV_DIR', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 18, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_DIV_ESQ', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 19, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_FUNDO', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1678, width: 444, thickness: 19, tag: 20, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_DIR_FRENTE', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 21, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_GAV_ESQ_FRENTE', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 22, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_LAT_DIR', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 23, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_LAT_ESQ', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 24, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_PORTA_BASC', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 924, width: 283, thickness: 19, tag: 25, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      { tupia: true, orla2: true, orla3: true, orla4: true, orla5: true, f2: true, f3: true, f4: true, f5: true, belongsTo: props.chosenProject.id, id: props.chosenProject.name.value + '_A2_RIPA_TRAS', partName: props.chosenProject.id.replace('urn:ngsi-ld:Project:', '') + '_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 907, width: 76, thickness: 19, tag: 26, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    ];

    const built = newParts.map((part) => {
      const a = {};

      Object.keys(part).map((key) => {
        a[key] = { type: 'Property', value: part[key] };
      });

      console.log(a);
      a.id = 'urn:ngsi-ld:Part:' + a.id.value;
      a.type = 'Part';

      return a;
    });

    console.log(built);

    true && built.map(async (part) => {
      await newPart(part);
    });
  }

  useEffect(() => {
    async function load () {
      const logsWorkerTasks = await getWorkerTasks().then((res) => {
        return res.data.filter(ele => ele.onProject?.value === props.chosenProject.id);
      });

      const logsMachineTasks = await getMachineTasks().then((res) => {
        return res.data.filter(ele => ele.onProject?.value === props.chosenProject.id);
      });

      await getParts(chosenProject.id).then((res) => {
        const built = res.data.filter(ele => ele.belongsTo.value === props.chosenProject.id).map((part) => {
          const part2 = { ...part };

          part2.logs = logsWorkerTasks.filter(ele => ele.executedInOn.object === part.id);

          Object.keys(part2).map((key) => {
            part2[key] = part2[key].type === 'Property' ? part2[key].value : (part2[key].type === 'Relationship' ? part2[key].object : part2[key]);
          });

          part2.inProduction = false;
          part2.f = !!(part2.f2 || part2.f3 || part2.f4 || part2.f5);
          part2.orla = !!(part2.orla2 || part2.orla3 || part2.orla4 || part2.orla5);

          return part2;
        });

        built[0] && setProjectParts(built);
      });

      await getConsumables(chosenProject.id).then((res) => {
        const built = res.data.map((consu) => {
          const consu2 = { ...consu };

          Object.keys(consu2).map((key) => {
            consu2[key] = consu2[key].type === 'Property' ? consu2[key].value : (consu2[key].type === 'Relationship' ? consu2[key].object : consu2[key]);
          });

          return consu2;
        });

        setConsumables(built);
      });
    }

    load();
    Promise.all([load()]).then(() => setFullyLoaded(true));
  }, []);

  const cellProps = {
    md: 0.85,
    sm: 0.85,
    xs: 0.85,
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

  async function onStartPart (props) {
    const { field, index } = props;
    const old = [...projectParts];
    const part = old[index];

    // Set inProduction flag
    part.inProduction = true;
    setProjectParts(old);

    // Add production Log
    const productionLog = { ...productionDetails };

    if (!productionLog[part.partName]) {
      productionLog[part.partName] = {
        startedAt: new Date(),
        ref: part.partName,
        material: part.material,
        tag: part.tag
      };
    }

    productionLog[part.partName].inProduction = true;

    switch (field) {
    case 'cncFlag':
      productionLog[part.partName].cncFlagWorker = me.id;
      productionLog[part.partName].cncFlagUsed = 'ab1';
      productionLog[part.partName].cncFlagStarted = new Date();
      part.isCnc = true;

      break;
    case 'nestingFlag':
      productionLog[part.partName].nestingFlagWorker = me.id;
      productionLog[part.partName].nestingFlagUsed = 'ab2';
      productionLog[part.partName].nestingFlagStarted = new Date();
      part.isNest = true;

      break;
    case 'orla':
      productionLog[part.partName].orlaWorker = me.id;
      productionLog[part.partName].orlaUsed = 'ab3';
      productionLog[part.partName].orlaStarted = new Date();
      part.isorla = true;

      break;
    case 'f':
      productionLog[part.partName].furoFaceWorker = me.id;
      productionLog[part.partName].furoFaceUsed = 'ab4';
      productionLog[part.partName].furoFaceStarted = new Date();
      part.isFuroFace = true;

      break;
    default:
      break;
    }

    setProductionDetails(productionLog);

    // Add production log test
    const productionLogTest = [...productionDetailsTest];

    if (!productionLogTest.find((log) => log.partId === part.partName && log.operation === field)) {
      productionLogTest.push({
        id: `${part.partName}_${field.toUpperCase()}`,
        operation: field,
        machineId: '123 ' + field,
        workerId: me.id,
        startedAt: new Date(),
        partId: part.partName
      });
    }

    setProductionDetailsTest(productionLogTest);

    const builtWorkerTask = {
      id: `urn:ngsi-ld:WorkerTask:${props.part.id || props.part.name}${me.id}${props.field}`,
      type: 'WorkerTask',
      onProject: {
        type: 'Property',
        value: props.chosenProject.id
      },
      startTime: {
        type: 'Property',
        value: moment().format('DD/MM/YYYY HH:mm:ss')
      },
      finishTime: {
        type: 'Property',
        value: ''
      },
      lineNumber: {
        type: 'Property',
        value: props.index
      },
      executedBy: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:Worker:' + me.id
      },
      executedInOn: {
        type: 'Relationship',
        object: props.part.id
      },
      action: {
        type: 'Property',
        value: props.field
      },
    };

    const newWorkertask = await newWorkerTask(builtWorkerTask);

    const builtMachineTask = {
      id: `urn:ngsi-ld:MachineTask:${props.part.id}${props.machine}${props.field}`,
      type: 'MachineTask',
      onProject: {
        type: 'Property',
        value: props.chosenProject.id
      },
      startTime: {
        type: 'Property',
        value: moment().format('DD/MM/YYYY HH:mm:ss')
      },
      finishTime: {
        type: 'Property',
        value: ''
      },
      byMachine: {
        type: 'Relationship',
        object: props.machine
      },
      performedOn: {
        type: 'Relationship',
        object: props.part.id
      }
    };

    false && await newMachineTask(builtMachineTask).then((res) => console.log(res));

    return newWorkertask.data;
  }

  function onFinishPart (props) {
    const old = [...projectParts];

    old[props.index].inProduction = false;
    old[props.index][props.field] = 'done';

    // Update productionLogs
    const productionLog = { ...productionDetails };
    const log = productionLog[old[props.index].partName];

    log.inProduction = false;

    if (props.field === 'cncFlag') {
      if (!old[props.index].orla && !old[props.index].f)old[props.index].inProduction = 'done';

      log.cncFlagEnded = new Date();

      if (old[props.index].nestingFlag === false && old[props.index].orla === false && old[props.index].f === false) {
        log.endedAt = new Date();
      }
    } else if (props.field === 'nestingFlag') {
      if (!old[props.index].orla && !old[props.index].cncFlag && !old[props.index].f)old[props.index].inProduction = 'done';

      log.nestingFlagEnded = new Date();

      if (old[props.index].orla === false && old[props.index].f === false) {
        log.endedAt = new Date();
      }
    } else if (props.field === 'orla') {
      if (!old[props.index].f)old[props.index].inProduction = 'done';

      log.orlaEnded = new Date();

      if (old[props.index].f === false) {
        log.endedAt = new Date();
      }
    } else if (props.field === 'f') {
      old[props.index].inProduction = 'done';
      log.furoFaceEnded = new Date();
      log.endedAt = new Date();
    }

    setProjectParts(old);
    setProductionDetails(productionLog);

    // TESTES
    const productionLogTest = [...productionDetailsTest];

    const thisLog = productionLogTest.find(
      (log) => log.id === `${old[props.index].partName}_${props.field.toUpperCase()}`
    );

    thisLog.endedAt = new Date();
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  async function FinishPart (props) {
    const built = {
      finishTime: {
        type: 'Property',
        value: moment().format('DD/MM/YYYY HH:mm:ss')
      }
    };

    await updateWorkerTask({ data: built, id: props.id });
  }

  function changeFinishTime (logsArray, newFinishTime) {
    const modifiedLogsArray = logsArray.map(log => {
      const modifiedLog = { ...log };

      modifiedLog.finishTime.value = newFinishTime;

      return modifiedLog;
    });

    return modifiedLogsArray;
  }

  console.log(projectParts);

  const Test = (props) => {
    const { part, field } = props;
    const cpy = [...projectParts];
    const machines = props.machines?.filter(machine => machine?.machineType?.value?.toLowerCase()?.includes(props?.field?.replace('Flag', '')));

    if (!part[field]) return '';

    const index = cpy[props.index].logs.findIndex((log) => log.action?.value === field);
    const log = part.logs.find(log => log.action?.value === field);

    if (!log && part[field]) {
      return <>
        <IconButton onClick={async () => {
          const res = await onStartPart(props);
          const bLogs = cpy[props.index].logs;

          bLogs.push(res);
          cpy[props.index].logs = bLogs;
          setProjectParts(cpy);
        }} >
          <Tooltip title={!machines[0] ? 'Não há maquinas disponiveis' : (props.msg || 'Iniciar')} >
            <Play />
          </Tooltip>
        </IconButton>
      </>;
    }

    if (log.finishTime.value === '') {
      return <IconButton {...props} onClick={() => FinishPart(log).then(() => {
        cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
        setProjectParts(cpy);
      })} >
        <Tooltip title={'Terminar'} >
          <CheckCircle color='green' />
        </Tooltip>
      </IconButton>;
    }

    return <Box onClick={() => {
      cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
      setProjectParts(cpy);
    }}><IconButton >
        <Tooltip title={'Feito'} >
          <Check color='green' />
        </Tooltip>
      </IconButton>
    </Box>;
  };

  return open && <Dialog
    fullScreen
    open={!!chosenProject}
    onClose={() => onClose()}
    TransitionComponent={Transition}
    sx={{ display: !chosenProject && 'none' }}
  >
    <AppBar position='sticky' lenghtonent="nav" sx={{ backgroundColor: 'default.sides' }} >
      <Toolbar>
        <Grid container>
          <Grid container md={6} sm={6} xs={6} p={1} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => onClose()}
                aria-label="close"
              >
                <X />
              </IconButton>
              <Box p={detailOnly && 1}>
                <Image
                  src={lenghtanyLogo}
                  alt={'lenghtanyLogo'}
                  placeholder='blur'
                  height={!detailOnly ? 50 : 40}
                  width={!detailOnly ? 100 : 80}
                  loading='lazy'
                />
              </Box>
            </Box>
          </Grid>
          <Grid container md={6} sm={6} xs={6} p={1} justifyContent={'end'} alignItems='center' >
            <Box pr={3}>
              <Typography variant='md' sx={{ display: !reduxState.auth.me && 'none' }}>{reduxState.auth.me?.name?.value || reduxState.auth.me?.givenName?.value || (reduxState.auth.me?.first_name !== '' ? reduxState.auth.me?.first_name + ' ' + reduxState.auth.me?.last_name : reduxState.auth.me.username)}</Typography>
            </Box>
            <Box p={detailOnly && 1}>
              <Image
                src={woodWorkyLogo}
                alt={'woodWork Logo'}
                placeholder='blur'
                height={!detailOnly ? 50 : 40}
                width={!detailOnly ? 50 : 40}
                loading='lazy'
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    {/* <Button onClick={() => createParts()}>Create</Button> */}
    {fullyLoaded
      ? <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }} >
        <Content>
          <Grid id='pad' container md={12} sm={12} xs={12}>
            <Grid m={1} md={3} sm={3} xs={3}>
              <Typography variant='titlexxl'>{chosenProject?.name?.value}</Typography>
            </Grid>
            <Grid container m={1} md={2} sm={2} xs={2} bgcolor={'lightGray.main'} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', backgroundColor: 'lightGray.main' }}>
              <Grid container md={12} sm={12} xs={12} color='primary.main' p={1}>
                <Package />
                <Typography variant='subtitle2'>Armazem</Typography></Grid>
              <Grid container md={12} sm={12} xs={12} pl={2}>
                <Typography variant='subtitle2' color='lightTextSm.main'>Armazem 2b</Typography>
              </Grid>
            </Grid>
            <Grid container m={1} md={2} sm={2} xs={2} bgcolor={'lightGray.main'} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', backgroundColor: 'lightGray.main' }}>
              <Grid container md={12} sm={12} xs={12} color='primary.main' p={1}>
                <HardDrive />
                <Typography variant='subtitle2'>Maquina em uso</Typography></Grid>
              <Grid container md={12} sm={12} xs={12} pl={2}>
                <Typography variant='subtitle2' color='lightTextSm.main'>{projectParts.find(ele => ele.inProduction) ? 'Nesting2' : 'Nenhuma'}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container md={12} sm={12} xs={12}>
            <Tabs value={value} onChange={handleChange} sx={{ width: '100%' }}>
              <Tab label="Lista de Corte" {...a11yProps(0)} sx={{ width: '100%' }}/>
              {/* <Tab label="Acessorios" {...a11yProps(1)} sx={{ width: '100%' }}/> */}
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grow in={true}>
                <Box sx={{ height: '100%', overflowX: 'scroll' }}>
                  <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
                    {/* Headers */}
                    <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Nome </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Material  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Qtd.  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Comp.  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Larg.  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Esp.  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Peso  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Etiqueta  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Nest.  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Cnc  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Orla  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Furo Face  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'>Obs  </TableSortLabel></Typography></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> <TableSortLabel active={false} direction='desc'> <Check /> </TableSortLabel></Typography></Box></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12} sx={{ display: 'none' }}>
                      {projectParts
                        .sort((a, b) => a.tag - b.tag)
                        .map((part, rowIndex) => {
                          return (
                            <Grid
                              {...rowProps}
                              key={rowIndex}
                              bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'lightblue' : 'lightGray.edges') : (rowIndex === activeRow && 'lightblue')}
                              onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                            >
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.partName?.replace(/_/g, ' ') } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.material } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.amount } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.lenght } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.width } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.thickness } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.weight } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.tag } </Typography></Grid>
                              <Grid {...cellProps} > <OperationState {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'nestingFlag'} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                              <Grid {...cellProps} > <OperationState {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'cncFlag'} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                              <Grid {...cellProps} > <OperationState {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'orla'} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                              <Grid {...cellProps} > <OperationState {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'f'} onStart={onStartPart} onFinish={onFinishPart} /></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.obs } </Typography></Grid>
                              <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                            </Grid>
                          );
                        })}
                      {projectParts.map((part) => {
                        return part.logs.map((log) => {
                          return log.action?.value;
                        });
                      })}
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      {projectParts
                        .sort((a, b) => a.tag - b.tag)
                        .map((part, rowIndex) => {
                          return (
                            <Grid
                              {...rowProps}
                              key={rowIndex}
                              bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'lightblue' : 'lightGray.edges') : (rowIndex === activeRow && 'lightblue')}
                              onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                            >
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.partName?.replace(/_/g, ' ') } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.material } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.amount } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.lenght } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.width } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.thickness } mm </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.weight } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.tag } </Typography></Grid>
                              <Grid {...cellProps} >
                                <Test {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'nestingFlag'} onStart={onStartPart} onFinish={onFinishPart}/>

                              </Grid>
                              <Grid {...cellProps} >
                                <Test {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'cncFlag'} onStart={onStartPart} onFinish={onFinishPart}/>
                              </Grid>
                              <Grid {...cellProps} >
                                <Test {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'orla'} onStart={onStartPart} onFinish={onFinishPart}/>
                              </Grid>
                              <Grid {...cellProps} >
                                <Test {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'f'} onStart={onStartPart} onFinish={onFinishPart}/>
                              </Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.obs } </Typography></Grid>
                              <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                            </Grid>
                          );
                        })}
                      {projectParts.map((part) => {
                        return part.logs.map((log) => {
                          return log.action?.value;
                        });
                      })}
                    </Grid>
                  </Grid>
                </Box>
              </Grow>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grow in={true}>
                <Box sx={{ height: '100%', overflowX: 'scroll' }}>
                  <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
                    {/* Headers */}
                    <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'>Nome </TableSortLabel></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'>Material  </TableSortLabel></Box></Grid>
                      <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'>Qtd.  </TableSortLabel></Box></Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                      {consumables
                        .map((part, rowIndex) => {
                          return (
                            <Grid
                              {...rowProps}
                              key={rowIndex}
                              bgcolor={rowIndex % 2 !== 0 ? (rowIndex === activeRow ? 'lightblue' : 'lightGray.edges') : (rowIndex === activeRow && 'lightblue')}
                              onClick={() => rowIndex === activeRow ? setActiveRow() : setActiveRow(rowIndex)}
                            >
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.name.replace(/_/g, ' ') } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.material } </Typography></Grid>
                              <Grid {...cellProps} > <Typography variant='sm'>{ part.amount } </Typography></Grid>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Box>
              </Grow>
            </TabPanel>
          </Grid>
        </Content>
      </Grid>

      : <Loader center={true} />
    }
  </Dialog >;
};

export default ProjectDetails;
