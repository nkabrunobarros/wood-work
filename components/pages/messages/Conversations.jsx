import { Grid, Typography } from '@mui/material';
import moment from 'moment';
//  PropTypes
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MessagesStyles from './MessagesStyles';

export const ChatRow = (props) => {
    const {chat, index, activeRow, windowWidth, onRowClick, isInternalPage} = props;
    // const [anchorEl, setAnchorEl] = useState(null);
    const [hovering, setHovering] = useState(false);
    const theme = localStorage.getItem('theme');
    const styles = MessagesStyles({ hovering, theme, activeRow: activeRow === index });

    return (
      <Grid container md={12} p={1} sx={styles.conversationRow} onClick={() => onRowClick(index)} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>
        {/* <Grid md={2} container>
          <Tooltip title={ (isInternalPage ? 'Projeto' : 'Encomenda') + ' ' + chat.orderId}>
            <Avatar width={'100%'} height={'100%'} sx={styles.avatar}>N</Avatar>
          </Tooltip>
        </Grid> */}
        {windowWidth > 900 &&
          <>
            <Grid container md={12}   >
              <Grid>
                <Typography variant='md' color='primary.main'>{isInternalPage ? 'Projeto' : 'Encomenda'} {chat.orderId}</Typography>
              </Grid>
              <Grid>
                <Typography variant='sm' color='lightTextSm.black' >{chat.message} <span>.</span> <Typography variant='xs' sx={styles.timeAgo}>{moment(chat.createdAt).fromNow()}</Typography></Typography>
              </Grid>
            </Grid>
            {/* <Grid container md={1} sm={0} className={styles.conversationRowMore}>
              <IconButton
                sx={styles.conversationRowMoreBtn}
                aria-controls={anchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreHorizontal
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Typography>Fechar conversa</Typography></MenuItem>
                <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Typography>Apagar conversa</Typography></MenuItem>
              </Menu>
            </Grid> */}
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

    return conversations.map((ele, i) => <ChatRow  key={i} index={i} chat={ele} {...props} />);
};

ConversationsList.propTypes = {
    conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConversationsList;