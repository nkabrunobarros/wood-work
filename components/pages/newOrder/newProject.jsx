/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
//  Nodes
import Router from 'next/router';
import React, { useCallback, useState } from 'react';

//  Material Ui
import { ButtonGroup, Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

//  Icons
import { Save, X } from 'lucide-react';

//  Actions
//  Page Component Styles

//  Breadcrumbs Component
import CustomBreadcrumbs from '../../breadcrumbs';

//  Custom Components
import PrimaryBtn from '../../buttons/primaryBtn';
import Content from '../../content/content';

//  Dialogs
import { toast } from 'react-toastify';
import ConfirmDialog from '../../dialogs/ConfirmDialog';
import Notification from '../../dialogs/Notification';

//  Loader
import Loader from '../../loader/loader';

//  Utils
import { useDropzone } from 'react-dropzone';

//  Device "Detector"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import ConvertFilesToObj from '../../utils/ConvertFilesToObj';
import ClientTab from './Tabs/clientTab';
import ProductTab from './Tabs/productTab';
import RequestTab from './Tabs/requestTab';

const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, budgets, clients } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState();
  const dispatch = useDispatch();
  const newBudget = (data) => dispatch(budgetsActionsRedux.newBudget(data));

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const obj = ConvertFilesToObj(acceptedFiles);

    setUploadedFiles(obj);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: false });

  const [budgetData, setBudgetData] = useState({
    obs: { value: '', type: 'area' },
    amount: { value: '', error: '' },
    price: { value: '', error: '' },
    category: { value: '', error: '' },
    name: { value: '', error: '', required: true },
    client: { value: '', error: '', required: true },
    dateRequest: { value: '', error: '', required: true, type: 'date' },
    dateAgreedDelivery: { value: '', error: '', required: true, type: 'date' },
    dateDeliveryProject: { value: '', error: '', required: true, type: 'date' },
    streetAddress: { value: '', error: '', required: true },
    postalCode: { value: '', error: '', required: true },
    addressLocality: { value: '', error: '', required: true },
    addressRegion: { value: '', error: '', required: true },
    addressCountry: { value: '', error: '', required: true },
  });

  function onBudgetChange (props) {
    const data = { ...budgetData };

    if (data[props.name]?.type === 'date') {
      const date = moment(props.value);

      if (date.isValid()) {
        data[props.name].error = '';
      } else {
        data[props.name].error = 'Data Invalida';
      }
    } else data[props.name].error = '';

    if (props.name === 'category') {
      if (data[props.name].value === '' || data.name.value === '') data.name.value = props.value + data.name.value;
      else data.name.value = data.name.value.replace(data.category.value, props.value);

      data.name.error = '';
    }

    if (props.name === 'client') {
      const client = clients.find(ele => ele.id === props.value);

      data.postalCode.error = '';
      data.streetAddress.error = '';
      data.postalCode.value = client?.address?.value?.postalCode;
      data.streetAddress.value = client?.address?.value?.streetAddress || '';
      data.addressLocality.value = client?.address?.value?.addressLocality;
      data.addressRegion.value = client?.address?.value?.addressRegion;
      data.addressCountry.value = client?.address?.value?.addressCountry;
    }

    data[props.name].value = props.value;
    setBudgetData(data);
  }

  function ValidateData () {
    let hasErrors = false;
    const data = { ...budgetData };

    Object.keys(budgetData).map((prop) => {
      if (data[prop].value !== '' && data[prop].value !== undefined && data[prop].required) {
        if (data[prop]?.type === 'date') {
          const date = moment(data[prop].value);

          if (date.isValid()) data[prop].error = '';
          else {
            data[prop].error = 'Data Invalida';
            hasErrors = true;
          }
        }

        if (prop === 'name') {
          if (budgets.find((element) => element.name.value.toLowerCase() === data[prop].value.toLowerCase()) !== undefined) {
            data[prop].error = 'Nome já usado';
            hasErrors = true;
          }

          if (data[prop].value === data.category.value) {
            data[prop].error = 'Nome mal estruturado';
            hasErrors = true;
          }
        }
      } else if (data[prop].required) {
        data[prop].error = 'Campo Obrigatório';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast.error('Prencha todos os campos.');
      setBudgetData(data);

      return !hasErrors;
    }

    setDialogOpen(true);

    return !hasErrors;
  }

  async function CreateOrder () {
    setProcessing(true);

    const data = {
      id: (budgetData.id + Math.random()) || `urn:ngsi-ld:Budget:${budgetData.name.value.replace(/ /g, '_').toUpperCase()}`,
      type: 'Budget',
      name: {
        type: 'Property',
        value: budgetData?.name.value
      },
      amount: {
        type: 'Property',
        value: budgetData.amount.value
      },
      price: {
        type: 'Property',
        value: budgetData.price.value.replace(/ /g, '').replace(/€/g, '')
      },
      approvedDate: {
        type: 'Property',
        value: ''
      },
      dateRequest: {
        type: 'Property',
        value: moment(budgetData.dateRequest.value).format('DD/MM/YYYY')
      },
      dateAgreedDelivery: {
        type: 'Property',
        value: moment(budgetData.dateAgreedDelivery.value).format('DD/MM/YYYY')
      },
      dateDeliveryProject: {
        type: 'Property',
        value: moment(budgetData.dateDeliveryProject.value).format('DD/MM/YYYY')
      },
      obs: {
        type: 'Property',
        value: budgetData.obs.value
      },
      image: {
        type: 'Property',
        value: 'urn:ngsi-ld:Image:Budget:MC_MUEBLETV_A'
      },
      category: {
        type: 'Property',
        value: budgetData.category.value || ''
      },
      status: {
        type: 'Property',
        value: budgetData.category.value && budgetData.amount.value && budgetData.price.value ? 'waiting adjudication' : 'waiting budget'
      },
      orderBy: {
        type: 'Relationship',
        object: budgetData.client.value
      },
      belongsTo: {
        type: 'Relationship',
        object: `urn:ngsi-ld:Project:${budgetData.name.value.replace(/ /g, '_').toUpperCase()}`
      },
      dateDelivery: {
        type: 'Property',
        value: budgetData.category.value && budgetData.amount.value && budgetData.price.value ? budgetData.dateDelivery.value : ''
      },
      deliveryAddress: {
        type: 'Property',
        value: {
          postalCode: budgetData.postalCode.value,
          streetAddress: budgetData.streetAddress.value,
          addressLocality: budgetData.addressLocality.value,
          addressRegion: budgetData.addressRegion.value,
          addressCountry: budgetData.addressCountry.value,
        }
      },
    };

    await newBudget(data).then(() => {
      toast.success('Orçamento Criado!');
    }).catch((err) => console.log(err));

    // await BudgetActions.saveBudget(built).then(() => toast.success('Criado.')).catch(() => toast.error('Algo aconteceu'));
    setProcessing(false);
    setDialogOpen(false);
  }

  function ClearAll () {
    setSuccessOpen(false);
  }

  const successModalProps = {
    open: successOpen,
    handleClose: ClearAll,
    message: 'Orçamento criado com sucesso, que deseja fazer agora?',
    icon: 'Verified',
    iconType: 'success',
    okTxt: 'Ver orçamento',
    cancelTxt: 'Criar novo orçamento',
  };

  return (
    <Grid>
      <CssBaseline />
      <Notification />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Confirm Create Order Modal */}
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => CreateOrder()}
        message={'Está prestes a criar um orçamento, tem certeza que quer continuar?'}
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What do do after Create Modal */}
      <ConfirmDialog {...successModalProps} />
      <Content>
        <Grid container md={12} sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Grid container md={10} sm={10} xs={12}>
            <Typography variant='titlexxl'>{breadcrumbsPath[1].title}</Typography>
          </Grid >
          <Grid container md={2} sm={2} xs={12} justifyContent='end'>
            <ButtonGroup>
              <PrimaryBtn
                text='Cancelar'
                icon={<X size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />}
                light
                onClick={() => Router.back()}
              />
              <PrimaryBtn
                onClick={() => ValidateData()}
                text={'Guardar'}
                icon={ <Save size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container sx={{ width: '100%' }}>
          <Grid container md={3.5}>
            <ClientTab {...props}
              client={budgetData.client}
              onClientChange={onBudgetChange}
              onProcessing={setProcessing}
              noDetail
            />
          </Grid>
          <Grid container md={5}>
            <ProductTab {...props}
              dragDrop={{ getRootProps, getInputProps, isDragActive }}
              budgetData={budgetData}
              onBudgetChange={onBudgetChange}
              docs={{ uploadedFiles, setUploadedFiles }}
              noDrop
            />
          </Grid>
          <Grid container md={3.5}>
            <RequestTab {...props}
              onProcessing={setProcessing}
              budgetData={budgetData}
              onBudgetChange={onBudgetChange}
              noDetail
            />
          </Grid>
        </Grid>
      </Content>
    </Grid >
  );
};

export default NewOrder;
