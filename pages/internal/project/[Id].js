//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component

//  Navigation
import routes from '../../../navigation/routes';

//  Page Component
import OrderScreen from '../../../components/pages/project/project';

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
  const [productionDetail, setProductionDetail] = useState();

  //  Dummy
  const productionDetailRes = [
    {
      id: 'MC_MUEBLETV_A1_PAINEL3_NEST',
      operation: 'nest',
      machineId: '123 nest',
      workerId: 'urn:ngsi-ld:Worker:112',
      startedAt: '2023-01-05T14:34:46.279Z',
      partId: 'MC_MUEBLETV_A1_PAINEL3',
    },
    {
      id: 'MC_MUEBLETV_A2_CIMA_NEST',
      operation: 'nest',
      machineId: '123 nest',
      workerId: 'urn:ngsi-ld:Worker:112',
      startedAt: '2023-01-05T14:34:48.718Z',
      partId: 'MC_MUEBLETV_A2_CIMA',
      endedAt: '2023-01-05T14:34:49.755Z',
    },
    {
      id: 'MC_MUEBLETV_A2_CIMA_CNC',
      operation: 'cnc',
      machineId: '123 cnc',
      workerId: 'urn:ngsi-ld:Worker:112',
      startedAt: '2023-01-05T14:34:50.275Z',
      partId: 'MC_MUEBLETV_A2_CIMA',
    },
  ];

  //  Dummy
  const projectParts = [
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 1, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', qtd: 1, comp: 400, larg: 338.5, esp: 10, tag: 2, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 3, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 4, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 5, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 6, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 7, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 326.5, larg: 184.5, esp: 16, tag: 8, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 9, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 1, comp: 406, larg: 207.5, esp: 16, tag: 10, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', qtd: 1, comp: 2400, larg: 926, esp: 19, tag: 11, nest: false, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 12, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', qtd: 8, comp: 940, larg: 70, esp: 19, tag: 13, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 14, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19, tag: 15, nest: true, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19, tag: 16, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19, tag: 17, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 18, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 268, larg: 444, esp: 19, tag: 19, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1678, larg: 444, esp: 19, tag: 20, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 21, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 400, larg: 283, esp: 19, tag: 22, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 23, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 444, larg: 287, esp: 19, tag: 24, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 924, larg: 283, esp: 19, tag: 25, nest: true, cnc: true, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 907, larg: 76, esp: 19, tag: 26, nest: true, cnc: false, obs: '', inProduction: false },
  ];

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

      //  Build production Detail
      const builtLogs = [];

      productionDetailRes.map((log) => {
        console.log(log);

        const a = log;

        a.part = projectParts.find((p) => p.ref === log.partId);
        console.log(log);
        builtLogs.push(log);
      });

      setProductionDetail(builtLogs);
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
      projectParts,
      parts,
      workers,
      folders: [],
    };

    return <OrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Order;
