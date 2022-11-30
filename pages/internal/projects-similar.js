//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrdersScreen from '../../components/pages/ordersSimilar/projects-similar';

//  PropTypes

//  Navigation
import routes from '../../navigation/routes';

//  Services
import * as ClientsActions from '../api/actions/client';
import * as ProductsActions from '../api/actions/product';
import * as ProjectsActions from '../api/actions/project';
import * as WoodTypeActions from '../api/actions/woodtype';

//  Utils


const OrdersSimilar = () => {
  //  Data States
  const [orders, setOrders] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [woodTypes, setWoodTypes] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      await ProductsActions
        .products()
        .then((res) => setProducts(res.data))
        .catch(() => setProducts([]));

      await ClientsActions.clients()
        .then((res) => setClients(res.data))
        .catch(() => setClients([]));

      await WoodTypeActions
        .woodTypes()
        .then((res) => setWoodTypes(res.data.payload.data))
        .catch(() => setWoodTypes([]));

      await ProjectsActions.projects().then((res) => {
        const data = res.data;

        //  Calc desvios
        data.map(
          // eslint-disable-next-line array-callback-return
          (item, i) => {
            // data[i].desvio = formatNum(item.previsto, item.realizado)
            data[i].operacao = data[i].status.value;
            data[i].previsto1 = `${data[i]?.product?.craftTime * data[i]?.amount} H`;
            data[i].realizado1 = `${18} horas`;
            data[i].desvio = (data[i]?.product?.craftTime * data[i]?.amount) - 18;
            data[i].previstoAtual = 20;
            data[i].previsto2 = data[i]?.product?.craftTime;
            data[i].realizado2 = 2;
            data[i].desvio2 = - 2;
          }
        );

        setOrders(data);
      });
    };

    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {

    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos Similares',
        href: `${routes.private.internal.projectsSimilar}`,
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
        span: 5,
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
      // {
      //   id: 'id',
      //   numeric: false,
      //   disablePadding: false,
      //   label: 'Nome',
      // },
      {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Num. Encomenda',
      },
      {
        id: 'order.client.legalName',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
      },
      {
        id: 'product.craftTime',
        numeric: false,
        disablePadding: false,
        label: 'Previsto',
      },
      {
        id: 'realizado1',
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
        id: 'previstoAtual',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Horas Atuais',
      },
      {
        id: 'product.craftTime',
        numeric: false,
        disablePadding: false,
        label: 'Previsto',
      },
      {
        id: 'product.cost',
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

    const detailPage = routes.private.internal.project;
    const editPage = routes.private.internal.editProject;

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
    return <OrdersScreen {...props} />;
  } else return <Loader center={true} />;
};


export default OrdersSimilar;
