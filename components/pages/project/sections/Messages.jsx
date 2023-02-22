import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Edit, MessageSquare, Trash } from 'lucide-react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../../../navigation/routes';
import PrimaryBtn from '../../../buttons/primaryBtn';

const Messages = (props) => {
  const { pageProps, stylesMessage } = props;
  const path = useRouter();
  const internalPOV = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

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
              strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
              size={pageProps?.globalVars?.iconSize}
            />
          }
          text={'Criar Nova'}
        />
      </div>
    </div>
    <div>
      <Grid container>
        <Grid p={1} container sx={{ border: '1px solid', borderColor: 'divider' }} >
          <Grid container p={1} md={10}>Mensagem</Grid>
          <Grid container p={1} md={1}>Data</Grid>
          <Grid container p={1} md={1}>Ações</Grid>
        </Grid>
        {[...Array(2)].map((x, i) => (
          <>
            <Grid p={1} className={stylesMessage.messageRow} container onClick={() => internalPOV ? Router.push(routes.private.internal.messages) : Router.push(routes.private.messages)}>
              <Grid container md={10}>
                <Grid md={1} container ><Avatar className={stylesMessage.avatar}>N</Avatar></Grid>
                <Grid md={11} container><div className={stylesMessage.sender}>Encomenda Nº {i + 1}</div></Grid>
              </Grid>
              <Grid container md={1}><Typography variant='md'>11/03/2022</Typography></Grid>
              <Grid container md={1}>
                <Tooltip title='Edit'>
                  <IconButton>
                    <Edit
                      className='link'
                      strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                      size={pageProps?.globalVars?.iconSize}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                  <IconButton>
                    <Trash
                      className='link'
                      strokeWidth={pageProps?.globalVars?.iconStrokeWidth}
                      size={pageProps?.globalVars?.iconSize}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
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
