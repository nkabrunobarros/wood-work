// Node modules
import { Menu, MenuItem } from '@mui/material'
import { Archive, ChevronDown, LogOut, MessageCircle, User } from 'lucide-react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import routes from '../../../navigation/routes'

import styles from '../../../styles/components/navbar.module.css'
import ActiveLink from './activeLink'

const Navbar = ({ children }) => {
  const navLinks = [
    {
      title: 'Encomendas',
      url: routes.private.home,
      icon: <Archive color='white' />
    },
    {
      title: 'Mensagens',
      url: routes.private.messages,
      icon: <MessageCircle color='white' />
    }
  ]
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.main}>
      <div className={styles.navigationButtons}>
        <img
          className={styles.logoImg}
          src='https://media-exp1.licdn.com/dms/image/C4E0BAQG1luLQFqx-kg/company-logo_200_200/0/1595435482155?e=2147483647&v=beta&t=-gV-ZtIZb3EOpic3RkbD_91VgMu2ttGyIREm8xh5KNc'
        />
        {navLinks.map((item, i) => (
            <ActiveLink key={i} href={item.url}>{item.icon} {item.title}</ActiveLink>
        ))}
        <a className={styles.userDropdown} onClick={handleClick}>
          <User />
          Bruno Barros
          <ChevronDown />
        </a>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={() => { handleClose(); Router.push(routes.private.profile) }}> <User /> Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); Router.push(routes.public.signIn) }}> <LogOut /> Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
Navbar.propTypes = {
  children: PropTypes.any
}

export default Navbar
