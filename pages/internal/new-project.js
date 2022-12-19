import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newProject';
import routes from '../../navigation/routes';

import * as BudgetsActions from '../api/actions/budget';
import * as ClientActions from '../api/actions/client';
// import * as ProductsActions from '../api/actions/product';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [budgets, setBudgets] = useState();

  useEffect(() => {
    const getData = async () => {
      await ClientActions.clients().then((response) => setClients(response.data));
      await BudgetsActions.allBudgets().then((response) => setBudgets(response.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  const categories = [
    { label: 'Cozinha', id: 'MC_' },
    { label: 'Quarto', id: 'MQ_' },
    { label: 'Banheiro', id: 'MB_' },
    { label: 'Garagem', id: 'MG_' },
    { label: 'Varanda', id: 'MV_' },
    { label: 'Sala de estar', id: 'MS_' }
  ];

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Projetos/Orçamentos',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: 'Novo Orçamento',
        href: `${routes.private.internal.newProject}`,
      },
    ];

    const props = {
      pageProps,
      breadcrumbsPath,
      clients,
      budgets,
      categories,
    };

    return <NewOrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default NewOrder;
