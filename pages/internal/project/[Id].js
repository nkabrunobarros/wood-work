//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import OrderScreen from '../../../components/pages/project/project';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as BudgetsActions from '../../api/actions/budget';
import * as ClientsActions from '../../api/actions/client';
import * as ExpeditionsActions from '../../api/actions/expedition';
import * as ProjectsActions from '../../api/actions/project';
import * as WorkerActions from '../../api/actions/worker';

const Order = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState();
  const router = useRouter();
  const [workers, setWorkers] = useState();

  useEffect(() => {
    const getData = async () => {
      await ProjectsActions.project({ id: router.query.Id }).then(async (res) => {
        const thisOrder = res.data[0];

        await BudgetsActions.budget({ id: thisOrder.budgetId?.object || thisOrder.orderBy?.object }).then(async (resBudget) => {
          thisOrder.budgetId.object = resBudget.data[0];

          await ClientsActions.client({ id: resBudget.data[0]?.belongsTo?.object }).then(async (clientRes) => {
            thisOrder.orderBy = { object: clientRes.data[0] };
          });

          await ExpeditionsActions.expedition({ id: thisOrder.expedition.object }).then(async (expeditionRes) => {
            thisOrder.expedition.object = expeditionRes.data[0];
          });

          setOrder(thisOrder);
        });
      });

      await WorkerActions.workers().then(async (workersRes) => setWorkers(workersRes.data));
    };

    Promise.all([getData()])
      .then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const headCellsUpperOrderDetail = [
      {
        id: 'deadline',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Data de Entrega',
        span: 2,
      },
      {
        id: 'production',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: 'Produção',
        span: 2,
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Encomendada: ${order?.amount?.value} Un`,
        span: 1,
      },
    ];

    const headCellsOrderDetail = [
      {
        id: 'startAt',
        label: 'Cliente',
      },
      {
        id: 'startAt',
        label: 'Real',
      },
      {
        id: 'startAt',
        label: 'Inicio',
        borderLeft: true,
      },
      {
        id: 'endAt',
        label: 'Fim',
        borderRight: true,
      },
      {
        id: 'time',
        disablePadding: false,
        label: 'Tempo',
      },
    ];

    const headCellsProductionDetail = [
      {
        id: 'operacao.value',
        label: 'Operação',
      },
      {
        id: 'previsto1.value',
        label: 'Previsto',
      },
      {
        id: 'realizado1.value',
        label: 'Realizado',
      },
      {
        id: 'desvio',
        label: 'Desvio',
      },
      {
        id: 'previstoAtual.value',
        label: 'Previsto (Atual)',
        borderLeft: true,
        borderRight: true,
      },
      {
        id: 'previsto2.value',
        label: 'Previsto',
      },
      {
        id: 'realizado2.value',
        label: 'Realizado',
      },
      {
        id: 'desvio2.value',
        label: 'Desvio',
      },
    ];

    const headCellsUpperProductionDetail = [
      {
        id: 'amountDone',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: `Quantidade Produzida: ${order?.completed || 0} Un`,
        span: 4,
      },
      {
        id: 'orderedAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: `Quantidade Encomendada: ${order?.amount?.value} Un`,
        span: 1,
      },
      {
        id: 'perUnit',
        numeric: false,
        disablePadding: false,
        borderLeft: false,
        borderRight: false,
        label: 'Por Unidade',
        span: 3,
      },
    ];

    const headCellsMessages = [
      {
        id: 'mensagem',
        label: 'Mensagem',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
    ];

    const headCellsDocs = [
      {
        id: 'nome',
        label: 'Nome',
        width: '80%',
      },
      {
        id: 'date',
        label: 'Data',
        width: '10%',
      },
      {
        id: 'actions',
        label: 'Ações',
        width: '10%',
      },
      {},
    ];

    const breadcrumbsPath = [
      {
        title: 'Projetos/Orçamentos',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: `Projeto ${order.name.value}`,
        href: `${routes.private.internal.project}`,
      },
    ];

    const orderDetail = [
      {
        id: Math.random(),
        startAt: order?.order?.startAt,
        real: '06 abril 2022',
        start: '17 março 2022',
        endAt: order?.order?.endAt,
        time: `${order?.product?.craftTime * order?.amount} H`,
      },
    ];

    // const productionDetail = [
    //   {
    //     operacao: order?.status,
    //     previsto1: `${order?.product?.craftTime * order?.amount} H`,
    //     realizado1: `${18} H`,
    //     desvio: (order?.product?.craftTime * order?.amount) - 18,
    //     previstoAtual: 20,
    //     previsto2: order?.product?.craftTime,
    //     realizado2: 2,
    //     desvio2: -2
    //   }
    // ];

    const productionDetail = [
      {
        startedAt: '2023-01-05T11:03:28.603Z',
        ref: 'MC_MUEBLETV_A1_PAINEL1',
        material: 'MDF Folheado Carv 19',
        tag: 15,
        inProduction: true,
        nestStarted: '2023-01-05T11:03:28.603Z',
        nestUsed: 'ab2',
        nestWorker: 'urn:ngsi-ld:Worker:112',
      },
      {
        startedAt: '2023-01-05T12:14:18.454Z',
        ref: 'MC_MUEBLETV_A1_PAINEL3',
        material: 'MDF Folheado Carv 19 CNC',
        tag: 16,
        inProduction: true,
        nestStarted: '2023-01-05T11:03:18.454Z',
        nestUsed: 'ab2',
        nestWorker: 'urn:ngsi-ld:Worker:112',
      },
      {
        startedAt: '2023-01-05T12:25:20.844Z',
        ref: 'MC_MUEBLETV_A2_CIMA',
        material: 'MDF Folheado Carv 19 CNC',
        tag: 17,
        inProduction: true,
        nestStarted: '2023-01-05T11:03:20.844Z',
        nestUsed: 'ab2',
        nestWorker: 'urn:ngsi-ld:Worker:112',
        nestEnded: '2023-01-05T11:03:21.440Z',
        endedAt: '2023-01-05T11:03:21.440Z',
        cncWorker: 'urn:ngsi-ld:Worker:112',
        cncUsed: 'ab1',
        cncStarted: '2023-01-05T11:03:22.105Z',
      },

    ];

    const parts = [
      {
        id: 'part:A1_PAINEL3',
        name: 'A1_PAINEL3',
        buildTime: 20
      },
      {
        id: 'part:A2_CIMA',
        name: 'A2_CIMA',
        buildTime: 60
      },
      {
        id: 'part:A1_PAINEL1',
        name: 'A1_PAINEL1',
        buildTime: 10
      },
    ];

    const props = {
      order,
      breadcrumbsPath,
      headCellsUpperProductionDetail,
      headCellsProductionDetail,
      headCellsUpperOrderDetail,
      headCellsOrderDetail,
      headCellsMessages,
      productionDetail,
      headCellsDocs,
      orderDetail,
      pageProps,
      parts,
      workers,
      folders: [],
    };

    return <OrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Order;
