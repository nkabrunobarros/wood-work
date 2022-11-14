/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//  Material Ui
import {
  AppBar,
  Avatar, Box, Button, ButtonGroup, Chip, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Toolbar, Tooltip, Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

//  Custom Components
import Content from '../../content/content';
import Notification from '../../dialogs/Notification';
import ImageViewer from '../../modals/ImageViewer';
import ConvertBase64 from '../../utils/ConvertBase64';

//  PropTypes
import PropTypes from 'prop-types';

//  Moment (time package)
import moment from 'moment';

//  Icons
import { Edit, HelpCircle, ImagePlus, MoreHorizontal, Plus, RefreshCw, Search, Send, Settings } from 'lucide-react';

//  Utils
import hasData from '../../utils/hasData';
import MomentJsConfig from '../../utils/MomentJsConfig';
import scrollToBottom from '../../utils/ScrollToBottom';
//  Styles
import MessagesStyles from './MessagesStyles';

const Messages = ({ ...props }) => {
  const { breadcrumbsPath, pageProps } = props;
  const [conversations, setConversations] = useState(props.conversations);
  const [newMessage, setNewMessage] = useState('');
  const [activeRow, setActiveRow] = useState(0);
  const [loadMessage, setLoadMessage] = useState(new Date());
  const [conversationDisplayed, setConversationDisplayed] = useState(conversations[0]);
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const theme = localStorage.getItem('theme');
  const styles = MessagesStyles({ theme });
  const [files, setFiles] = useState();
  const [toViewImage, setToViewImage] = useState();
  const [windowWidth, setWindowHeight] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  moment.locale(MomentJsConfig());

  useEffect(() => {
    const scroll = () => {
      scrollToBottom('messagesContainer');
    };

    scroll();

    if (hasData(conversationDisplayed)) scroll();
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


  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!newMessage && !files) return;

    setLoadMessage(new Date());

    const allConversations = conversations;

    if (files) {
      files.map(file => {
        const newMessageStucture = {
          id: Math.random(),
          sentBy: loggedUser.id,
          content: file.base64,
          createdAt: moment(Date.now()).format(),
          type: 'file'
        };

        allConversations[activeRow].messagesContent.push(newMessageStucture);
        setConversations(allConversations);

      });

      setFiles();
    }

    if (newMessage) {
      const newMessageStucture = {
        id: Math.random(),
        sentBy: loggedUser.id,
        content: newMessage,
        createdAt: moment().format(),
        type: 'text'
      };

      allConversations[activeRow].messagesContent.push(newMessageStucture);
      setConversations(allConversations);
      setNewMessage('');

    }
  };

  async function onFileInput(e) {
    const arr = [];

    for (let index = 0; index < Object.keys(e.target.files).length; index++) {
      const file = e.target.files[index];

      await ConvertBase64(file)
        .then(result => {
          file.base64 = result;
          arr.push(file);
        })
        .catch(err => {
          console.log(err);
        });

    }

    const a = arr.filter(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);

    if (arr.find(ele => ele.size >= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)) {
      toast.error(`${Object.keys(a).length} não foram carregadas, tamanho maximo de 1 MB ( ${a.map(x => `${x.name} `)} )`);
      arr.filter(ele => ele.size <= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);
    }

    if (arr) setFiles(arr);
  }

  const ChatRow = ({ chat, index }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [hovering, setHovering] = useState(false);
    const styles = MessagesStyles({ hovering, theme, activeRow: activeRow === index });
    const open = Boolean(anchorEl);

    return (
      <Grid container md={12} p={1} sx={styles.conversationRow} onClick={() => setActiveRow(index)} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>
        <Grid md={2} container>
          <Tooltip title={'Encomenda ' + chat.orderId}>
            <Avatar width={'100%'} height={'100%'} sx={styles.avatar}>N</Avatar>
          </Tooltip>
        </Grid>
        {windowWidth > 900 &&
          <>
            <Grid container md={9}   >
              <Grid>
                <Typography variant='md' color='primary.main'>{chat.orderId}</Typography>
              </Grid>
              <Grid>
                <Typography variant='sm' color='lightTextSm.black' >{chat.message} <span>.</span> <Typography variant='xs' sx={styles.timeAgo}>{moment(chat.createdAt).fromNow()}</Typography></Typography>
              </Grid>
            </Grid>
            <Grid container md={1} sm={0} className={styles.conversationRowMore}>
              <IconButton
                sx={styles.conversationRowMoreBtn}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreHorizontal
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Typography>Fechar conversa</Typography></MenuItem>
                <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Typography>Apagar conversa</Typography></MenuItem>
              </Menu>
            </Grid>
          </>
        }
      </Grid>
    );
  };

  ChatRow.propTypes = {
    chat: PropTypes.object,
    index: PropTypes.number,
  };

  const Conversation = () => {

    return (
      <div id='messagesContainer'>
        {conversations[activeRow].messagesContent.map((conv, i) => <Message key={i} msg={conv} index={i} />)}
      </div>
    );
  };

  const Message = (props) => {
    const { msg, index } = props;
    const sender = loggedUser.id === msg.sentBy;
    const styles = MessagesStyles({ theme, sender });

    return (
      <Grid sx={styles.chatContainer} container md={12}>
        <Grid container md={12} sm={12} sx={styles.messageContainer}>
          <Tooltip title={moment(msg.createdAt).format('DD [de] MMMM [de] YYYY, [às] h:mm a')}>
            <Grid md={6} sm={12} sx={styles.messageBox}>
              {sender &&
                <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                  {msg.type === 'text' ?
                    <Typography variant='md'> {msg.content}</Typography>
                    :
                    <Grid container md={12} sx={styles.containerImages}>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image} />
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image} />
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image} />
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image} />
                        <Box sx={styles.overlay}><Plus size={20} /> <Typography fontSize={20}>3</Typography></Box>
                      </Grid>

                    </Grid>
                  }
                </Grid>
              }
              <Grid container item md={2} sm={2} xs={2}>
                {conversations[activeRow].messagesContent[index - 1]?.sentBy !== msg.sentBy && !sender ? <Avatar width={'100%'} height={'100%'} sx={styles.avatar}>R</Avatar> : null}
              </Grid>
              {!sender &&
                <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                  {msg.type === 'text' ?
                    <Typography variant='md'> {msg.content}</Typography>
                    :
                    <Box className="containerTeste" onClick={() => setToViewImage([msg.content])}>
                      <img src={msg.content} style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer', display: 'block' }} />
                      <Box sx={styles.overlay}>My Name is John</Box>
                    </Box>
                  }
                </Grid>
              }
            </Grid>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  Message.propTypes = {
    msg: PropTypes.any,
    index: PropTypes.number,
  };

  return (
    <Grid component='main'>
      <CssBaseline />
      <Notification />
      <ImageViewer images={toViewImage} open={!!toViewImage} handleClose={() => setToViewImage()} />
      {/* <CustomBreadcrumbs path={breadcrumbsPath} /> */}
      <Content >
        <Grid container md={12} sm={12} sx={{ overflow: 'hidden', borderRadius: '8px' }}>
          <Grid container md={4} sm={1.5} xs={3}>
            <Grid md={12} sx={{ overflow: 'scroll', maxHeight: '70vh', minHeight: '70vh' }}>
              <AppBar position='static' sx={styles.appBars} >
                <Toolbar sx={{ padding: '.5rem !important' }}>
                  {windowWidth > 900 && <OutlinedInput
                    required
                    fullWidth
                    placeholder='Pesquisa'
                    sx={styles.writeMessageInput}
                    endAdornment={
                      <InputAdornment position={"start"}>
                        <Search />
                      </InputAdornment>
                    }
                  />}

                  <ButtonGroup>
                    {windowWidth > 900 &&
                      <Tooltip title='Nova Conversa'>
                        <IconButton>
                          <Edit
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                    }

                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreHorizontal />
                    </IconButton>
                  </ButtonGroup>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {windowWidth < 900 && <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Edit strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize} />Nova conversa</MenuItem>}
                    <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><HelpCircle strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize} />Ajuda</MenuItem>
                    <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Settings strokeWidth={pageProps.globalVars.iconStrokeWidth}
                      size={pageProps.globalVars.iconSize} />Preferencias</MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
              {conversations.map((chat, i) => (
                <ChatRow key={i} chat={chat} index={i} />
              ))}
            </Grid>
            <Grid container md={12} className='fullCenter'>
              <Button>
                Publicidade?
              </Button>
            </Grid>
          </Grid>
          <Grid container md={8} sm={9} xs={9} >
            <Grid md={12} sx={{ overflow: 'scroll', maxHeight: '70vh', minHeight: '70vh' }}>
              <AppBar position='static' sx={styles.appBars}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={styles.avatar}>N</Avatar>
                    <Typography variant='md'>Encomenda {conversations[activeRow].orderId}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup>
                      <Tooltip title="Ajuda">
                        <IconButton>
                          <HelpCircle
                            strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Atualizar">
                        <IconButton>
                          <RefreshCw strokeWidth={pageProps.globalVars.iconStrokeWidth}
                            size={pageProps.globalVars.iconSize} />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </Box>
                </Toolbar>
              </AppBar>
              <Conversation />
            </Grid>
            <Grid container md={12}>
              <Box
                component='form'
                noValidate
                onSubmit={handleSendMessage}
                sx={{ width: '100%', marginLeft: windowWidth > 900 && '2rem', marginRight: windowWidth > 900 && '2rem' }}>
                <OutlinedInput
                  required
                  fullWidth
                  placeholder='Aa'
                  autoFocus
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={styles.writeMessageInput}
                  endAdornment={
                    <>
                      {files && <Chip label={`${files.length} anexo(s)`} onDelete={() => setFiles()} />}
                      <IconButton component='label'>
                        <ImagePlus
                          strokeWidth={pageProps.globalVars.iconStrokeWidth}
                          size={pageProps.globalVars.iconSize}
                        />
                        <input multiple type='file' accept='image/*,.pdf' name='file' hidden onChange={(e) => onFileInput(e)} />
                      </IconButton>
                      <Button position='end' type='submit'>

                        {windowWidth > 900 ? 'Enviar' : <Send size={20} />}
                      </Button>
                    </>
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Content >
    </Grid >
  );
};

Messages.propTypes = {
  breadcrumbsPath: PropTypes.any,
  headCellsMessages: PropTypes.any,
  conversations: PropTypes.any,
  pageProps: PropTypes.any
};

export default Messages;
