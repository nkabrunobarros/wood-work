//  PropTypes
import { Grid, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageViewer from '../../modals/ImageViewer';
import MessagesStyles from './MessagesStyles';

export const Message = (props) => {
  const { msg, theme } = props;
  const reduxState = useSelector((state) => state);
  const loggedUser = reduxState.auth.me;
  const sender = loggedUser.id === msg.by;
  const sender2 = loggedUser.id === (props.conversation.budgetId?.orderBy || props.conversation.orderBy);

  const styles = MessagesStyles({ theme, sender });
  const [toViewImage, setToViewImage] = useState();

  return (
    <Grid sx={styles.chatContainer} container md={12}>
      <ImageViewer images={toViewImage} open={!!toViewImage} handleClose={() => setToViewImage()}/>
      <Grid container md={12} sm={12} sx={styles.messageContainer}>
        <Tooltip title={moment(msg.created).format('DD [de] MMMM [de] YYYY, [às] h:mm a')}>
          <Grid md={6} sm={12} sx={styles.messageBox}>
            {sender &&
                  <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                    <Typography variant='md'> {msg.text}</Typography>
                  </Grid>
            }
            {!sender &&
                  <Grid container item md={10} sm={10} xs={10} sx={styles.message}>
                    <Typography variant='md'> {msg.text}</Typography>
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
