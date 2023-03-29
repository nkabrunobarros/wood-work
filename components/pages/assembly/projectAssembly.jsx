/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, ButtonGroup, Card, CardActions, CardContent, Dialog, Grid, IconButton, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { Check, ChevronDown, QrCode, X } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lenghtanyLogo from '../../../public/Logotipo_Vetorizado.png';
import woodWorkyLogo from '../../../public/logo_bw_ww40_inv-big.png';
import PrimaryBtn from '../../buttons/primaryBtn';
import Loader from '../../loader/loader';
import { Transition } from '../factoryGround/factoryGround';

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
  if (part.complete) return <Typography variant='sm' className='successBalloon'>Completo</Typography>;
  else if (part.inProduction) return <Typography variant='sm' className='infoBalloon'>Em produção</Typography>;
};

const ProjectAssembly = ({ chosenProject, open, onClose, detailOnly }) => {
  const reduxState = useSelector((state) => state);
  const me = reduxState.auth.me;
  // const [consumables, setConsumables] = useState();
  const [fullyLoaded, setFullyLoaded] = useState(false);

  useEffect(() => {
    async function load () {

    }

    load();
    Promise.all([load()]).then(() => setFullyLoaded(true));
  }, []);

  const projectModules = [
    {
      id: 'gavDir',
      name: 'Gaveta Direita',
      complete: true,
      inAssembly: false,
      startedAt: '28/03/2023 14:07',
      endedAt: '28/03/2023 15:02',
      assemblyBy: 'Bruno Barros',
      parts: [
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 1, nestingFlag: true, cncFlag: true, orla: true, f: true, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 3, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 4, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 5, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 6, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 21, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      ]
    },
    {
      id: 'gavEsq',
      name: 'Gaveta Esquerda',
      complete: false,
      inAssembly: true,
      assemblyBy: 'Bruno Barros',
      startedAt: '28/03/2023 15:03',
      endedAt: '',
      parts: [
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 2, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 7, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: false, partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 8, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: true },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 9, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: true, partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 10, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
        { complete: false, partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 22, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
      ]
    }
  ];

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

  return open && <Dialog
    fullScreen
    open={!!chosenProject}
    onClose={() => onClose()}
    TransitionComponent={Transition}
    sx={{ display: !chosenProject && 'none' }}
  >
    <AppBar position='sticky' lenghtonent="nav" sx={{ backgroundColor: 'default.sides' }}>
      <Toolbar>
        <Grid container>
          <Grid container md={1} sm={1} xs={12} p={1} >
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
                  width={!detailOnly ? 50 : 40}
                  loading='lazy'
                />
              </Box>
            </Box>
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={12} p={1} >
            {!detailOnly && <Card sx={{ width: '100%' }}>
              <CardContent className='fullCenter' sx={{ padding: 0.5 }}>
                <Image
                  alt='Project Card'
                  width={40}
                  height={40}
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
              </CardContent>
              <CardActions>
                <Typography sx={{ textAlign: 'center', width: '100%' }}>{me?.givenName?.value} {me?.familyName?.value}</Typography>
              </CardActions>
            </Card>}
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={12} p={1} >
            {!detailOnly && <TopCard title='Projeto' textCenter >{chosenProject?.name?.value}</TopCard>}
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={12} p={1} >
            {!detailOnly && <TopCard title='Maquina em uso' textCenter ><Typography variant='h5'>CNC</Typography> </TopCard> }
          </Grid>
          <Grid container md={2.5} sm={2.5} xs={12} p={1}>
            {!detailOnly
              ? <Card sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ border: '1px solid', borderColor: 'divider', padding: 1, textAlign: 'center' }}>
                  <Typography variant='subtitle'>Data</Typography>
                </Box>
                <CardContent>
                  <Grid container md={12}>
                    <Grid container md={12} sm={12} xs={12}>
                      <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography>{moment().format('dddd Do MMMM [de] YYYY')} </Typography>
                        {/* <Typography><ClockTime /></Typography> */}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              : <Box pr={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                <Typography variant='md'>{me.givenName?.value + ' ' + me.familyName?.value || me.legalName?.value}</Typography>
              </Box>
            }
          </Grid>
          <Grid container md={1} sm={1} xs={12} p={1} >
            <Box className='fullCenter' sx={{ width: '100%' }}>
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
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    {fullyLoaded
      ? <Box>
        <>
          {projectModules.map((mod) => {
            return <Accordion key={mod.id}>
              <AccordionSummary
                expandIcon={<ChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container md={12} sm={12} xs={12} alignItems='center'>
                  <Grid container md={2.4} sm={2.4} xs={6}>
                    <Typography variant='sm' sx={{ pointerEvents: 'auto' }}><a style={{ fontWeight: 'bold' }}>Modulo:</a> {mod.name}</Typography>
                  </Grid>
                  <Grid container md={2.4} sm={2.4} xs={6}>
                    <Typography variant='sm' sx={{ pointerEvents: 'auto' }}><a style={{ fontWeight: 'bold' }}>Montado por:</a> {mod.assemblyBy}</Typography>
                  </Grid>
                  <Grid container md={2.4} sm={2.4} xs={6}>
                    <Typography variant='sm' sx={{ pointerEvents: 'auto' }}><a style={{ fontWeight: 'bold' }}>Iniciado ás:</a> {mod.startedAt}</Typography>
                  </Grid>
                  <Grid container md={2.4} sm={2.4} xs={6}>
                    <Typography variant='sm' sx={{ pointerEvents: 'auto' }}><a style={{ fontWeight: 'bold' }}>Finalizado ás:</a> {mod.endedAt}</Typography>
                  </Grid>
                  <Grid container md={2.4} sm={2.4} xs={62} justifyContent='end'>
                    {mod.complete && <Typography variant='sm' className='successBalloon'>Montado</Typography>}
                    {mod.inAssembly && <Typography variant='sm' className='infoBalloon'>Em montagem</Typography>}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container md={12} sm={12} xs={12} alignItems='center' >
                  <ButtonGroup>
                    <PrimaryBtn text={'Iniciar'} otherProps={{ color: 'success' }} disabled={mod.inAssembly || mod.complete}/>
                    <PrimaryBtn text={'Terminar'} otherProps={{ color: 'error' }} disabled={!mod.inAssembly || mod.complete}/>
                  </ButtonGroup>
                  {mod.complete && <Tooltip title='Imprimir código QR modulo.'>
                    <IconButton>
                      <QrCode />
                    </IconButton>
                  </Tooltip>}
                </Grid>
                <Grid container md={12} sm={12} xs={12} >
                  <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography variant='sm' >Peças</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container md={12} sm={12} xs={12} bgcolor={'#F9F9F9'}>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Peça </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Material </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Qtd.  </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Comp. </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Larg. </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Esp.  </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Peso </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Etiqueta </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Nest. </Typography> </TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Cnc  </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> orla  </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'> Furo Face  </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'>  <Check /> </Typography></TableSortLabel></Box></Grid>
                        <Grid {...cellProps}><Box className='fullCenter' sx={{ width: '100%' }}><TableSortLabel active={false} direction='desc'><Typography variant='sm'>  </Typography> </TableSortLabel></Box></Grid>
                      </Grid>
                      {mod.parts.map((part) => {
                        return <Grid key={part} container md={12} sm={12} xs={12} bgcolor={part.complete ? '#37a62b53' : (part.inProduction && 'info.lightest')} >
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.partName.replace(/_/g, ' ') } </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.material } </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.amount } </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.lenght } mm </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.width } mm </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.thickness } mm </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.weight } </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.tag } </Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.nest }</Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.cnc }</Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.orla }</Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'>{ part.f }</Typography></Grid>
                          <Grid {...cellProps} > <Typography variant='sm'><PartStatus part={part} /> </Typography></Grid>
                          <Grid {...cellProps} > {part.complete && <Tooltip title='Imprimir código QR peça.'>
                            <IconButton>
                              <QrCode />
                            </IconButton>
                          </Tooltip>}
                          </Grid>
                        </Grid>;
                      })}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </AccordionDetails>
            </Accordion>;
          })}

        </>
      </Box>
      : <Loader center={true} />
    }
  </Dialog >;
};

export default ProjectAssembly;
