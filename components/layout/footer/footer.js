// Node modules
import { Typography } from '@mui/material';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../../navigation/routes';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
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
    <div
      className='flex'
      style={{
        position: 'fixed',
        minHeight: '45px',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white',
        borderTop: '1px solid var(--grayEdges)',
        color: 'var(--grayTextsLight)',
        fontSize: '12px',
        alignItems: 'center',
      }}
    >
      {section !== 'client' ? (
        <>
          <div style={{ flex: 1 }}>
            <Copyright />
          </div>
          <div style={{ paddingRight: '1rem' }}>
            <Image
              placeholder='blur'
              priority
              src={logosFooter}
              layout='intrinsic'
            />
          </div>
        </>
      ) : (
        <>
          <div style={{ paddingLeft: '1rem' }}>
            <div>
              <Image
                placeholder='blur'
                priority
                src={logosFooter}
                layout='intrinsic'
              />
            </div>
          </div>
          <div
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
          </div>
        </>
      )}
    </div>
  );
};
Footer.propTypes = {
  page: PropTypes.string,
  section: PropTypes.string,
};

export default Footer;
