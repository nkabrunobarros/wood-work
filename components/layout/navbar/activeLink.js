import { useRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'

function ActiveLink ({ children, href }) {
  const router = useRouter()
  const style = {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    padding: '1rem',
    cursor: 'pointer',
    color: 'var(--white)',
    fontSize: '12px',
    fontWeight: 500,

    borderBottom: router.asPath === href ? '5px solid var(--white)' : '5px solid transparent'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a key={href} href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
ActiveLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.any
}

export default ActiveLink
