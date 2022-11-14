/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
//  Nodes
import Router from 'next/router';
import React, { useCallback, useState } from 'react';

//  Material Ui
import {
  Badge,
  // eslint-disable-next-line sort-imports
  Box, Button, ButtonGroup, Divider, Grid, IconButton, InputLabel, Step, StepLabel, Stepper, TextareaAutosize, TextField, Tooltip, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from 'styled-components';

//  Icons
import { ArrowLeft, ArrowRight, FilePlus, Info, Minus, Package, PackagePlus, Plus, RefreshCw, Save, User, UserPlus, X } from 'lucide-react';

//  Stepper pages
import SwipeableViews from 'react-swipeable-views';


//  Navigation
import routes from '../../../navigation/routes';

//  Actions
import * as ClientsActions from '../../../pages/api/actions/client';
import * as OrdersActions from '../../../pages/api/actions/order';

//  Page Component Styles
import styles from '../../../styles/NewOrder.module.css';

//  Breadcrumbs Component
import CustomBreadcrumbs from '../../breadcrumbs';

//  Custom Components
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import MyInput from '../../inputs/myInput';
import Select from '../../inputs/select';

//  Dialogs
import { toast } from 'react-toastify';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';


//  Loader
import Loader from '../../loader/loader';

//  Utils
import { useDropzone } from 'react-dropzone';
import { NumericFormat } from 'react-number-format';
import ConvertBase64 from '../../utils/ConvertBase64';

//  Device "Detector"
import { isMobile } from 'react-device-detect';


const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, products } = props;
  const [clients, setClients] = useState(props.clients);
  const [client, setClient] = useState(" ");
  const [obs, setObs] = useState('');
  const [errorClient, setErrorClient] = useState('');
  // const [errorStartAt, setErrorStartAt] = useState('');
  // const [errorEndAt, setErrorEndAt] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [newestOrder, setNewestOrder] = useState();
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();

  const [inputFields, setInputFields] = useState([
    { prod: '', amount: 1, errorProd: '', files: [] }
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  //  New Order Stages
  const steps = ['Produtos', 'Cliente', 'Orçamento', 'Finalizar'];

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: false });


  function ValidateData() {
    let hasErrors = false;

    if (!client || client === ' ' && activeStep === 1) {
      setErrorClient('Campo Obrigatório');
      hasErrors = true;
    }

    if (inputFields.length === 0) {
      hasErrors = true;
    }
    // if (!startAt) setErrorStartAt('Campo Obrigatório');

    // if (!endAt) setErrorEndAt('Campo Obrigatório');


    // eslint-disable-next-line array-callback-return
    inputFields.map((input, i) => {

      if (input.prod === '') {
        const data = [...inputFields];

        data[i].errorProd = 'Campo Óbrigatorio';
        setInputFields(data);
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast.error('Prencha todos os campos.');

      return true;
    }
    else if (activeStep === steps.length - 1) setDialogOpen(true);
  }

  async function CreateOrder() {

    const builtOrder = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      status: 'Em orçamentação',
      clientId: client,
      obs,
      endAt,
      startAt,
      createdAt: Date.now(),
    };

    setProcessing(true);

    try {
      await OrdersActions.saveOrder(builtOrder).then((response) => {

        inputFields.map(async (input) => {

          const buildOrderDetail = {
            productId: input.prod,
            orderId: response.data.payload.id,
            status: 'not started',
            amount: input.amount,
            completed: 0,

          };

          await OrdersActions.saveOrderDetails(buildOrderDetail);
        });

        setNewestOrder(response.data.payload);
        setDialogOpen(false);
        setProcessing(false);
        setSuccessOpen(true);

      });
    } catch (err) {
      toast.error('Algo Aconteceu');
      setProcessing(false);
      setDialogOpen(false);

    }
  }

  function ClearAll() {
    setSuccessOpen(false);
    setClient();
    setStartAt(Date.now());
    setEndAt(Date.now());
    setObs(" ");
    setErrorClient();
    setInputFields([{ prod: '', amount: 1, errorProd: '', files: [] }]);
  }

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i][e.target.name] = e.target.value;
    data[i].errorProd = '';
    setInputFields(data);

  };

  const addFields = () => {
    const newfield = { prod: '', amount: 1, errorProd: '', files: [] };

    setInputFields([...inputFields, newfield]);

  };

  const DisplayTotal = () => {
    let total = 0;

    // eslint-disable-next-line array-callback-return
    inputFields.map((input) => {
      total += products.find((product) => product.id === input.prod)?.cost * input.amount || 0;
    });


    return <NumericFormat displayType="text"
      suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
      decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
      decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
      thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
      value={total || 0} />;
  };

  const removeFields = (index) => {
    const data = [...inputFields];

    data.splice(index, 1);
    setInputFields(data);
  };

  async function onFileInput(e, i) {
    const arr = [];

    for (let index = 0; index < Object.keys(e.target.files).length; index++) {
      const file = e.target.files[index];

      await ConvertBase64(file)
        .then(result => {
          file.base64 = result;
          arr.push(file);
        })
        .catch(err => {
          console.log(err);
        });

    }

    const a = arr.filter(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);

    if (arr.find(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)) toast.error(`${Object.keys(a).length} não foram carregadas, tamanho maximo de 1 MB ( ${a.map(x => `${x.name} `)} )`);

    const data = [...inputFields];

    data[i].files = arr.filter(ele => ele.size <= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);
    setInputFields(data);
  }



  const handleNext = () => {

    const hasErrors = ValidateData();

    if (hasErrors) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            {children}
          </Box>
        )}
      </div>
    );
  }


  const handleChangeIndex = (index) => {
    setActiveStep(index);
  };

  async function getClients() {
    setProcessing(true);

    await ClientsActions.clients()
      .then((res) => setClients(res.data.payload.data))
      .catch(err => console.log(err));

    setProcessing(false);
  }

  const [uploadedFiles, setUploadedFiles] = useState();




  return (
    <Grid component='main' >
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Confirm Create Order Modal */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => CreateOrder()}
        message={`Está prestes a criar uma encomenda, tem certeza que quer continuar?`}
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What do do after Create Modal */}
      <ConfirmDialog
        open={successOpen}
        handleClose={() => ClearAll()}
        onConfirm={() => Router.push({
          pathname: `${routes.private.internal.orders}`,
          query: { order: newestOrder.id }
        })}
        message={`Encomenda Criada com sucesso, que deseja fazer agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Encomenda'
        cancelTxt='Criar nova Encomenda'
      />

      <Content>
        <Grid container md={12} sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Grid container md={3}>
            <Typography item className='headerTitleXl'>{breadcrumbsPath[1].title}</Typography>

          </Grid >
          <Grid container md={6} className='fullCenter'>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : 'horizontal'}>
                {steps.map((label) => {
                  const labelProps = {};
                  const a = true;

                  // if (isStepFailed(index)) {
                  if (a) {
                    labelProps.optional = (
                      <Typography variant="caption" color="error">
                        {/* Alert message */}
                      </Typography>
                    );
                  }

                  return (
                    <Step key={label} >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </Grid>
          <Grid container md={3}>
            <Box sx={{ marginLeft: 'auto' }}>
              <ButtonGroup>
                <PrimaryBtn
                  onClick={() => handleBack()}
                  disabled={activeStep === 0}
                  text={'Anterior'}
                  icon={
                    <ArrowLeft size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                  }
                />
                <PrimaryBtn
                  text='Cancelar'
                  icon={<X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
                  light
                  onClick={() => Router.back()}
                />
                <PrimaryBtn
                  onClick={() => activeStep === steps.length - 1 ? ValidateData() : handleNext()}
                  text={activeStep === steps.length - 1 ? 'Guardar' : 'Seguinte'}
                  icon={
                    activeStep === steps.length - 1 ?
                      <Save size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                      :
                      <ArrowRight size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                  }
                />
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <SwipeableViews
            axis={theme?.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleChangeIndex}
          >
            {/* Products Tab */}
            <TabPanel value={activeStep} index={0} >
              <Grid container sx={{ p: 2 }}>
                <Grid container md={12} sm={12} p={2}>
                  <Box fullWidth sx={{ width: '100%' }}>
                    <form>
                      <Grid container spacing={1} sm={12} xs={12}>
                        <Grid container item md={12} sm={12} xs={12}>
                          <Typography id='align' className='headerTitleSm'>
                            <Package size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados dos Produtos <Button onClick={() => addFields()}><Plus /></Button>
                          </Typography>
                        </Grid>
                        <Grid container md={12} p={1}>
                          <Grid container md={12} p={1} sx={{ textAlign: 'center' }}>
                            <Grid md={3} >Produto</Grid>
                            <Grid md={2} >Descrição</Grid>
                            <Grid md={2} >Preço</Grid>
                            <Grid md={2} >Quantidade</Grid>
                            <Grid md={1} sx={{ textAlign: 'end' }} >Total  <DisplayTotal /></Grid>
                            <Grid md={2} >Ações</Grid>
                          </Grid>
                          {inputFields.map((input, i) => (
                            <>
                              <Divider sx={{ width: '100%' }} />
                              <Grid container md={12} p={1} >
                                <Grid sx={{ display: 'flex', alignItems: 'center' }} container item md={3} sm={12} xs={12}>
                                  <Select
                                    name={`prod`}
                                    error={input.errorProd}
                                    // label={'Produto'}
                                    optionLabel="name"
                                    required
                                    fullWidth
                                    options={products}
                                    value={input.prod}
                                    onChange={(e) => handleFormChange(i, e)}
                                  />
                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} md={2} >{products.find(ele => ele.id === input.prod)?.description}</Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }} md={2} >
                                  <Typography color='link.main'>
                                    <NumericFormat displayType="text"
                                      suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
                                      decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
                                      decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
                                      thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
                                      value={products.find(ele => ele.id === input.prod)?.cost || 0} />
                                  </Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} container item md={2} sm={12} xs={12}>

                                  <ButtonGroup >
                                    <Button sx={{ border: '1px solid var(--grayEdges)', borderRight: '0px' }}
                                      aria-label="reduce"
                                      onClick={() => {
                                        const data = [...inputFields];

                                        if (data[i].amount > 1) {
                                          data[i].amount = data[i].amount - 1;
                                          setInputFields(data);
                                        }
                                      }}
                                    >
                                      <Minus fontSize="small" />
                                    </Button>
                                    <Button sx={{ border: '1px solid var(--grayEdges)', borderLeft: '0px' }}>{input.amount}</Button>
                                    <Button sx={{ border: '1px solid var(--grayEdges)', borderLeft: '0px' }}
                                      aria-label="increase"
                                      onClick={() => {
                                        const data = [...inputFields];

                                        data[i].amount = data[i].amount + 1;
                                        setInputFields(data);
                                      }}
                                    >
                                      <Plus fontSize="small" />
                                    </Button>
                                  </ButtonGroup>

                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', fontWeight: 'bold' }} md={1} >
                                  <Typography color='link.main'>
                                    <NumericFormat displayType="text"
                                      suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
                                      decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
                                      decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
                                      thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
                                      value={products.find(ele => ele.id === input.prod)?.cost * (input.amount) || 0} />
                                  </Typography>
                                </Grid>

                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }} md={2}>
                                  <Tooltip title={Object.keys(input.files).length ? `${Object.keys(input.files).length} ficheiro(s) anexado(s)` : 'Anexar Ficheiros'}>
                                    <IconButton component='label'>
                                      <Badge badgeContent={Object.keys(input.files).length} color="primary">
                                        <FilePlus size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                                        <input multiple type='file' accept='image/*,.pdf' name='file' hidden onChange={(e) => onFileInput(e, i)} />
                                      </Badge>
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Remover produto'>
                                    <IconButton onClick={() => removeFields(i)}>
                                      <X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Grid>


                <Button onClick={ClearAll} style={{ marginLeft: 'auto' }}>
                  Limpar
                </Button>
              </Grid>

            </TabPanel>
            {/* Cliente Tab */}
            <TabPanel value={activeStep} index={1}>
              <Grid container>
                <Grid container md={3} sm={12}  >
                  <Grid bgcolor={"lightGray.main"} className={styles.clientContainer} spacing={1} p={2}>
                    <Grid container item sm={12} xs={12} >
                      <Grid container md={9}>
                        <Typography id='align' className='headerTitleSm'>
                          <User size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Dados Cliente
                        </Typography>
                      </Grid>
                      <Grid container md={3}>
                        <ButtonGroup>
                          <Tooltip title='Atualizar lista de Clientes'>
                            <IconButton onClick={() => getClients()}>
                              <RefreshCw size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Novo Cliente'>
                            <IconButton href={routes.private.internal.newClient} target='#'>
                              <UserPlus size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />
                            </IconButton>
                          </Tooltip>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                    <Grid container item sm={12} xs={12} >
                      <Select
                        error={errorClient}
                        label={'Cliente'}
                        required
                        fullWidth
                        options={clients}
                        optionValue={'id'}
                        optionLabel="giveName"
                        value={client}
                        onChange={(e) => {
                          setErrorClient();
                          setClient(e.target.value);
                        }}
                        adornmentIcon={
                          <Tooltip title='Detalhes Codigo Postal' >
                            <Info color="var(--primary)" strokeWidth={1} />
                          </Tooltip>
                        }
                      />
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid container item sm={12} xs={12} >
                        <InputLabel htmlFor='email'>Data Inicio</InputLabel>
                        <DesktopDatePicker
                          required
                          error={true}
                          inputFormat="DD.MM.YYYY"
                          value={startAt}
                          onChange={(newValue) => setStartAt(newValue)}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </Grid>
                      <Grid container item sm={12} xs={12} >
                        {/* <MyInput label={'Data Termino'} type='date' value={endAt} onChange={(e) => setEndAt(e.target.value)} error={errorEndAt}/> */}
                        <InputLabel htmlFor='email'>Data Termino</InputLabel>
                        <DesktopDatePicker
                          required
                          inputFormat="DD.MM.YYYY"
                          value={endAt}
                          onChange={(newValue) => setEndAt(newValue)}
                          renderInput={(params) => <TextField style={{ border: '1px solid red !important' }} label={'hi'} error fullWidth {...params} />}
                        />
                      </Grid>
                    </LocalizationProvider>
                    <Grid container item sm={12} xs={12} >
                      <InputLabel htmlFor='email'>Observações</InputLabel>
                      <TextareaAutosize
                        placeholder='Escrever observações'
                        className={styles.textarea}
                        value={obs}
                        onChange={(e) => setObs(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container md={9} sm={12} sx={{ border: '1px solid var(--white)' }}>
                  {!clients.find(ele => ele.id === client) ?
                    <Box className='fullCenter' sx={{ width: '100%', border: '1px solid' }}>
                      <Typography>Escolha um cliente</Typography>
                    </Box>
                    :
                    <>
                      <Grid container md={6} p={2} sx={{ height: 'fit-content', padding: 3 }}>
                        <Grid item md={12} p={1}>
                          <Typography id='align' item color='lightTextSm.main'><User
                            strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />Dados Gerais</Typography>
                        </Grid>
                        <Grid item md={6} p={1}>
                          <Typography color='lightTextSm.main'>Email</Typography>
                          <Typography color='lightTextSm.black' >
                            {clients.find(ele => ele.id === client)?.email}</Typography>
                        </Grid>
                        <Grid item md={6} p={1}>
                          <Typography color='lightTextSm.main'>Telefone</Typography>
                          <Typography color='lightTextSm.black' >
                            {clients.find(ele => ele.id === client)?.telephone}</Typography>
                        </Grid>
                        <Grid item md={6} p={1}>
                          <Typography color='lightTextSm.main'>Pessoa de Contacto</Typography>
                          <Typography color='lightTextSm.black' >
                            {clients.find(ele => ele.id === client)?.contact}</Typography>
                          {console.log(clients)}
                        </Grid>
                        <Grid item md={6} p={1}>
                          <Typography color='lightTextSm.main'>Contacto</Typography>
                          <Typography color='lightTextSm.black' >
                            {clients.find(ele => ele.id === client)?.telephone}</Typography>
                        </Grid>
                        <Grid item md={6} p={1}>
                          <Typography color='lightTextSm.main'>Observações</Typography>
                          <Typography color='lightTextSm.black' >
                            {clients.find(ele => ele.id === client)?.obs}</Typography>
                        </Grid>
                      </Grid>
                      <Grid bgcolor={"lightGray.main"} className={styles.clientContainer} container md={6} sx={{ height: 'fit-content', padding: 3 }} >
                        <Grid container item p={1}>
                          <Grid item xs={12}>
                            <Typography id='align' item color='lightTextSm.main'>
                              <PackagePlus
                                strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                                size={pageProps.globalVars.iconSize}
                              />
                              Dados de Faturação
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid container item p={1}>
                          <Grid item xs={12} md={6} p={1}>
                            <Typography item color='lightTextSm.main'>Morada Fiscal</Typography>
                            <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client)?.address}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6} p={1}>
                            <Typography item color='lightTextSm.main'>Codigo Postal</Typography>
                            <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client)?.postalCode}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container item p={1}>
                          <Grid item xs={12} md={6} p={1}>
                            <Typography item color='lightTextSm.main'> Número de Identificação Fiscal (Nif)</Typography>
                            <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client)?.taxId}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6} p={1}>
                            <Typography item color='lightTextSm.main'>Outros Dados</Typography>
                            <Typography item color='lightTextSm.black' >{clients.find(ele => ele.id === client)?.otherData}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  }
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={activeStep} index={2}>
              <Grid container md={12}>
                <Grid container md={6} sx={{ borderRight: '1px solid' }}>
                  <Box container sx={{ width: '100%' }}>
                    <Grid container md={12}>
                      <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant='xl'>Budget</Typography></Grid>
                      <Grid container p={2} md={6}>
                        <Select
                          options={[]}
                          label='Escolher já existente budget'
                        />
                      </Grid>
                      <Grid container md={6} >
                        <MyInput
                          label='a'
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid container md={6} sx={{ borderLeft: '1px solid' }}>
                  <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant='xl'>Documentos</Typography></Grid>
                  <Grid container md={12} className='fullCenter' {...getRootProps()}>
                    <Box className='dragDrop' {...getRootProps()} sx={{ borderColor: uploadedFiles && 'var(--green)', color: uploadedFiles && 'var(--green)' }}>
                      <input {...getInputProps()} type='file' hidden multiple directory="" webkitdirectory="" onChange={(e) => setUploadedFiles(e.target.files)} />
                      {
                        isDragActive ?
                          <p>Drop...</p> :
                          <p>{uploadedFiles ? `${Object.keys(uploadedFiles).length} ficheiros anexados` : 'Arraste para carregar ficheiros'}</p>
                      }
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={activeStep} index={3}>
              <Grid container >
                <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container md={5} sm={6} sx={{ border: '1px solid #EDEDED' }}>
                    {/* Header */}
                    <Grid container md={12} sx={{ padding: '1rem', display: 'flex', alignItems: 'center', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EDEDED' }}>
                      <Grid container md={9} >Produtos Encomendados</Grid>
                      <Grid container md={3}>Quantidade</Grid>
                    </Grid>
                    {/* Rows */}
                    {inputFields.map((ele, i) => {
                      return (
                        <Grid key={i} container md={12} sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
                          <Grid container md={2}><img src={'https://crm.innerjoin.pt/douromed/images/semimagem.jpg'} style={{ width: '50px', height: '50px' }} /></Grid>
                          <Grid container md={7}>{products.find(prod => prod.id === ele.prod)?.name}</Grid>
                          <Grid container md={3}>{ele.amount}</Grid>
                        </Grid>
                      );
                    })}
                    <Grid container md={12} sx={{ padding: '1rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #EDEDED' }}>
                      <Grid container md={10} >
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Subtotal:</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Envio & Entrega:</Typography> </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography fontWeight={'bold'}>Total</Typography> </Grid>
                      </Grid>
                      <Grid container md={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>X €</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Y €</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography fontWeight={'bold'}>Z €</Typography> </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <Grid container md={5} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    {/* Header */}
                    <Grid container md={5.5} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                      <Grid container md={12} >
                        <Grid container p={1} md={12} sx={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #EDEDED', backgroundColor: '#FAFAFA' }}>Endereço de faturação</Grid>
                        <Grid container md={12} p={1}>
                          <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.legalName}</Typography>
                          </Grid>
                          <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.address}</Typography>
                          </Grid>
                          <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.postalCode}</Typography>
                          </Grid>
                          <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.country}</Typography>
                          </Grid>
                          <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>T: {clients.find(ele => ele.id === client)?.telephone}</Typography>
                          </Grid>

                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container md={5.5} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                      <Grid container md={12} >
                        <Grid container p={1} md={12} sx={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #EDEDED', backgroundColor: '#FAFAFA' }}>Endereço de faturação</Grid>
                        <Grid container p={1} md={12}>here</Grid>
                      </Grid>
                    </Grid>
                    <Grid container md={5.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                      <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>Data limite de levantamento
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Box>

      </Content>
    </Grid >
  );
};

export default NewOrder;
