/* eslint-disable react/prop-types */
import { Box, Grid, Grow, IconButton, Popover, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import * as icons from 'lucide-react';
import { Check, CheckCircle, Play } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as furnituresActionsRedux from '../../../store/actions/furniture';
import * as machineActionsRedux from '../../../store/actions/machine';
import * as partsActionsRedux from '../../../store/actions/part';
import * as projectActionsRedux from '../../../store/actions/project';
import * as workerTasksActionsRedux from '../../../store/actions/workerTask';
import CustomBreadcrumbs from '../../breadcrumbs/breadcrumbs';
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import MySelect from '../../inputs/select';
import Footer from '../../layout/footer/footer';
import Navbar from '../../layout/navbar/navbar';
import TabPanel from '../dashboard/TabPanel';
import { PartStatus } from '../factoryGround/ProjectDetails/furnitureDetails';

const FactoryGroundProject = (props) => {
  const { breadcrumbsPath, project, logsWorkerTasks, activeWorkerTasks, consumables, client } = props;
  const [openPopover, setOpenPopover] = useState(null);
  const [myMachine, setMyMachine] = useState();
  const [furniture, setFurniture] = useState(props.furniture);
  const [machines, setMachines] = useState(props.machines);
  const [parts, setParts] = useState(props.parts);
  const [fullyLoaded, setFullyLoaded] = useState();
  const [tab, setTab] = useState(0);
  const reduxState = useSelector((state) => state);
  const me = reduxState.auth.me;
  const dispatch = useDispatch();
  const updateMachine = (data) => dispatch(machineActionsRedux.updateMachine(data));
  const newWorkerTask = (data) => dispatch(workerTasksActionsRedux.newWorkerTask(data));
  const updateWorkerTask = (data) => dispatch(workerTasksActionsRedux.updateWorkerTask(data));
  const updatePart = (data) => dispatch(partsActionsRedux.updatePart(data));
  const updateProject = (data) => dispatch(projectActionsRedux.updateProject(data));
  const updateFurniture = (data) => dispatch(furnituresActionsRedux.updateFurniture(data));

  useEffect(() => {
    async function loadData () {
      const activeLogWorkerTask = logsWorkerTasks.find((ele) => ele.executedBy?.object === `urn:ngsi-ld:Worker:${me.id}` && !ele.finishTime?.value);

      setMyMachine(activeLogWorkerTask ? machines.find((ele) => ele.id === activeLogWorkerTask.machine?.value) : null);
    }

    loadData().then(() => setFullyLoaded(true));
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
      executedOn: {
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
        value: project.id
      },
      onFurniture: {
        type: 'Property',
        value: furniture.id
      },
    };

    return await newWorkerTask(builtWorkerTask).then(async (newWorkertask) => {
      await updateMachine({ id: props.machine, data: { currentlyOn: props.part.id } });

      return newWorkertask;
    }).catch((err) => {
      console.log(err);
      toast.error('Algo aconteceu. Por favor tente mais tarde');

      throw err;
    });
  }

  async function onStartPartClick (props) {
    const projectPartsCopy = [...parts];

    await onStartPart(props).then((newLog) => {
      const partIndex = props.index;
      const logsCopy = [...projectPartsCopy[partIndex].logs];

      logsCopy.push(newLog.data);

      projectPartsCopy[partIndex] = {
        ...projectPartsCopy[partIndex],
        logs: logsCopy,
      };

      setParts(projectPartsCopy);
      setMyMachine({ ...myMachine, currentlyOn: { ...myMachine.currentlyOn, value: props.part.id } });
    });
  }

  async function updateAmountProd (part) {
    await updatePart({ id: part.id, data: { complete: true } });
    setFurniture({ ...furniture, completed: Number(furniture.completed?.value) + 1 });

    const old = [...parts];
    const index = old.findIndex((item) => item.id === part.id);

    if (index !== -1) {
      const updatedItem = {
        ...parts[index], // Copy the existing item
        complete: true,
      };

      const updatedItems = [
        ...parts.slice(0, index), // Copy the items before the updated item
        updatedItem, // Add the updated item
        ...parts.slice(index + 1) // Copy the items after the updated item
      ];

      if (!updatedItems.find(ele => ele.complete === false)) {
        await updateFurniture({ id: furniture.id, data: { produced: true } });
        await updateProject({ id: project.id, data: { produced: Number(project.produced?.value) + 1 } });
      }

      setParts(updatedItems);
    }
  }

  async function FinishPart (props) {
    const built = {
      finishTime: {
        type: 'Property',
        value: moment().format('DD/MM/YYYY HH:mm:ss')
      }
    };

    await updateWorkerTask({ data: built, id: props.id });
    setMyMachine({ ...myMachine, currentlyOn: { ...myMachine.currentlyOn, value: '' } });
    // setState({ ...state, myMachine: { ...state.myMachine, currentlyOn: { ...myMachine.currentlyOn, value: '' } } });
    await updateMachine({ id: props.machine?.value, data: { currentlyOn: '' } });
  }

  const ActionStatus = (props) => {
    const { part, field, disabled } = props;
    let undisabled = disabled;

    if (myMachine?.currentlyOn?.value === part.id) {
      undisabled = false;
    }

    if (!part[field]) return '';

    const cpy = [...parts];
    const thisMachines = machines?.filter(machine => machine?.machineType?.value?.toLowerCase()?.includes(props?.field?.replace('Flag', '')) && machine?.currentlyOn?.value === '');

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
        const haveLogs = part.logs?.find(log => log?.action?.value === 'nestingFlag' && log?.finishTime?.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isNest = true;
        else actionsDone.isNest = false;
      }

      if (actions.isCnc) {
        const haveLogs = part.logs?.find(log => log?.action?.value === 'cncFlag' && log?.finishTime?.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isCnc = true;
        else actionsDone.isCnc = false;
      }

      if (actions.isOrla) {
        const haveLogs = part.logs?.find(log => log?.action?.value === 'orla' && log?.finishTime?.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isOrla = true;
        else actionsDone.isOrla = false;
      }

      if (actions.isFuroFace) {
        const haveLogs = part.logs?.find(log => log?.action?.value === 'f' && log?.finishTime?.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isFuroFace = true;
        else actionsDone.isFuroFace = false;
      }

      if (actions.isTupia) {
        const haveLogs = part.logs?.find(log => log?.action?.value === 'tupia' && log?.finishTime?.value !== '');

        if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isTupia = true;
        else actionsDone.isTupia = false;
      }

      return actionsDone;
    }

    if (actions.isNest) {
      const haveLogs = part.logs?.find(log => log?.action?.value === 'nestingFlag' && log?.finishTime?.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isNest = true;
      else actionsDone.isNest = false;
    }

    if (actions.isCnc) {
      const haveLogs = part.logs?.find(log => log?.action?.value === 'cncFlag' && log?.finishTime?.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isCnc = true;
      else actionsDone.isCnc = false;
    }

    if (actions.isOrla) {
      const haveLogs = part.logs?.find(log => log?.action?.value === 'orla' && log?.finishTime?.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isOrla = true;
      else actionsDone.isOrla = false;
    }

    if (actions.isFuroFace) {
      const haveLogs = part.logs?.find(log => log?.action?.value === 'f' && log?.finishTime?.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isFuroFace = true;
      else actionsDone.isFuroFace = false;
    }

    if (actions.isTupia) {
      const haveLogs = part.logs?.find(log => log?.action?.value === 'tupia' && log?.finishTime?.value !== '');

      if (haveLogs && haveLogs.finishTime.value !== '') actionsDone.isTupia = true;
      else actionsDone.isTupia = false;
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

    const msg = validateAction(field, actions, actionsDone);
    const index = cpy[props.index].logs?.findIndex((log) => log?.action?.value === field);
    const log = part.logs?.find(log => log?.action?.value === field);

    if (!log && part[field]) {
      return <Box>
        <IconButton onClick={() => {
          if (!msg && thisMachines[0]) {
            onStartPartClick({ ...props, machine: myMachine.id }).then(() => {
              const updatedItem = machines.find(item => item.id === myMachine.id);
              const updatedIndex = machines.findIndex(item => item.id === myMachine.id);

              const newItems = [
                ...machines.slice(0, updatedIndex),
                { ...updatedItem, currentlyOn: { type: 'Property', value: part.id } },
                ...machines.slice(updatedIndex + 1),
              ];

              setMachines(newItems);
              toast.success('Iniciado.');
            });
          }
        }} disabled={undisabled} >
          <Tooltip title={ msg || (thisMachines && !thisMachines[0] ? 'Não há maquinas disponiveis' : 'Iniciar')} >
            <Play />
          </Tooltip>
        </IconButton>
      </Box>;
    }

    if (log?.finishTime?.value === '') {
      return <IconButton {...props} disabled={undisabled} onClick={() => FinishPart(log).then(() => {
        cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
        setParts(cpy);

        const updatedItem = machines.find(item => item.id === cpy[props.index].logs[index].machine?.value);
        const updatedIndex = machines.findIndex(item => item.id === cpy[props.index].logs[index].machine?.value);

        const newItems = [
          ...machines.slice(0, updatedIndex),
          { ...updatedItem, currentlyOn: { type: 'Property', value: '' } },
          ...machines.slice(updatedIndex + 1),
        ];

        setMachines(newItems);

        let done = true;
        const actionsDoneNow = getActionsDone(actions);

        // eslint-disable-next-line array-callback-return
        Object.keys(actionsDoneNow).map(key => {
          if (!actionsDoneNow[key]) done = false;
        });

        done && updateAmountProd(part);
        toast.success('Terminado.');
      })} >
        <Tooltip title={'Terminar'} >
          <CheckCircle color={!undisabled ? 'green' : 'gray'} />
        </Tooltip>
      </IconButton>;
    }

    return <Box onClick={() => {
      cpy[props.index].logs[index].finishTime.value = moment().format('DD/MM/YYYY HH:mm:ss');
      setParts(cpy);
    }}>
      <IconButton disabled={undisabled} onClick={() => {
      }} >
        <Tooltip title={'Feito'} >
          <Check color={!undisabled ? 'green' : 'gray'} />
        </Tooltip>
      </IconButton>
    </Box>;
  };

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

  function isActive ({ field }) {
    if (!myMachine?.machineType?.value?.toLowerCase().includes(field)) return true;

    if (myMachine?.currentlyOn?.value) return true;

    return false;
  }

  return fullyLoaded && <>
    <Navbar />
    <Notification />

    <Grid component='main' sx={{ padding: '0rem 2rem 4rem 2rem' }} >
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <Popover
          open={openPopover?.target}
          anchorEl={openPopover?.target}
          onClose={() => setOpenPopover(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>{openPopover?.msg}</Typography>
        </Popover>
        <Grid id='pad'container md={12} sm={12} xs={12}>
          <Grid container md={4} sm={6} xs={6}>
            <Grid container md={12} sm={12} xs={12} pb={0.5} >
              <Typography variant='titlexxl'>{furniture?.name?.value}</Typography>
            </Grid>
            <Grid container md={6} sm={6} xs={6} pb={0.5} >
              <Tooltip title='Cliente'>
                <Typography variant='subtitle1'><a style={{ fontWeight: 'bold' }}>Cliente: </a>{client?.user?.first_name} {client?.user?.last_name}</Typography>
              </Tooltip>
            </Grid>
            <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
              <Tooltip title='Projeto'>
                <Typography variant='subtitle1'><a style={{ fontWeight: 'bold' }}>Projeto: </a>{project?.name?.value}</Typography>
              </Tooltip>
            </Grid>
            <Grid container md={6} sm={6} xs={6} pb={0.5} >
              <Tooltip title='Grupo'>
                <Typography variant='subtitle1'><a style={{ fontWeight: 'bold' }}>Grupo: </a>{furniture?.group?.value}</Typography>
              </Tooltip>
            </Grid>
            <Grid container md={6} sm={6} xs={6} pb={0.5} justifyContent={'end'}>
              <Tooltip title='Subgrupo'>
                <Typography variant='subtitle1'><a style={{ fontWeight: 'bold' }}>Subgrupo: </a>{furniture?.subGroup?.value || 'cozinha'}</Typography>
              </Tooltip>
            </Grid>
            <Grid container md={6} sm={6} xs={6} pb={0.5} >
              <Tooltip title='Quantidade'>
                <Typography variant="subtitle1" color='primary'>
                      Quantidade: {furniture.amount.value}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container md={4} sm={6} xs={6} p={4} >
            <MySelect disabled={myMachine?.currentlyOn?.value} options={machines?.filter((mach) => {
              const isExecuting = activeWorkerTasks.find(
                ele => ele.machine.value === mach.id && ele.executedBy?.object === 'urn:ngsi-ld:Worker:' + me.id
              );

              return !isExecuting || isExecuting.executedBy?.object === 'urn:ngsi-ld:Worker:' + me.id;
            })
            } value={myMachine?.id} label={'Máquina'} optionLabel={'Nome'} onChange={(e) => {
              setMyMachine(machines?.find(ele => ele.id === e.target.value));
            }} />
          </Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12}>
          <Tabs value={tab} onChange={handleChangeTab} sx={{ width: '100%' }}>
            <Tab label="Lista de Corte" {...a11yProps(0)} sx={{ width: '100%' }}/>
            <Tab label="Acessórios" {...a11yProps(1)} sx={{ width: '100%' }}/>
          </Tabs>
          <TabPanel value={tab} index={0}>
            <Grow in={true}>
              <Box sx={{ lenght: '100%', overflowX: 'scroll' }}>
                <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
                  {/* Headers */}
                  <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Nome </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Material  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Qtd.  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Comp.  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Larg.  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Esp.  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Peso  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Etiqueta  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Nest.  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Cnc  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Orla  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Furo Face  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Tupia  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Obs  </Typography></Box></Grid>
                    <Grid {...cellProps}><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm">  <Check /> </Typography></Box></Grid>
                  </Grid>
                  <Grid container md={12} sm={12} xs={12}>
                    {parts?.sort((a, b) => a.tag - b.tag)
                      .map((part, rowIndex) => {
                        return (
                          <Grid
                            {...rowProps}
                            key={rowIndex}
                            bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
                          >
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.partName?.replace(/_/g, '') } </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.material } </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.amount } </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.lenght } mm </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.width } mm </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.thickness } mm </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.weight } </Typography></Grid>
                            <Grid {...cellProps} > <Typography variant='sm'>{ part.tag } </Typography></Grid>
                            <Grid {...cellProps} >
                              <ActionStatus {...props} part={part} index={rowIndex}
                                disabled={isActive({ part, field: 'nesting' })}
                                field={'nestingFlag'}/>
                            </Grid>
                            <Grid {...cellProps} >
                              <ActionStatus {...props} part={part} index={rowIndex} disabled={isActive({ part, field: 'cnc' })} field={'cncFlag'}/>
                            </Grid>
                            <Grid {...cellProps} >
                              <ActionStatus {...props} part={part} index={rowIndex} disabled={isActive({ part, field: 'orla' })} field={'orla'}/>
                            </Grid>
                            <Grid {...cellProps} >
                              <ActionStatus {...props} part={part} index={rowIndex} disabled={isActive({ part, field: 'furo' })} field={'f'}/>
                            </Grid>
                            <Grid {...cellProps} >
                              <ActionStatus {...props} part={part} index={rowIndex} disabled={isActive({ part, field: 'tupia' })} field={'tupia'}/>
                            </Grid>
                            <Grid {...cellProps} >
                              <Tooltip title={part.obs}>
                                <Typography variant='sm'>{ part.obs && <IconButton onClick={(event) => setOpenPopover({ target: event.currentTarget, msg: part.obs })}><icons.FileText /></IconButton> } </Typography>
                              </Tooltip>
                            </Grid>
                            <Grid {...cellProps} > <PartStatus part={part} /></Grid>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              </Box>
            </Grow>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Grow in={true}>
              <Box sx={{ lenght: '100%', overflowX: 'scroll' }}>
                <Grid container sx={{ minWidth: '1024px', overflowX: 'scroll' }}>
                  {/* Headers */}
                  <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                    <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} ><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Nome </Typography></Box></Grid>
                    <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} ><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Material </Typography></Box></Grid>
                    <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} ><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Qtd.  </Typography></Box></Grid>
                    <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} ><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> Etiqueta  </Typography></Box></Grid>
                    <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} ><Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm"> <Box className='fullCenter'sx={{ width: '100%' }}><Typography variant="sm">  <Check /> </Typography></Box>  </Typography></Box></Grid>

                  </Grid>
                  <Grid container md={12} sm={12} xs={12}>
                    {consumables
                      .map((consumable, rowIndex) => {
                        return (
                          <Grid
                            {...rowProps}
                            key={rowIndex}
                            bgcolor={rowIndex % 2 !== 0 && 'lightGray.edges'}
                          >
                            <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} > <Typography variant='sm'>{ consumable.name.value.replace(/_/g, '') } </Typography></Grid>
                            <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} > <Typography variant='sm'>{ consumable.material.value } </Typography></Grid>
                            <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} > <Typography variant='sm'>{ consumable.amount.value } </Typography></Grid>
                            <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} > <Typography variant='sm'>{ consumable.tag.value } </Typography></Grid>
                            <Grid {...cellProps} md={2.4} sm={2.4} xs={2.4} > <PartStatus part={consumable} /></Grid>
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
    <Footer/>
  </>;
};

export default FactoryGroundProject;
