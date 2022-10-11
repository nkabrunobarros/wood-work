//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import StockScreen from '../../../components/pages/stock/stock';

//  Navigation
import routes from '../../../navigation/routes';

//  Utils

//  Services
import * as CategoriesActions from '../../../pages/api/actions/category';
import * as StocksActions from '../../../pages/api/actions/stock';

const Stock = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState();
  const [stock, setStock] = useState();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      await StocksActions.stock({id: router.query.Id}).then((response) => setStock(response.data.payload))
      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data))
    }

    Promise.all([getData()]).then(() => setLoaded(true));

  }, []);

  if (loaded) {
    const data = {
      categories,
    };

    console.log(stock)

    const breadcrumbsPath = [
      {
        title: 'Stock',
        href: `${routes.private.internal.stocks}`,
      },
      {
        title: `${stock.product.name}`,
        href: `${routes.private.internal.stockId}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      stock,
      data,
    };


    return loaded && <StockScreen {...props} />
  }

  return <Loader center={true} />;
};

export default Stock;
