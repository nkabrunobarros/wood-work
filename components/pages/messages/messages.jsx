//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Material Ui
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Custom Components
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';

//  PropTypes
import PropTypes from 'prop-types';

//  Moment (time package)
import moment from 'moment';

//  Utils
import MomentJsConfig from '../../utils/MomentJsConfig';
import scrollToBottom from '../../utils/ScrollToBottom';
//  Styles
import CustomBreadcrumbs from '../../breadcrumbs';

//  Sections Components
import { Box } from '@mui/material';
import routes from '../../../navigation/routes';
import Navbar from '../../layout/navbar/navbar';
import Chat from './Chat';
import ChatToolbar from './ChatToolbar';
import ConversationsList from './Conversations';
import ConversationsToolbar from './ConversationsToolbar';
import MessagesStyles from './MessagesStyles';
import NewMsgInput from './NewMsgInput';

const Messages = (props) => {
  const { breadcrumbsPath } = props;
  const [chats, setChats] = useState(props.chats);
  const [activeRow, setActiveRow] = useState(0);
  const [loadMessage, setLoadMessage] = useState(new Date());
  const [windowWidth, setWindowHeight] = useState();
  const theme = localStorage.getItem('theme');
  const styles = MessagesStyles({ theme });
  const [conversationFilter, setConversationFilter] = useState('');
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

  moment.locale(MomentJsConfig());

  useEffect(() => {
    const scroll = () => {
      scrollToBottom('messagesContainer');
    };

    scroll();
  }, [loadMessage]);

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

  return (
    <>
      <Navbar />
      <Grid component='main'sx={{ padding: '0rem 2rem 0rem 2rem' }} >
        <CssBaseline/>
        <Notification/>
        <CustomBreadcrumbs path={breadcrumbsPath}/>
        {false && <Content>
          <Grid container md={12} sm={12} sx={{ overflow: 'hidden', borderRadius: '8px' }}>
            <Grid container md={4} sm={1.5} xs={3} sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
              <Grid md={12} sx={{ maxHeight: '70vh', minHeight: '70vh' }}>
                <ConversationsToolbar windowWidth={windowWidth} isInternalPage={isInternalPage} styles={styles} {...props} onSearch={setConversationFilter} />
                <Box sx={{ overflow: 'scroll', maxHeight: '85%' }}>
                  <ConversationsList {...props} isInternalPage={isInternalPage} conversations={chats.filter(ele => ele.filterName.toLowerCase().toString().includes(conversationFilter.toLowerCase()))} activeRow={activeRow} onRowClick={setActiveRow} windowWidth={windowWidth}/>
                  {/* <ConversationsList {...props} isInternalPage={isInternalPage} conversations={chats.filter(ele => ele.filterName.toLowerCase().toString().includes(conversationFilter.toLowerCase()))} activeRow={activeRow} onRowClick={setActiveRow} windowWidth={windowWidth}/> */}
                </Box>
              </Grid>
            </Grid>
            <Grid container md={8} sm={9} xs={9}>
              <Grid md={12} sx={{ overflow: 'scroll', maxHeight: '70vh', minHeight: '70vh' }}>
                <ChatToolbar styles={styles} conversation={chats[activeRow]} isInternalPage={isInternalPage} {...props} />
                {/* <ChatToolbar styles={styles} conversation={chats[activeRow]} isInternalPage={isInternalPage} {...props} /> */}
                <Chat {...props} chats={chats} conversation={chats[activeRow]} theme={theme} activeRow={activeRow} setConversations={setChats}/>
                {/* <Chat conversation={chats[activeRow]} theme={theme} /> */}
              </Grid>
              <Grid container md={12}>
                <NewMsgInput {...props}
                  chats={chats}
                  conversation={chats[activeRow]}
                  setConversations={setChats}
                  setLoadMessage={setLoadMessage}
                  activeRow={activeRow}
                  styles={styles}
                />
              </Grid>
            </Grid>
          </Grid>
        </Content>}
        <Content>
          <Box container sx={{ height: '70vh', display: 'flex', width: '100%' }}>
            <Box container className='conversationsBox' justifyContent='end'>
              <Grid md={12} sx={{ maxHeight: '70vh', minHeight: '70vh' }}>
                <ConversationsToolbar windowWidth={windowWidth} isInternalPage={isInternalPage} styles={styles} {...props} onSearch={setConversationFilter} />
                <Box sx={{ overflow: 'scroll', maxHeight: '85%' }}>
                  <ConversationsList {...props} isInternalPage={isInternalPage} conversations={chats.filter(ele => ele.filterName.toLowerCase().toString().includes(conversationFilter.toLowerCase()))} activeRow={activeRow} onRowClick={setActiveRow} windowWidth={windowWidth}/>
                  {/* <ConversationsList {...props} isInternalPage={isInternalPage} conversations={chats.filter(ele => ele.filterName.toLowerCase().toString().includes(conversationFilter.toLowerCase()))} activeRow={activeRow} onRowClick={setActiveRow} windowWidth={windowWidth}/> */}
                </Box>
              </Grid>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Grid container md={12} className='chatBox'>
                <Grid md={12} sx={{ overflow: 'scroll', maxHeight: '70vh', minHeight: '60vh' }}>
                  <ChatToolbar styles={styles} conversation={chats[activeRow]} isInternalPage={isInternalPage} {...props} />
                  {/* <ChatToolbar styles={styles} conversation={chats[activeRow]} isInternalPage={isInternalPage} {...props} /> */}
                  <Chat {...props} chats={chats} conversation={chats[activeRow]} theme={theme} activeRow={activeRow} setConversations={setChats}/>
                  {/* <Chat conversation={chats[activeRow]} theme={theme} /> */}
                </Grid>
                <Grid container md={12}>
                  <NewMsgInput {...props}
                    chats={chats}
                    conversation={chats[activeRow]}
                    setConversations={setChats}
                    setLoadMessage={setLoadMessage}
                    activeRow={activeRow}
                    styles={styles}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Content>
      </Grid>
    </>
  );
};

Messages.propTypes = {
  breadcrumbsPath: PropTypes.any,
  chats: PropTypes.any,
};

export default Messages;
