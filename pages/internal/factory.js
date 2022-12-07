import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import FactoryGroundScreen from '../../components/pages/factoryGround/factoryGround';
import routes from '../../navigation/routes';
import * as ProjectsActions from '../api/actions/project';

const SignIn = () => {
    const [loaded, setLoaded] = useState(true);
    const [projects, setProjects] = useState();

    useEffect(() => {
        async function getData() {
            await ProjectsActions.projects().then((response) => setProjects(response.data));
        }

        Promise.all([getData()]).then(() => setLoaded(true));
    }, []);

    if (loaded) {

        const headCellsUpper = [
            {
                id: 'amountProduced',
                numeric: false,
                disablePadding: false,
                borderLeft: false,
                borderRight: false,
                label: '',
                span: 3,
            },
            {
                id: 'amountProduced',
                numeric: false,
                disablePadding: false,
                borderLeft: true,
                borderRight: true,
                label: 'Medidas Brutas',
                span: 3,
            },
            {
                id: 'amountProduced',
                numeric: false,
                disablePadding: false,
                borderLeft: false,
                borderRight: false,
                label: '',
                span: 7,
            },
        ];

        const headCells = [
            {
                id: 'id',
                numeric: false,
                disablePadding: false,
                label: 'Ref. Peça',
            },
            {
                id: 'order.client.legalName',
                numeric: false,
                disablePadding: true,
                label: 'Material',
            },
            {
                id: 'product.craftTime',
                numeric: false,
                disablePadding: false,
                label: 'Qtd.',
            },
            {
                id: 'realizado1',
                numeric: false,
                disablePadding: false,
                borderLeft: true,
                label: 'Comp',
            },
            {
                id: 'desvio',
                numeric: false,
                disablePadding: false,
                label: 'Larg',
            },
            {
                id: 'previstoAtual',
                numeric: false,
                disablePadding: false,
                borderRight: true,
                label: 'Esp.',
            },
            {
                id: 'product.craftTime',
                numeric: false,
                disablePadding: false,
                label: 'Nest.',
            },
            {
                id: 'product.cost',
                numeric: false,
                disablePadding: false,
                label: 'CNC',
            },
            {
                id: 'realizado2',
                numeric: false,
                disablePadding: false,
                label: 'Orlas',
            },
            {
                id: 'desvio2',
                numeric: false,
                disablePadding: false,
                label: 'Furo Face',
            },
            {
                id: 'desvio2',
                numeric: false,
                disablePadding: false,
                label: 'Obs.',
            },
            {
                id: 'actions',
                numeric: true,
                disablePadding: false,
                label: 'Ações',
            },
        ];

        const breadcrumbsPath = [
            {
                title: 'Chão de Fabrica',
                href: `${routes.private.internal.factoryLevel}`,
            }
        ];

        const props = {
            headCells,
            headCellsUpper,
            breadcrumbsPath,
            projects
        };


        return <FactoryGroundScreen {...props} />;
    } else return <Loader center={true} />;
};

export default SignIn;
