import { useRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../../styles/components/navbar.module.css'

function ActiveLink ({ children, href }) {
  const router = useRouter()
  const style = {
    borderBottom: router.asPath === href ? '5px solid var(--white)' : '5px solid transparent'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a key={href} href={href} onClick={handleClick} className={styles.navItemContainer} style={style}>
      {children}
    </a>
  )
}
ActiveLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.any
}

export default ActiveLink
