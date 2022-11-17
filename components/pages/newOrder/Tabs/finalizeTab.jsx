import { Grid, Typography } from "@mui/material";
import React from 'react';
//  PropTypes
import PropTypes from 'prop-types';

const FinalizeTab = (props) => {
    const {inputFields, clients, client, budget, budgets} = props;

    return (
        <Grid container >
            <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container md={5} sm={6} sx={{ border: '1px solid #EDEDED' }}>
                {/* Header */}
                <Grid container md={12} sx={{ padding: '1rem', display: 'flex', alignItems: 'center', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EDEDED' }}>
                    <Grid container md={9}>Items Encomendados</Grid>
                    <Grid container md={3}>Quantidade</Grid>
                </Grid>
                {/* Rows */}
                {inputFields.map((ele, i) => {
                    return (
                    <Grid key={i} container md={12} sx={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
                        <Grid container md={2}><img src={'https://crm.innerjoin.pt/douromed/images/semimagem.jpg'} style={{ width: '50px', height: '50px' }} /></Grid>
                        <Grid container md={7}>{budget.id ? budgets.find(ele => ele.id === budget.id).name.value : budget.name }</Grid>
                        <Grid container md={3}>{budget.amount}</Grid>
                    </Grid>
                    );
                })}
                <Grid container md={12} sx={{ padding: '1rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #EDEDED' }}>
                    <Grid container md={10} >
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Subtotal:</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Envio & Entrega:</Typography> </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography fontWeight={'bold'}>Total</Typography> </Grid>
                    </Grid>
                    <Grid container md={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>X €</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography>Y €</Typography></Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}><Typography fontWeight={'bold'}>Z €</Typography> </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Grid container md={5} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                {/* Header */}
                <Grid container md={5.5} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                    <Grid container md={12} >
                    <Grid container p={1} md={12} sx={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #EDEDED', backgroundColor: '#FAFAFA' }}>Endereço de faturação</Grid>
                    <Grid container md={12} p={1}>
                        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.legalName}</Typography>
                        </Grid>
                        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.address}</Typography>
                        </Grid>
                        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.postalCode}</Typography>
                        </Grid>
                        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>{clients.find(ele => ele.id === client)?.country}</Typography>
                        </Grid>
                        <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography fontWeight='bold'>T: {clients.find(ele => ele.id === client)?.telephone}</Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid container md={5.5} sx={{ display: 'flex', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                    <Grid container md={12} >
                        <Grid container p={1} md={12} sx={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #EDEDED', backgroundColor: '#FAFAFA' }}>Endereço de faturação</Grid>
                        <Grid container p={1} md={12}>here</Grid>
                    </Grid>
                </Grid>
                <Grid container md={5.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EDEDED' }}>
                    <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>Data limite de levantamento</Grid>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

FinalizeTab.propTypes = {
    inputFields: PropTypes.array,
    products: PropTypes.array,
    clients: PropTypes.array,
    budgets: PropTypes.array,
    client: PropTypes.object,
    budget: PropTypes.object,
};

export default FinalizeTab;