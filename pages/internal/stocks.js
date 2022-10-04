//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import StockScreen from '../../components/pages/stocks/stocks';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Utils

//  Services
import * as CategoriesActions from '../../pages/api/actions/category';
import * as ProductsActions from '../../pages/api/actions/product';
import * as StocksActions from '../../pages/api/actions/stock';

const Stock = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  //  Data Fetching
  useEffect(() => {
    const getData = async () => {
      await StocksActions.stocks().then((response) => setItems(response.data.payload.data))
      await CategoriesActions.categories().then((response) => setCategories(response.data.payload.data))
      await ProductsActions.products().then((response) => setProducts(response.data.payload.data))
    }

    Promise.all([getData()]).then(() => setLoaded(true));

  }, []);

  if (loaded) {
    //  Table header
    const headCells = [
      {
        id: 'product.name',
        label: 'Nome',
        width: '20%',
      },
      {
        id: 'product.code',
        label: 'Codigo',
      },
      {
        id: 'supplier',
        label: 'Fornecedor',
      },
      {
        id: 'product.category.name',
        label: 'Categoria',
      },
      {
        id: 'amount',
        label: 'Stock',
      },
      {
        id: 'actions',
        numeric: true,
        label: 'Ações',
      },
    ];

    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Stock',
        href: `${routes.private.internal.stocks}`,
      },
    ];

    const detailPage = routes.private.internal.stockId;

    const props = {
      categories,
      items,
      breadcrumbsPath,
      detailPage,
      headCells,
      products,
    };

    return <StockScreen {...props} />
  } else return <Loader center={true} />

};

Stock.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array,
  headCells: PropTypes.array,
  products: PropTypes.array,
};

export default Stock;
