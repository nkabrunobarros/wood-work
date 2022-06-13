//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';
import StockScreen from '../../components/pages/stocks/stocks';

import PropTypes from 'prop-types';

import { getCategories } from '../../components/mock/Categories';
import { getStock } from '../../components/mock/Stock';
import routes from '../../navigation/routes';
import { getProduct, getProducts } from '../../components/mock/Products';
import hasData from '../../components/utils/hasData';

//  Page Component
export async function getServerSideProps(context) {
  const res = await getStock();
  const res2 = getCategories();
  const res3 = getProducts();

  return {
    props: { allStock: res, allCategories: res2, products: res3 }, // will be passed to the page component as props
  };
}

const Stock = ({ allStock, allCategories, products, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const categories = allCategories;
  const items = allStock;
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  items.forEach((item, i) => {
    const prod = getProduct(item.productId);
    items[i].categoria = prod.category;
    items[i].categoria = prod.category;
  });
  const headCells = [
    {
      id: 'productId',
      label: 'Nome',
      width: '20%',
    },
    {
      id: 'codigo',
      label: 'Codigo',
    },
    {
      id: 'fornecedor',
      label: 'Fornecedor',
    },
    {
      id: 'categoria',
      label: 'Categoria',
    },
    {
      id: 'stock',
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

  items.forEach((element, i) => {
    const res = getProduct(element.productId);
    items[i].codigo = res.codigo;
  });

  const props = {
    categories,
    items,
    breadcrumbsPath,
    detailPage,
    headCells,
    products,
  };
  if (
    hasData(items) &&
    hasData(categories) &&
    hasData(products)
  )
    pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? <StockScreen {...props} /> : <Loader center={true} />;
};
Stock.propTypes = {
  categories: PropTypes.array,
  allCategories: PropTypes.array,
  orders: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array,
  headCells: PropTypes.array,
  products: PropTypes.array,
};

export default Stock;
