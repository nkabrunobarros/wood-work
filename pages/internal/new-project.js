import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import NewOrderScreen from '../../components/pages/newOrder/newProject';
import routes from '../../navigation/routes';

import * as BudgetsActions from '../api/actions/budget';
import * as ClientActions from '../api/actions/client';
import * as ProductsActions from '../api/actions/product';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [budgets, setBudgets] = useState();

  useEffect(() => {
    const getData = async () => {
      await ClientActions.clients().then((response) => setClients(response.data));
      await BudgetsActions.allBudgets().then((response) => setBudgets(response.data));

      await ProductsActions.products().then((response) => {
        setProducts(response.data.payload.data);
        // console.log(response.data.payload.data)

        //   response.data.payload.data.map(async (ord, i) => {
        //     try {
        //       await StockActions.stock({ id: ord.id }).then((res) => {
        //         response.data.payload.data[i].stock = res.data.payload.amount
        //       })  

        //     } catch (err) {
        //       console.log('err')
        //       response.data.payload.data[i].stock = null

        //     }
        // })

      });
    };

    Promise.all([getData()]).then(() => setLoaded(true));

  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: 'Nova Encomenda',
        href: `${routes.private.internal.newProject}`,
      },
    ];

    const props = {
      pageProps,
      breadcrumbsPath,
      clients,
      products,
      budgets,
    };

    return <NewOrderScreen {...props} />;

  } else return <Loader center={true} />;
};

export default NewOrder;
