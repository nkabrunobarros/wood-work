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
import * as BudgetsActions from './api/actions/budget';
import * as ExpeditionActions from './api/actions/expedition';
import * as ProjectsActions from './api/actions/project';

const Messages = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [chats, setChats] = useState();

  useEffect(() => {
    async function load () {
      const test = [];

      await BudgetsActions.myBudgets().then((response) => {
        // eslint-disable-next-line array-callback-return
        response.data.map(item => {
          test.push({
            filterName: item.name.value,
            id: item.id,
            category: { ...item.category },
            name: { ...item.name },
            Nome: item.name.value,
            amount: { ...item.amount },
            statusClient: { type: 'Property', value: item.status.value },
            Estado: 'Espera Confirmação',
            messages: [],
          });
        });
      });

      await ExpeditionActions.expeditions().then(async (expResponse) => {
        //  Get projects and build
        await ProjectsActions.myProjects().then((response) => {
          console.log(response);

          // eslint-disable-next-line array-callback-return
          response.data.filter(ele => ele.status.value !== 'finished')
            .map((proj, index) => {
              // const thisClient = responseClients.data.find(ele => ele.id === proj.orderBy.object);
              response.data[index].expedition.object = expResponse.data.find(exp => exp.id.toLowerCase().replace('project', 'expedition') === proj.expedition.object.toLowerCase());
              response.data[index].messages = [];
              response.data[index].filterName = proj.name.value;
              test.push(response.data[index]);
            });

          setChats(test);
        });
      });
    }

    Promise.all([load()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const conversations = [
      {
        id: 1,
        users: ['cl16o9cag0000x3tqp8lbslcr', '123'],
        orderId: 12312,
        messages: [1234, 123, 12345],
        messagesContent: [],
        message: '',
        createdAt: '',
      },
      {
        id: 1,
        users: ['cl16o9cag0000x3tqp8lbslcr', '123'],
        orderId: 456,
        messages: [1234],
        messagesContent: [],
        message: '',
        createdAt: '',
      },
    ];

    const messagsContents = [
      {
        id: 1234,
        sentBy: '123',
        content: 'Hi, i would like to know the Eta of my order please? Thank you',
        createdAt: '2022-10-21T10:30:56+01:00',
        type: 'text'
      },
      {
        id: 123,
        sentBy: 'cl16o9cag0000x3tqp8lbslcr',
        content: 'Hi, the expected time of arrivel for your order is within 1 week, thank you',
        createdAt: '2022-10-21T12:30:56+01:00',
        type: 'text'
      },
      {
        id: 12345,
        sentBy: '123',
        content: 'Ok thank you',
        createdAt: '2022-10-21T12:30:56+01:00',
        type: 'text'
      },
    ];

    conversations.forEach((conversation, i) => {
      conversation.messages.forEach((message) => {
        const messageContent = messagsContents.find((element) => element.id === message);

        conversations[i].messagesContent.push(messageContent);
      });

      conversation.message =
        conversation.messagesContent[
          conversation.messagesContent.length - 1
        ].content;

      conversation.createdAt =
        conversation.messagesContent[
          conversation.messagesContent.length - 1
        ].createdAt;
    });

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
      conversations,
      pageProps,
      chats
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
