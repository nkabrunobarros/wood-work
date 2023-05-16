/* eslint-disable react/prop-types */
import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import { MessageSquare, Send } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as messagesActionsRedux from '../../../../store/actions/message';
import PrimaryBtn from '../../../buttons/primaryBtn';
import Loader from '../../../loader/loader';
import scrollToBottom from '../../../utils/ScrollToBottom';
import { Message } from '../../messages/Message';

const Messages = (props) => {
  const { pageProps, budget } = props;
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState();
  const dispatch = useDispatch();
  const getMessages = (data) => dispatch(messagesActionsRedux.conversationMessages(data));
  const [newMessageText, setNewMessageText] = useState('');
  const newMessage = (data) => dispatch(messagesActionsRedux.newMessage(data));
  const reduxState = useSelector((state) => state);
  const loggedUser = reduxState.auth.me;
  const [windowWidth, setWindowHeight] = useState();

  useEffect(() => {
    function loadMessages () {
      setLoaded(false);

      !messages && getMessages(budget?.id).then((res) => {
        setMessages(res.data.results);
      });

      setLoaded(true);
    }

    loadMessages();
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (newMessageText === '') return;

    await newMessage({
      to: loggedUser.role === 'CUSTOMER' ? 'user_pAbaEjM8KBVzKdyw' : budget.orderBy.object.user.id,
      by: loggedUser?.id,
      project: budget?.id,
      text: newMessageText
    }).then((res) => {
      setMessages([...messages, res.data]);
      setNewMessageText('');
    }).catch((err) => console.log(err));
  };

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setWindowHeight(window.innerWidth);
    }, [window.innerWidth]);
  }

  const listenToResize = () => {
    setWindowHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', listenToResize);

    return () => window.removeEventListener('resize', listenToResize);
  }, []);

  useEffect(() => {
    const scroll = () => {
      scrollToBottom('messagesContainer');
    };

    scroll();
  }, [messages]);

  return <>
    <Box
      id='pad'
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box>
        <Typography variant='title'>Mensagens</Typography>
      </Box>
      <Box style={{ marginLeft: 'auto' }}>
        <PrimaryBtn
          hidden
          icon={
            <MessageSquare
              strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
              size={pageProps?.globalVars?.iconSize}
            />
          }
          text={'Criar Nova'}
        />
      </Box>
    </Box>
    <Box>

      <Box id='messagesContainer' sx={{ padding: '2rem', maxHeight: '400px', overflowY: 'scroll' }}>
        {loaded
          ? messages?.sort((a, b) => moment(a.created).diff(moment(b.created))).map((conv, i) => <Message key={i} msg={conv} index={i} {...props}/>)
          : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader noPos />
          </Box>
        }
      </Box>
      <Box
        component='form'
        noValidate
        onSubmit={handleSendMessage}
        sx={{ width: '100%', paddingLeft: windowWidth > 900 && '2rem', paddingRight: windowWidth > 900 && '2rem', paddingBottom: '1rem' }}>
        <OutlinedInput
          required
          fullWidth
          placeholder='Aa'
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          sx={{
            maxHeight: '40px',
            padding: '0.2rem',
            fontSize: '13px',
            lineHeight: '18px',
            borderRadius: '16px',
            color: '#999999',
            width: '100%'
          }}
          endAdornment={ <Button position='end' type='submit'>
            <Send size={20}/>
          </Button>}
        />
      </Box>
    </Box>
  </>;
};

Messages.propTypes = {
  pageProps: PropTypes.any,
  headCellsMessages: PropTypes.any,
  styles: PropTypes.any,
  stylesMessage: PropTypes.any,
};

export default Messages;
