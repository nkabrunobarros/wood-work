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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
//  Services
import * as assemblysActionsRedux from '../../../../store/actions/assembly';
import * as budgetsActionsRedux from '../../../../store/actions/budget';
import * as customersActionsRedux from '../../../../store/actions/customer';
import * as emailActionsRedux from '../../../../store/actions/email';
import * as expeditionsActionsRedux from '../../../../store/actions/expedition';
import * as projectsActionsRedux from '../../../../store/actions/project';
import emailTemplate from '../../../../store/network/emailTemplate';
import Notification from '../../../dialogs/Notification';
import CurrencyInput from '../../../inputs/CurrencyInput';
import MySelect from '../../../inputs/select';
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

  return (
    <>
      {!active
        ? (
          <Tooltip title={tooltipTitle} sx={{ cursor: isInternalPage && 'pointer' }}>
            <Typography variant='sm' onDoubleClick={() => isInternalPage && onDoubleClick(name)}>
              {label}
              {currencySymbol}
            </Typography>
          </Tooltip>
        )
        : (
          <>
            {type === 'currency' && <CurrencyInput {...commonProps} />}
            {type === 'select' && <MySelect {...commonProps} /> }
            {type !== 'currency' && type !== 'select' && <TextField {...commonProps} />}
          </>
        )}
    </>
  );
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
  const { breadcrumbsPath, isInternalPage, pageProps, categories } = props;
  const [deliverModal, setDeliverModal] = useState(false);
  const [adjudicateModal, setAdjudicateModal] = useState(false);
  const [old, setOld] = useState(JSON.parse(JSON.stringify({ ...props.budget })));
  const [budget, setBudget] = useState({ ...props.budget });
  const [activeFields, setActiveFields] = useState({ price: false, amount: false, category: false });
  const dispatch = useDispatch();
  const updateBudget = (data) => dispatch(budgetsActionsRedux.updateBudget(data));
  const newExpedition = (data) => dispatch(expeditionsActionsRedux.newExpedition(data));
  const newProject = (data) => dispatch(projectsActionsRedux.newProject(data));
  const newAssembly = (data) => dispatch(assemblysActionsRedux.newAssembly(data));
  const budgetAdjudicated = (data) => dispatch(emailActionsRedux.budgetAdjudicated(data));
  const getCustomer = (data) => dispatch(customersActionsRedux.customer(data));

  const commonProps = {
    sx: {
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: 'divider',
      padding: '.5rem',
      textAlign: 'center',
    },
    md: 12 / 14,
    sm: 12 / 14,
    xs: 12 / 14
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

  //  Updates Budget
  async function handleUpdate () {
    const loading = toast.loading();

    const data = {
      id: budget.id,
      type: 'Budget',
      price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount.value },
      category: { type: 'Property', value: budget.category.value },
    };

    await updateBudget(data)
      .then(() => {
        ToastSet(loading, 'Orçamento alterado!', 'success');
        setActiveFields({ price: false, amount: false, category: false });

        setOld({
          ...budget,
          price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
          amount: { type: 'Property', value: budget.amount.value },
          category: { type: 'Property', value: budget.category.value }
        });
      })
      .catch(() => ToastSet(loading, 'Orçamento não alterado. Se o problema persistir, contacte a gerencia.', 'error'));
  }

  async function handleConfirmation ({
    amount, obs, price, category,
    dateAgreedDelivery,
    dateDeliveryProject
  }) {
    const processing = toast.loading('');

    const data = {
      id: budget.id,
      type: budget.type,
      amount: { value: amount.value, type: 'Property' },
      obs: { value: obs.value, type: 'Property' },
      price: { value: price.value.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
      category: { value: category.value, type: 'Property' },
      status: { value: 'waiting adjudication', type: 'Property' },
      dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
      dateAgreedDelivery: { value: moment(dateAgreedDelivery.value).format('DD/MM/YYYY'), type: 'Property' },
      dateDeliveryProject: { value: moment(dateDeliveryProject.value).format('DD/MM/YYYY'), type: 'Property' },
    };

    await updateBudget(data).then(() => {
      setBudget({ ...data, id: old.id });
      setDeliverModal(false);
      ToastSet(processing, 'Orçamento entregue', 'success');
    }).catch((err) => console.log(err));
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
        id: 'urn:ngsi-ld:expedition:' + budget.name.value,
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
        id: 'urn:ngsi-ld:Project:' + budget.name.value.replace(/ /g, '').toUpperCase(),
        type: 'Project',
        orderBy: { type: 'Relationship', object: 'urn:ngsi-ld:Owner:' + budget.orderBy?.object.id },
        name: { type: 'Property', value: budget.name.value },
        status: { type: 'Property', value: 'drawing' },
        budgetId: { type: 'Relationship', object: budget.id },
        assemblyBy: { type: 'Relationship', object: ['urn:ngsi-ld:Worker:'] },
        amount: { type: 'Property', value: String(budget.amount.value).replace(/ /g, '').replace(/€/g, '') },
        expedition: { type: 'Relationship', object: 'urn:ngsi-ld:expedition:' + budget.name.value },
        category: {
          type: 'Property',
          value: budget.category?.value
        }
      });

      await newAssembly({
        id: 'urn:ngsi-ld:Assembly:' + budget.name.value.toUpperCase(),
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
          type: 'Budget',
          approvedDate: { type: 'Property', value: moment().format('DD/MM/YYYY') },
          status: { type: 'Property', value: 'adjudicated' }
        }
      );

      await getCustomer(budget.orderBy.object.id.replace('urn:ngsi-ld:Owner:', '')).then(async (res) => {
        await budgetAdjudicated({
          subject: 'Pedido adjudicado!',
          html_message: emailTemplate({ clientName: `${res.data.user.first_name} ${res.data.user.last_name}`, msgBody: 'O seu pedido passou a produção.' }),
          recipients: [res.data.user.id],
          recipient_group: -1
        });
      });

      //  Send email
      setAdjudicateModal(false);
      toast.success('Orçamento adjudicado! Passou para produção');
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

  return (
    <>
      <Notification />
      <DeliverBudgetModal {...props} open={deliverModal} handleClose={() => setDeliverModal(false)} onConfirm={handleConfirmation} />
      <AdjudicateBudgetModal {...props} open={adjudicateModal} handleClose={() => setAdjudicateModal(false)} onConfirm={handleAdjudication} />

      <Box id='pad'>
        <Box container >
          <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
            <Grid container md={6} sm={6} xs={6}>
              <Box id='align'>
                <Typography variant='title'>{breadcrumbsPath[1].title}</Typography>
                <Box pl={2}>
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
              <PrimaryBtn
                hidden={!(budget.status.value !== 'adjudicated' && budget.status.value !== 'canceled' && isInternalPage)}
                text={budget.status.value === 'waiting adjudication' ? 'Adjudicar orçamento' : 'Entregar orçamento'}
                onClick={() => budget.status.value === 'waiting budget' ? setDeliverModal(!deliverModal) : setAdjudicateModal(!adjudicateModal)}
                icon={
                  <CheckCircleOutline
                    strokeWidth={pageProps?.globalVars?.iconSmStrokeWidth}
                    size={pageProps?.globalVars?.iconSize}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid container md={12} sm={12} xs={12}>
            <Grid container md={12} p={1} >
              <Grid container md={12} sm={12} xs={12} >
                <Grid container {...upperCells} md={(12 / 14) * 8} sm={(12 / 14) * 8} xs={(12 / 14) * 8}>Orçamento</Grid>
                <Grid container {...upperCells} md={(12 / 14) * 3} sm={(12 / 14) * 3} xs={(12 / 14) * 3}>Produção</Grid>
                <Grid container {...upperCells} md={(12 / 14) * 3} sm={(12 / 14) * 3} xs={(12 / 14) * 3}>Expedição</Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container {...upperCells}><Typography variant='sm' >Referência</Typography> </Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Categoria</Typography> </Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Quantidade</Typography></Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Pedido</Typography> </Grid>
                <Grid container {...upperCells}><Typography variant='sm' >Criação</Typography></Grid>
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
                <Grid container { ...cells }><Typography variant='sm' >{`${budget?.name?.value.replace(/_/g, ' ')} ECL 2023/000100`}</Typography></Grid>
                <Grid container { ...cells }>
                  <EditableCell active={activeFields.category} isInternalPage={isInternalPage} value={budget?.category?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='category' type='select' options={categories} />
                </Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.amount?.value && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.amount?.value && 'primary.light'}>
                  <EditableCell active={activeFields.amount} isInternalPage={isInternalPage} value={budget?.amount?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='amount' type='number' />
                </Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.dateRequest?.value && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateRequest?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateRequest} isInternalPage={isInternalPage} value={budget?.dateRequest?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateRequest' type='date' />
                </Grid>
                <Grid container { ...cells }><Typography variant='sm' >{moment(budget?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.dateAgreedDelivery?.value && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.dateAgreedDelivery?.value && 'primary.light'}>
                  <EditableCell active={activeFields.dateAgreedDelivery} isInternalPage={isInternalPage} value={budget?.dateAgreedDelivery?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='dateAgreedDelivery' type='date' />
                </Grid>
                <Grid container { ...cells } className={isInternalPage && !budget?.price?.value && 'breathingBackgroundWarning'} bgcolor={isInternalPage && !budget?.price?.value && 'primary.light'}>
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
            <Grid container md={3} p={1}>
              <Grid container style={{ width: 'fit-content' }}>
                {isInternalPage && <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'}>Cliente</Typography>
                    <Tooltip title='Ver cliente'>
                      <a href={routes.private.internal.client + budget.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                        <Typography color={'primary.main'}>{`${budget.orderBy?.object?.user?.first_name} ${budget.orderBy?.object?.user?.last_name}`}</Typography>
                      </a>
                    </Tooltip>
                  </Box>
                </Grid>}
                <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'} >Morada Entrega</Typography>
                    <Typography>
                      {budget.deliveryAddress?.value?.streetAddress + ', '}
                      {budget.deliveryAddress?.value?.postalCode + ', '}
                      {budget.deliveryAddress?.value?.addressLocality + ', '}
                      {budget.deliveryAddress?.value?.addressRegion + ', '}
                      {budget.deliveryAddress?.value?.addressCountry}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'} >Observações</Typography>
                    <Typography>{budget.obs?.value || 'Não tem observações.'}</Typography>
                  </Box>
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
