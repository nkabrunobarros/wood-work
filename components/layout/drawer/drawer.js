/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';

import { useTheme } from '@emotion/react';
import getLinks from '../../mock/navLinks';
import Router, { useRouter } from 'next/router';

import styles from '../../../styles/components/navbar.module.css';
import { LogOut, User, X } from 'lucide-react';
import routes from '../../../navigation/routes';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// eslint-disable-next-line react/prop-types
const DrawerMobile = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navLinks = getLinks();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  const ActiveLink = ({ item }) => {
    const router = useRouter();
    const style = {
      borderColor:
        router.asPath === item.url
          ? '5px solid var(--white)'
          : '5px solid transparent',
    };
    return (
      <a
        key={item.title}
        className={styles.drawerItem}
        style={style}
        onClick={() => {
          handleDrawerToggle();
          Router.push(`${item.url}`);
        }}
      >
        <span>{item.icon}</span>
        {item.title}
      </a>
    );
  };

  return (
    <SwipeableDrawer
      disableSwipeToOpen={false}
      onOpen={handleDrawerToggle}
      swipeAreaWidth={20}
      variant='temporary'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--primary-dark)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        {/* Sidebar Items List here */}
        <div
          style={{
            backgroundColor: 'var(--primary-dark)',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <IconButton
            style={{ color: 'var(--white)', position: 'absolute', right: '0%' }}
            onClick={handleDrawerToggle}
          >
            <X />
          </IconButton>
          <div
            className='logoImg'
            style={{ width: '100px', height: '100px', margin: '1rem' }}
          ></div>

          <ListItemButton onClick={handleClick} sx={{ color: 'white' }}>
            <ListItemText
              primary='Bruno Barros'
              secondary={
                <a style={{ color: '#FFFFFF', fontSize: 'small' }}>
                  Bruno.barros@nka.pt
                </a>
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
            sx={{ color: 'white' }}
          >
            <List component='div' disablePadding>
              <ListItemButton
                onClick={() => {
                  Router.push(routes.private.profile);
                  handleClick();
                }}
              >
                <ListItemIcon>
                  <User color='white' />
                </ListItemIcon>
                <ListItemText primary='Perfil' />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  Router.push(routes.public.signIn);
                  handleClick();
                }}
              >
                <ListItemIcon>
                  <LogOut color='white' />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider
            color='white'
            width='100%'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
        </div>
        <div className='scrollableZone'>
          {navLinks.map((item, i) => (
            <ActiveLink key={i} item={item} />
          ))}
        </div>
      </div>
    </SwipeableDrawer>
  );
};
export default DrawerMobile;
