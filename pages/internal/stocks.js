//  Nodes
import React, { useEffect, useState } from "react";

//  Preloader
import Loader from "../../components/loader/loader";
import StockScreen from "../../components/pages/stocks/stocks";

import PropTypes from "prop-types";

import { getCategories } from "../../components/mock/Categories";
import routes from "../../navigation/routes";
import hasData from "../../components/utils/hasData";
import stockService from "../../services/stocks/stock-service";
import { getProducts } from "../../components/mock/Products";

//  Page Component
export async function getServerSideProps(context) {
  const res2 = getCategories();
  const res = await getProducts();

  return {
    props: { products: res, allCategories: res2 }, // will be passed to the page component as props
  };
}

const Stock = ({ products, allCategories, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState();
  // const [products, setProducts] = useState();
  const categories = allCategories;
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);
  useEffect(() => {
    // const getProducts = async () => {
    //   await productService.getAllProducts().then((productsRes) => {
    //     const prods = productsRes.data.data;
    //     console.log(typeof prods);
    //     setProducts(prods);
    //     getStocks(prods);
    //   });
    // };
    const getStocks = async () => {
      await stockService.getAllStocks().then((res) => {
        const items = res.data.data;
        items.forEach((item, i) => {
          const prod = products.find((prod) => prod.id === item.productId);
          items[i].categoria = prod.category;
          items[i].prodName = prod.nome;
          items[i].codigo = prod.codigo;
        });
        setItems(items);
      });
    };
    const getData = async () => {
      await Promise.all([getProducts()]).then(
        (pageProps.hasFullyLoaded = true)
      );
    };
    getData();
    getProducts();
    getStocks();
  }, []);

  const headCells = [
    {
      id: "prodName",
      label: "Nome",
      width: "20%",
    },
    {
      id: "codigo",
      label: "Codigo",
    },
    {
      id: "fornecedor",
      label: "Fornecedor",
    },
    {
      id: "categoria",
      label: "Categoria",
    },
    {
      id: "stock",
      label: "Stock",
    },
    {
      id: "actions",
      numeric: true,
      label: "Ações",
    },
  ];

  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: "Stock",
      href: `${routes.private.internal.stocks}`,
    },
  ];
  const detailPage = routes.private.internal.stockId;
  console.log(items);
  const props = {
    categories,
    items,
    breadcrumbsPath,
    detailPage,
    headCells,
    products,
  };
  // console.log(items);
  // console.log(categories);
  // console.log(products);
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
  allCategories: PropTypes.array,
  orders: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array,
  headCells: PropTypes.array,
  products: PropTypes.array,
};

export default Stock;
