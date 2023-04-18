//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditProjectScreen from '../../../components/pages/editBudget/editBudget';

//  Navigation
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../../../lib/AuthData';
import routes from '../../../navigation/routes';
import * as budgetsActionsRedux from '../../../store/actions/budget';
import * as clientsActionsRedux from '../../../store/actions/client';
import * as countriesActionsRedux from '../../../store/actions/country';
import * as furnituresActionsRedux from '../../../store/actions/furniture';

export const categories = [
  { label: 'Cozinha', id: 'MC_' },
  { label: 'Quarto', id: 'MQ_' },
  { label: 'Banheiro', id: 'MB_' },
  { label: 'Garagem', id: 'MG_' },
  { label: 'Varanda', id: 'MV_' },
  { label: 'Sala de estar', id: 'MS_' }
];

const EditProject = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getClient = (data) => dispatch(clientsActionsRedux.client(data));
  const setCountries = (data) => dispatch(countriesActionsRedux.setCountries(data));
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));
  const getFurnitures = (data) => dispatch(furnituresActionsRedux.furnitures(data));
  const setDisplayingBudget = (data) => dispatch(budgetsActionsRedux.setDisplayingBudget(data));
  const router = useRouter();
  const [furnitures, setFurnitures] = useState();
  const [budget, setBudget] = useState();

  useEffect(() => {
    const getData = async () => {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);

      if (!reduxState.budgets.data) await getBudgets();

      if (!reduxState.clients.data) await getClients();

      !reduxState.countries.data && await axios.get('https://restcountries.com/v3.1/all').then(async (res) => await setCountries(res.data));

      const budget = (await getBudget(router.query.Id)).data;
      const client = (await getClient(budget.orderBy.object.replace('urn:ngsi-ld:Owner:', ''))).data;
      const furnitures = (await getFurnitures()).data.filter(ele => ele.hasBudget?.value === router.query.Id);
      const thisBudget = JSON.parse(JSON.stringify({ ...budget }));

      const groups = furnitures.reduce((accumulator, item) => {
        const groupName = item.group.value;

        if (!accumulator[groupName]) {
          accumulator[groupName] = {
            id: `group${Object.keys(accumulator).length}`,
            rowType: 'group',
            name: groupName,
            items: []
          };
        }

        // Replace the lower level of property's "type" and "value" with just "value"
        const newItem = Object.entries(item).reduce((newObj, [key, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value) {
            newObj[key] = {
              value: value.value,
              error: '',
            };

            newObj = {
              rowType: { ...newObj.rowType, value: 'furniture', error: '', hidden: true },
              name: { ...newObj.name, id: 'name', error: '', required: true, label: 'Nome' },
              description: { ...newObj.description, id: 'description', error: '', label: 'Descrição', type: 'area' },
              amount: { ...newObj.amount, id: 'amount', error: '', required: true, label: 'Quantidade', type: 'number' },
              obs: { ...newObj.obs, id: 'obs', error: '', label: 'Observações', type: 'area' },
              width: { ...newObj.width, id: 'width', error: '', label: 'Largura' },
              height: { ...newObj.height, id: 'height', error: '', label: 'Altura' },
              thickness: { ...newObj.thickness, id: 'thickness', error: '', label: 'Profundidade' },
              price: { ...newObj.price, id: 'price', error: '', label: 'Valor', type: 'currency' },
              category: { ...newObj.category, hidden: true, id: 'category', error: '', options: categories, label: 'Categoria' },

              section: { ...newObj.category, hidden: true },
              hasBudget: { ...newObj.hasBudget, hidden: true },
              group: { ...newObj.group, hidden: true },
              num: { ...newObj.num, hidden: true },
            };

            console.log(newObj);
          } else {
            newObj[key] = value;
          }

          newObj.id = item.id;

          return newObj;
        }, {});

        accumulator[groupName].items.push(newItem);

        return accumulator;
      }, {});

      const result = Object.values(groups);

      setFurnitures(result);
      thisBudget.orderBy.object = client;
      setBudget(thisBudget);
      setDisplayingBudget(thisBudget);
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Projetos',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: `${budget.name.value}`,
        href: `${routes.private.internal.budget}${budget.id}`,
      },
      {
        title: 'Editar',
        href: `${routes.private.internal.budget}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      pageProps,
      budgets: reduxState.budgets.data,
      clients: [...reduxState.clients?.data ?? []].map((client) => {
        return {
          ...client,
          Nome: client.user.first_name + ' ' + client.user.last_name + ' - ' + client.user.email,
          Email: client.user.email,
        };
      }),
      categories,
      countries: [...reduxState?.countries?.data || []],
      furnitures,
      budget
    };

    return <EditProjectScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditProject;
