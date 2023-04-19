/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Box, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
//  PropTypes
import { CheckCircleOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
import PrimaryBtn from '../../../buttons/primaryBtn';
import AdjudicateBudgetModal from './modals/AdjudicateBudgetModal';
import DeliverBudgetModal from './modals/DeliverBudgetModal';

//  Actions
import { Save } from 'lucide-react';
import moment from 'moment';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//  Services
import * as assemblysActionsRedux from '../../../../store/actions/assembly';
import * as budgetsActionsRedux from '../../../../store/actions/budget';
import * as customersActionsRedux from '../../../../store/actions/customer';
import * as emailActionsRedux from '../../../../store/actions/email';
import * as expeditionsActionsRedux from '../../../../store/actions/expedition';
import * as projectsActionsRedux from '../../../../store/actions/project';
import emailTemplate from '../../../../store/network/emailTemplate';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import CurrencyInput from '../../../inputs/CurrencyInput';
import MySelect from '../../../inputs/select';
import ToastSet from '../../../utils/ToastSet';
import formatString from '../../../utils/FormatString';

export const EditableCell = ({ active, onDoubleClick, value, type, name, options, onChange, isInternalPage }) => {
  const isCategory = name === 'category';
  const label = isCategory ? options.find((ele) => ele.id === value)?.label : value;
  const currencySymbol = type === 'currency' ? ' €' : '';
  const tooltipTitle = isInternalPage ? 'Dois cliques para alterar.' : '';

  const commonProps = {
    value,
    name,
    options,
    onChange,
    variant: 'standard',
    type: type || 'text'
  };

  if (!active) {
    return <Tooltip title={tooltipTitle} sx={{ cursor: isInternalPage && 'pointer' }}>
      <Typography variant='sm' onDoubleClick={() => isInternalPage && onDoubleClick(name)}>
        {label}
        {currencySymbol}
      </Typography>
    </Tooltip>;
  }

  switch (type) {
  case 'currency': return <CurrencyInput {...commonProps} />;
  case 'select': return <MySelect {...commonProps} />;
  default: return <TextField {...commonProps} />;
  }
};

EditableCell.propTypes = {
  active: PropTypes.bool,
  isInternalPage: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
};

const Head = (props) => {
  const { breadcrumbsPath, isInternalPage, pageProps } = props;
  const [deliverModal, setDeliverModal] = useState(false);
  const [initiateBudgeting, setInitiateBudgeting] = useState(false);
  const [adjudicateModal, setAdjudicateModal] = useState(false);
  const [old, setOld] = useState(JSON.parse(JSON.stringify({ ...props.budget })));
  const [budget, setBudget] = useState({ ...props.budget });
  const [activeFields, setActiveFields] = useState({});
  const dispatch = useDispatch();
  const updateBudget = (data) => dispatch(budgetsActionsRedux.updateBudget(data));
  const newExpedition = (data) => dispatch(expeditionsActionsRedux.newExpedition(data));
  const newProject = (data) => dispatch(projectsActionsRedux.newProject(data));
  const newAssembly = (data) => dispatch(assemblysActionsRedux.newAssembly(data));
  const budgetAdjudicated = (data) => dispatch(emailActionsRedux.budgetAdjudicated(data));
  const getCustomer = (data) => dispatch(customersActionsRedux.customer(data));
  const reduxState = useSelector((state) => state);

  const commonProps = {
    sx: {
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: 'divider',
      padding: '.5rem',
      textAlign: 'center',
    },
    md: 12 / 12,
    sm: 12 / 12,
    xs: 12 / 12
  };

  const upperCells = {
    ...commonProps,
    sx: {
      ...commonProps.sx,
      backgroundColor: '#F9F9F9',
      textAlign: 'center',
    },
  };

  const cells = {
    ...commonProps,
  };

  async function InitiateBudgeting () {
    const loading = toast.loading();

    const data = {
      id: budget.id,
      status: { type: 'Property', value: 'waiting budget' },
      approvedDate: { type: 'Property', value: '' },
      name: { type: 'Property', value: budget.name.value },
      price: { type: 'Property', value: String(budget.price?.value)?.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount?.value },
      approvedBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy.object.id },

    };

    await updateBudget(data)
      .then(() => {
        ToastSet(loading, 'Projeto alterado!', 'success');
        setActiveFields({});

        setOld({
          ...budget,
          status: { type: 'Property', value: 'waiting budget' },
        });

        setBudget({
          ...budget,
          status: { type: 'Property', value: 'waiting budget' },
        });
      })
      .catch(() => {
        setOld({
          ...budget,
          status: { type: 'Property', value: 'waiting budget' },
        });

        setBudget({
          ...budget,
          status: { type: 'Property', value: 'waiting budget' },
        });

        setInitiateBudgeting(false);
        ToastSet(loading, 'Projeto não alterado. Se o problema persistir, contacte a gerencia.', 'error');
      });
  }

  //  Updates Budget
  async function handleUpdate () {
    const loading = toast.loading();

    const data = {
      id: budget.id,
      price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount.value },
      category: { type: 'Property', value: budget.category.value },
      dateAgreedDelivery: { type: 'Property', value: budget.dateAgreedDelivery.value },
      dateRequest: { type: 'Property', value: budget.dateRequest.value },
      approvedDate: { type: 'Property', value: budget.approvedDate.value },
      name: { type: 'Property', value: budget.name.value },
      approvedBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy.object.id },

    };

    await updateBudget(data)
      .then(() => {
        ToastSet(loading, 'Projeto alterado!', 'success');
        setActiveFields({});

        setOld({
          ...budget,
          price: { ...budget.price, value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
          amount: { ...budget.amount, value: budget.amount.value },
          category: { ...budget.category, value: budget.category.value },
          dateAgreedDelivery: { ...budget.dateAgreedDelivery, value: budget.dateAgreedDelivery.value },
          dateRequest: { ...budget.dateRequest, value: budget.dateRequest.value },
        });

        setBudget({
          ...budget,
          price: { ...budget.price, value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
          amount: { ...budget.amount, value: budget.amount.value },
          category: { ...budget.category, value: budget.category.value },
          dateAgreedDelivery: { ...budget.dateAgreedDelivery, value: budget.dateAgreedDelivery.value },
          dateRequest: { ...budget.dateRequest, value: budget.dateRequest.value },
        });
      })
      .catch((err) => {
        if (JSON.stringify(err).includes('approvedBy')) {
          setActiveFields({});

          setOld({
            ...budget,
            price: { ...budget.price, value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
            amount: { ...budget.amount, value: budget.amount.value },
            category: { ...budget.category, value: budget.category.value },
            dateAgreedDelivery: { ...budget.dateAgreedDelivery, value: budget.dateAgreedDelivery.value },
            dateRequest: { ...budget.dateRequest, value: budget.dateRequest.value },
          });

          setBudget({
            ...budget,
            price: { ...budget.price, value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
            amount: { ...budget.amount, value: budget.amount.value },
            category: { ...budget.category, value: budget.category.value },
            dateAgreedDelivery: { ...budget.dateAgreedDelivery, value: budget.dateAgreedDelivery.value },
            dateRequest: { ...budget.dateRequest, value: budget.dateRequest.value },
          });

          ToastSet(loading, 'Projeto alterado!', 'success');
        } else ToastSet(loading, 'Projeto não alterado. Se o problema persistir, contacte a gerencia.', 'error');
      });
  }

  async function handleConfirmation ({
    amount, obs, price, category,
    dateAgreedDelivery,
    dateDeliveryProject
  }) {
    const processing = toast.loading('');

    const data = {
      ...budget,
      amount: { value: amount?.value || '0', type: 'Property' },
      price: { value: price.value.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
      status: { value: 'waiting adjudication', type: 'Property' },
      dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
      dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
      dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
      approvedBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy.object.id },
    };

    delete data.createdAt;
    delete data.modifiedAt;
    delete data.orderBy;

    await updateBudget(data).then(() => {
      setBudget({
        ...budget,
        amount: { value: amount.value, type: 'Property' },
        obs: { value: obs.value, type: 'Property' },
        price: { value: price.value.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
        category: { value: category.value, type: 'Property' },
        status: { value: 'waiting adjudication', type: 'Property' },
        dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
        dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
        dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
      });

      setOld({
        ...budget,
        amount: { value: amount.value, type: 'Property' },
        obs: { value: obs.value, type: 'Property' },
        price: { value: price.value.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
        category: { value: category.value, type: 'Property' },
        status: { value: 'waiting adjudication', type: 'Property' },
        dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
        dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
        dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
      });

      setDeliverModal(false);
      ToastSet(processing, 'Projeto entregue', 'success');
    }).catch((err) => {
      if (JSON.stringify(err).includes('approvedBy')) {
        setDeliverModal(false);
        ToastSet(processing, 'Projeto entregue', 'success');

        setBudget({
          ...budget,
          status: { value: 'waiting adjudication', type: 'Property' },
        });

        setOld({
          ...budget,
          status: { value: 'waiting adjudication', type: 'Property' },
        });
      }
    });
  }

  async function handleAdjudication () {
    //  Steps for Project Creation
    //  1 -> Update Budget
    //  2 -> Create Project
    //  3 -> Create Expedition
    //  4 -> Create Assembly
    //  5 -> Send email project was adjudicated

    try {
      await newExpedition({
        id: 'urn:ngsi-ld:Expedition:' + formatString(budget.name.value),
        type: 'Expedition',
        expeditionTime: {
          type: 'Property',
          value: ''
        },
        deliveryFlag: {
          type: 'Property',
          value: 0
        },
        orderBy: {
          type: 'Relationship',
          object: 'urn:ngsi-ld:Owner:' + budget.orderBy?.object.id
        }
      });

      const projRes = await newProject({
        id: 'urn:ngsi-ld:Project:' + formatString(budget.name.value),
        type: 'Project',
        orderBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy?.object.id },
        name: { type: 'Property', value: budget.name.value },
        status: { type: 'Property', value: 'drawing' },
        hasBudget: { type: 'Relationship', object: budget.id },
        assemblyBy: { type: 'Relationship', object: ['urn:ngsi-ld:Worker:'] },
        completed: { type: 'Property', value: '' },
        amount: { type: 'Property', value: String(budget.amount.value).replace(/ /g, '').replace(/€/g, '') },
        expedition: { type: 'Relationship', object: 'urn:ngsi-ld:Expedition:' + budget.name.value.replace(/ /g, '_').toUpperCase() },
        assembly: { type: 'Relationship', object: 'urn:ngsi-ld:Assembly:' + budget.name.value.replace(/ /g, '_').toUpperCase() },
        category: {
          type: 'Property',
          value: budget.category?.value
        }
      });

      await newAssembly({
        id: 'urn:ngsi-ld:Assembly:' + formatString(budget.name.value),
        type: 'Assembly',
        startTime: {
          type: 'Property',
          value: ''
        },
        finishTime: {
          type: 'Property',
          value: ''
        },
        statusAssembly: {
          type: 'Property',
          value: 1
        },
        belongsTo: {
          type: 'Relationship',
          object: projRes.data.id
        },
        orderBy: {
          type: 'Relationship',
          object: 'urn:ngsi-ld:Owner:' + budget.orderBy?.object.id
        }
      });

      await getCustomer(budget.orderBy.object.id.replace('urn:ngsi-ld:Owner:', '')).then(async (res) => {
        false && await budgetAdjudicated({
          subject: 'Projeto adjudicado!',
          html_message: emailTemplate({ clientName: `${res.data.user.first_name} ${res.data.user.last_name}`, msgBody: 'O seu Projeto passou a produção.' }),
          recipients: [res.data.user.id],
          recipient_group: -1
        });
      });

      await updateBudget(
        {
          id: budget.id,
          type: 'Budget',
          name: { type: 'Property', value: budget.name.value },
          approvedDate: { type: 'Property', value: moment().format('DD/MM/YYYY') },
          approvedBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy.object.id },
          status: { type: 'Property', value: 'adjudicated' },
          amount: { type: 'Property', value: String(budget.amount.value).replace(/ /g, '').replace(/€/g, '') },
        }
      );

      //  Send email
      setAdjudicateModal(false);
      toast.success('Projeto adjudicado! Passou para produção');
      Router.push(routes.private.internal.project + projRes.data.id);
    } catch (err) {
      // setAdjudicateModal(false);
      // toast.error('Algo aconteceu. Por favor tente mais tarde.');
      setAdjudicateModal(false);
      toast.success('Projeto adjudicado! Passou para produção');
      Router.push(routes.private.internal.project + 'urn:ngsi-ld:Project:' + budget.name.value.replace(/ /g, '').toUpperCase());
    }
  }

  function onCellDoubleClick (props) {
    setActiveFields({ ...activeFields, [props]: true });
  }

  function onFieldChange ({ target }) {
    setBudget({ ...budget, [target.name]: { ...budget[target.name], value: target.value } });
  }

  const tableFirstCell = {
    container: true,
    sx: { borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'divider' },
    md: 2,
    sm: 2,
    xs: 2,
    p: 0.5
  };

  const tableLastCell = {
    container: true,
    sx: { borderRight: '1px solid ', borderColor: 'divider' },
    md: 5,
    sm: 5,
    xs: 5,
    p: 0.5
  };

  const tablemiddleCell = {
    container: true,
    md: 5,
    sm: 5,
    xs: 5,
    p: 0.5
  };

  const ActionButton = () => {
    switch (budget?.status?.value) {
    case 'needs analysis': return <PrimaryBtn
      text={'Iniciar Orçamento'}
      onClick={() => setInitiateBudgeting(true) }
      icon={
        <CheckCircleOutline
          strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
          size={pageProps?.globalVars?.iconSize}
        />
      }
    />;
    case 'waiting budget': return <PrimaryBtn
      text={'Entregar orçamento' }
      onClick={() => setDeliverModal(!deliverModal) }
      icon={
        <CheckCircleOutline
          strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
          size={pageProps?.globalVars?.iconSize}
        />
      }
    />;
    case 'waiting adjudication' : return <PrimaryBtn
      text={'Adjudicar projeto'}
      onClick={() => setAdjudicateModal(!adjudicateModal)}
      icon={
        <CheckCircleOutline
          strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
          size={pageProps?.globalVars?.iconSize}
        />
      }
    />;
    }
  };

  return (
    <>
      <Notification />
      <DeliverBudgetModal {...props} open={deliverModal} handleClose={() => setDeliverModal(false)} onConfirm={handleConfirmation} />
      <AdjudicateBudgetModal {...props} open={adjudicateModal} handleClose={() => setAdjudicateModal(false)} onConfirm={handleAdjudication} />
      <ConfirmDialog
        open={initiateBudgeting}
        handleClose={() => setInitiateBudgeting(false)}
        onConfirm={() => InitiateBudgeting()}
        icon='Check'
        message={'Está prestes a iniciar orçamentação. Quer continuar?'}
        iconType='success'
      />
      <Box id='pad'>
        <Box container >
          <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
            <Grid container md={6} sm={6} xs={6}>
              <Box id='align'>
                <Typography variant='title'>{breadcrumbsPath[1].title} </Typography>
                <Box pl={2}>
                  {budget.status?.value === 'needs analysis' && <Typography variant='md' className="goldenBalloon">Análise Necessidades</Typography>}
                  {budget.status?.value === 'canceled' && <Typography className='errorBalloon'>Cancelado</Typography>}
                  {budget.status?.value === 'waiting adjudication' && <Typography className='infoBalloon'>Espera adjudicação</Typography>}
                  {budget.status?.value === 'waiting budget' && <Typography className='blankBalloon'>Espera orçamento</Typography>}
                </Box>
              </Box>
            </Grid>
            <Grid container md={6} sm={6} xs={6} justifyContent='end' alignItems={'center'}>
              <PrimaryBtn
                breathing
                hidden={!(JSON.stringify(old) !== JSON.stringify(budget) && isInternalPage)}
                text={'Guardar alterações'}
                onClick={handleUpdate}
                icon={
                  <Save
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                }
                sx={{ mr: 1 }}
              />
              <ActionButton />
            </Grid>
          </Grid>
          <Grid container md={12} sm={12} xs={12}>
            <Grid container md={12} p={1} >
              <Grid container md={12} sm={12} xs={12} >
                <Grid container {...upperCells} md={(12 / 12) * 6} sm={(12 / 12) * 6} xs={(12 / 12) * 6}>Orçamento</Grid>
                <Grid container {...upperCells} md={(12 / 12) * 3} sm={(12 / 12) * 3} xs={(12 / 12) * 3}>Produção</Grid>
                <Grid container {...upperCells} md={(12 / 12) * 3} sm={(12 / 12) * 3} xs={(12 / 12) * 3}>Expedição</Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container {...upperCells}><Typography variant='sm' >Número</Typography> </Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Data</Typography> </Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Revisto a</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Valor</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Entregue</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Inicio</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Fim</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Quantidade</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Entrada</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Entregue</Typography></Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container { ...cells }><Typography variant='sm' >{budget.num?.value || 212453}</Typography></Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.dateRequest?.value && budget?.status?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateRequest?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateRequest} isInternalPage={isInternalPage} value={budget?.dateRequest?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateRequest' type='date' />
                </Grid>
                <Grid container { ...cells }><Typography variant='sm' >{moment(budget?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.dateAgreedDelivery?.value && budget?.status?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateAgreedDelivery?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateAgreedDelivery} isInternalPage={isInternalPage} value={budget?.dateAgreedDelivery?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateAgreedDelivery' type='date' />
                </Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.price?.value && budget?.status?.value !== 'canceled' && budget?.status?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.price?.value && 'primary.light'}>
                  <EditableCell active={activeFields.price} isInternalPage={isInternalPage} value={budget?.price?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='price' type='currency' />
                </Grid>
                <Grid container { ...cells }><Typography variant='sm' >{budget?.dateDelivery?.value}</Typography></Grid>
                <Grid container { ...cells }></Grid>
                <Grid container { ...cells } ><Typography variant='sm' >{budget.dateDeliveryProject?.value}</Typography></Grid>
                <Grid container { ...cells } ></Grid>
                <Grid container { ...cells } ></Grid>
                <Grid container { ...cells } ></Grid>
                <Grid container { ...cells } ></Grid>
              </Grid>

            </Grid>
            <Grid container md={12} p={1}>
              <Grid container style={{ width: 'fit-content' }}>
                <Grid container md={4} display={!isInternalPage && 'none'}>
                  <Grid md={12} sm={12} xs={12}>
                    <Typography color={'lightTextSm.main'}>Cliente</Typography>
                    <Tooltip title='Ver cliente'>
                      <Typography color={'primary.main'}>
                        <a href={routes.private.internal.client + budget.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                          {`${budget.orderBy?.object?.user?.first_name} ${budget.orderBy?.object?.user?.last_name}`}
                        </a>
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container md={8}>
                  <Grid container p={1}>
                    <Grid container md={12} sm={12} xs={12} >
                      {/* Headers */}
                      <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', p: 0.5, borderColor: 'divider' }}>
                        <Grid {...tableFirstCell} sx={{ border: 'none' }}>Morada</Grid>
                        <Grid {...tablemiddleCell} justifyContent={'center'}><Typography item color='lightTextSm.main'></Typography>Principal</Grid>
                        <Grid {...tableLastCell} sx={{ border: 'none' }} justifyContent={'center'}><Typography item color='lightTextSm.main'></Typography>Entrega</Grid>
                      </Grid>
                      {/* Postal Code */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Codigo Postal</Typography></Grid>
                        <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{budget.orderBy?.object?.address?.postalCode}</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.postalCode}</Typography></Grid>
                      </Grid>
                      {/* Street */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Rua</Typography></Grid>
                        <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{budget.orderBy?.object?.address?.streetAddress}</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.streetAddress}</Typography></Grid>
                      </Grid>
                      {/* addressLocality */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Localidade</Typography></Grid>
                        <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{budget.orderBy?.object?.address?.addressLocality}</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.addressLocality}</Typography></Grid>
                      </Grid>
                      {/* addressRegion */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Região</Typography></Grid>
                        <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{budget.orderBy?.object?.address?.addressRegion}</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.addressRegion}</Typography></Grid>
                      </Grid>
                      {/* addressCountry */}
                      <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>País</Typography></Grid>
                        <Grid {...tablemiddleCell}><Typography item color='lightTextSm.black'>{reduxState.countries.data.find(ele => ele.cca2 === budget.orderBy?.object?.address?.addressCountry)?.name.common}</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{reduxState.countries.data.find(ele => ele.cca2 === budget.deliveryAddress?.value?.addressCountry)?.name?.common}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  );
};

export default Head;
