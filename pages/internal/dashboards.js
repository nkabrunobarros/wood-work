/* eslint-disable array-callback-return */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import DashboardScreen from '../../components/pages/dashboard/dashboard';
import routes from '../../navigation/routes';
import * as ClientsActions from '../../pages/api/actions/client';
import * as OrdersActions from '../../pages/api/actions/order';
import * as ProductsActions from '../../pages/api/actions/product';

const DashBoards = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [ordersInfo, setOrdersInfo] = useState();
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();


  useEffect(() => {
    const getData = async () => {
      const counts = {
        budgeting: 0,
        drawing: 0,
        production: 0,
        concluded: 0,
      };

      await OrdersActions.ordersProduction().then(async (response) => {

        response.data.payload.data.sort((a, b) => Date.parse(new Date(a.createdAt?.split("/").reverse().join("-"))) - Date.parse(new Date(b.createdAt?.split("/").reverse().join("-")))).map(async (ord) => {
          switch (ord.order.status.toLowerCase()) {
            case 'em orçamentação':
              counts.budgeting++;

              break;

            case 'em desenho':
              counts.drawing++;

              break;

            case 'em produçao':
              counts.production++;

              break;
            case 'concluida':
              counts.concluded++;

              break;

            default:
              break;
          }
          // await StockActions.stock({ id: ord.product.id }).then((res) => {
          //   response.data.payload.data[i].stock = res.data.payload.amount
          // })
        });

        setOrders(response.data.payload.data);
        setOrdersInfo(counts);
      });

      await ClientsActions.clients().then((response) => setClients(response.data));
      await ProductsActions.products().then((response) => setProducts(response.data.payload.data));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && typeof window !== 'undefined') {
    const breadcrumbsPath = [
      {
        title: 'Painel de Controlo',
        href: `${routes.private.internal.dashboards}`,
      }
    ];

    const arrDates = [];


    orders.map((order) => {
      if (!arrDates.find(ele => moment(ele).format('DD/MM/YYYY') === moment(order.createdAt).format('DD/MM/YYYY'))) arrDates.push(order.order.createdAt);
    });

    const arrValues = [];
    const arrValuesProdsPerDay = [];

    arrDates.map((date) => {
      const res = orders.filter((order) => moment(order.order.createdAt).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'));
      let thisAmount = 0;

      res.map((ord) => { thisAmount += ord.amount; });
      arrValues.push((Object.keys(res).length));
      arrValuesProdsPerDay.push(thisAmount);
    });


    const ordersDonut = {

      series: [ordersInfo.budgeting, ordersInfo.drawing, ordersInfo.production, ordersInfo.concluded],
      labels: ['Em Orçamentação', 'Em Desenho', 'Em Produção', 'Concluida'],
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      title: {
        text: 'Gradient Donut with custom Start-angle'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const ordersGraph = {
      series: [{
        name: 'Encomendas Cliente',
        data: arrValues
      }, {
        name: 'Total Produtos Encomendados',
        data: arrValuesProdsPerDay
      },
      ],
      options: {
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 50, 100]
          }
        },
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: arrDates
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      },

    };

    const props = {
      breadcrumbsPath,
      pageProps,
      ordersInfo,
      orders,
      ordersGraph,
      ordersDonut,
      clients,
      products
    };

    return loaded && <DashboardScreen {...props} />;
  } else return <Loader center={true} />;

};

DashBoards.propTypes = {

};

export default DashBoards;
