/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
//  Nodes
import Router from 'next/router';
import React, { useCallback, useState } from 'react';

//  Material Ui
import {
  Box, ButtonGroup, Grid, Step, StepLabel, Stepper, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'styled-components';

//  Icons
import { ArrowLeft, ArrowRight, Save, X } from 'lucide-react';

//  Stepper pages
import SwipeableViews from 'react-swipeable-views';



//  Actions
import * as BudgetActions from '../../../pages/api/actions/budget';
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
import { isMobile } from 'react-device-detect';
import TabPanel from '../../tapPanel/TabPanel';
import BudgetTab from './Tabs/budgetTab';
import ClientTab from './Tabs/clientTab';
import FinalizeTab from './Tabs/finalizeTab';


const NewOrder = ({ ...props }) => {
  const { breadcrumbsPath, pageProps, budgets } = props;

  const [client, setClient] = useState({
    value: " ",
    error: ''
  });

  const [obs, setObs] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [uploadedFiles, setUploadedFiles] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [budgetTabIndex, setBudgetTabIndex] = useState(0);
  const theme = useTheme();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: false });

  const [newBudgetData, setNewBudgetData] = useState({
    name: {value: '', error: '' },
    amount: { value: '',error: '' },
    category: {value: '',error: ''}
  });

  const [chosenBudget, setChosenBudget] = useState({
    id: {value: '', error: '' },
    amount: {value: '', error: '' },
    category: {value: '', error: '' }
  });

  const [budget, setBudget] = useState();

  const [inputFields, setInputFields] = useState([
    { prod: '', amount: 1, errorProd: '', files: [] }
  ]);

  //  New Order Steps
  const steps = [ 'Cliente', 'Orçamento', 'Finalizar'];

  function onTabChange(props) {
    setBudgetTabIndex(props);
  }

  function onClientChange (props) {
    const data = {...client};

    data.value = props;
    data.error = '';
    setClient(data);
  }

  function onBudgetChange (props) {
      const data = {...chosenBudget};

      data[props.name].value = props.value;
      data[props.name].error = '';

      if (props.name === 'id') {
        data.amount.value = budgets.find(ele => ele.id === props.value)?.amount?.value  || '';
        data.amount.error =  '';
        data.category.value = budgets.find(ele => ele.id === props.value)?.category?.value || '';
        data.category.error =  '';
      }

      setChosenBudget(data);
  }

  function onNewBudgetChange (props) {
    const data = {...newBudgetData};

    data[props.name].value = props.value;
    data[props.name].error = '';
    setNewBudgetData(data);
  }

  function ValidateData() {
    let hasErrors = false;

    switch (activeStep) {
      case 0:
        if (client.value === ' ') {
          const data = {...client};
    
          data.error = 'Campo Obrigatório';
          setClient(data);
          hasErrors = true;
        }

        break;
        
      case 1: {
        if (budgetTabIndex === 0)
        {
          const data = {...chosenBudget};

          if (chosenBudget.id.value === '')
          {
            data.id.error = 'Campo Obrigatório';
            hasErrors = true;
          }
  
          if (chosenBudget.amount.value === '')
          {
            data.amount.error = 'Campo Obrigatório';
            hasErrors = true;
          }

          if (chosenBudget.category.value === '')
          {
            data.category.error = 'Campo Obrigatório';
            hasErrors = true;
          }

          setChosenBudget(data);
        } else {
          const data = {...newBudgetData};

          if (newBudgetData.name.value === '')
          {
            data.name.error = 'Campo Obrigatório';
            hasErrors = true;
          }

          if (newBudgetData.amount.value === '')
          {
            data.amount.error = 'Campo Obrigatório';
            hasErrors = true;
          }

          if (newBudgetData.category.value === '')
          {
            data.category.error = 'Campo Obrigatório';
            hasErrors = true;
          }

          setNewBudgetData(data);
        }

        //  Build final Budget based on index
        !hasErrors && setBudget(budgetTabIndex === 0 ? 
          {id: chosenBudget.id.value,amount: chosenBudget.amount.value, category: chosenBudget.category.value}
          : 
          {name: newBudgetData.name.value,amount: newBudgetData.amount.value, category: newBudgetData.category.value}
          );

        break;
      }
    //  No need for default
    }

    if (hasErrors) {
      toast.error('Prencha todos os campos.');

      return !hasErrors;
    }
    else if (activeStep === steps.length - 1) setDialogOpen(true);
    else return !hasErrors;
  }

  async function CreateOrder() {
    setProcessing(true);

    if (false)
    {
  
      // try {
      //   await OrdersActions.saveOrder(builtOrder).then((response) => {
      //     inputFields.map(async (input) => {
      //       const buildOrderDetail = {
      //         productId: input.prod,
      //         orderId: response.data.payload.id,
      //         status: 'not started',
      //         amount: input.amount,
      //         completed: 0,
      //       };
  
      //       await OrdersActions.saveOrderDetails(buildOrderDetail);
      //     });
  
      //     setNewestOrder(response.data.payload);
      //     setSuccessOpen(true);
  
      //   });
      // } catch (err) {
      //   toast.error('Algo Aconteceu');
      // }
  


    } else {
      const built = {
       id: budget.id || `urn:ngsi-ld:Budget:${budget.name.replace(' ', '_').toUpperCase()}`,
        type: "Budget",
        name: {
            "type": "Property",
            value: budget.id || budget.name
        },
        amount: {
            "type": "Property",
            value: budget.amount
        },
        aprovedDate: {
            "type": "Property",
            value: ""
        },
        image: {
            type: "Property",
            value: "urn:ngsi-ld:Image:Budget:MC_MUEBLETV_A"
        },
        category: {
            type: "Property",
            value: budget.category || ''
        },
        belongsTo: {
            "type": "Relationship",
            object: client.value
        },
        "@context": [
            "https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld",
            "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
        ]
    };

    await BudgetActions.saveBudget(built).then((res) => console.log(res));
    }

    setProcessing(false);
    setDialogOpen(false);
  }
  
  function ClearAll() {
    setSuccessOpen(false);
    setClient();
    setStartAt(Date.now());
    setEndAt(Date.now());
    setObs(" ");
    setInputFields([{ prod: '', amount: 1, errorProd: '', files: [] }]);
  }

  const handleNextStep = () => {
    ValidateData() && setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (index) => {
    setActiveStep(index);
  };

  const successModalProps = {
    open: successOpen,
    'handleClose': ClearAll,
    message:`Encomenda Criada com sucesso, que deseja fazer agora?`,
    icon:'Verified',
    iconType:'success',
    okTxt:'Ver Encomenda',
    cancelTxt:'Criar nova Encomenda',
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
        message={`Está prestes a criar uma encomenda, tem certeza que quer continuar?`}
        icon='AlertOctagon'
      />
      {processing && <Loader center={true} backdrop />}
      {/* What do do after Create Modal */}
      <ConfirmDialog  
        {...successModalProps}
        // onConfirm={() => Router.push({
        //   pathname: routes.private.internal.orders,
        //   query: { order: newestOrder.id }
        // })}
      />
      <Content>
        <Grid container md={12} sx={{ p: '24px', display: 'flex', alignItems: 'center' }}>
          <Grid container md={3}>
            <Typography item className='headerTitleXl'>{breadcrumbsPath[1].title}</Typography>
          </Grid >
          <Grid container md={6} className='fullCenter'>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : 'horizontal'}>
                {steps.map((label) => 
                (<Step key={label} >
                    <StepLabel>{label}</StepLabel>
                  </Step>) )}
              </Stepper>
            </Box>
          </Grid>
          <Grid container md={3}>
            <Box sx={{ marginLeft: 'auto' }}>
              <ButtonGroup>
                <PrimaryBtn
                  onClick={() => handleBackStep()}
                  disabled={activeStep === 0}
                  text={'Anterior'}
                  icon={ <ArrowLeft size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
                />
                <PrimaryBtn
                  text='Cancelar'
                  icon={<X size={pageProps.globalVars.iconSize} strokeWidth={pageProps.globalVars.iconStrokeWidth} />}
                  light
                  onClick={() => Router.back()}
                />
                <PrimaryBtn
                  onClick={() => activeStep === steps.length - 1 ? ValidateData() : handleNextStep()}
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
          {/* Carrousel Component */}
          <SwipeableViews
            axis={theme?.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
          >
            {/* Cliente Tab */}
            <TabPanel value={activeStep} index={0}>
              <ClientTab {...props} 
                client={client}
                onClientChange={onClientChange}
                startAt={startAt}
                onStartAtChange={setStartAt}
                endAt={endAt}
                onEndAtChange={setEndAt}
                obs={obs}
                onObsChange={setObs}
                onProcessing={setProcessing}
              />
            </TabPanel>
            {/* Budget Tab */}
            <TabPanel value={activeStep} index={1}>
              <BudgetTab {...props}
                dragDrop={{getRootProps, getInputProps, isDragActive}}
                newBudgetData={newBudgetData}
                chosenBudget={chosenBudget}
                onBudgetChange={onBudgetChange}
                onNewBudgetChange={onNewBudgetChange}
                docs={{uploadedFiles, setUploadedFiles }}
                currentTab={budgetTabIndex}
                onTabChange={onTabChange}
              />
            </TabPanel>
            {/* Finalize Tab */}
            <TabPanel value={activeStep} index={2}>
              <FinalizeTab 
                {...props}
                inputFields={inputFields}
                client={client}
                budget={budget}
              />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Content>
    </Grid >
  );
};

export default NewOrder;
