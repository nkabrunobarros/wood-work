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
import hasData from '../../components/utils/hasData';

//  Services
import stockService from '../../services/stocks/stock-service';
import productService from '../../services/products/product-service';
import categoryService from '../../services/categories/category-service';

const Stock = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  
  //  Sets minimum timer for loader to show 0.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  //  Data Fetching
  //  Gets products THEN gets the stocks of those products and injects properties codigo and categoria for display purposes only
  useEffect(() => {

    const getCategories = async () => {
      await categoryService.getAllCategories().then((res) => {
        setCategories(res.data.data);
      });
    };
    const getProducts = async () => {
      await productService.getAllProducts().then((res) => {
        setProducts(res.data.data);
        if (res.data.data) getStocks(res.data.data);
      });
    };
    const getStocks = async (products) => {
      await stockService.getAllStocks().then((res) => {
        const items = res.data.data;
        items.forEach((item, i) => {
          const prod = products.find((prod) => prod.id === item.productId);
          items[i].categoria = prod.category;
          items[i].codigo = prod.codigo;
        });
        setItems(items);
      });
    };
    const getData = async () => {
      await Promise.all([getProducts(), getCategories()]).then(
        (pageProps.hasFullyLoaded = true)
      );
    };
    getData();
  }, []);

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
  const props = {
    categories,
    items,
    breadcrumbsPath,
    detailPage,
    headCells,
    products,
  };
  if (hasData(items) && hasData(categories) && hasData(products))
    pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? (
    <StockScreen {...props} />
  ) : (
    <Loader center={true} />
  );
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
