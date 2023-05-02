/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
//  Nodes
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

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

//  Device "Detector"
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as foldersActionsRedux from '../../../store/actions/folder';
import * as furnituresActionsRedux from '../../../store/actions/furniture';

import Navbar from '../../layout/navbar/navbar';
import formatString from '../../utils/FormatString';
import ClientTab from './Tabs/clientTab';
import ObservationsTab from './Tabs/observationsTab';
import ProductLinesTab from './Tabs/productLinesTab';
import ProductLinesTab2 from './Tabs/productLinesTab2';
import RequestTab from './Tabs/requestTab';

const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, clients } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState();
  const [lines, setLines] = useState([]);
  const dispatch = useDispatch();
  const newBudget = (data) => dispatch(budgetsActionsRedux.newBudget(data));
  const newFolder = (data) => dispatch(foldersActionsRedux.newFolder(data));
  const newFurniture = (data) => dispatch(furnituresActionsRedux.newFurniture(data));
  const reduxState = useSelector((state) => state);

  useEffect(() => {
    let totalPrice = 0;
    let totalAmount = 0;

    lines.map((group) => {
      group.subGroups?.map((subgroup) => {
        subgroup.items.map(item => {
          totalPrice += Number(item?.price?.value?.replace(/ /g, '').replace(/€/g, ''));
          totalAmount += Number(item?.amount?.value);
        });
      });
    });

    budgetData.price.value = totalPrice;
    setBudgetData({ ...budgetData, price: { ...budgetData.price, value: totalPrice }, amount: { ...budgetData.price, value: totalAmount } });
  }, [lines]);

  const [clientUser, setClientUser] = useState('');

  const [budgetData, setBudgetData] = useState({
    num: { value: '', error: '', required: true },
    name: { value: '', error: '', required: true },
    obs: { value: '', type: 'area' },
    price: { value: '', error: '' },
    client: { value: '', error: '', required: true },
    dateRequest: { value: '', error: '', required: true, type: 'date' },
    dateDelivery: { value: '', error: '', required: false, type: 'date' },
    dateAgreedDelivery: { value: '', error: '', required: true, type: 'date' },
    dateDeliveryProject: { value: '', error: '', required: false, type: 'date' },
    streetAddress: { value: '', error: '', required: true },
    postalCode: { value: '', error: '', required: true },
    addressLocality: { value: '', error: '', required: true },
    addressRegion: { value: '', error: '', required: false },
    addressCountry: { value: '', error: '', required: true },
  });

  const [inputFields, setInputFields] = useState([{
    category: { value: '', error: '' },
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

      data.postalCode = { error: '', value: client?.delivery_address?.postalCode };
      data.streetAddress = { error: '', value: client?.delivery_address?.streetAddress || '' };
      data.addressLocality = { error: '', value: client?.delivery_address?.addressLocality };
      data.addressRegion = { error: '', value: client?.delivery_address?.addressRegion };
      data.addressCountry = { error: '', value: client?.delivery_address?.addressCountry };
    }

    data[props.name].value = props.value;
    setBudgetData(data);
  }

  function ValidateLines () {
    const obj = [...lines];
    let hasErrors = false;

    //  if there are 0 items in the 1st group, return true = errors
    if (obj[0]?.subGroups?.length === 0 || typeof obj[0]?.subGroups === 'undefined') return true;

    obj.map((group) => {
      console.log(group);

      group.subGroups.map((subgroup) => {
        subgroup.items.map((item) => {
          Object.entries(item).forEach(([, value]) => {
            if (typeof value === 'object' && 'error' in value && (value.value === '' || value.value === '0') && value.required) {
              value.error = 'Campo obrigatorio';
              hasErrors = true;
            } else value.error = '';
          });
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
      });

      return field;
    });

    if (ValidateLines()) hasErrors = true;

    if (hasErrors) {
      toast.error('Prencha todos os campos.');
      setBudgetData(data);

      return !hasErrors;
    }

    setDialogOpen(true);
  }

  async function CreateOrder () {
    setProcessing(true);

    const data = {
      id: `urn:ngsi-ld:Budget:${formatString(budgetData.name.value)}${moment().diff(moment().startOf('day'), 'seconds')}`,
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
        value: budgetData.amount.value
      },
      price: {
        type: 'Property',
        value: String(budgetData.price.value)
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
      },
      status: {
        type: 'Property',
        value: inputFields[0]?.category.value && inputFields[0]?.amount.value && budgetData.price.value && budgetData.dateDelivery.value && budgetData.dateDeliveryProject.value ? 'waiting adjudication' : 'needs analysis'
      },
      orderBy: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:Owner:' + budgetData.client.value
      },
      approvedBy: {
        type: 'Relationship',
        object: 'urn:ngsi-ld:Worker:' + reduxState.auth.me.id
      },
      belongsTo: {
        type: 'Relationship',
        object: `urn:ngsi-ld:Project:${formatString(budgetData.name.value)}`
      },
      dateDelivery: {
        type: 'Property',
        value: budgetData.dateDelivery?.value !== '' ? moment(budgetData.dateDelivery.value).format('DD/MM/YYYY') : ''
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

    await newBudget(data).then(async (res) => {
      CreateFurnitures(res.data.id);

      await newFolder({
        folder_name: `urn:ngsi-ld:Folder:${data.id.replace('urn:ngsi-ld:Budget:', '')}`,
        parent_folder: null,
        user: clientUser,
        budget: `urn:ngsi-ld:Budget:${data.id.replace('urn:ngsi-ld:Budget:', '')}`
      });

      toast.success('Projeto Criado!');
    }).catch(() => toast.error('Algo aconteceu. Por favor tente mais tarde!'));

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
    message: 'Projeto criado com sucesso, que deseja fazer agora?',
    icon: 'Verified',
    iconType: 'success',
    okTxt: 'Ver projeto',
    cancelTxt: 'Criar novo projeto',
  };

  async function CreateFurnitures (budgetId) {
    const items = lines.map(group => {
      const items = [{
        id: 'urn:ngsi-ld:Furniture:' + formatString(budgetData.name.value) + group.id,
        furnitureType: { type: 'Property', value: 'group' },
        name: { type: 'Property', value: group.name },
        hasBudget: { value: budgetId, type: 'Property' },
        type: 'Furniture'
      }];

      delete items[0].subGroups;

      const lines = group.subGroups?.map(subgroup => {
        //  Aqui tenho cada subgrupo com os items dentro

        const items = [{
          id: 'urn:ngsi-ld:Furniture:' + formatString(budgetData.name.value) + '_' + group.id + '_' + subgroup.id,
          furnitureType: { type: 'Property', value: 'subGroup' },
          name: { type: 'Property', value: subgroup.name },
          hasBudget: { value: budgetId, type: 'Property' },
          type: 'Furniture'
        }];

        delete items[0].items;

        const items2 = subgroup.items.map((item) => {
          const valuesOnly = {};

          Object.keys(item).map(key => {
            valuesOnly[key] = {
              type: 'Property',
              value: item[key].value
            };
          });

          valuesOnly.id = 'urn:ngsi-ld:Furniture:' + formatString(budgetData.name.value) + '_' + group.id + '_' + subgroup.id + '_' + formatString(item.name.value);
          valuesOnly.type = 'Furniture';
          valuesOnly.subGroup = { value: subgroup.name, type: 'Property' };
          valuesOnly.group = { value: group.name, type: 'Property' };
          valuesOnly.hasBudget = { value: budgetId, type: 'Property' };
          valuesOnly.produced = { value: false, type: 'Property' };
          valuesOnly.assembled = { value: false, type: 'Property' };

          return valuesOnly;
        });

        return items.concat(...items2);
      });

      return items.concat(...lines);
    });

    const mergedArray = [].concat(...items).map((item, index) => {
      return { ...item, lineNumber: index };
    });

    try {
      mergedArray.map(async (item) => {
        await newFurniture(item).then((result) => console.log(result));
      });
    } catch (err) {
      console.log(err);
    }
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
          message={'Está prestes a criar um projeto, tem certeza que quer continuar?'}
          icon='AlertOctagon'
        />
        {processing && <Loader center={true} backdrop />}
        {/* What do do after Create Modal */}
        <ConfirmDialog {...successModalProps} />
        <Content>
          <Grid container md={12} sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
            <Grid container md={10} sm={10} xs={12}>
              <Typography variant='titlexxl'>{breadcrumbsPath[1]?.title}</Typography>
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
          {false && <Grid container md={12}>
            <Content>
              <ClientTab {...props}
                client={budgetData.client}
                onClientChange={onBudgetChange}
                setClientUser={setClientUser}
                onProcessing={setProcessing}
                noDetail
              />
            </Content>
          </Grid>}
          <Grid container md={12}>
            <Content>
              <RequestTab {...props}
                onProcessing={setProcessing}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                setClientUser={setClientUser}
                onClientChange={onBudgetChange}

              />
            </Content>
          </Grid>
          <Grid container md={12}>
            <Content>
              <ProductLinesTab2 {...props}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                docs={{ uploadedFiles, setUploadedFiles }}
                inputFields={inputFields}
                setInputFields={setInputFields}
                noDrop
                lines={lines}
                setLines={setLines}

              />
            </Content>
          </Grid>
          {false && <Grid container md={12} >
            <Content>
              <ProductLinesTab {...props}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                docs={{ uploadedFiles, setUploadedFiles }}
                inputFields={inputFields}
                setInputFields={setInputFields}
                noDrop
                lines={lines}
                setLines={setLines}

              />
            </Content>
          </Grid>}
          <Grid container md={12}>
            <Content>
              <ObservationsTab {...props}
                budgetData={budgetData}
                onBudgetChange={onBudgetChange}
                docs={{ uploadedFiles, setUploadedFiles }}
                inputFields={inputFields}
                setInputFields={setInputFields}
                noDrop
                lines={lines}
                setLines={setLines}
              />
            </Content>
          </Grid>
        </Grid>
      </Grid >

    </>
  );
};

export default NewOrder;
