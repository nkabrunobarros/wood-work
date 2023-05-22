//  Nodes
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Preloader
import Loader from '../../components/loader/loader';

//  Page Component
import OrdersScreen from '../../components/pages/ordersSimilar/projects-similar';

//  PropTypes

//  Navigation
import routes from '../../navigation/routes';

//  Services
import moment from 'moment/moment';
import displayDateDifference from '../../components/utils/DisplayDateDifference';
import AuthData from '../../lib/AuthData';
import * as assemblyActionsRedux from '../../store/actions/assembly';
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as furnituresActionsRedux from '../../store/actions/furniture';
import * as projectsActionsRedux from '../../store/actions/project';
import * as workerTasksActionsRedux from '../../store/actions/workerTask';

//  Utils

const OrdersSimilar = () => {
  //  Data States
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState();
  const [datesDiferencesFormat, setDatesDiferencesFormat] = useState('days');
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
  const getExpedition = (data) => dispatch(expeditionsActionsRedux.expedition(data));
  const getFurnitures = (data) => dispatch(furnituresActionsRedux.furnitures(data));
  const getWorkerTasks = (data) => dispatch(workerTasksActionsRedux.workerTasks(data));
  const getAssembly = (data) => dispatch(assemblyActionsRedux.assembly(data));

  function getTaskTimeRange (tasks) {
    const startTimes = tasks.map(task => moment(task.startTime.value, 'DD/MM/YYYY HH:mm:ss'));
    const finishTimes = tasks.map(task => moment(task.finishTime.value, 'DD/MM/YYYY HH:mm:ss'));
    const minStartTime = new Date(Math.min(...startTimes));
    const maxFinishTime = new Date(Math.max(...finishTimes));

    return { minStartTime: moment(minStartTime).format('DD/MM/YYYY HH:mm'), maxFinishTime: moment(maxFinishTime).format('DD/MM/YYYY HH:mm') };
  }

  useEffect(() => {
    async function getData () {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
      !reduxState.clients.data && await getClients();
      !reduxState.expeditions.data && await getExpeditions();
      !reduxState.budgets.data && await getBudgets();

      const projects = (await getProjects()).data;

      const projectBudgets = await Promise.all(projects?.map(async (project) => {
        const [budgetData, assemblyData, expeditionData, furnituresData, clientData] = await Promise.all([
          getBudget(project.hasBudget.object),
          getAssembly(project.assembly.object),
          getExpedition(project.expedition.object),
          getFurnitures({ hasBudget: project.hasBudget.object, furnitureType: 'furniture' }),
          getClient(project.orderBy.object.replace('urn:ngsi-ld:Owner:', ''))
        ]);

        const { data: logsWorkerTasks } = await getWorkerTasks({ onProject: project.id });
        const budget = budgetData.data;
        const expedition = expeditionData.data;
        const assembly = assemblyData.data;

        const furnitures = [...furnituresData.data]
          .sort((a, b) => (a.lineNumber?.value > b.lineNumber?.value) ? 1 : -1)
          .map((furni) => {
            const { minStartTime, maxFinishTime } = getTaskTimeRange(logsWorkerTasks.filter(ele => ele.onFurniture?.value === furni.id));

            return {
              ...furni,
              beginProd: { value: minStartTime !== 'Invalid date' ? minStartTime : '' },
              endProd: { value: maxFinishTime !== 'Invalid date' ? maxFinishTime : '' },
            };
          });

        const client = clientData.data;
        const projCreated = moment(project.createdAt);
        const predicted = displayDateDifference(projCreated, budget?.dateDeliveryProject?.value);
        const done = displayDateDifference(projCreated, expedition?.deliveryTime?.value);
        const desvio = displayDateDifference(projCreated, budget?.dateDeliveryProject?.value);

        return {
          ...project,
          begin: { value: moment(project.createdAt).format('DD/MM/YYYY') },
          end: { value: expedition?.expeditionTime?.value ? moment(expedition?.expeditionTime?.value, 'DD/MM/YYYY hh:mm:ss').format('DD/MM/YYYY') : '' },
          beginAssembly: { value: assembly?.startTime.value },
          endAssembly: { value: assembly?.finishTime.value },
          budget,
          predicted,
          done,
          client,
          assembly,
          furnitures,
          desvio,
          Desvio: desvio,
          Realizado: done,
          Número: budget.num.value,
          Nome: project.name.value,
          ClienteLabel: client.user.first_name + ' ' + client.user.last_name,
          Cliente: client.id,
          Previsto: predicted,
          Quantidade: project.amount.value,
          Inicio: moment(project.createdAt).format('DD/MM/YYYY'),
          Fim: expedition?.expeditionTime?.value ? moment(expedition?.expeditionTime?.value, 'DD/MM/YYYY hh:mm:ss').format('DD/MM/YYYY') : '',
        };
      }));

      setProjects(projectBudgets);
    }

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && reduxState.projects.data) {
    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Projetos Similares',
        href: `${routes.private.internal.projectsSimilar}`,
      },
    ];

    const detailPage = routes.private.internal.project;
    const editPage = routes.private.internal.editProject;
    const clients = [...reduxState.clients?.data ?? []];

    const projects1 = [...reduxState.projects.data]?.map(
      // eslint-disable-next-line array-callback-return
      (item) => {
        const item2 = { ...item };
        const thisClient = clients.find(ele => ele.id === item.orderBy.object.replace('urn:ngsi-ld:Owner:', ''));
        const thisExpedition = reduxState.expeditions?.data.find((ele) => ele.id === item?.expedition?.object);
        const thisBudget = reduxState.budgets?.data.find((ele) => ele.id === item?.hasBudget?.object);
        const projAgreedDelivery = moment(thisBudget?.dateDeliveryProject?.value, 'DD/MM/YYYY');
        const projCreated = moment(item.createdAt);
        const projDelivered = moment(thisExpedition?.expeditionTime?.value, 'DD/MM/YYYY');

        // data[i].desvio = formatNum(item.previsto, item.realizado)
        item2.operacao = item.status.value;
        item2.previsto1 = `${projCreated.diff(projAgreedDelivery, datesDiferencesFormat) * -1 || 0} ${datesDiferencesFormat === 'days' ? 'dia(s)' : 'hora(s)'}`;
        item2.realizado1 = `${projCreated.diff(projDelivered, datesDiferencesFormat) || 0} ${datesDiferencesFormat === 'days' ? 'dia(s)' : 'hora(s)'}`;
        item2.desvio = (projCreated.diff(projAgreedDelivery, datesDiferencesFormat) * -1 || 0) - (projCreated.diff(projDelivered, datesDiferencesFormat) || 0);
        item2.previstoAtual = 20;
        item2.previsto2 = 0;
        item2.realizado2 = '2 hora(s)';
        item2.desvio2 = -2;
        item2.Custo = '20€';
        item2.Nome = item?.name.value;
        item2.Cliente = (thisClient?.user?.first_name || '') + ' ' + (thisClient?.user?.last_name || '');

        return item2;
      }
    );

    //  Page Props
    const props = {
      items: projects1,
      projects,
      breadcrumbsPath,
      detailPage,
      editPage,
      clients: [...reduxState.clients?.data].map(client => {
        const client2 = { ...client };

        client2.Nome = client.user.first_name + ' ' + client.user.last_name;
        client2.Email = client.user.email;

        return client2;
      }),
      woodTypes: [],
      products: [],
      setDatesDiferencesFormat,
      datesDiferencesFormat
    };

    //  Verifies if all data as been loaded and set page to fully Loaded
    return <OrdersScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default OrdersSimilar;
