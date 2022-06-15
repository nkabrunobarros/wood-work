//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrdersScreen from '../../components/pages/ordersSimilar/orders-similar';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

//  Services
import orderService from '../../services/orders/order-service';
import clientService from '../../services/clients/client-service';
import productService from '../../services/products/product-service';
import woodTypeService from '../../services/woodtype/woodtype-service';

//  Utils
import hasData from '../../components/utils/hasData';

function formatNum(val1, val2) {
  const res = val1 - val2;

  if (Number.isInteger(res)) return res;
  else return res.toFixed(2);
}

const OrdersSimilar = ({ hasFullyLoaded, ...pageProps }) => {
  //  Data States
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [woodTypes, setWoodTypes] = useState();

  useEffect(() => {
    const getAll = async () => {
      await productService
        .getAllProducts()
        .then((res) => setProducts(res.data.data));
      await clientService
        .getAllClients()
        .then((res) => setClients(res.data.data));
      await woodTypeService
        .getAllWoodTypes()
        .then((res) => setWoodTypes(res.data.data));

      await orderService.getAllOrders().then((res) => {
        const data = res.data.data;
        //  Calc desvios
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
    Promise.all([getAll()]).then((pageProps.hasFullyLoaded = true));
  }, []);

  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas Similares',
      href: `${routes.private.internal.ordersSimilar}`,
    },
  ];
  //  Table upper cols
  const headCellsUpper = [
    {
      id: 'amountProduced',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Quantidade Produzida:12 Un',
      span: 6,
    },
    {
      id: 'orderAmount',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Quantidade Encomendada:25 Un',
      span: 1,
    },
    {
      id: 'perUnit',
      numeric: false,
      disablePadding: false,
      borderLeft: false,
      borderRight: false,
      label: 'Por unidade',
      span: 5,
    },
  ];
  //  Table lower cols
  const headCells = [
    {
      id: 'productId',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'cliente',
      numeric: false,
      disablePadding: true,
      label: 'Cliente',
    },
    {
      id: 'numero',
      numeric: false,
      disablePadding: false,
      label: 'Num. Encomenda',
    },
    {
      id: 'previsto',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'realizado',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'horasAtuais',
      numeric: false,
      disablePadding: false,
      borderLeft: true,
      borderRight: true,
      label: 'Horas Atuais',
    },
    {
      id: 'previsto2',
      numeric: false,
      disablePadding: false,
      label: 'Previsto',
    },
    {
      id: 'custo',
      numeric: false,
      disablePadding: false,
      label: 'Custo',
    },
    {
      id: 'realizado2',
      numeric: false,
      disablePadding: false,
      label: 'Realizado',
    },
    {
      id: 'desvio2',
      numeric: false,
      disablePadding: false,
      label: 'Desvio',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];
  const detailPage = routes.private.internal.order;
  const editPage = routes.private.internal.editOrder;
  //  Dummy Operation types
  const operations = [
    {
      label: 'Corte',
      value: 'Corte',
    },
    {
      label: 'Montagem',
      value: 'Montagem',
    },
    {
      label: 'Colagem',
      value: 'Colagem',
    },
  ];

  //  Convert main listing items to items var for coherence amongst pages
  const items = orders;

  //  Page Props
  const props = {
    items,
    breadcrumbsPath,
    detailPage,
    editPage,
    clients,
    woodTypes,
    products,
    operations,
    headCellsUpper,
    headCells,
  };

  //  Verifies if all data as been loaded and set page to fully Loaded
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
