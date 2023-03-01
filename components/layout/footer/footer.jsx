/* eslint-disable react/prop-types */
// Node modules
import { Box, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import routes from '../../../navigation/routes';
import logosFooter from '../../../public/Fundos-Europeus.png';
import logosFooterDark from '../../../public/Fundos-Europeus_dark_mode.png';
import IsInternal from '../../utils/IsInternal';

// Pages without layout (sidebar + navbar + footer)
function Copyright (props) {
  return (
    <Box
      color='text.secondary'
      {...props}
      sx={{ paddingLeft: '1rem', paddingRight: '1rem', height: '100%', alignItems: 'center', display: 'flex' }}
    >
      <Box>

        <Typography variant="title" noWrap sx={{ fontSize: '14px', fontWeight: 'normal' }}>
        Desenvolvido por {' '}
        </Typography>
        <Tooltip title='Visite New Knowledge Advice'>
          <Typography variant="subheading" color='link.main' noWrap sx={{ cursor: 'pointer' }}>
            <a href='https://nka.pt/' target='#' >NKA - New Knowledge Advice, Lda.</a>
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}

const Footer = () => {
  const isPublicPage = Object.values(routes.public).includes(Router.route.replace('[Id]', ''));

  return typeof window !== 'undefined' && (
    <Grid
      container
      bgcolor={'default.main'}
      md={isPublicPage || Router.asPath === '/terms' || Router.asPath === '/tos' ? 5 : 12}
      style={{
        position: 'fixed',
        width: '100%',
        bottom: 0,
        borderTop: '1px solid var(--grayEdges)',
        color: 'var(--grayTextsLight)',
        fontSize: '12px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <Grid container md={isPublicPage || Router.asPath === '/terms' || Router.asPath === '/tos' ? 12 : 6} sm={12} sx={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: isPublicPage || Router.asPath === '/terms' || Router.asPath === '/tos' ? 'center' : null }}>
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.profile.object.description) || isPublicPage
          ? <Box ><Copyright /></Box>
          : <a
            target='#'
            href={'http://mofreita.com/wp-content/uploads/2022/08/72593_ww4.0_modelo_pag_web_0_norte2020_v2.pdf'} style={{ display: !isPublicPage && 'none' }}>
            <Image
              alt='Footer Logo'
              placeholder='blur'
              priority
              src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
            />
          </a>
        }
      </Grid>
      <Grid container md={isPublicPage || Router.asPath === '/terms' || Router.asPath === '/tos' ? 12 : 6} sm={12} sx={{ minHeight: '40px', height: 'fit-content', textAlign: 'end', display: 'flex', justifyContent: isPublicPage || Router.asPath === '/terms' || Router.asPath === '/tos' ? 'center' : 'end' }} >
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.profile?.object?.description || '') || isPublicPage
          ? <a
            target='#'
            href={'http://mofreita.com/wp-content/uploads/2022/08/72593_ww4.0_modelo_pag_web_0_norte2020_v2.pdf'} style={{ display: !isPublicPage && 'none' }}>

            <Image
              alt='Footer Logo'
              placeholder='blur'
              priority
              src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
            />
          </a>
          : <Box ><Copyright /></Box>
        }
      </Grid>
    </Grid >
  );
};

export default Footer;
