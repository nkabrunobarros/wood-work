//  Nodes
import React, { useEffect, useState } from "react";

//  Preloader
import Loader from "../../components/loader/loader";
import OrdersScreen from "../../components/pages/ordersSimilar/orders-similar";

import PropTypes from "prop-types";

import routes from "../../navigation/routes";
import { getClients } from "../../components/mock/Clients";
import { getWoodTypes } from "../../components/mock/WoodTypes";
import { getProducts } from "../../components/mock/Products";
import hasData from "../../components/utils/hasData";
import orderService from "../../services/orders/order-service";

export async function getServerSideProps(context) {
  const clientsRes = await getClients();
  const woods = getWoodTypes();
  const prods = await getProducts();
  return {
    props: {
      clients: clientsRes,
      woodTypes: woods,
      products: prods,
    }, // will be passed to the page component as props
  };
}

const OrdersSimilar = ({
  clients,
  woodTypes,
  products,
  hasFullyLoaded,
  ...pageProps
}) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getAllOrders = async () => {
      await orderService.getAllOrders().then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        data.map(
          (item, i) =>
            (data[i].desvio = formatNum(item.previsto, item.realizado))
        );
        data.map(
          (item, i) =>
            (data[i].desvio2 = formatNum(item.previsto2, item.realizado2))
        );
        setOrders(data);
      });
    };
    getAllOrders();
  }, []);
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: "Encomendas Similares",
      href: `${routes.private.internal.ordersSimilar}`,
    },
  ];
  const headCellsUpper = [
    {
      id: "amountProduced",
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: "Quantidade Produzida:12 Un",
      span: 6,
    },
    {
      id: "orderAmount",
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: "Quantidade Encomendada:25 Un",
      span: 1,
    },
    {
      id: "perUnit",
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: "Por unidade",
      span: 5,
    },
  ];
  const headCells = [
    {
      id: "productId",
      numeric: false,
      disablePadding: false,
      label: "Nome",
    },
    {
      id: "cliente",
      numeric: false,
      disablePadding: true,
      label: "Cliente",
    },
    {
      id: "numero",
      numeric: false,
      disablePadding: false,
      label: "Num. Encomenda",
    },
    {
      id: "previsto",
      numeric: false,
      disablePadding: false,
      label: "Previsto",
    },
    {
      id: "realizado",
      numeric: false,
      disablePadding: false,
      label: "Realizado",
    },
    {
      id: "desvio",
      numeric: false,
      disablePadding: false,
      label: "Desvio",
    },
    {
      id: "horasAtuais",
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: "Horas Atuais",
    },
    {
      id: "previsto2",
      numeric: false,
      disablePadding: false,
      label: "Previsto",
    },
    {
      id: "custo",
      numeric: false,
      disablePadding: false,
      label: "Custo",
    },
    {
      id: "realizado2",
      numeric: false,
      disablePadding: false,
      label: "Realizado",
    },
    {
      id: "desvio2",
      numeric: false,
      disablePadding: false,
      label: "Desvio",
    },
    {
      id: "actions",
      numeric: true,
      disablePadding: false,
      label: "Ações",
    },
  ];

  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7,
  };

  function formatNum(val1, val2) {
    const res = val1 - val2;

    if (Number.isInteger(res)) return res;
    else return res.toFixed(2);
  }

  const detailPage = routes.private.order;

  const operations = [
    {
      label: "Corte",
      value: "Corte",
    },
    {
      label: "Montagem",
      value: "Montagem",
    },
    {
      label: "Colagem",
      value: "Colagem",
    },
  ];
  const items = orders;
  const props = {
    items,
    panelsInfo,
    breadcrumbsPath,
    detailPage,
    clients,
    woodTypes,
    products,
    operations,
    headCellsUpper,
    headCells,
  };
  if (
    hasData(items) &&
    hasData(clients) &&
    hasData(woodTypes) &&
    hasData(products)
  )
    pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded ? (
    <OrdersScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
OrdersSimilar.propTypes = {
  items: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string,
  clients: PropTypes.array,
  woodTypes: PropTypes.array,
  products: PropTypes.array,
  operations: PropTypes.array,
  headCellsUpper: PropTypes.array,
  headCells: PropTypes.array,
  hasFullyLoaded: PropTypes.bool,
};

export default OrdersSimilar;
