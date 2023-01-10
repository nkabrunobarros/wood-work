import { Avatar, Grid, Typography } from '@mui/material';
import { MessageSquare } from 'lucide-react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../../../navigation/routes';
import PrimaryBtn from '../../../buttons/primaryBtn';
import IsInternal from '../../../utils/IsInternal';

const Messages = (props) => {
  const { pageProps, stylesMessage } = props;
  const internalPOV = IsInternal(JSON.parse(localStorage.getItem('user')).profile.object.description);

  return <>
    <div
      id='pad'
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div>
        <Typography variant='title'>Mensagens</Typography>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <PrimaryBtn
          icon={
            <MessageSquare
              strokeWidth={pageProps.globalVars.iconStrokeWidth}
              size={pageProps.globalVars.iconSize}
            />
          }
          text={'Criar Nova'}
        />
      </div>
    </div>
    <div>
      <Grid container>
        <Grid p={1} container sx={{ border: '1px solid', borderColor: 'divider' }} >
          <Grid container p={1} md={11}>Mensagem</Grid>
          <Grid container p={1} md={1}>Data</Grid>
        </Grid>
        {[...Array(0)].map((x, i) => (
          <Grid p={1} key={i} className={stylesMessage.messageRow} container onClick={() => internalPOV ? Router.push(routes.private.internal.messages) : Router.push(routes.private.messages)}>
            <Grid container md={11}>
              <Grid md={1} container ><Avatar className={stylesMessage.avatar}>N</Avatar></Grid>
              <Grid md={11} container><div className={stylesMessage.sender}>Encomenda Nº {i + 1}</div></Grid>
            </Grid>
            <Grid container md={1}><Typography variant='md'>11/03/2022</Typography></Grid>

          </Grid>
        ))}
      </Grid>
    </div>
  </>;
};

Messages.propTypes = {
  pageProps: PropTypes.any,
  headCellsMessages: PropTypes.any,
  styles: PropTypes.any,
  stylesMessage: PropTypes.any,
};

export default Messages;
