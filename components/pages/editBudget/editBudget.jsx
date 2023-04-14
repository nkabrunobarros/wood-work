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
import * as foldersActionsRedux from '../../../store/actions/folder';
import * as furnituresActionsRedux from '../../../store/actions/furniture';

import Navbar from '../../layout/navbar/navbar';
import ConvertFilesToObj from '../../utils/ConvertFilesToObj';
import ClientTab from './Tabs/clientTab';
import ProductLinesTab from './Tabs/productLinesTab';
import ProductTab from './Tabs/productTab';
import RequestTab from './Tabs/requestTab';

const EditBudget = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, budgets, clients, budget } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState();
  const dispatch = useDispatch();
  const newBudget = (data) => dispatch(budgetsActionsRedux.newBudget(data));
  const newFolder = (data) => dispatch(foldersActionsRedux.newFolder(data));
  const newFurniture = (data) => dispatch(furnituresActionsRedux.newFurniture(data));

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const obj = ConvertFilesToObj(acceptedFiles);

    setUploadedFiles(obj);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: false });
  const [clientUser, setClientUser] = useState(budget.orderBy.object.id);

  console.log(budget?.dateRequest.value);
  console.log(moment(budget?.dateRequest.value, 'DD/MM/YYYY'));

  const [budgetData, setBudgetData] = useState({
    num: { value: budget?.num?.value, error: '', required: true },
    name: { value: budget?.name?.value, error: '', required: true },
    obs: { value: budget?.obs?.value, type: 'area' },
    price: { value: budget?.price?.value, error: '' },
    client: { value: budget?.orderBy?.object.id, error: '', required: true },
    dateRequest: { value: moment(budget?.dateRequest.value, 'DD/MM/YYYY'), error: '', required: true, type: 'date' },
    dateDelivery: { value: budget?.dateDelivery?.value, error: '', required: false, type: 'date' },
    dateAgreedDelivery: { value: budget?.dateAgreedDelivery?.value, error: '', required: true, type: 'date' },
    dateDeliveryProject: { value: budget?.dateDeliveryProject?.value, error: '', required: false, type: 'date' },
    streetAddress: { value: budget?.deliveryAddress?.value?.streetAddress, error: '', required: true },
    postalCode: { value: budget?.deliveryAddress?.value?.postalCode, error: '', required: true },
    addressLocality: { value: budget?.deliveryAddress?.value?.addressLocality, error: '', required: true },
    addressRegion: { value: budget?.deliveryAddress?.value?.addressRegion, error: '', required: false },
    addressCountry: { value: budget?.deliveryAddress?.value?.addressCountry, error: '', required: true },
  });

  console.log(budget);

  const [lines, setLines] = useState(props.furnitures);

  const [inputFields, setInputFields] = useState([{
    category: { value: '', error: '' },
    name: { value: '', error: '', required: true },
    amount: { value: 0, error: '' }
  }]);

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
      data.postalCode.value = client?.address?.postalCode;
      data.streetAddress.value = client?.address?.streetAddress || '';
      data.addressLocality.value = client?.address?.addressLocality;
      data.addressRegion.value = client?.address?.addressRegion;
      data.addressCountry.value = client?.address?.addressCountry;
    }

    data[props.name].value = props.value;
    setBudgetData(data);
  }

  function ValidateLines () {
    const obj = [...lines];
    let hasErrors = false;

    //  if there are 0 items in the 1st group, return true = errors
    if (obj[0]?.items?.length === 0 || typeof obj[0]?.items === 'undefined') return true;

    obj.map((group) => {
      group.items.map((item) => {
        Object.entries(item).forEach(([, value]) => {
          if (typeof value === 'object' && 'error' in value && value.value === '' && value.required) {
            value.error = 'Campo obrigatorio';
            hasErrors = true;
          } else value.error = '';
        });
      });
    });

    setLines(obj);
    console.log(hasErrors);

    return hasErrors;
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

          // if (data[prop].value === data.category.value) {
          //   data[prop].error = 'Nome mal estruturado';
          //   hasErrors = true;
          // }
        }
      } else if (data[prop].required) {
        data[prop].error = 'Campo Obrigatório';
        hasErrors = true;
      }
    });

    inputFields.map((field) => {
      Object.keys(field).map((key) => {
        if (field[key].required && field[key].value === '') {
          field[key].error = 'Campo Obrigatório';
          hasErrors = true;
        }

        if (key === 'name' && field[key].value === field.category.value) {
          field[key].error = 'Nome mal estruturado.';
          hasErrors = true;
        }
      });

      return field;
    });

    hasErrors = ValidateLines();

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
      id: (budgetData.id + Math.random()) || `urn:ngsi-ld:Budget:${formatString(budgetData.name.value)}`,
      type: 'Budget',
      name: {
        type: 'Property',
        value: budgetData.name.value
      },
      num: {
        type: 'Property',
        value: budgetData.num.value
      },
      amount: {
        type: 'Property',
        value: inputFields[0]?.amount.value
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
        value: budgetData.dateRequest.value !== '' ? moment(budgetData.dateRequest.value).format('DD/MM/YYYY') : ''
      },
      dateAgreedDelivery: {
        type: 'Property',
        value: budgetData.dateAgreedDelivery.value !== '' ? moment(budgetData.dateAgreedDelivery.value).format('DD/MM/YYYY') : ''
      },
      dateDeliveryProject: {
        type: 'Property',
        value: budgetData.dateDeliveryProject.value !== '' ? moment(budgetData.dateDeliveryProject.value).format('DD/MM/YYYY') : ''
      },
      obs: {
        type: 'Property',
        value: budgetData.obs.value
      },
      category: {
        type: 'Property',
        value: inputFields[0]?.category.value || ''
        // value: budgetData.category.value || ''
      },
      status: {
        type: 'Property',
        value: inputFields[0]?.category.value && inputFields[0]?.amount.value && budgetData.price.value && budgetData.dateDelivery.value && budgetData.dateDeliveryProject.value ? 'waiting adjudication' : 'waiting budget'
      },
      orderBy: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:Owner:' + budgetData.client.value
      },
      belongsTo: {
        type: 'Relationship',
        object: `urn:ngsi-ld:Project:${formatString(budgetData.name.value)}`
      },
      dateDelivery: {
        type: 'Property',
        value: moment(budgetData.dateDelivery.value).format('DD/MM/YYYY')
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
    }).catch(() => toast.error('Algo aconteceu. Por favor tente mais tarde!'));

    CreateFurnitures();

    await newFolder({
      folder_name: `urn:ngsi-ld:Folder:${formatString(budgetData.name.value)}`,
      parent_folder: null,
      user: clientUser,
      budget: `urn:ngsi-ld:Budget:${formatString(budgetData.name.value)}`
    });

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

  function formatString (str) {
    // Replace all spaces with underscores
    str = str.replace(/ /g, '_');
    // Replace accented characters
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Replace all non-alphanumeric characters except for underscores
    str = str.replace(/[^a-zA-Z0-9_]/g, '');

    return str;
  }

  async function CreateFurnitures () {
    const items = lines.map(line => {
      let lastGroup = '';

      const lines = line.items.map(item => {
        if (item.rowType.value === 'group') { lastGroup = item.name.value; console.log(item.name); }

        const valuesOnly = {};

        Object.keys(item).map(key => {
          valuesOnly[key] = {
            type: 'Property',
            value: item[key].value
          };
        });

        valuesOnly.id = 'urn:ngsi-ld:Furniture:' + formatString(budgetData.name.value) + '_';
        valuesOnly.type = 'Furniture';
        valuesOnly.group = { value: line.name, type: 'Property' };
        valuesOnly.section = { value: lastGroup, type: 'Property' };
        valuesOnly.hasBudget = { value: `urn:ngsi-ld:Budget:${formatString(budgetData.name.value)}`, type: 'Property' };

        return valuesOnly;
      });

      return lines;
    });

    const mergedArray = items.reduce((mergedArray, array) => mergedArray.concat(array), []).map((item, index) => {
      return { ...item, num: index, id: 'urn:ngsi-ld:Furniture:' + formatString(budgetData.name.value) + '_' + index };
    });

    try {
      mergedArray.map(async (item) => {
        await newFurniture(item).then((result) => console.log(result));
      });
    } catch (err) {
      console.log(err);
    }

    console.log(mergedArray);
  }

  return (
    <>
      <Navbar />
      <Grid component='main'sx={{ padding: '0rem 2rem 0rem 2rem' }} >
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
                  onClick={() => ValidateData()}
                  text={'Guardar'}
                  icon={ <Save size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />}
                />
                <PrimaryBtn
                  text='Cancelar'
                  icon={<X size={pageProps?.globalVars?.iconSize} strokeWidth={pageProps?.globalVars?.iconStrokeWidth} />}
                  light
                  onClick={() => Router.back()}
                />
              </ButtonGroup>
            </Grid>
          </Grid>
        </Content>
        <Grid container sx={{ width: '100%' }}>
          <Grid container md={12}>
            <Content>
              <ClientTab {...props}
                client={budgetData.client}
                onClientChange={onBudgetChange}
                onProcessing={setProcessing}
                setClientUser={setClientUser}
                noDetail
              />
            </Content>
          </Grid>
          <Grid container md={12}>
            <Content>
              <RequestTab {...props}
                onProcessing={setProcessing}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                noDetail
              />
            </Content>
          </Grid>
          <Grid container md={12}>
            <Content>
              <ProductLinesTab {...props}
                dragDrop={{ getRootProps, getInputProps, isDragActive }}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                docs={{ uploadedFiles, setUploadedFiles }}
                inputFields={inputFields}
                setInputFields={setInputFields}
                noDrop
                lines={lines}
                setLines={setLines}
              />
              {false && <ProductTab {...props}
                dragDrop={{ getRootProps, getInputProps, isDragActive }}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                docs={{ uploadedFiles, setUploadedFiles }}
                inputFields={inputFields}
                setInputFields={setInputFields}
                noDrop
              />}
            </Content>
          </Grid>

        </Grid>
      </Grid >

    </>
  );
};

export default EditBudget;
