//  Nodes
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import StockScreen from '../../../components/pages/stock/stock';

//  Navigation
import routes from '../../../navigation/routes';

//  Utils
import hasData from '../../../components/utils/hasData';

//  Services
import categoryService from '../../../services/categories/category-service';
import productService from '../../../services/products/product-service';
import stockService from '../../../services/stocks/stock-service';

const Stock = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState();
  const [stock, setStock] = useState();
  const router = useRouter();
  const stockId = router.query.Id;

  useEffect(() => {
    const getProduct = async (prodId) => {
      await productService
        .getProductById(prodId)
        .then((res) => setProduct(res.data.data));
    };
    const getAll = async () => {
      await stockService.getStockById(stockId).then((res) => {
        setStock(res.data.data);
        getProduct(res.data.data.productId);
      });
      await categoryService
        .getAllCategories()
        .then((res) => setCategories(res.data.data));
    };
    Promise.all([getAll()]).then(setLoaded(true));
    setTimeout(() => {}, 500);
  }, []);
  if (loaded) {
    const data = {
      categories,
    };
    const breadcrumbsPath = [
      {
        title: 'Stock',
        href: `${routes.private.internal.stocks}`,
      },
      {
        title: `${product.nome}`,
        href: `${routes.private.internal.stockId}`,
      },
    ];
    const props = {
      product,
      breadcrumbsPath,
      stock,
      data,
    };
    if (hasData(product) && hasData(data) && hasData(stock))
      pageProps.hasFullyLoaded = true;
    return pageProps.hasFullyLoaded && loaded ? (
      <StockScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default Stock;
