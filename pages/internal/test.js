import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AdvancedTable from '../../components/advancedTable/AdvancedTable';
import AuthData from '../../lib/AuthData';
import routes from '../../navigation/routes';
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';

const Test = () => {
    const dispatch = useDispatch();
    const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
    const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
    const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
    const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
    const [loaded, setLoaded] = useState(false);
    const [projects, setProjects] = useState();
    const [expeditions, setExpeditions] = useState();
    const [budgets, setBudgets] = useState();
    const [clients, setClients] = useState();

    async function fetchData(dispatch) {
        let errors = false;

        try {
            AuthData(dispatch);
            await getProjects().then((res) => setProjects(res.data));
            await getExpeditions().then((res) => setExpeditions(res.data));
            await getBudgets().then((res) => setBudgets(res.data));
            await getClients().then((res) => setClients(res.data));
        } catch (err) { errors = true; }

        return !errors;
    }

    useEffect(() => {
        async function loadData() {
            setLoaded(await fetchData(dispatch));
        }

        loadData();
    }, []);

    const headCellsProjects = [
        {
            id: 'id',
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
        // {
        //   id: 'orderBy.object',
        //   numeric: false,
        //   disablePadding: false,
        //   label: 'Cliente',
        // },
        {
            id: 'amount.value',
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
        {
            id: 'actions',
            numeric: true,
            disablePadding: false,
            label: 'Ações',
        },
    ];

    if (loaded) {
        return <>
            <button onClick={() => Router.push('/internal/test2')} >GO TO TEST2</button>

            <AdvancedTable
                rows={projects}
                headCells={headCellsProjects}
                filters={{}}
                clickRoute={'/internal/test2/'}
                editRoute={routes.private.internal.editProject}
            />
        </>;
    }

    // return <Test />;
};

export default Test;
