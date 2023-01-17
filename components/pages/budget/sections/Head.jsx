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
import { toast } from 'react-toastify';
import * as BudgetActions from '../../../../pages/api/actions/budget';
import * as ExpeditionActions from '../../../../pages/api/actions/expedition';
import * as ProjectActions from '../../../../pages/api/actions/project';
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
            : 'Não definido'}
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

    const builtBudget = [{
      id: budget.id,
      type: 'Budget',
      price: { type: 'Property', value: budget.price.value.replace(/ /g, '').replace(/€/g, '') },
      amount: { type: 'Property', value: budget.amount.value },
      category: { type: 'Property', value: budget.category.value },
    }];

    await BudgetActions.updateBudget(builtBudget)
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

  async function handleConfirmation ({ amount, obs, price, category }) {
    const processing = toast.loading('');

    const updatedBudget = {
      id: budget.id,
      type: budget.type,
      amount: { value: amount.value, type: 'Property' },
      obs: { value: obs.value, type: 'Property' },
      price: { value: price.value.replace(/ /g, '').replace(/€/g, ''), type: 'Property' },
      category: { value: category.value, type: 'Property' },
      status: { value: 'waiting adjudication', type: 'Property' },
      dateDelivery: { value: moment().format('DD/MM/YYYY'), type: 'Property' },
    };

    try {
      await BudgetActions.updateBudget([updatedBudget]).then(() => {
        setBudget(updatedBudget);
        setDeliverModal(false);
        ToastSet(processing, 'Orçamento entregue', 'success');
      });
    } catch (err) { console.log(err); }
  }

  async function handleAdjudication () {
    //  Steps for Project Creation
    //  1 -> Update Budget
    //  2 -> Create Project
    //  3 -> Create Expedition

    const builtBudget = [{
      id: budget.id,
      type: 'Budget',
      aprovedDate: { type: 'Property', value: moment().format('DD/MM/YYYY') },
      status: { type: 'Property', value: 'adjudicated' }
    }];

    await BudgetActions.updateBudget(builtBudget).then(async () => {
      setAdjudicateModal(false);

      const builtProject = {
        id: 'urn:ngsi-ld:Project:' + budget.name.value,
        type: 'Project',
        orderBy: { type: 'Relationship', object: budget.belongsTo?.object.id },
        name: { type: 'Property', value: budget.name.value },
        status: { type: 'Property', value: 'drawing' },
        budgetId: { type: 'Relationship', object: budget.id },
        assemblyBy: { type: 'Relationship', object: [] },
        amount: { type: 'Property', value: budget.amount.value.replace(/ /g, '').replace(/€/g, '') },
        expedition: { type: 'Relationship', object: 'urn:ngsi-ld:expedition:' + budget.name.value },
        '@context': [
          'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
          'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
        ]
      };

      await ProjectActions.saveProject(builtProject).then(async () => {
        const builtExpedition = {
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
          belongsTo: {
            type: 'Relationship',
            object: builtProject.id
          },
          '@context': [
            'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
            'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
          ]
        };

        await ExpeditionActions.saveExpedition(builtExpedition).then(async () => {
          toast.success('Orçamento adjudicado. Passou para produção');
          Router.push(routes.private.internal.project + builtProject.id);
        });
      });
    });
  }

  function onCellDoubleClick (props) {
    setActiveFields({ ...activeFields, [props]: true });
  }

  function onFieldChange ({ target }) {
    const bud = { ...budget };

    bud[target.name].value = target.value;
    setBudget(bud);
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
                <Typography variant='title'> {breadcrumbsPath[1].title}</Typography>
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
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
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
                    strokeWidth={pageProps.globalVars.iconSmStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid container md={12} sm={12} xs={12}>
            <Grid container md={4} p={1}>
              <Grid container style={{ width: 'fit-content' }}>
                {isInternalPage && <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'}>Cliente</Typography>
                    <Tooltip title='Ver cliente'>
                      <a href={routes.private.internal.client + budget.belongsTo?.object?.id} target="_blank" rel="noreferrer" >
                        <Typography color={'primary.main'}>{budget.belongsTo?.object?.legalName?.value || 'Cliente aqui'}</Typography>
                      </a>
                    </Tooltip>
                  </Box>
                </Grid>}
                <Grid container md={12}>
                  <Box>
                    <Typography color={'lightTextSm.main'} >Observações</Typography>
                    <Typography>{budget.obs?.value || 'Não tem observações.'}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid container md={8} p={1} >
              <Grid container md={12} sm={12} xs={12} >
                <Grid container sx={{ ...upperCells }} md={6} sm={6} xs={6}>Data</Grid>
                <Grid container sx={{ ...upperCells }} md={6} sm={6} xs={6}>Informação</Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >Solicitação</Typography> </Grid>
                <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >Criação</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >Entrega Acordada</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >Entrega Real</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Categoria</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Quantidade</Typography></Grid>
                <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' >Valor</Typography></Grid>
              </Grid>
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateRequest?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateCreation?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateAgreedDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateDeliveryProject?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}>
                  <EditableCell active={activeFields.category} isInternalPage={isInternalPage} value={budget?.category?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='category' type='select' options={categories} />
                </Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}>
                  <EditableCell active={activeFields.amount} isInternalPage={isInternalPage} value={budget?.amount?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='amount' type='number' />
                </Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}>
                  <EditableCell active={activeFields.price} isInternalPage={isInternalPage} value={budget?.price?.value} onChange={(e) => onFieldChange(e)} onDoubleClick={onCellDoubleClick} name='price' type='currency' />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>

  );
};

Head.propTypes = {
  breadcrumbsPath: PropTypes.array,
  budget: PropTypes.object,
  isInternalPage: PropTypes.bool,
  pageProps: PropTypes.object,
  categories: PropTypes.array,
};

export default Head;
