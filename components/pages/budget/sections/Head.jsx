import { Box, Grid, Table, Tooltip, Typography } from '@mui/material';
import React from 'react';
//  PropTypes
import PropTypes from 'prop-types';
import routes from '../../../../navigation/routes';

const Head = (props) => {
    const {breadcrumbsPath, budget, isInternalPage} = props;

    console.log(props);

    const upperCells = {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.5rem',
        backgroundColor: '#F9F9F9',
        border: '1px solid',
        borderColor: 'divider'
    };

    const cells = {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.5rem',
        border: '1px solid',
        borderColor: 'divider'
    };

    return (
        <Table container>
            <Grid id='pad' container md={12} sm={12} xs={12}>
                <Box id='align'>
                    <Typography variant='title'> {breadcrumbsPath[1].title}</Typography>
                    {isInternalPage && <Box pl={2}>
                        <Typography className='blankBalloon'>Espera adjudicação</Typography>
                    </Box>}
                </Box>
            </Grid>
            <Grid id='pad' container md={12} sm={12} xs={12}>
                <Grid container md={4} p={1}>
                    <Grid container style={{ width: 'fit-content'}}>
                        {isInternalPage &&<Grid container md={12}>
                            <Box>
                                <Typography color={"lightTextSm.main"}>Cliente</Typography>
                                <Tooltip title='Ver cliente'>
                                    <a href={routes.private.internal.client + budget.belongsTo?.object?.id} target="_blank"  rel="noreferrer" > 
                                        <Typography color={"primary.main"}>{budget.belongsTo?.object?.legalName?.value || 'Cliente aqui'}</Typography>
                                    </a>
                                </Tooltip>
                            </Box>
                        </Grid>}
                        <Grid container md={12}>
                            <Box>
                                <Typography color={"lightTextSm.main"} >Observações</Typography>
                                <Typography>{budget.obs?.value || 'Nao tem observações'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container md={8} p={1}>
                    <Grid container md={12} sm={12} xs={12}>
                        <Grid container sx={{...upperCells}} md={6} sm={6} xs={6}>Data</Grid>
                        <Grid container sx={{...upperCells}} md={6} sm={6} xs={6}>Informação</Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Criação</Grid>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Entrega</Grid>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Adjudicada</Grid>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Categoria</Grid>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Quantidade</Grid>
                        <Grid container sx={{...upperCells}} md={2} sm={2} xs={2}>Preço</Grid>
                    </Grid>
                    <Grid container md={12} sm={12} xs={12}>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.budgetCreated?.value}</Grid>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.budgetDelivered?.value}</Grid>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.aprovedDate?.value}</Grid>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.category?.value}</Grid>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.amount?.value}</Grid>
                        <Grid container sx={{...cells}} md={2} sm={2} xs={2}>{budget?.price?.value} €</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Table>
    );
};

Head.propTypes = {
    breadcrumbsPath: PropTypes.array,
    budget: PropTypes.object,
};

export default Head;