import { Box, Grid, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
//  PropTypes
import { CheckCircleOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';
import { categories } from '../../../../pages/internal/new-project';
import PrimaryBtn from '../../../buttons/primaryBtn';
import AdjudicateBudgetModal from './modals/AdjudicateBudgetModal';
import DeliverBudgetModal from './modals/DeliverBudgetModal';

//  Actions
import moment from 'moment';
import Router from 'next/router';
import { toast } from 'react-toastify';
import * as BudgetActions from '../../../../pages/api/actions/budget';
import ToastSet from '../../../utils/ToastSet';

const Head = (props) => {
  const { breadcrumbsPath, isInternalPage, pageProps } = props;
  const [deliverModal, setDeliverModal] = useState(false);
  const [adjudicateModal, setAdjudicateModal] = useState(false);
  const [budget, setBudget] = useState(props.budget);

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
    const builtBudget = [{
      id: budget.id,
      type: 'Budget',
      aprovedDate: {
        type: 'Property',
        value: moment().format('DD/MM/YYYY')
      },
      status: {
        type: 'Property',
        value: 'adjudicated'
      }
    }];

    await BudgetActions.updateBudget(builtBudget).then(async () => {
      setAdjudicateModal(false);

      const builtProject = {
        id: 'urn:ngsi-ld:Project:' + budget.name.value,
        type: 'Project',
        orderBy: {
          type: 'Relationship',
          object: budget.belongsTo?.object
        },
        name: {
          type: 'Property',
          value: budget.name.value
        },
        status: {
          type: 'Property',
          value: 'drawing'
        },
        budgetId: {
          type: 'Relationship',
          object: budget.id
        },
        assemblyBy: {
          type: 'Relationship',
          object: ['urn:ngsi-ld:Worker:10']
        },
        amount: {
          type: 'Property',
          value: budget.amount.value.replace(/ /g, '').replace(/€/g, '')
        },
        expedition: {
          type: 'Relationship',
          object: 'urn:ngsi-ld:expedition:' + budget.name.value
        },
        '@context': [
          'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
          'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
        ]
      };

      const config = {
        method: 'post',
        url: 'http://woodwork4.ddns.net/api/ngsi-ld/v1/entities/',
        headers: {
          'Content-Type': 'application/ld+json',
          'Fiware-Service': 'woodwork40'
        },
        data: builtProject
      };

      const axios = require('axios');

      axios(config)
        .then(() => {
          Router.push(routes.private.internal.project + builtProject.id);
          toast.success('Orçamento adjudicado. Passou para produção');
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  return (
    <>
      <DeliverBudgetModal {...props} open={deliverModal} handleClose={() => setDeliverModal(false)} onConfirm={handleConfirmation} />
      <AdjudicateBudgetModal {...props} open={adjudicateModal} handleClose={() => setAdjudicateModal(false)} onConfirm={handleAdjudication} />
      <Box id='pad'>
        <Box container >
          <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
            <Grid container md={9} sm={9} xs={9}>
              <Box id='align'>
                <Typography variant='title'> {breadcrumbsPath[1].title}</Typography>
                {isInternalPage &&
            <Box pl={2}>
              {budget.status?.value === 'waiting adjudication' && <Typography className='infoBalloon'>Espera adjudicação</Typography>}
              {budget.status?.value === 'waiting budget' && <Typography className='blankBalloon'>Espera orçamento</Typography>}
            </Box>}
              </Box>
            </Grid>
            <Grid container md={3} sm={3} xs={3} justifyContent='end'>
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
              {console.log(budget)}
              <Grid container md={12} sm={12} xs={12}>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateRequest?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateCreation?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateAgreedDelivery?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' >{budget?.dateDeliveryProject?.value}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{budget?.category?.value ? categories.find(ele => ele.id === budget?.category?.value)?.label : 'Não definido'}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' >{budget?.amount?.value ? budget?.amount?.value : 'Não definido'}</Typography></Grid>
                <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm'>{budget?.price?.value ? budget?.price?.value + ' €' : 'Não definido'}</Typography></Grid>
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
};

export default Head;
