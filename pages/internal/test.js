/* eslint-disable indent */
//  Nodes
// import Test from '../components/pages/test';

import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../navigation/routes';
//  Navigation
import OrdersScreen from '../../components/pages/projects/projects';

//  PropTypes

//  Styling
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';

const Terms = () => {
    const reduxState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    //  dispatch actions
    const getProjects = (data) => dispatch(projectsActionsRedux.myProjects(data));
    const getBudgets = (data) => dispatch(budgetsActionsRedux.myBudgets(data));
    const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
    const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));

    async function fetchData() {
        let errors = false;

        try {
            if (!reduxState.projects?.data) {
                await getProjects(reduxState.auth.me.id);
            }

            if (!reduxState.clients?.data) { await getClients(); }

            if (!reduxState.expeditions?.data) { await getExpeditions(); }

            if (!reduxState.budgets?.data) { await getBudgets(); }
        } catch (err) {
            console.log(err);
            errors = true;
        }

        return !errors;
    }

    useEffect(() => {
        async function loadData() {
            setLoaded(await fetchData(dispatch));
        }

        loadData();
    }, []);

    if (loaded) {
        const counts = {
            waitingBudget: 0,
            waitingAdjudication: 0,
            drawing: 0,
            production: 0,
            expedition: 0,
            concluded: 0,
            testing: 0,
        };

        reduxState.budgets?.data?.forEach((bud) => {
            switch (bud.status?.value) {
                case 'waiting budget':
                    counts.waitingBudget++;

                    break;
                case 'waiting adjudication':
                    counts.waitingAdjudication++;

                    break;
            }
        });

        reduxState.projects?.data?.forEach((proj) => {
            switch (proj.status?.value) {
                case 'drawing':
                    counts.drawing++;

                    break;
                case 'production':
                    counts.production++;

                    break;
                case 'transport':
                    counts.expedition++;

                    break;
                case 'testing':
                    counts.testing++;

                    break;
                case 'finished':
                    counts.concluded++;

                    break;
            }
        });

        const headCellsProjects = [
            {
                id: 'name.value',
                numeric: false,
                disablePadding: false,
                label: 'Nome',
            },
            {
                id: 'category.value',
                numeric: false,
                disablePadding: false,
                label: 'Categoria',
            },
            {
                id: 'ord_amount_proj',
                numeric: false,
                disablePadding: false,
                label: 'Quantidade',
            },
            {
                id: 'Estado',
                numeric: false,
                disablePadding: false,
                label: 'Estado',
            },
        ];

        const budgets = [...reduxState.budgets?.data ?? []].map((bud) => {
            return bud?.status?.value !== 'adjudicated' && bud?.status?.value !== 'canceled' && {
                ...bud,
                Estado: bud?.status?.value,
                Nome: bud?.name?.value.replace(/_/g, ' '),

            };
        });

        const projects = [...reduxState.projects?.data ?? []].map((proj) => ({
            ...proj,
            Estado: proj?.status?.value,
            Nome: proj?.id.replace('urn:ngsi-ld:Project:', '').replace(/_/g, ' '),
            budgetId: { ...proj.budgetId, ...(budgets.find((ele) => ele.id === proj.budgetId.object)) },
        }));

        const merged = [...projects, ...budgets.filter((ele) => ele.status !== 'adjudicated')];

        const breadcrumbsPath = [
            {
                title: 'Pedidos',
                href: `${routes.private.internal.orders}`,
            },
        ];

        const props = {
            counts,
            breadcrumbsPath,
            headCellsProjects,
            budgets,
            projects: merged,
            detailPage: routes.private.project,
            editPage: routes.private.editProject,
            detailPageBudgetTab: routes.private.budget,
        };

        return <>
            <button onClick={() => Router.push('/internal/test2')}>go test2</button>
            <OrdersScreen {...props} /></>;
    }

    // return <Test />;
};

Terms.propTypes = {
};

export default Terms;
