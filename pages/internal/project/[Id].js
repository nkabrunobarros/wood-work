/* eslint-disable array-callback-return */
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

import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../../lib/AuthData';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as clientsActionsRedux from '../../../store/actions/client';
import * as expeditionsActionsRedux from '../../../store/actions/expedition';
import * as filesActionsRedux from '../../../store/actions/file';
import * as foldersActionsRedux from '../../../store/actions/folder';
import * as projectsActionsRedux from '../../../store/actions/project';
import { categories } from '../new-project';

const Order = ({ ...pageProps }) => {
  const reduxState = useSelector((state) => state);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [productionDetail, setProductionDetail] = useState();
  const [folders, setFolders] = useState();
  const dispatch = useDispatch();
  const getProject = (data) => dispatch(projectsActionsRedux.project(data));
  const setDisplayedProject = (data) => dispatch(projectsActionsRedux.setDisplayedProject(data));
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const getExpedition = (data) => dispatch(expeditionsActionsRedux.expedition(data));
  const getFolders = (data) => dispatch(foldersActionsRedux.folders(data));
  const getFiles = (data) => dispatch(filesActionsRedux.budgetFiles(data));

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
    { ref: 'MC_MUEBLETV_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', qtd: 1, comp: 2400, larg: 926, esp: 19, tag: 11, nest: false, cnc: 'done', obs: '', inProduction: 'done' },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 12, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', qtd: 8, comp: 940, larg: 70, esp: 19, tag: 13, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', qtd: 8, comp: 540, larg: 70, esp: 19, tag: 14, nest: false, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19, tag: 15, nest: true, cnc: false, obs: '', inProduction: false },
    { ref: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19, tag: 16, nest: true, cnc: true, obs: '', inProduction: true },
    { ref: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19, tag: 17, nest: true, cnc: true, obs: '', inProduction: true },
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
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      const project = (await getProject(router.query.Id)).data;
      const expedition = (await getExpedition(project.expedition.object)).data;
      const budget = (await getBudget(project.budgetId.object)).data;
      const client = (await getClient(project.orderBy.object)).data;

      getFolders().then(async (res) => {
        const builtFolders = [];
        const resFiles = await getFiles(router.query.Id.replace('Project', 'Budget'));

        res.data.results.map((folder) => {
          const folder2 = { ...folder };

          folder2.files = resFiles.data.results.filter((file) => file.budget === project.budgetId.object && file.folder === folder.id);
          builtFolders.push(folder2);
        });

        setFolders(builtFolders);
      });

      //  Build production Detail
      const builtLogs = [];

      productionDetailRes.map((log) => {
        const a = log;

        a.part = projectParts.find((p) => p.ref === log.partId);
        builtLogs.push(log);
      });

      setProductionDetail(builtLogs);

      const thisOrder = JSON.parse(JSON.stringify({ ...project }));

      thisOrder.budgetId.object = budget;
      thisOrder.orderBy.object = client;
      thisOrder.expedition = expedition;
      setDisplayedProject(thisOrder);
    };

    Promise.all([getData()])
      .then(() => setLoaded(true));
  }, []);

  if (loaded &&
    reduxState.projects.displayedProject && folders
  ) {
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
        label: `Quantidade Pedida: ${reduxState.projects.displayedProject?.amount?.value} Un`,
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
        label: `Quantidade Produzida: ${reduxState.projects.displayedProject?.completed || 0} Un`,
        span: 4,
      },
      {
        id: 'orderedAmount',
        numeric: false,
        disablePadding: false,
        borderLeft: true,
        borderRight: true,
        label: `Quantidade Pe: ${reduxState.projects.displayedProject?.amount?.value} Un`,
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
        title: 'Pedidos',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: `${reduxState.projects.displayedProject?.name?.value}`,
        href: `${routes.private.internal.project}`,
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
      order: reduxState.projects.displayedProject,
      breadcrumbsPath,
      headCellsUpperProductionDetail,
      headCellsProductionDetail,
      headCellsUpperOrderDetail,
      headCellsOrderDetail,
      headCellsMessages,
      productionDetail,
      headCellsDocs,
      pageProps,
      projectParts,
      parts,
      workers: [],
      folders,
      categories,
      finishProject: router.query.finishProject
    };

    return <OrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Order;
