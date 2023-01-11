import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import FactoryGroundScreen from '../../components/pages/factoryGround/factoryGround';
import routes from '../../navigation/routes';
import * as BudgetsActions from '../api/actions/budget';
import * as ProjectsActions from '../api/actions/project';

const FactoryGround = () => {
  const [loaded, setLoaded] = useState(true);
  const [projects, setProjects] = useState();

  useEffect(() => {
    async function getData () {
      await BudgetsActions.allBudgets().then(async (budResponse) => {
        await ProjectsActions.productionProjects().then((response) => {
          setProjects([...response.data].map((project) => {
            project.budgetId = [...budResponse.data].find(bud => bud.id === project?.budgetId?.object);

            return project;
          }));
        });
      });
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
        id: 'ref',
        numeric: false,
        disablePadding: false,
        label: 'Ref. Peça',
      },
      {
        id: 'material',
        numeric: false,
        disablePadding: true,
        label: 'Material',
      },
      {
        id: 'qtd',
        numeric: false,
        disablePadding: false,
        label: 'Qtd.',
      },
      {
        id: 'comp',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        label: 'Comp',
      },
      {
        id: 'larg',
        numeric: false,
        disablePadding: false,
        label: 'Larg',
      },
      {
        id: 'esp',
        numeric: false,
        disablePadding: false,
        borderRight: true,
        label: 'Esp.',
      },
      {
        id: 'tag',
        numeric: false,
        disablePadding: false,
        borderRight: true,
        label: 'Etq',
      },
      {
        id: 'nest',
        numeric: false,
        disablePadding: false,
        label: 'Nest.',
      },
      {
        id: 'cnc',
        numeric: false,
        disablePadding: false,
        label: 'CNC',
      },
      // {
      //     id: 'orlas',
      //     numeric: false,
      //     disablePadding: false,
      //     label: 'Orlas',
      // },
      {
        id: 'furoFace',
        numeric: false,
        disablePadding: false,
        label: 'Furo Face',
      },
      {
        id: 'obs',
        numeric: false,
        disablePadding: false,
        label: 'Obs.',
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
  }

  return <Loader center={true} />;
};

export default FactoryGround;
