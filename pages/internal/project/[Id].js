/* eslint-disable array-callback-return */
//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader

//  Page Component

//  Navigation
import routes from '../../../navigation/routes';

//  Page Component
import OrderScreen from '../../../components/pages/project/project';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader/loader';
import AuthData from '../../../lib/AuthData';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as clientsActionsRedux from '../../../store/actions/client';
import * as countriesActionsRedux from '../../../store/actions/country';
import * as expeditionsActionsRedux from '../../../store/actions/expedition';
import * as filesActionsRedux from '../../../store/actions/file';
import * as foldersActionsRedux from '../../../store/actions/folder';
import * as furnituresActionsRedux from '../../../store/actions/furniture';
import * as projectsActionsRedux from '../../../store/actions/project';

import axios from 'axios';
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
  const getFurnitures = (data) => dispatch(furnituresActionsRedux.furnitures(data));
  const [furnitures, setFurnitures] = useState();
  const setCountries = (data) => dispatch(countriesActionsRedux.setCountries(data));

  //  Dummy
  const productionDetailRes = [
    {
      id: 'MC_MUEBLETV_A1_PAINEL3_NEST',
      operation: 'nest',
      machineId: '123 nest',
      workerId: 'urn:ngsi-ld:Worker:worker_pAbaEjM8KBVzKdyw',
      startedAt: '2023-04-16T14:34:46.279Z',
      workerName: 'Bruno Barros',
      partId: 'MC_MUEBLETV_A1_PAINEL3',
    },
    {
      id: 'MC_MUEBLETV_A2_CIMA_NEST',
      partName: 'MC_MUEBLETV_A2_CIMA_NEST',
      operation: 'nest',
      machineId: '123 nest',
      workerId: 'urn:ngsi-ld:Worker:worker_pAbaEjM8KBVzKdyw',
      startedAt: '2023-04-1614:34:48.718Z',
      partId: 'MC_MUEBLETV_A2_CIMA',
      workerName: 'Bruno Barros',
      endedAt: '2023-04-16T14:34:49.755Z',
    },
    {
      id: 'MC_MUEBLETV_A2_CIMA_CNC',
      operation: 'cnc',
      machineId: '123 cnc',
      workerId: 'urn:ngsi-ld:Worker:worker_pAbaEjM8KBVzKdyw',
      workerName: 'Bruno Barros',
      startedAt: '2023-04-16T14:34:50.275Z',
      partId: 'MC_MUEBLETV_A2_CIMA',
    },
  ];

  //  Dummy
  const projectParts = [
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 1, nestingFlag: true, cncFlag: true, orla: true, f: true, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_FUNDO', material: 'AG L Biscuit Nude 36W 10 ', amount: 1, lenght: 400, width: 338.5, thickness: 10, tag: 2, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 3, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 4, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 5, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 6, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_COSTA', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 7, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRT_INT', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 326.5, width: 184.5, thickness: 16, tag: 8, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_DIR', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 9, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_LAT_ESQ', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 1, lenght: 406, width: 207.5, thickness: 16, tag: 10, nestingFlag: false, cncFlag: true, orla: false, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_PAINEL2', material: 'AG L Marmol Hades 19 CNC', amount: 1, lenght: 2400, width: 926, thickness: 19, tag: 11, nestingFlag: false, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_1', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 12, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_2', material: 'HDF 19 ', amount: 8, lenght: 940, width: 70, thickness: 19, tag: 13, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_RIPAS_SUP_ME_3', material: 'HDF 19 ', amount: 8, lenght: 540, width: 70, thickness: 19, tag: 14, nestingFlag: false, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_PAINEL1', material: 'MDF Folheado Carv 19', amount: 1, lenght: 2394, width: 560, thickness: 19, tag: 15, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A1_PAINEL3', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 2400, width: 566, thickness: 19, tag: 16, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_CIMA', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1716, width: 466, thickness: 19, tag: 17, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_DIV_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 18, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_DIV_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 268, width: 444, thickness: 19, tag: 19, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_FUNDO', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 1678, width: 444, thickness: 19, tag: 20, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_DIR_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 21, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_GAV_ESQ_FRENTE', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 400, width: 283, thickness: 19, tag: 22, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_LAT_DIR', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 23, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_LAT_ESQ', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 444, width: 287, thickness: 19, tag: 24, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_PORTA_BASC', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 924, width: 283, thickness: 19, tag: 25, nestingFlag: true, cncFlag: true, orla: true, f: false, obs: '', inProduction: false },
    { partName: 'MC_MUEBLETV_A2_RIPA_TRAS', material: 'MDF Folheado Carv 19 CNC', amount: 1, lenght: 907, width: 76, thickness: 19, tag: 26, nestingFlag: true, cncFlag: false, orla: true, f: false, obs: '', inProduction: false },
  ];

  useEffect(() => {
    const getData = async () => {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      const project = (await getProject(router.query.Id)).data;
      const expedition = (await getExpedition(project.expedition.object)).data;
      const budget = (await getBudget(project.hasBudget.object)).data;
      const furnitures = (await getFurnitures()).data.filter(ele => ele.hasBudget?.value === project.hasBudget.object);

      !reduxState.countries.data && await axios.get('https://restcountries.com/v3.1/all').then(async (res) => await setCountries(res.data));

      const groups = furnitures.reduce((accumulator, item) => {
        const groupName = item.group?.value;

        if (!accumulator[groupName]) {
          accumulator[groupName] = {
            id: `group${Object.keys(accumulator).length}`,
            name: groupName,
            items: []
          };
        }

        accumulator[groupName].items.push(item);

        return accumulator;
      }, {});

      const result = Object.values(groups);

      setFurnitures(result);

      const client = (await getClient(project.orderBy.object.replace('urn:ngsi-ld:Owner:', ''))).data;

      getFolders().then(async (res) => {
        const builtFolders = [];
        const resFiles = await getFiles(router.query.Id.replace('Project', 'Budget'));

        res.data.results.map((folder) => {
          const folder2 = { ...folder };

          folder2.files = resFiles.data.results.filter((file) => file.folder === folder.id);
          // folder2.files = resFiles.data.results.filter((file) => file.budget === project.hasBudget.object && file.folder === folder.id);
          builtFolders.push(folder2);
        });

        console.log(builtFolders);
        setFolders(builtFolders);
      });

      //  Build production Detail
      const builtLogs = [];

      productionDetailRes.map((log) => {
        const a = log;

        a.part = projectParts.find((p) => p.partName === log.partId);
        builtLogs.push(log);
      });

      setProductionDetail(builtLogs);

      const thisOrder = JSON.parse(JSON.stringify({ ...project }));

      thisOrder.hasBudget.object = budget;
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
        title: 'Projetos',
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

    console.log(furnitures);

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
      furnitures,
      finishProject: router.query.finishProject
    };

    return <OrderScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Order;
