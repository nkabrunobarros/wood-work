/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { AppBar, Box, Button, Dialog, Grid, Grow, IconButton, Menu, MenuItem, Tab, TableSortLabel, Tabs, Toolbar, Tooltip, Typography } from '@mui/material';
import * as icons from 'lucide-react';
import { Check, CheckCircle, Eye, HardDrive, MinusCircle, Package, Play, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../../../navigation/routes';
import companyLogo from '../../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../../public/logo_bw_ww40_inv-big.png';
import * as consumablesActionsRedux from '../../../../store/actions/consumable';
import * as furnituresActionsRedux from '../../../../store/actions/furniture';
import * as machineActionsRedux from '../../../../store/actions/machine';
import * as partsActionsRedux from '../../../../store/actions/part';
import * as projectActionsRedux from '../../../../store/actions/project';
import * as workerTasksActionsRedux from '../../../../store/actions/workerTask';
import CustomBreadcrumbs from '../../../breadcrumbs/breadcrumbs';
import PrimaryBtn from '../../../buttons/primaryBtn';
import Content from '../../../content/content';
import Notification from '../../../dialogs/Notification';
import Loader from '../../../loader/loader';
import formatString from '../../../utils/FormatString';
import TabPanel from '../../dashboard/TabPanel';
import { Transition } from '../factoryGround';

export const PartStatus = ({ part }) => {
  if (part.complete) return <Typography variant='sm' className='successBalloon'>Completo</Typography>;

  const actions = {
    isNest: part.nestingFlag,
    isCnc: part.cncFlag,
    isOrla: part.orla2 || part.orla3 || part.orla4 || part.orla5,
    isFuroFace: part.f2 || part.f3 || part.f4 || part.f5,
    isTupia: part.tupia,
  };

  let complete = true;

  if (actions.isNest) {
    const haveLogs = part.logs?.find(log => log.action.value === 'nestingFlag' && log.finishTime.value !== '');

    if (!haveLogs) complete = false;
  }

  if (actions.isCnc) {
    const haveLogs = part.logs?.find(log => log.action.value === 'cncFlag' && log.finishTime.value !== '');

    if (!haveLogs) complete = false;
  }

  if (actions.isOrla) {
    const haveLogs = part.logs?.find(log => log.action.value === 'orla' && log.finishTime.value !== '');

    if (!haveLogs) complete = false;
  }

  if (actions.isFuroFace) {
    const haveLogs = part.logs?.find(log => log.action.value === 'f' && log.finishTime.value !== '');

    if (!haveLogs) complete = false;
  }

  if (actions.isTupia) {
    const haveLogs = part.logs?.find(log => log.action.value === 'tupia' && log.finishTime.value !== '');

    if (!haveLogs) complete = false;
  }

  if (complete) return <Typography variant='sm' className='successBalloon'>Completo</Typography>;
  else if (part.logs?.find(ele => ele.finishTime.value === '')) return <Typography variant='sm' className='infoBalloon'>Em produção</Typography>;
};

const FurnitureDetails = (props) => {
  const { open, detailOnly, onClose, furnitureProject } = props;
  const [productionDetailModal, setProductionDetailModal] = useState(false);
  const reduxState = useSelector((state) => state);
  const [chosenFurniture, setChosenFurniture] = useState(props.chosenFurniture);
  const [machines, setMachines] = useState(props.machines);
  const [consumables, setConsumables] = useState();
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [value, setValue] = useState(0);
  const me = reduxState.auth.me;
  const dispatch = useDispatch();
  const getWorkerTasks = (data) => dispatch(workerTasksActionsRedux.workerTasks(data));
  const newWorkerTask = (data) => dispatch(workerTasksActionsRedux.newWorkerTask(data));
  const updateWorkerTask = (data) => dispatch(workerTasksActionsRedux.updateWorkerTask(data));
  const getParts = (data) => dispatch(partsActionsRedux.parts(data));
  const updatePart = (data) => dispatch(partsActionsRedux.updatePart(data));
  const newPart = (data) => dispatch(partsActionsRedux.newPart(data));
  const updateMachine = (data) => dispatch(machineActionsRedux.updateMachine(data));
  const getConsumables = (data) => dispatch(consumablesActionsRedux.projectConsumables(data));
  const getMachines = (data) => dispatch(machineActionsRedux.machines(data));
  const updateProject = (data) => dispatch(projectActionsRedux.updateProject(data));
  const updateFurniture = (data) => dispatch(furnituresActionsRedux.updateFurniture(data));
  const IconComponent = icons.Loader;

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
    const newParts2 = [
      { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_COSTA1', id: formatString(chosenFurniture.name.value) + '_BAR_B_COSTA1', material: 'HDF 3', amount: 1, lenght: '1471', width: '1000', thickness: '3', tag: 1, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
      { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_COSTA2', id: formatString(chosenFurniture.name.value) + '_BAR_B_COSTA2', material: 'HDF 3', amount: 1, lenght: '1476', width: '1000', thickness: '3', tag: 2, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
      { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_COSTA', id: formatString(chosenFurniture.name.value) + '_BAR_C_COSTA', material: 'HDF 6', amount: 1, lenght: '1050,5', width: '1000', thickness: '6', tag: 3, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_HRZ6_1_2_APROC', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_HRZ6_1_2_APROC', material: 'HDF 6', amount: 1, lenght: '880', width: '450', thickness: '6', tag: 4, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_HRZ6_3', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_HRZ6_3', material: 'HDF 6', amount: 2, lenght: '613', width: '80', thickness: '6', tag: 5, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_VRT6', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_VRT6', material: 'HDF 6', amount: 4, lenght: '830', width: '80', thickness: '6', tag: 6, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_VRT6_2_3_APROC', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_VRT6_2_3_APROC', material: 'HDF 6', amount: 1, lenght: '830', width: '200', thickness: '6', tag: 7, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_RODAPE_M_RASGOS', id: formatString(chosenFurniture.name.value) + '_BAR_B_RODAPE_M_RASGOS1', material: 'HDF 10', amount: 1, lenght: '2150', width: '100', thickness: '10', tag: 8, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_RODAPE_M_RASGOS', id: formatString(chosenFurniture.name.value) + '_BAR_B_RODAPE_M_RASGOS2', material: 'HDF 10', amount: 1, lenght: '2181', width: '100', thickness: '10', tag: 9, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA_FUNDO', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA_FUNDO', material: 'HDF 10', amount: 1, lenght: '469', width: '258', thickness: '10', tag: 10, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA2_FUNDO', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA2_FUNDO', material: 'HDF 10', amount: 1, lenght: '469', width: '258', thickness: '10', tag: 11, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_ALMOFADA_RASGOS2', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_ALMOFADA_RASGOS2', material: 'HDF 10 CNC', amount: 1, lenght: '2621', width: '1106', thickness: '10', tag: 12, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_ALMOFADA1_RASGOS', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_ALMOFADA1_RASGOS', material: 'HDF 10 CNC', amount: 1, lenght: '2590', width: '1106', thickness: '10', tag: 13, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_HRZ10_1_2_APROC', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_HRZ10_1_2_APROC', material: 'HDF 10 CNC', amount: 1, lenght: '1069', width: '306', thickness: '10', tag: 14, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_HRZ10_3', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_HRZ10_3', material: 'HDF 10', amount: 2, lenght: '793', width: '50', thickness: '10', tag: 15, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_RIPA_VRT10', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_RIPA_VRT10', material: 'HDF 10', amount: 4, lenght: '950', width: '50', thickness: '10', tag: 16, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_RODAPE_INT_CURVO_RASGOS', id: formatString(chosenFurniture.name.value) + '_BAR_E_RODAPE_INT_CURVO_RASGOS', material: 'HDF 10', amount: 1, lenght: '2630', width: '150', thickness: '10', tag: 17, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRAT_CORRER_LAT_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRAT_CORRER_LAT_DIR', material: 'HDF 13 CNC', amount: 1, lenght: '244', width: '19,5', thickness: '13', tag: 18, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRAT_CORRER_LAT_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRAT_CORRER_LAT_ESQ', material: 'HDF 13 CNC', amount: 1, lenght: '244', width: '19,5', thickness: '13', tag: 19, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA_COSTA', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA_COSTA', material: 'HDF 16 CNC', amount: 1, lenght: '457', width: '105,5', thickness: '16', tag: 20, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA_LAT_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA_LAT_DIR', material: 'HDF 16 CNC', amount: 1, lenght: '256', width: '128,5', thickness: '16', tag: 21, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA_LAT_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA_LAT_ESQ', material: 'HDF 16 CNC', amount: 1, lenght: '256', width: '128,5', thickness: '16', tag: 22, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA2_COSTA', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA2_COSTA', material: 'HDF 16 CNC', amount: 1, lenght: '457', width: '105,5', thickness: '16', tag: 23, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA2_LAT_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA2_LAT_DIR', material: 'HDF 16 CNC', amount: 1, lenght: '256', width: '128,5', thickness: '16', tag: 24, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA2_LAT_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA2_LAT_ESQ', material: 'HDF 16 CNC', amount: 1, lenght: '256', width: '128,5', thickness: '16', tag: 25, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRAT_CORRER_COSTA', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRAT_CORRER_COSTA', material: 'HDF 16 CNC', amount: 1, lenght: '1006', width: '76', thickness: '16', tag: 26, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRAT_CORRER_FUNDO', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRAT_CORRER_FUNDO', material: 'HDF 16 CNC', amount: 1, lenght: '1004,5', width: '244', thickness: '16', tag: 27, nestingFlag: false, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_CIMO', id: formatString(chosenFurniture.name.value) + '_BAR_B_CIMO', material: 'HDF 19 CNC', amount: 1, lenght: '1035', width: '613', thickness: '19', tag: 28, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_DIVISORIA', id: formatString(chosenFurniture.name.value) + '_BAR_B_DIVISORIA', material: 'HDF 19 CNC', amount: 1, lenght: '968', width: '291', thickness: '19', tag: 29, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_FUNDO', id: formatString(chosenFurniture.name.value) + '_BAR_B_FUNDO', material: 'HDF 19 CNC', amount: 1, lenght: '1035', width: '613', thickness: '19', tag: 30, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_LAT_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_B_LAT_DIR', material: 'HDF 19 CNC', amount: 1, lenght: '968', width: '272', thickness: '19', tag: 31, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_LAT_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_B_LAT_ESQ', material: 'HDF 19 CNC', amount: 1, lenght: '968', width: '291', thickness: '19', tag: 32, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_PRATELEIRA1', id: formatString(chosenFurniture.name.value) + '_BAR_B_PRATELEIRA1', material: 'HDF 19 CNC', amount: 1, lenght: '592', width: '533', thickness: '19', tag: 33, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_PRATELEIRA2', id: formatString(chosenFurniture.name.value) + '_BAR_B_PRATELEIRA2', material: 'HDF 19 CNC', amount: 1, lenght: '466', width: '286', thickness: '19', tag: 34, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_REM_ESQ_M', id: formatString(chosenFurniture.name.value) + '_BAR_B_REM_ESQ_M', material: 'HDF 19', amount: 1, lenght: '1100', width: '70', thickness: '19', tag: 35, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_RODAPE_M_MOLDE1', id: formatString(chosenFurniture.name.value) + '_BAR_B_RODAPE_M_MOLDE1', material: 'HDF 19', amount: 1, lenght: '424,5', width: '166', thickness: '19', tag: 36, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_RODAPE_M_MOLDE2', id: formatString(chosenFurniture.name.value) + '_BAR_B_RODAPE_M_MOLDE2', material: 'HDF 19', amount: 1, lenght: '424,5', width: '283', thickness: '19', tag: 37, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_SEPARADOR', id: formatString(chosenFurniture.name.value) + '_BAR_B_SEPARADOR', material: 'HDF 19 CNC', amount: 1, lenght: '594', width: '535', thickness: '19', tag: 38, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_B_SEPARADOR2', id: formatString(chosenFurniture.name.value) + '_BAR_B_SEPARADOR2', material: 'HDF 19 CNC', amount: 1, lenght: '468', width: '289', thickness: '19', tag: 39, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_CIMA', id: formatString(chosenFurniture.name.value) + '_BAR_C_CIMA', material: 'HDF 19 CNC', amount: 1, lenght: '1056,5', width: '272', thickness: '19', tag: 40, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_DIVISORIA', id: formatString(chosenFurniture.name.value) + '_BAR_C_DIVISORIA', material: 'HDF 19 CNC', amount: 1, lenght: '720', width: '272', thickness: '19', tag: 41, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_FUNDO', id: formatString(chosenFurniture.name.value) + '_BAR_C_FUNDO', material: 'HDF 19 CNC', amount: 1, lenght: '1056,5', width: '272', thickness: '19', tag: 42, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_LAT_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_C_LAT_DIR', material: 'HDF 19 CNC', amount: 1, lenght: '968', width: '272', thickness: '19', tag: 43, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_LAT_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_C_LAT_ESQ', material: 'HDF 19 CNC', amount: 1, lenght: '968', width: '272', thickness: '19', tag: 44, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRATELEIRA', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRATELEIRA', material: 'HDF 19 CNC', amount: 1, lenght: '501', width: '267', thickness: '19', tag: 45, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRATELEIRA2', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRATELEIRA2', material: 'HDF 19 CNC', amount: 1, lenght: '501', width: '267', thickness: '19', tag: 46, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_SEPARADOR', id: formatString(chosenFurniture.name.value) + '_BAR_C_SEPARADOR', material: 'HDF 19 CNC', amount: 1, lenght: '1018,5', width: '272', thickness: '19', tag: 47, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_PAINEL_CURVA_MOLDE_EXT', id: formatString(chosenFurniture.name.value) + '_BAR_E_PAINEL_CURVA_MOLDE_EXT', material: 'HDF 19', amount: 4, lenght: '1302,5', width: '535,5', thickness: '19', tag: 48, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_REM_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_E_REM_DIR', material: 'HDF 19 CNC', amount: 1, lenght: '1106', width: '300', thickness: '19', tag: 49, nestingFlag: true, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_RODAPE_RASGOS', id: formatString(chosenFurniture.name.value) + '_BAR_E_RODAPE_RASGOS', material: 'HDF 19', amount: 1, lenght: '2680', width: '150', thickness: '19', tag: 50, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_E_RODAPE2', id: formatString(chosenFurniture.name.value) + '_BAR_E_RODAPE2', material: 'HDF 19', amount: 1, lenght: '343', width: '150', thickness: '19', tag: 51, nestingFlag: false, cncFlag: false, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA_FRENTE', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA_FRENTE', material: 'HDF 22 CNC', amount: 1, lenght: '529', width: '185', thickness: '22', tag: 52, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_GAVETA2_FRENTE', id: formatString(chosenFurniture.name.value) + '_BAR_C_GAVETA2_FRENTE', material: 'HDF 22 CNC', amount: 1, lenght: '528,2', width: '185', thickness: '22', tag: 53, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PORTA_DIR', id: formatString(chosenFurniture.name.value) + '_BAR_C_PORTA_DIR', material: 'HDF 22 CNC', amount: 1, lenght: '556', width: '528', thickness: '22', tag: 54, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PORTA_ESQ', id: formatString(chosenFurniture.name.value) + '_BAR_C_PORTA_ESQ', material: 'HDF 22 CNC', amount: 1, lenght: '556', width: '529', thickness: '22', tag: 55, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    //   { complete: false, belongsTo: chosenFurniture.id, partName: chosenFurniture.name.value + '_BAR_C_PRAT_CORRER_FRENTE', id: formatString(chosenFurniture.name.value) + '_BAR_C_PRAT_CORRER_FRENTE', material: 'HDF 22 CNC', amount: 1, lenght: '1053,5', width: '73', thickness: '22', tag: 56, nestingFlag: true, cncFlag: true, orla2: true, f2: false },
    ];

    const built = newParts2.map((part) => {
      const a = {};

      Object.keys(part).map((key) => {
        a[key] = { type: 'Property', value: part[key] };
      });

      a.id = 'urn:ngsi-ld:Part:' + a.id.value;
      a.type = 'Part';

      return a;
    });

    true && built.map(async (part) => {
      await newPart(part);
    });
  }

  useEffect(() => {
    async function load () {
      getMachines().then((res) => setMachines(res.data));

      const logsWorkerTasks = await getWorkerTasks().then((res) => {
        return res.data.filter(ele => ele.onProject?.value === chosenFurniture.id);
      });

      await getParts(chosenFurniture.id).then((res) => {
        const built = res.data.filter(ele => ele.belongsTo.value === chosenFurniture.id).map((part) => {
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

      await getConsumables(chosenFurniture.id).then((res) => {
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
    md: 0.8,
    sm: 0.8,
    xs: 0.8,
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
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
    const builtWorkerTask = {
      id: `urn:ngsi-ld:WorkerTask:${props.part.id || props.part.name}${me.id}${props.field}`,
      type: 'WorkerTask',

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
      machine: {
        type: 'Property',
        value: props.machine
      },
      onProject: {
        type: 'Property',
        value: chosenFurniture.id
      },
    };

    const newWorkertask = await newWorkerTask(builtWorkerTask);

    await updateMachine({ id: props.machine, data: { currentlyOn: props.part.id } });

    return newWorkertask.data;
  }

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
    await updateMachine({ id: props.machine?.value, data: { currentlyOn: '' } });
  }

  async function onStartPartClick (props) {
    const projectPartsCopy = [...projectParts];
    const newLog = await onStartPart(props);
    const partIndex = props.index;
    const logsCopy = [...projectPartsCopy[partIndex].logs];

    logsCopy.push(newLog);

    projectPartsCopy[partIndex] = {
      ...projectPartsCopy[partIndex],
      logs: logsCopy,
    };

    setProjectParts(projectPartsCopy);
  }

  function validateAction (field, actions, actionsDone) {
    let field2 = '';

    switch (field) {
    case 'nestingFlag': field2 = 'isNest';

      break;
    case 'cncFlag': field2 = 'isCnc';

      break;
    case 'orla': field2 = 'isOrla';

      break;
    case 'f': field2 = 'isFuroFace';

      break;
    case 'tupia': field2 = 'isTupia';

      break;
    }

    const order = ['isNest', 'isCnc', 'isOrla', 'isFuroFace', 'isTupia'];
    // Find the index of the current action in the order
    const currentIndex = order.indexOf(field2);

    // Check if the current action is in the correct order
    for (let i = 0; i < currentIndex; i++) {
      const action = order[i];

      if (!actionsDone[action] && actions[action]) {
        return `Tem que fazer ${action.replace('is', '')} antes`;
      }
    }

    // Current action is valid
    return null;
  }

  async function updateAmountProd (part) {
    await updatePart({ id: part.id, data: { complete: true } });
    setChosenFurniture({ ...chosenFurniture, completed: Number(chosenFurniture.completed?.value) + 1 });

    const old = [...projectParts];
    const index = old.findIndex((item) => item.id === part.id);

    if (index !== -1) {
      const updatedItem = {
        ...projectParts[index], // Copy the existing item
        complete: true,
      };

      const updatedItems = [
        ...projectParts.slice(0, index), // Copy the items before the updated item
        updatedItem, // Add the updated item
        ...projectParts.slice(index + 1) // Copy the items after the updated item
      ];

      if (!updatedItems.find(ele => ele.complete === false)) {
        await updateFurniture({ id: chosenFurniture.id, data: { produced: true } });
        await updateProject({ id: furnitureProject.id, data: { produced: Number(furnitureProject.produced?.value) + 1 } });
      }

      setProjectParts(updatedItems);
    }
  }

  const ActionStatus = (props) => {
    const { part, field } = props;

    if (!part[field]) return '';

    const cpy = [...projectParts];
    const thisMachines = machines?.filter(machine => machine?.machineType?.value?.toLowerCase()?.includes(props?.field?.replace('Flag', '')) && machine.currentlyOn?.value === '');

    const actions = {
      isNest: part.nestingFlag,
      isCnc: part.cncFlag,
      isOrla: part.orla2 || part.orla3 || part.orla4 || part.orla5,
      isFuroFace: part.f2 || part.f3 || part.f4 || part.f5,
      isTupia: part.tupia,
    };

    const actionsDone = getActionsDone(actions);

    function getActionsDone (actions) {
      const actionsDone = {};

      if (actions.isNest) {
        const haveLogs = part.logs?.find(log => log.action.value === 'nestingFlag' && log.finishTime.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isNest = true;
        else actionsDone.isNest = false;
      }

      if (actions.isCnc) {
        const haveLogs = part.logs?.find(log => log.action.value === 'cncFlag' && log.finishTime.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isCnc = true;
        else actionsDone.isCnc = false;
      }

      if (actions.isOrla) {
        const haveLogs = part.logs?.find(log => log.action.value === 'orla' && log.finishTime.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isOrla = true;
        else actionsDone.isOrla = false;
      }

      if (actions.isFuroFace) {
        const haveLogs = part.logs?.find(log => log.action.value === 'f' && log.finishTime.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isFuroFace = true;
        else actionsDone.isFuroFace = false;
      }

      if (actions.isTupia) {
        const haveLogs = part.logs?.find(log => log.action.value === 'tupia' && log.finishTime.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isTupia = true;
        else actionsDone.isTupia = false;
      }

      return actionsDone;
    }

    if (actions.isNest) {
      const haveLogs = part.logs?.find(log => log.action.value === 'nestingFlag' && log.finishTime.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isNest = true;
      else actionsDone.isNest = false;
    }

    if (actions.isCnc) {
      const haveLogs = part.logs?.find(log => log.action.value === 'cncFlag' && log.finishTime.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isCnc = true;
      else actionsDone.isCnc = false;
    }

    if (actions.isOrla) {
      const haveLogs = part.logs?.find(log => log.action.value === 'orla' && log.finishTime.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isOrla = true;
      else actionsDone.isOrla = false;
    }

    if (actions.isFuroFace) {
      const haveLogs = part.logs?.find(log => log.action.value === 'f' && log.finishTime.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isFuroFace = true;
      else actionsDone.isFuroFace = false;
    }

    if (actions.isTupia) {
      const haveLogs = part.logs?.find(log => log.action.value === 'tupia' && log.finishTime.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isTupia = true;
      else actionsDone.isTupia = false;
    }

    const msg = validateAction(field, actions, actionsDone);
    const index = cpy[props.index].logs?.findIndex((log) => log.action?.value === field);
    const log = part.logs?.find(log => log.action?.value === field);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    if (!log && part[field]) {
      return detailOnly
        ? <Tooltip title='Ainda não iniciou'>
          <MinusCircle color='gray' />
        </Tooltip>
        : <Box>
          <IconButton onClick={(e) => !msg && thisMachines[0] && handleClick(e)} >
            <Tooltip title={ msg || (thisMachines && !thisMachines[0] ? 'Não há maquinas disponiveis' : 'Iniciar')} >
              <Play />
            </Tooltip>
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          ><MenuItem disabled>Escolher Máquina</MenuItem>
            {thisMachines?.map((mach, i) => <MenuItem key={i} onClick={() => {
              setAnchorEl();

              onStartPartClick({ ...props, machine: mach.id }).then(() => {
                const updatedItem = machines.find(item => item.id === mach.id);
                const updatedIndex = machines.findIndex(item => item.id === mach.id);

                const newItems = [
                  ...machines.slice(0, updatedIndex),
                  { ...updatedItem, currentlyOn: { type: 'Property', value: part.id } },
                  ...machines.slice(updatedIndex + 1),
                ];

                setMachines(newItems);
                toast.success('Iniciado.');
              });
            }}>
              {mach.name?.value || mach.id.replace('urn:ngsi-ld:Machine:', '') }
            </MenuItem>
            )}
          </Menu>
        </Box>;
    }

    if (log.finishTime.value === '') {
      return detailOnly
        ? <Tooltip title='Em produção'>
          <Box
            className="rotating fullCenter"
          >
            <IconComponent strokeWidth={1.5} />
          </Box>
        </Tooltip>
        : <IconButton {...props} onClick={() => FinishPart(log).then(() => {
          cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
          setProjectParts(cpy);

          const updatedItem = machines.find(item => item.id === cpy[props.index].logs[index].machine.value);
          const updatedIndex = machines.findIndex(item => item.id === cpy[props.index].logs[index].machine.value);

          const newItems = [
            ...machines.slice(0, updatedIndex),
            { ...updatedItem, currentlyOn: { type: 'Property', value: '' } },
            ...machines.slice(updatedIndex + 1),
          ];

          setMachines(newItems);

          let done = true;
          const actionsDoneNow = getActionsDone(actions);

          Object.keys(actionsDoneNow).map(key => {
            if (!actionsDoneNow[key]) done = false;
          });

          done && updateAmountProd(part);
          toast.success('Terminado.');
        })} >
          <Tooltip title={'Terminar'} >
            <CheckCircle color='green' />
          </Tooltip>
        </IconButton>;
    }

    return detailOnly
      ? <Tooltip title='Completo'><Check color='green' /></Tooltip>
      : <Box onClick={() => {
        cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
        setProjectParts(cpy);
      }}>
        <IconButton onClick={() => {
        }} >
          <Tooltip title={'Feito'} >
            <Check color='green' />
          </Tooltip>
        </IconButton>
      </Box>;
  };

  const panelProps = {
    container: true,
    m: 1,
    md: 12,
    sm: 12,
    xs: 12,
    sx: { border: '1px solid', borderColor: 'divider', borderRadius: '8px', backgroundColor: 'lightGray.main' }
  };

  return <>

    {detailOnly && <Grow in={true}>
      <Box>
        <Box id='pad'>
          <Box style={{ display: 'flex', marginBottom: '1rem' }}>
            <Typography variant='title'>Produção</Typography>
            <Box style={{ marginLeft: 'auto' }}>
              <PrimaryBtn
                onClick={() => setProductionDetailModal(!productionDetailModal)}
                icon={
                  <Eye
                  />
                }
                text='Ver detalhes'
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%', overflow: 'scroll' }}>
          <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Nome </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Material  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Qtd.  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Comp.  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Larg.  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Esp.  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Peso  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Etiqueta  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Nest.  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Cnc  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Orla  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Furo Face  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Tupia  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Obs  </Typography></Box></Grid>
            <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm">  <Check /> </Typography></Box></Grid>
          </Grid>
          <Grid container md={12} sm={12} xs={12}>
            {projectParts
              .sort((a, b) => a.tag - b.tag)
              .map((part, rowIndex) => {
                const actions = {
                  isNest: part.nestingFlag,
                  isCnc: part.cncFlag,
                  isOrla: part.orla2 || part.orla3 || part.orla4 || part.orla5,
                  isFuroFace: part.f2 || part.f3 || part.f4 || part.f5,
                  isTupia: part.tupia,
                };

                let done = true;

                function getActionsDone (actions) {
                  const actionsDone = {};

                  if (actions.isNest) {
                    const haveLogs = part.logs?.find(log => log.action.value === 'nestingFlag' && log.finishTime.value !== '');

                    if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isNest = true;
                    else actionsDone.isNest = false;
                  }

                  if (actions.isCnc) {
                    const haveLogs = part.logs?.find(log => log.action.value === 'cncFlag' && log.finishTime.value !== '');

                    if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isCnc = true;
                    else actionsDone.isCnc = false;
                  }

                  if (actions.isOrla) {
                    const haveLogs = part.logs?.find(log => log.action.value === 'orla' && log.finishTime.value !== '');

                    if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isOrla = true;
                    else actionsDone.isOrla = false;
                  }

                  if (actions.isFuroFace) {
                    const haveLogs = part.logs?.find(log => log.action.value === 'f' && log.finishTime.value !== '');

                    if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isFuroFace = true;
                    else actionsDone.isFuroFace = false;
                  }

                  if (actions.isTupia) {
                    const haveLogs = part.logs?.find(log => log.action.value === 'tupia' && log.finishTime.value !== '');

                    if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isTupia = true;
                    else actionsDone.isTupia = false;
                  }

                  return actionsDone;
                }

                const actionsDoneNow = getActionsDone(actions);

                Object.keys(actionsDoneNow).map(key => {
                  if (!actionsDoneNow[key]) done = false;
                });

                return !done && part.logs?.find(ele => ele.finishTime.value === '') && (
                  <Grid
                    {...rowProps}
                    key={rowIndex}
                    bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
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
                      <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'nestingFlag'}/>
                    </Grid>
                    <Grid {...cellProps} >
                      <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'cncFlag'}/>
                    </Grid>
                    <Grid {...cellProps} >
                      <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'orla'}/>
                    </Grid>
                    <Grid {...cellProps} >
                      <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'f'}/>
                    </Grid>
                    <Grid {...cellProps} >
                      <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'tupia'}/>
                    </Grid>
                    <Grid {...cellProps} > <Typography variant='sm'>{ part.obs } </Typography></Grid>
                    <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Grow>}
    {(productionDetailModal || open) && <Dialog
      fullScreen
      open={!!chosenFurniture}
      onClose={() => {
        setProductionDetailModal(!productionDetailModal);
        onClose && onClose();
      }}
      TransitionComponent={Transition}
      sx={{ display: !chosenFurniture && 'none' }}
    >
      <AppBar position='sticky' sx={{ backgroundColor: 'default.sides' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <Image
                src={companyLogo}
                alt={'company Logo'}
                width={50}
                lenght={50}
                placeholder='blur'
              />
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setProductionDetailModal(!productionDetailModal);
                  onClose && onClose();
                }}
                aria-label="close"
                sx={{ marginLeft: '3rem' }}
              >
                <X />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title='Abrir Menu'>
                <IconButton
                  id='drawerToggleBtn'
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  sx={{ ml: 2 }}
                >
                  <Menu
                    style={{ color: 'var(--white)' }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box id='align' justifyContent={'end'}>
            <Box pr={3}>
              <Typography variant='md' sx={{ display: !reduxState.auth.me && 'none' }}>{reduxState.auth.me?.name?.value || reduxState.auth.me?.givenName?.value || (reduxState.auth.me?.first_name !== '' ? reduxState.auth.me?.first_name + ' ' + reduxState.auth.me?.last_name : reduxState.auth.me.username)}</Typography>
            </Box>
            <Box >
              <Image
                src={woodWorkyLogo}
                alt={'App Logo'}
                width={50}
                lenght={50}
                placeholder='blur'
                loading='lazy'
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Notification />
      {!props?.projectParts && false && <Button onClick={() => createParts()}>Create</Button>}
      {fullyLoaded
        ? <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }} >
          {!detailOnly && <CustomBreadcrumbs path={[
            {
              title: 'Chão de Fabrica',
              href: `${routes.private.internal.factoryLevel}`,
            }, {
              title: chosenFurniture.name.value,
              href: `${routes.private.internal.factoryLevel}`,
            }
          ]} />}
          <Content>
            <Grid id='pad' container md={12} sm={12} xs={12}>
              <Grid container md={3} sm={3} xs={3}>
                <Typography variant='titlexxl'>{chosenFurniture?.name?.value}</Typography>
              </Grid>
              <Grid container md={3} sm={3} xs={3} p={1} sx={{ display: detailOnly && 'none' }} >
                <Box sx={{ width: '100%' }}>
                  <Grid {...panelProps} p={1}>
                    <Grid container md={12} sm={12} xs={12} color='primary.main' >
                      <Package />
                      <Typography variant='subtitle2'>Armazem</Typography></Grid>
                    <Grid container md={12} sm={12} xs={12} pl={2}>
                      <Typography variant='subtitle2' color='lightTextSm.main'>Armazem 2b</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid container md={3} sm={3} xs={3} p={1} sx={{ display: detailOnly && 'none' }} >
                <Box sx={{ width: '100%' }}>
                  <Grid {...panelProps} p={1}>
                    <Grid container md={12} sm={12} xs={12} color='primary.main' >
                      <HardDrive />
                      <Typography variant='subtitle2'>Maquinas disponiveis</Typography></Grid>
                    {machines?.filter(ele => ele.currentlyOn?.value === '').map((machine) =>
                      <Grid container key={machine.id} md={4} sm={4} xs={4} >
                        <Typography variant='subtitle2' color='lightTextSm.main'>{machine.name?.value}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
              <Grid container md={3} sm={3} xs={3} p={1} sx={{ display: detailOnly && 'none' }} >
                <Box sx={{ width: '100%' }}>
                  <Grid {...panelProps} p={1}>
                    <Grid container md={12} sm={12} xs={12} color='primary.main' >
                      <HardDrive />
                      <Typography variant='subtitle2'>Maquinas em uso</Typography></Grid>
                    {machines?.filter(ele => ele.currentlyOn?.value !== '').map((machine) =>
                      <Grid container key={machine.id} md={4} sm={4} xs={4} >
                        <Typography variant='subtitle2' color='lightTextSm.main'>{machine.name?.value || machine.id.replace('urn:ngsi-ld:Machine:', '')}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container md={12} sm={12} xs={12}>
              <Tabs value={value} onChange={handleChange} sx={{ width: '100%', display: detailOnly && 'none' }}>
                <Tab label="Lista de Corte" {...a11yProps(0)} sx={{ width: '100%' }}/>
                {/* <Tab label="Acessorios" {...a11yProps(1)} sx={{ width: '100%' }}/> */}
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grow in={true}>
                  <Box sx={{ lenght: '100%', overflowX: 'scroll' }}>
                    <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
                      {/* Headers */}
                      <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Nome </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Material  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Qtd.  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Comp.  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Larg.  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Esp.  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Peso  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Etiqueta  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Nest.  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Cnc  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Orla  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Furo Face  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Tupia  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm"> Obs  </Typography></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><Typography variant="sm">  <Check /> </Typography></Box></Grid>
                      </Grid>
                      <Grid container md={12} sm={12} xs={12}>
                        {projectParts
                          .sort((a, b) => a.tag - b.tag)
                          .map((part, rowIndex) => {
                            return (
                              <Grid
                                {...rowProps}
                                key={rowIndex}
                                bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
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
                                  <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'nestingFlag'}/>
                                </Grid>
                                <Grid {...cellProps} >
                                  <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'cncFlag'}/>
                                </Grid>
                                <Grid {...cellProps} >
                                  <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'orla'}/>
                                </Grid>
                                <Grid {...cellProps} >
                                  <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'f'}/>
                                </Grid>
                                <Grid {...cellProps} >
                                  <ActionStatus {...props} part={part} index={rowIndex} detailOnly={detailOnly} field={'tupia'}/>
                                </Grid>
                                <Grid {...cellProps} > <Typography variant='sm'>{ part.obs } </Typography></Grid>
                                <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Grid>
                  </Box>
                </Grow>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grow in={true}>
                  <Box sx={{ lenght: '100%', overflowX: 'scroll' }}>
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
                                bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
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
    </Dialog>}
  </>;
};

export default FurnitureDetails;
