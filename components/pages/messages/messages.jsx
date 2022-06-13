//  Nodes
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';
import { MessageSquare, Package } from 'lucide-react';

import styles from '../../../styles/Messages.module.css';
import {
  Avatar,
  Button,
  OutlinedInput,
  TableCell,
  TableRow,
} from '@mui/material';
import { Box } from '@mui/system';

import PropTypes from 'prop-types';
import moment from 'moment';
import scrollToBottom from '../../utils/ScrollToBottom';
import AdvancedTable from '../../advancedTable/AdvancedTable';
import authService from '../../../services/auth-service';
import hasData from '../../utils/hasData';

const Messages = ({ ...props }) => {
  const { breadcrumbsPath, headCellsMessages } = props;
  const [conversations, setConversations] = useState(props.conversations);
  const [newMessage, setNewMessage] = useState('');
  const [activeRow, setActiveRow] = useState();
  const [loadMessage, setLoadMessage] = useState(new Date());
  const [conversationDisplayed, setConversationDisplayed] = useState();
  const [loggedUser, setLoggedUser] = useState();
  useEffect(() => {
    const scroll = () => {
      scrollToBottom('messagesContainer');
    };
    if (hasData(conversationDisplayed)) scroll();
  }, [loadMessage]);

  useEffect(() => {
    const loggedUser = async () => {
      const res = await authService.getCurrentUser();
      setLoggedUser(res.data.data);
    };
    loggedUser();
  }, []);
  
  const handleSendMessage = (event) => {
    setLoadMessage(new Date());
    event.preventDefault();

    const allConversations = conversations;
    const newMessageStucture = {
      id: Math.random(),
      sentBy: loggedUser.id,
      content: newMessage,
      createdAt: moment().format('DD/MM/YYYY H:mm'),
    };
    allConversations[activeRow].messagesContent.push(newMessageStucture);
    setConversations(allConversations);
    setNewMessage('');
  };

  const MessageRow = ({ conversation, num }) => {
    MessageRow.propTypes = {
      num: PropTypes.any,
      conversation: PropTypes.object,
    };
    let style = {};
    if (activeRow === num) {
      style = {
        backgroundColor: 'var(--primary-light-opacity)',
        borderColor: 'var(--primary)',
      };
    }
    return (
      <TableRow
        key={num}
        className={styles.messageRow}
        style={style}
        onClick={() => {
          setActiveRow(num);
          setConversationDisplayed(conversations[num]);
          setLoadMessage(new Date());
        }}
      >
        <TableCell className={styles.messageRowContent}>
          <div className={styles.avatarContainer}>
            <Avatar className={styles.avatar}>N</Avatar>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <div className={styles.sender}>
              Encomenda Nº {conversation.orderId}
            </div>
            <div>{conversation.message}</div>
          </div>
        </TableCell>
        <TableCell>{conversation.createdAt}</TableCell>
        <TableCell>
          {activeRow === num ? <div className='dot'></div> : null}
        </TableCell>
      </TableRow>
    );
  };

  const ConversationRow = ({ message }) => {
    ConversationRow.propTypes = {
      message: PropTypes.object,
    };
    if (loggedUser)
      if (message.sentBy.toString() === loggedUser.id.toString()) {
        return (
          <div className={styles.conversation}>
            <a
              className={styles.conversationContentMe}
              style={{ marginLeft: 'auto' }}
            >
              {message.content}
              <br></br>
              <a className={styles.messageDate}> {message.createdAt}</a>
            </a>
            <Avatar className={styles.avatar}>B</Avatar>
          </div>
        );
      } else {
        return (
          <div className={styles.conversation}>
            <Avatar className={styles.avatar}>N</Avatar>
            <div className={styles.conversationContent}>
              {message.content}
              <br></br>
              <a className={styles.messageDate}> {message.createdAt}</a>
            </div>
          </div>
        );
      }
  };

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div
          id='pad'
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--grayTexts)',
          }}
        >
          <div>
            <a className='headerTitleXl'>Mensagens</a>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <PrimaryBtn icon={<MessageSquare />} text={'Criar Nova'} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.messagesContainer}>
            <AdvancedTable
              headCells={headCellsMessages}
              rows={conversations}
              noPagination
            >
              {loggedUser ? (
                <>
                  {conversations.map((conversation, i) => (
                    <>
                      {/* eslint-disable-next-line react/prop-types */}
                      {conversation.users.find(
                        (user) => user.toString() === loggedUser.id.toString()
                      ) ? (
                        <MessageRow
                          key={i}
                          num={i}
                          conversation={conversation}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              ) : null}
            </AdvancedTable>
            <div className={styles.scrollableZone}></div>
          </div>
          <div className={styles.chatContainer}>
            {hasData(conversationDisplayed) ? (
              <>
                {' '}
                <div className={styles.chatTitleContainer}>
                  <span>
                    <Package />
                  </span>
                  <a>Encomenda Nº {conversationDisplayed.orderId}</a>
                </div>
                <div id='messagesContainer' className={styles.scrollableZone}>
                  {conversationDisplayed.messagesContent.map((message) => (
                    // eslint-disable-next-line react/prop-types
                    <ConversationRow key={message.id} message={message} />
                  ))}
                </div>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleSendMessage}
                  sx={{
                    mt: 1,
                    width: '100%',
                    height: 'fit-content',
                    position: 'relative',
                    bottom: 0,
                  }}
                >
                  <OutlinedInput
                    
                    required
                    fullWidth
                    id='message'
                    name='message'
                    placeholder='Escrever mensagem...'
                    autoFocus
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={styles.writeMessageInput}
                    endAdornment={
                      <Button position='end' type='submit'>
                        Enviar
                      </Button>
                    }
                  />
                </Box>
              </>
            ) : null}
          </div>
        </div>
      </Content>
    </Grid>
  );
};
Messages.propTypes = {
  dummy: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  headCellsMessages: PropTypes.array,
  conversations: PropTypes.array,
};
export default Messages;
