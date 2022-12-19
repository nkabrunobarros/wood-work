import { Box, Grid, Table, Tooltip, Typography } from '@mui/material';
import React from 'react';
//  PropTypes
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';

const Head = (props) => {
  const { breadcrumbsPath, budget, isInternalPage } = props;

  const upperCells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    backgroundColor: '#F9F9F9',
    border: '1px solid',
    borderColor: 'divider',
  };

  const cells = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem',
    border: '1px solid',
    borderColor: 'divider'
  };

  const text = {
    textAlign: 'center'
  };

  return (
    <Box id='pad'>

      <Box container >
        <Grid container md={12} sm={12} xs={12} sx={{ marginBottom: '1rem' }}>
          <Box id='align'>
            <Typography variant='title'> {breadcrumbsPath[1].title}</Typography>
            {isInternalPage &&
          <Box pl={2}>
            {budget.status?.value === 'waiting adjudication' && <Typography className='infoBalloon'>Espera adjudicação</Typography>}
            {budget.status?.value === 'waiting budget' && <Typography className='blankBalloon'>Espera orçamento</Typography>}
          </Box>}
          </Box>
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
              <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>Solicitação</Typography> </Grid>
              <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>Criação</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>Entrega Acordada</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>Entrega Real</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Categoria</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Quantidade</Typography></Grid>
              <Grid container sx={{ ...upperCells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>Preço</Typography></Grid>
            </Grid>
            <Grid container md={12} sm={12} xs={12}>
              <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>{budget?.dateRequest?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>{budget?.dateCreation?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>{budget?.dateAgreedDelivery?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={1.5} sm={1.5} xs={1.5}><Typography variant='sm' sx={{ ...text }}>{budget?.dateDelivery?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{budget?.category?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{budget?.amount?.value}</Typography></Grid>
              <Grid container sx={{ ...cells }} md={2} sm={2} xs={2}><Typography variant='sm' sx={{ ...text }}>{budget?.price?.value && budget?.price?.value + ' €'}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

Head.propTypes = {
  breadcrumbsPath: PropTypes.array,
  budget: PropTypes.object,
  isInternalPage: PropTypes.bool,
};

export default Head;
