//  Page Component
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import BudgetScreen from '../../components/pages/budget/budget';
import routes from '../../navigation/routes';
import * as BudgetActions from '../api/actions/budget';
import * as ClientsActions from '../api/actions/client';
import { categories } from '../internal/new-project';

const Budget = ({ ...pageProps }) => {
  const router = useRouter();
  const [budget, setBudget] = useState();
  const [loaded, setLoaded] = useState(false);
  const folders = [];

  useEffect(() => {
    const getData = async () => {
      await BudgetActions.budget({ id: router.query.Id }).then(async (res) => {
        const thisBudget = res.data[0];

        await ClientsActions.client({ id: thisBudget.belongsTo.object }).then(async (clientRes) => {
          thisBudget.belongsTo.object = clientRes.data[0];
        });

        setBudget(thisBudget);
      });
    };

    Promise.all([getData()])
      .then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.projects}`,
      },
      {
        title: `Encomenda ${budget.name.value}`,
        // title: `Orçamento ${order.name.value}`,
        href: `${routes.private.budget}`,
      },
    ];

    const headCellsUpperOrderDetail = [
      {
        id: 'deadline',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Data de Entrega',
        span: 2,
      },
      {
        id: 'production',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Produção',
        span: 2,
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Encomendada: ${budget?.amount?.value} Un`,
        span: 1,
      },
    ];

    const headCellsOrderDetail = [
      {
        id: 'startAt',
        label: 'Cliente',
      },
      {
        id: 'startAt',
        label: 'Real',
      },
      {
        id: 'startAt',
        label: 'Inicio',
        borderLeft: true,
      },
      {
        id: 'endAt',
        label: 'Fim',
        borderRight: true,
      },
      {
        id: 'time',
        disablePadding: false,
        label: 'Tempo',
      },
    ];

    const headCellsMessages = [
      {
        id: 'mensagem',
        label: 'Mensagem',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
    ];

    const headCellsDocs = [
      {
        id: 'nome',
        label: 'Nome',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
      {},
    ];

    const props = {
      breadcrumbsPath,
      budget,
      folders,
      pageProps,
      headCellsDocs,
      headCellsMessages,
      headCellsOrderDetail,
      headCellsUpperOrderDetail,
      categories
    };

    return <BudgetScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Budget;
