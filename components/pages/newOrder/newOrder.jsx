/* eslint-disable react/prop-types */
//  Nodes
import {
  Badge,
  Box, Button, ButtonGroup, Divider, IconButton, InputLabel, TextareaAutosize, TextField, Tooltip, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilePlus, Info, Minus, Package, Plus, Save, User, X } from 'lucide-react';
import Router from 'next/router';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import routes from '../../../navigation/routes';
import * as OrdersActions from '../../../pages/api/actions/order';
import styles from '../../../styles/NewOrder.module.css';
import CustomBreadcrumbs from '../../breadcrumbs';
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';
import Select from '../../inputs/select';
import Loader from '../../loader/loader';
import ConvertBase64 from '../../utils/ConvertBase64';

const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, clients, products } = props;
  const [client, setClient] = useState(" ");
  // eslint-disable-next-line no-unused-vars
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
  ])

  function ValidateData() {
    let hasErrors = false;

    if (!client || client === ' ') setErrorClient('Campo Obrigatório');

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
    })

    if (hasErrors) toast.error('Prencha todos os campos.')
    else setDialogOpen(true)
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
    }

    setProcessing(true)

    try {
      await OrdersActions.saveOrder(builtOrder).then((response) => {

        inputFields.map(async (input) => {
          console.log(input)

          const buildOrderDetail = {
            productId: input.prod,
            orderId: response.data.payload.id,
            status: 'not started',
          }

          for (let index = 0; index < input.amount; index++) {

            await OrdersActions.saveOrderDetails(buildOrderDetail)

          }

        })





        setNewestOrder(response.data.payload)
        setDialogOpen(false)
        setProcessing(false)
        setSuccessOpen(true)

      })
    } catch (err) {
      toast.error('Algo Aconteceu')
      setProcessing(false)
      setDialogOpen(false)

    }
  }

  function ClearAll() {
    setSuccessOpen(false)
    setClient()
    setStartAt(Date.now())
    setEndAt(Date.now())
    setObs("")
    setErrorClient()
    setInputFields([{ prod: '', amount: 1, errorProd: '', files: [] }])
  }

  const handleFormChange = (i, e) => {
    const data = [...inputFields];

    data[i][e.target.name] = e.target.value;
    data[i].errorProd = '';
    setInputFields(data);

  }

  const addFields = () => {
    const newfield = { prod: '', amount: 1, errorProd: '', files: [] }

    setInputFields([...inputFields, newfield])

  }

  const DisplayTotal = () => {
    let total = 0;

    // eslint-disable-next-line array-callback-return
    inputFields.map((input) => {
      total += products.find((product) => product.id === input.prod)?.cost * input.amount || 0
    })


    return <NumericFormat displayType="text"
      suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
      decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
      decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
      thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
      value={total || 0} />
  }

  const removeFields = (index) => {
    const data = [...inputFields];

    data.splice(index, 1)
    setInputFields(data)
  }

  async function onFileInput(e, i) {
    const arr = [];

    for (let index = 0; index < Object.keys(e.target.files).length; index++) {
      const file = e.target.files[index];

      await ConvertBase64(file)
        .then(result => {
          file.base64 = result;
          arr.push(file)
        })
        .catch(err => {
          console.log(err);
        })

    }

    const a = arr.filter(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)

    if (arr.find(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)) toast.error(`${Object.keys(a).length} não foram carregadas, tamanho maximo de 1 MB ( ${a.map(x => `${x.name} `)} )`)

    const data = [...inputFields];

    data[i].files = arr.filter(ele => ele.size <= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);
    setInputFields(data);
  }

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
        onConfirm={() => Router.push(`${routes.private.internal.order}${newestOrder.id}`)}
        message={`Encomenda Criada com sucesso, que deseja fazer agora?`}
        icon='Verified'
        iconType='success'
        okTxt='Ver Encomenda'
        cancelTxt='Criar nova Encomenda'
      />
      <Content>
        <Box fullWidth sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Typography item className='headerTitleXl'>{breadcrumbsPath[1].title}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <PrimaryBtn
              onClick={() => ValidateData()}
              text='Guardar'
              icon={<Save size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />} />
            <PrimaryBtn
              text='Cancelar'
              icon={<X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
              light
              onClick={() => Router.back()}
            />
          </Box>
        </Box>
        <Grid container sx={{ p: 2 }}>
          <Grid container md={9} sm={12} p={2}>
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
                            <NumericFormat displayType="text"
                              suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
                              decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
                              decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
                              thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
                              value={products.find(ele => ele.id === input.prod)?.cost || 0} />
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
                          <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', fontWeight: 'bold', color: 'var(--primary-dark)', fontSize: '20px' }} md={1} >
                            <NumericFormat displayType="text"
                              suffix={process.env.NEXT_PUBLIC_COUNTRY_SUFFIX}
                              decimalScale={process.env.NEXT_PUBLIC_DECIMALS_SCALE}
                              decimalSeparator={process.env.NEXT_PUBLIC_DECIMALS_SEPARATOR}
                              thousandSeparator={process.env.NEXT_PUBLIC_THOUSANDS_SEPARATOR}
                              value={products.find(ele => ele.id === input.prod)?.cost * (input.amount) || 0} />
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
          <Grid container md={3} sm={12}  >
            <Grid bgcolor={"lightGray.main"} className={styles.clientContainer} spacing={1} p={2}>
              <Grid container item sm={12} xs={12} >
                <Typography id='align' className='headerTitleSm'>
                  <User size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} /> Outros Dados
                </Typography>
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
                    setErrorClient()
                    setClient(e.target.value)
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

          <Button onClick={ClearAll} style={{ marginLeft: 'auto' }}>
            Limpar
          </Button>
        </Grid>
      </Content>
    </Grid>
  );
};

export default NewOrder;
