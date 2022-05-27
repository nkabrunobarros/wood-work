/* eslint-disable react/prop-types */
import React from 'react'
import { Drawer, IconButton } from '@mui/material'

import { useTheme } from '@emotion/react'
import getLinks from '../../mock/navLinks'
import Router, { useRouter } from 'next/router'

import styles from '../../../styles/components/navbar.module.css'
import { X } from 'lucide-react'
// eslint-disable-next-line react/prop-types
const DrawerMobile = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme()
  const navLinks = getLinks()

  const ActiveLink = ({ item }) => {
    const router = useRouter()
    const style = {
      borderColor:
        router.asPath === item.url
          ? '5px solid var(--white)'
          : '5px solid transparent'
    }
    return (
      <a
        key={item.title}
        className={styles.drawerItem}
        style={style}
        onClick={() => {
          handleDrawerToggle()
          Router.push(`${item.url}`)
        }}
      >
        <span>{item.icon}</span>
        {item.title}
      </a>
    )
  }

  return (
    <Drawer
      variant='temporary'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--primary-dark)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%'
        }}
      >
        <IconButton
          style={{ marginLeft: 'auto', color: 'var(--white)' }}
          onClick={handleDrawerToggle}
        >
          <X />
        </IconButton>
        {/* Sidebar Items List here */}
        <img
          style={{ padding: '1rem' }}
          src='https://media-exp1.licdn.com/dms/image/C4E0BAQG1luLQFqx-kg/company-logo_200_200/0/1595435482155?e=2147483647&v=beta&t=-gV-ZtIZb3EOpic3RkbD_91VgMu2ttGyIREm8xh5KNc'
        />
        <div className='scrollableZone'>
          {navLinks.map((item, i) => (
            <ActiveLink key={i} item={item} />
          ))}
        </div>
      </div>
    </Drawer>
  )
}
export default DrawerMobile
