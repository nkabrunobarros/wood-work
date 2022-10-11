// Node modules
import { Box, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../../navigation/routes';
import logosFooter from '../../../public/Fundos-Europeus.png';

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

const Footer = ({ section }) => {
  return (
    <Box
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
      }}
    >
      {section !== 'client' ? (
        <>
          <Box style={{ flex: 1 }}>
            <Copyright />
          </Box>
          <Box style={{ paddingRight: '1rem' }}>
            <Image
              placeholder='blur'
              priority
              src={logosFooter}
              layout='intrinsic'
            />
          </Box>
        </>
      ) : (
        <>
          <Box style={{ paddingLeft: '1rem' }}>
            <Box>
              <Image
                placeholder='blur'
                priority
                src={logosFooter}
                layout='intrinsic'
              />
            </Box>
          </Box>
          <Box
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '1rem',
            }}
          >
            <a
              className='link'
              style={{ color: 'inherit' }}
              onClick={() => Router.push(routes.private.tos)}
            >
              Termos e Condições | Política de Privacidade
            </a>
          </Box>
        </>
      )}
    </Box>
  );
};

Footer.propTypes = {
  page: PropTypes.string,
  section: PropTypes.string,
};

export default Footer;
