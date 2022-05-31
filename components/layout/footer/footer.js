// Node modules
import { Typography } from '@mui/material'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../../../navigation/routes'

// Pages without layout (sidebar + navbar + footer)
function Copyright (props) {
  return (
    <Typography variant='body2' color='text.secondary' {...props}>
      {' Desenvolvido por  '}
      <Link color='inherit' href='https://nka.pt/' target='#'>
        NKA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
const Footer = ({ section }) => {
  return (
    <div
    className='flex'
      style={{
        position: 'fixed',
        minHeight: '35px',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white',
        borderTop: '1px solid var(--grayEdges)',
        color: 'var(--grayTextsLight)',
        fontSize: '12px',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', marginLeft: '2rem' }}>{section === 'client' ? <a>WW4.0</a> : <Copyright />}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-center', padding: '0.2rem', width: '100%' }}><div className='footerImages'></div></div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: '2rem' }}>{section === 'client'
        ? (
            <a className="link" style={{ color: 'inherit' }} onClick={() => Router.push(routes.private.tos)}>
              Termos e Condições | Política de Privacidade
            </a>
          )
        : (
            'WW4.0'
          )}</div>
    </div>
  )
}
Footer.propTypes = {
  page: PropTypes.string,
  section: PropTypes.string
}

export default Footer
