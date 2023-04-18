//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import StockScreen from '../../../components/pages/stock/stock';

//  Navigation
import routes from '../../../navigation/routes';
import { dummyStocks } from '../stocks';

//  Utils

const Stock = () => {
  const [loaded, setLoaded] = useState(false);
  // const [categories, setCategories] = useState();
  // const [orders, setOrders] = useState();
  const [stock, setStock] = useState();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // await StocksActions.stock({ id: router.query.Id }).then((response) => setStock(response.data.payload));
      // await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data));
      // await OrdersActions.ordersProduction().then((response) => setOrders(response.data.payload.data));
      setStock(dummyStocks.find(ele => ele.id === router.query.Id));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    // const data = {
    //   categories,
    // };

    const breadcrumbsPath = [
      {
        title: 'Stocks',
        href: `${routes.private.internal.stocks}`,
      },
      {
        title: `${stock?.material}`,
        href: `${routes.private.internal.stock}`,
      },
    ];

    // stock.ordersCount = Object.keys(orders.filter(ele => ele.product.id === router.query.Id)).length;

    const props = {
      breadcrumbsPath,
      stock,
      // data,
    };

    return <StockScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Stock;
