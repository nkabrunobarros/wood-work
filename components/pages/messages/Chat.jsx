//  PropTypes
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ImageViewer from '../../modals/ImageViewer';
import MessagesStyles from './MessagesStyles';

export const Message = (props) => {
    const { msg, theme } = props;
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const sender = loggedUser.id === msg.sentBy;
    const styles = MessagesStyles({ theme, sender });
    const [toViewImage, setToViewImage] = useState();

    return (
      <Grid sx={styles.chatContainer} container md={12}>
        <ImageViewer images={toViewImage} open={!!toViewImage} handleClose={() => setToViewImage()}/>
        <Grid container md={12} sm={12} sx={styles.messageContainer}>
          <Tooltip title={moment(msg.createdAt).format('DD [de] MMMM [de] YYYY, [às] h:mm a')}>
            <Grid md={6} sm={12} sx={styles.messageBox}>
              {sender &&
                <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                  {msg.type === 'text' ?
                    <Typography variant='md'> {msg.content}</Typography>
                    :
                    <>
                    <Grid container md={12} sx={styles.containerImages}>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image}/>
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image}/>
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image}/>
                      </Grid>
                      <Grid md={6} onClick={() => setToViewImage([msg.content])}>
                        <img src={msg.content} style={styles.image}/>
                        <Box sx={styles.overlay}><Plus size={20}/> <Typography fontSize={20}>3</Typography></Box>
                      </Grid>
                    </Grid>
                      <Typography variant='md'> {msg.msg}</Typography>
                    </>
                  }
                </Grid>
              }
              {/* <Grid container item md={2} sm={2} xs={2}>
                {conversation.messagesContent[index - 1]?.sentBy !== msg.sentBy && !sender ? <Avatar width={'100%'} height={'100%'} sx={styles.avatar}>R</Avatar> : null}
              </Grid> */}
              {!sender &&
                <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                  {msg.type === 'text' ?
                    <Typography variant='md'> {msg.content}</Typography>
                    :
                    <Box className="containerTeste" onClick={() => setToViewImage([msg.content])}>
                      <img src={msg.content} style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer', display: 'block' }}/>
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
    theme: PropTypes.string,
    index: PropTypes.number,
    conversation: PropTypes.object,
  };


const Chat = (props) => {

    const {conversation} = props;

    return (
        <div id='messagesContainer'>
        {conversation.messagesContent.map((conv, i) => <Message key={i} msg={conv} index={i} {...props}/>)}
      </div>
    );
};

Chat.propTypes = {
    conversation: PropTypes.object.isRequired,
};

export default Chat;