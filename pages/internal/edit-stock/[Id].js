//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import EditStockScreen from '../../../components/pages/editStock/editStock';

//  Navigation
import routes from '../../../navigation/routes';
import { dummyStocks } from '../stocks';

const EditStock = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [stock, setStock] = useState();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setStock(dummyStocks.find(ele => ele.id === router.query.Id));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Stocks',
        href: `${routes.private.internal.stocks}`,
      },
      {
        title: `${stock.material}`,
        href: `${routes.private.internal.stock}${router.query.Id}`,
      },
      {
        title: 'Editar stock',
        href: `${routes.private.internal.editStock}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      stock,
      pageProps
    };

    return <EditStockScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditStock;
