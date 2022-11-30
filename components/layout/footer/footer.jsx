/* eslint-disable react/prop-types */
// Node modules
import { Box, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../../navigation/routes';
import logosFooter from '../../../public/Fundos-Europeus.png';
import logosFooterDark from '../../../public/Fundos-Europeus_dark_mode.png';
import IsInternal from '../../utils/IsInternal';

// Pages without layout (sidebar + navbar + footer)
function Copyright(props) {
  return (
    <Box
      color='text.secondary'
      {...props}
      sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
    >
      <Typography variant="title" noWrap sx={{ fontSize: '14px', fontWeight: 'normal' }}>
        Desenvolvido por {' '}
      </Typography>
      <Tooltip title='Visite New Knowledge Advice'>
        <Typography variant="subheading" color='link.main' noWrap sx={{ cursor: 'pointer' }}>
          <a href='https://nka.pt/' target='#' >NKA - New Knowledge Advice, Lda.</a>
        </Typography>
      </Tooltip>
    </Box>
  );
}

const Footer = () => {
  const isPublicPage = Object.values(routes.public).includes(Router.route.replace('[Id]', ''));

  return typeof window !== 'undefined' && (
    <Grid
      container
      
      bgcolor={"default.main"}
      md={isPublicPage ? 5 : 12}
      style={{
        // position: !isPublicPage &&'fixed',
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
      <Grid  container md={Router.route === '/' || Router.route === '/signin' ? 12 : 6} sm={12} sx={{display: 'flex', alignItems: 'center', maxHeight: '45px', justifyContent: isPublicPage && 'center'}}>
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.profile.object.description) || Router.route === '/' || Router.route === '/signin' ? <Copyright /> : <Image
          placeholder='blur'
          priority
          src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
          layout='intrinsic'
        />}
      </Grid>
      <Grid container md={Router.route === '/' || Router.route === '/signin' ? 12 : 6} sm={12} sx={{  height: 'fit-content',textAlign: 'end', display: 'flex', justifyContent: !isPublicPage ? 'end': 'center'}} >
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.profile.object.description) || Router.route === '/' || Router.route === '/signin' ? <Image
          placeholder='blur'
          priority
          src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
          layout='intrinsic'
        /> :
          <a
            className='link'
            style={{ color: 'inherit' }}
            onClick={() => Router.push(routes.private.tos)}
          >  Termos e Condições | Política de Privacidade </a>
        }
      </Grid>
    </Grid >
  );

};

Footer.propTypes = {
  page: PropTypes.string,
};

export default Footer;
