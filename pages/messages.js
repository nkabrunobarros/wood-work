//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../components/loader/loader';
import MessagesScreen from '../components/pages/messages/messages';

import PropTypes from 'prop-types';
import routes from '../navigation/routes';

//  Page Component

const Messages = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  const conversations = [
    {
      id: 1,
      users: ['cl16o9cag0000x3tqp8lbslcr', 'cl98lcmni202362vfjr5avu1ph'],
      orderId: 12312,
      messages: [1234, 123, 12345, 12346, 12347],
      messagesContent: [],
      message: '',
      createdAt: '',
    },
  ];

  const messagsContents = [
    {
      id: 1234,
      sentBy: "cl98lcmni202362vfjr5avu1ph",
      content: 'Hi, i would like to know the Eta of my order please? Thank you',
      createdAt: '03/02/2022',
    },
    {
      id: 12345,
      sentBy: "cl98lcmni202362vfjr5avu1ph",
      content: 'Hi, i would like to know the Eta of my order please? Thank you',
      createdAt: '03/02/2022',
    },
    {
      id: 12346,
      sentBy: "cl98lcmni202362vfjr5avu1ph",
      content: 'Hi, i would like to know the Eta of my order please? Thank you',
      createdAt: '03/02/2022',
    },
    {
      id: 12347,
      sentBy: "cl98lcmni202362vfjr5avu1ph",
      content: 'Hi, i would like to know the Eta of my order please? Thank you',
      createdAt: '03/02/2022',
    },
    {
      id: 123,
      sentBy: '2',
      content:
        'Hi, the expected time of arrivel for your order is within 1 week, thank you',
      createdAt: '03/02/2022',
    },
    {
      id: 12345,
      sentBy: "cl98lcmni202362vfjr5avu1ph",
      content: 'Ok thank you',
      createdAt: '03/02/2022',
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
    pageProps
  };

  return loaded ? <MessagesScreen {...props} /> : <Loader center={true} />;
};

Messages.propTypes = {
  dummy: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  headCellsMessages: PropTypes.array,
  conversations: PropTypes.array,
  pageProps: PropTypes.any
};

export default Messages;
