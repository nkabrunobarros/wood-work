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

export const EditableCell = (props) => {
  const { active, onDoubleClick, value, type, name, options, onChange, isInternalPage } = props;

  return <>
    {!active
      ? <Tooltip title={isInternalPage ? 'Dois cliques para editar' : ''} sx={{ cursor: 'pointer' }}>
        <Typography variant='sm' onDoubleClick={() => isInternalPage && onDoubleClick(name)}>
          {value
            ? <>
              {name === 'category' ? <>{options.find(ele => ele.id === value)?.label}</> : value + (type === 'currency' ? ' €' : '')}
            </>
            : ''}
        </Typography>
      </Tooltip>
      : <>
        {type === 'currency' && <CurrencyInput variant='standard' value={value} name={name} onChange={onChange} />}
        {type === 'select' && <MySelect variant='standard' value={value} name={name} options={options} onChange={onChange} /> }
        {(type === 'number' || type === undefined || type === '') && <TextField variant='standard' value={value} name={name} type={type || 'text'} onChange={onChange} /> }
      </>
    }</>;
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

  const upperCells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    backgroundColor: '#F9F9F9',
    border: '1px solid',
    borderColor: 'divider',
    textAlign: 'center'
  };

  const cells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    border: '1px solid',
    borderColor: 'divider'
  };

  //  Updates Budget
  async function handleUpdate () {
    const loading = toast.loading();

    const data = [{
      id: budget.id,
      type: 'Budget',
      price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount.value },
      category: { type: 'Property', value: budget.category.value },
    }];

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
      dateAgreedDelivery: { value: moment(dateAgreedDelivery).format('DD/MM/YYYY'), type: 'Property' },
      dateDeliveryProject: { value: moment(dateDeliveryProject).format('DD/MM/YYYY'), type: 'Property' },
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
        id: 'urn:ngsi-ld:Expedition:' + budget.name.value,
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
          object: budget.orderBy?.object.id
        }
      });

      const projRes = await newProject({
        id: 'urn:ngsi-ld:Project:' + budget.name.value.replace(/ /g, '').toUpperCase(),
        type: 'Project',
        orderBy: { type: 'Relationship', object: budget.orderBy?.object.id },
        name: { type: 'Property', value: budget.name.value },
        status: { type: 'Property', value: 'drawing' },
        budgetId: { type: 'Relationship', object: budget.id },
        assemblyBy: { type: 'Relationship', object: ['urn:ngsi-ld:Worker:'] },
        amount: { type: 'Property', value: String(budget.amount.value).replace(/ /g, '').replace(/€/g, '') },
        expedition: { type: 'Relationship', object: 'urn:ngsi-ld:Expedition:' + budget.name.value },
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
          object: budget.orderBy?.object.id
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
                {isInternalPage &&
                  <Box pl={2}>
                    {budget.status?.value === 'waiting adjudication' && <Typography className='infoBalloon'>Espera adjudicação</Typography>}
                    {budget.status?.value === 'waiting budget' && <Typography className='blankBalloon'>Espera orçamento</Typography>}
                  </Box>
                }
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
            <Grid container md={3} p={1}>
              <Grid container style={{ width: 'fit-content' }}>
                {isInternalPage && <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'}>Cliente</Typography>
                    <Tooltip title='Ver cliente'>
                      <a href={routes.private.internal.client + budget.orderBy?.object?.id} target="_blank" rel="noreferrer" >
                        <Typography color={'primary.main'}>{budget.orderBy?.object?.legalName?.value || 'Cliente aqui'}</Typography>
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
            <Grid container md={9} p={1} >
              <Grid container md={12} sm={12} xs={12} >
                <Grid container sx={{ ...upperCells }} md={(12 / 15) * 8} sm={8} xs={8}>Orçamento</Grid>
                <Grid container sx={{ ...upperCells }} md={(12 / 15) * 3} sm={4} xs={4}>Produção</Grid>
                <Grid container sx={{ ...upperCells }} md={(12 / 15) * 3} sm={4} xs={4}>Expedição</Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Referência</Typography> </Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Categoria</Typography> </Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Quantidade</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Pedido</Typography> </Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Criação</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Valor</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Entregue</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Inicio</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Fim</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Quantidade</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Entrada</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >Entregue</Typography></Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{`${budget?.name?.value.replace(/_/g, ' ')} ECL 2023/000100`}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}>
                  <EditableCell active={activeFields.category} isInternalPage={isInternalPage} value={budget?.category?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='category' type='select' options={categories} />
                </Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{budget?.amount?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{budget?.dateRequest?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{moment(budget?.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{budget?.dateAgreedDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}>
                  <EditableCell active={activeFields.price} isInternalPage={isInternalPage} value={budget?.price?.value !== '' ? budget?.price?.value : 0} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='price' type='currency' />
                </Grid>{console.log(budget)}
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{budget?.dateDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}>
                </Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' >{budget.dateDeliveryProject?.value}</Typography></Grid>

                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}>
                </Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' ></Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' ></Typography></Grid>
                <Grid container sx={{ ...cells }} md={12 / 15} sm={12 / 15} xs={12 / 15}><Typography variant='sm' ></Typography></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  );
};

export default Head;
