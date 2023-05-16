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
import * as expeditionsActionsRedux from '../../../../store/actions/expedition';
import * as projectsActionsRedux from '../../../../store/actions/project';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import Notification from '../../../dialogs/Notification';
import CurrencyInput from '../../../inputs/CurrencyInput';
import MySelect from '../../../inputs/select';
import formatString from '../../../utils/FormatString';
import ToastSet from '../../../utils/ToastSet';

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
  const { isInternalPage, pageProps } = props;
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
      budgetStatus: { type: 'Property', value: 'waiting budget' },
    };

    await updateBudget({ id: budget.id, data })
      .then(() => {
        setInitiateBudgeting(false);
        ToastSet(loading, 'Projeto alterado!', 'success');
        setActiveFields({});

        setOld({
          ...budget,
          budgetStatus: { type: 'Property', value: 'waiting budget' },
        });

        setBudget({
          ...budget,
          budgetStatus: { type: 'Property', value: 'waiting budget' },
        });
      })
      .catch(() => {
        setInitiateBudgeting(false);
        ToastSet(loading, 'Projeto não alterado. Se o problema persistir, contacte a gerencia.', 'error');
      });
  }

  //  Updates Budget
  async function handleUpdate () {
    const loading = toast.loading();

    const data = {
      price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount.value },
      dateAgreedDelivery: { type: 'Property', value: budget.dateAgreedDelivery.value },
      dateRequest: { type: 'Property', value: budget.dateRequest.value },
    };

    await updateBudget({ id: budget.id, data })
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
      .catch(() => {
        setActiveFields({});
        ToastSet(loading, 'Projeto não alterado. Se o problema persistir, contacte a gerencia.', 'error');
      });
  }

  async function handleConfirmation ({
    price,
    dateAgreedDelivery,
    dateDeliveryProject
  }) {
    const processing = toast.loading('');

    const data = {
      ...budget,
      price: { value: String(price?.value)?.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
      budgetStatus: { value: 'waiting adjudication', type: 'Property' },
      dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
      dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
      dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
    };

    delete data.createdAt;
    delete data.modifiedAt;
    delete data.orderBy;
    delete data.id;

    await updateBudget({ data, id: budget.id }).then(() => {
      setBudget({
        ...budget,
        price: { value: String(price?.value)?.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
        budgetStatus: { value: 'waiting adjudication', type: 'Property' },
        dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
        dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
        dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
      });

      setOld({
        ...budget,
        price: { value: String(price?.value)?.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
        budgetStatus: { value: 'waiting adjudication', type: 'Property' },
        dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
        dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
        dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
      });

      setDeliverModal(false);
      ToastSet(processing, 'Orçamento entregue', 'success');
    }).catch((err) => {
      console.log(err);
      ToastSet(processing, 'Projeto não entregue. Se o problema persistir, contacte a gerência.', 'error');
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
        produced: { type: 'Property', value: '0' },
        amount: { type: 'Property', value: String(budget.amount.value).replace(/ /g, '').replace(/€/g, '') },
        expedition: { type: 'Relationship', object: 'urn:ngsi-ld:Expedition:' + formatString(budget.name.value) },
        assembly: { type: 'Relationship', object: 'urn:ngsi-ld:Assembly:' + formatString(budget.name.value) },
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

      await updateBudget(
        {
          id: budget.id,
          data: {
            approvedDate: { type: 'Property', value: moment().format('DD/MM/YYYY') },
            approvedBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + reduxState.auth.me.id },
            budgetStatus: { type: 'Property', value: 'adjudicated' },
          }
        }
      );

      //  Send email
      setAdjudicateModal(false);
      toast.success('Projeto adjudicado! Passou para produção');
      Router.push(routes.private.internal.project + projRes.data.id);
    } catch (err) {
      setAdjudicateModal(false);
      toast.error('Algo aconteceu. Por favor tente mais tarde.');
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
    md: 3,
    sm: 3,
    xs: 3,
    p: 0.5
  };

  const tableLastCell = {
    container: true,
    sx: { borderRight: '1px solid ', borderColor: 'divider' },
    md: 9,
    sm: 9,
    xs: 9,
    p: 0.5
  };

  const ActionButton = () => {
    if (!isInternalPage) return;

    switch (budget?.budgetStatus?.value) {
    case 'needs analysis': return <PrimaryBtn
      text={'Iniciar Orçamentação'}
      onClick={() => setInitiateBudgeting(true) }
      icon={
        <CheckCircleOutline
          strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
          size={pageProps?.globalVars?.iconSize}
        />
      }
    />;
    case 'waiting budget': return <PrimaryBtn
      text={'Entregar Orçamento' }
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
              <Grid container md={12} sm={12} xs={12} display={!isInternalPage && 'none'}>
                <Typography variant="sm" color="lightTextSm.main" >
                  {'Cliente '}
                  {budget.orderBy.object?.isCompany ? 'Empresarial: ' : 'Particular: '}
                  <Tooltip title='Ver cliente'>

                    <a href={routes.private.internal.client + budget.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                      {`${budget.orderBy?.object?.user?.first_name} ${budget.orderBy?.object?.user?.last_name}`}
                    </a>
                  </Tooltip>
                </Typography>
              </Grid>
              <Box id='align'>
                <Typography variant='title'>{budget.name.value}</Typography>
                <Box pl={2} display='flex' alignItems='center'>
                  {budget.budgetStatus?.value === 'needs analysis' && <Typography variant='sm' className="goldenBalloon">Análise Necessidades</Typography>}
                  {budget.budgetStatus?.value === 'canceled' && <Typography variant='sm' className='errorBalloon'>Cancelado</Typography>}
                  {budget.budgetStatus?.value === 'waiting adjudication' && <Typography variant='sm' className='infoBalloon'>Espera adjudicação</Typography>}
                  {budget.budgetStatus?.value === 'waiting budget' && <Typography variant='sm' className='blankBalloon'>Espera orçamento</Typography>}
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
                <Grid container { ...cells } className={isInternalPage && !budget?.dateRequest?.value && budget?.budgetStatus?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateRequest?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateRequest} isInternalPage={isInternalPage} value={budget?.dateRequest?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateRequest' type='date' />
                </Grid>
                <Grid container { ...cells }><Typography variant='sm' >{moment(budget?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.dateAgreedDelivery?.value && budget?.budgetStatus?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateAgreedDelivery?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateAgreedDelivery} isInternalPage={isInternalPage} value={budget?.dateAgreedDelivery?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateAgreedDelivery' type='date' />
                </Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.price?.value && budget?.budgetStatus?.value !== 'canceled' && budget?.budgetStatus?.value !== 'canceled' && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.price?.value && 'primary.light'}>
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
                <Grid container md={4} display={'none'}>
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
                  <Grid md={12} sm={12} xs={12}>
                    <Typography color={'lightTextSm.main'}>Tipo</Typography>
                    <Typography >{budget.orderBy.object?.isCompany ? 'Empresarial' : 'Particular'}</Typography>
                  </Grid>
                </Grid>
                <Grid container md={8}>
                  <Grid container p={1}>
                    <Grid container md={12} sm={12} xs={12} >
                      {/* Headers */}
                      <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', p: 0.5, borderColor: 'divider' }}>
                        <Grid {...tableFirstCell} sx={{ border: 'none' }}>Morada</Grid>
                        <Grid {...tableLastCell} sx={{ border: 'none' }} ><Typography item color='lightTextSm.main'></Typography>Entrega</Grid>
                      </Grid>
                      {/* Postal Code */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Código Postal</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.postalCode}</Typography></Grid>
                      </Grid>
                      {/* Street */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Rua</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.streetAddress}</Typography></Grid>
                      </Grid>
                      {/* addressLocality */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Localidade</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.addressLocality}</Typography></Grid>
                      </Grid>
                      {/* addressRegion */}
                      <Grid container md={12} sm={12} xs={12}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>Região</Typography></Grid>
                        <Grid {...tableLastCell}><Typography item color='lightTextSm.black'>{budget.deliveryAddress?.value?.addressRegion}</Typography></Grid>
                      </Grid>
                      {/* addressCountry */}
                      <Grid container md={12} sm={12} xs={12} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Grid {...tableFirstCell}><Typography item color='lightTextSm.black'>País</Typography></Grid>
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
