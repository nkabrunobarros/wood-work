import { Grid, Typography } from '@mui/material';
//  PropTypes
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MessagesStyles from './MessagesStyles';

export const ChatRow = (props) => {
  const { chat, index, activeRow, windowWidth, onRowClick, isInternalPage } = props;
  // const [anchorEl, setAnchorEl] = useState(null);
  const [hovering, setHovering] = useState(false);
  const theme = localStorage.getItem('theme');
  const styles = MessagesStyles({ hovering, theme, activeRow: activeRow === index });

  return (
    <Grid container md={12} p={1} sx={styles.conversationRow} onClick={() => onRowClick(index)} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)} >
      {windowWidth > 900 &&
          <>
            <Grid container md={12} >
              <Grid>
                <Typography variant='md' color='primary.main'>
                  {isInternalPage
                    ? chat.type === 'Project' ? 'Projeto' : 'Orçamento'
                    : chat.type === 'Project' ? 'Encomenda' : 'Orçamento'
                  }
                  {' '}
                  {chat.filterName || chat.id.replace('urn:ngsi-ld:Budget:', '').replace('urn:ngsi-ld:Project:', '')}
                </Typography>
              </Grid>
              <Grid>
                {/* <Typography variant='sm' color='lightTextSm.black' >{chat.message} <span>.</span> <Typography variant='xs' sx={styles.timeAgo}>{chat.createdAt && moment(chat.createdAt).fromNow()}</Typography></Typography> */}
              </Grid>
            </Grid>
          </>
      }
    </Grid>
  );
};

ChatRow.propTypes = {
  chat: PropTypes.object,
  pageProps: PropTypes.object,
  index: PropTypes.number,
  activeRow: PropTypes.number,
  windowWidth: PropTypes.number,
  onRowClick: PropTypes.func,
  isInternalPage: PropTypes.bool,
};

const ConversationsList = (props) => {
  const { conversations } = props;

  return conversations.map((ele, i) => <ChatRow key={i} index={i} chat={ele} {...props} />);
};

ConversationsList.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConversationsList;
