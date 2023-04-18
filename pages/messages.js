/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../components/loader/loader';
import MessagesScreen from '../components/pages/messages/messages';

import PropTypes from 'prop-types';
import routes from '../navigation/routes';

//  Page Component
//  Data services
import { useDispatch } from 'react-redux';
import * as budgetsActionsRedux from '../store/actions/budget';
import * as projectsActionsRedux from '../store/actions/project';

const Messages = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [merged, setMerged] = useState();
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.activebudgets(data));
  const getBudget = (data) => dispatch(budgetsActionsRedux.budget(data));

  useEffect(() => {
    async function load () {
      try {
        const projects = await getProjects();

        projects.data.map(async (project) => {
          const proj = { ...project };

          await getBudget(project.hasBudget.object).then((res) => {
            proj.hasBudget = res.data;
            proj.name = { value: res.data.name.value };
          });
        });

        const budgetsRes = await getBudgets();

        const budgets = budgetsRes.data.map((budget) => {
          const bud = { ...budget };

          bud.name = { ...bud.name, value: bud.name.value };

          return bud;
        });

        setMerged([...projects.data, ...budgets]);
      } catch (err) {
        console.log(err);
      }
    }

    Promise.all([load()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const headCellsMessages = [
      {
        id: 'message',
        label: 'Mensagem',
      },
      {
        id: 'createdAt',
        label: 'Data',
      },
      {},
    ];

    const breadcrumbsPath = [
      {
        title: 'Mensagens',
        href: `${routes.private.messages}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      headCellsMessages,
      pageProps,
      // eslint-disable-next-line consistent-return
      chats: [...merged].filter((item) => {
        if (item.status?.value === 'adjudicated' || item.status?.value === 'canceled') {
          console.log();
        } else return item;
      }).map((item) => {
        const item2 = { ...item };

        item2.filterName = `${item.name.value.replace(/_/g, ' ')}`;

        return item2;
      }),
    };

    return <MessagesScreen {...props} />;
  }

  return <Loader center={true} />;
};

Messages.propTypes = {
  dummy: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  headCellsMessages: PropTypes.array,
  conversations: PropTypes.array,
  pageProps: PropTypes.any,

};

export default Messages;
