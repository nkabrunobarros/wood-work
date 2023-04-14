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

            newObj.rowType = { value: 'furniture', error: '', hidden: true };

            //  add required's
            if (key === 'name' || key === 'amount') {
              newObj[key].required = true;
            }

            //  add hidden's
            if (key === 'id' || key === 'category' || key === 'group' || key === 'hasBudget' || key === 'num' || key === 'rowType' || key === 'type' || key === 'section') {
              newObj[key].hidden = true;
            }

            //  Add labels
            switch (key) {
            case 'amount': newObj[key].label = 'Quantidade';

              break;
            case 'price': newObj[key].label = 'Valor';

              break;
            case 'name': newObj[key].label = 'Nome';

              break;
            case 'description': newObj[key].label = 'Descrição';

              break;
            case 'obs': newObj[key].label = 'Observações';

              break;
            case 'width': newObj[key].label = 'Largura';

              break;
            case 'height': newObj[key].label = 'Altura';

              break;
            case 'thickness': newObj[key].label = 'Profundidade';

              break;
            }

            //  Add types
            switch (key) {
            case 'amount': newObj[key].type = 'number';

              break;
            case 'price': newObj[key].type = 'currency';

              break;
            case 'name': newObj[key].type = 'Nome';

              break;
            case 'description': newObj[key].type = 'area';

              break;
            case 'obs': newObj[key].type = 'area';

              break;
            }
          } else {
            newObj[key] = value;
          }

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
        href: `${routes.private.internal.budget + budget.id}`,
      },
      {
        title: 'Editar projeto',
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
      countries: [...reduxState.countries.data],
      furnitures,
      budget
    };

    return <EditProjectScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditProject;
