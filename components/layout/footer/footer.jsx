/* eslint-disable react/prop-types */
// Node modules
import { Grid, Typography } from '@mui/material';
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
    <Typography
      variant='body2'
      color='text.secondary'
      {...props}
      sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}
    >
      {' Desenvolvido por  '}
      <Tooltip title='Visite New Knowledge Advice' color='red'>
        <a href='https://nka.pt/' target='#' className='link'>
          NKA - New Knowledge Advice, Lda.
        </a>
      </Tooltip>
    </Typography>
  );
}

const Footer = (props) => {

  return (
    <Grid
      md={12}
      container
      bgcolor={"default.main"}
      className='flex'
      style={{
        position: 'fixed',
        minHeight: '45px',
        width: '100%',
        bottom: 0,
        borderTop: '1px solid var(--grayEdges)',
        color: 'var(--grayTextsLight)',
        fontSize: '12px',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <Grid md={6} container >
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.perfil.descricao) ? <Copyright /> : <Image
          placeholder='blur'
          priority
          src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
          layout='intrinsic'
        />}
      </Grid>
      <Grid md={6} sx={{ textAlign: 'end', display: 'flex', justifyContent: 'end' }} container >
        {IsInternal(JSON.parse(localStorage.getItem('user'))?.perfil.descricao) ? <Image
          placeholder='blur'
          priority
          src={localStorage.getItem('theme') === 'light' ? logosFooter : logosFooterDark}
          layout='intrinsic'
        /> :
          <a
            className='link'
            style={{ color: 'inherit' }}
            onClick={() => Router.push(routes.private.tos)}
          >
            Termos e Condições | Política de Privacidade
          </a>
        }
      </Grid>
    </Grid >
  );

};

Footer.propTypes = {
  page: PropTypes.string,
  section: PropTypes.string,
};

export default Footer;
