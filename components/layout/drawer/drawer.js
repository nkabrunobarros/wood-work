/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import hasData from '../../utils/hasData';

import { useTheme } from '@emotion/react';
import getLinks from '../../mock/navLinks';
import Router, { useRouter } from 'next/router';
import { LogOut, User, X } from 'lucide-react';
import routes from '../../../navigation/routes';
import { getUser } from '../../mock/Users';
import ActiveLink from './activeLink';
import styles from '../../../styles/components/navbar.module.css'

// eslint-disable-next-line react/prop-types
const DrawerMobile = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navLinks = getLinks();
  const [loggedUser, setLoggedUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const handleClick = (event) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };
  useEffect(() => {
    async function getUserPerm(data) {
      const perfil = await getUser(data);
      setLoggedUser(perfil);
      return perfil.perfil;
    }
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      if (localStorage.getItem('user') !== null) {
        const data = localStorage.getItem('user');
        if (data === null) Router.push(routes.public.signIn);
        else {
          getUserPerm(data).then((res) => {
            //
          });
        }
      } else Router.push(routes.public.signIn);
    }
  }, [router.asPath]);
  // const ActiveLink = ({ item, children }) => {
  //   const router = useRouter();
  //   const style = {
  //     borderColor:
  //       router.asPath === item
  //         ? '5px solid var(--white)'
  //         : '5px solid transparent',
  //   };
  //   return (
  //     <a
  //       key={item}
  //       className={styles.drawerItem}
  //       style={style}
  //       onClick={() => {
  //         handleDrawerToggle();
  //         Router.push(`${item.url}`);
  //       }}
  //     >
  //      {children}
  //     </a>
  //   );
  // };

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
            {/* {open ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          {/* <Collapse
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
          </Collapse> */}

          <Divider
            color='white'
            width='100%'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
        </div>
        <div className='scrollableZone'>
          {navLinks.map((item, i) => (
            <>
              {loggedUser ? (
                <>
                  {loggedUser.perfil === item.allowed ? (
                    <ActiveLink key={i} href={item.url}
                    handleDrawerToggle={handleDrawerToggle}

                    >
                      {item.icon} {item.title}
                    </ActiveLink>
                  ) : null}
                </>
              ) : null}
            </>
          ))}
          <div style={{ position: 'relative', float: 'bottom', width: '100%' }}>
            {loggedUser ? (
              <>
              
          <Divider
            color='white'
            width='100%'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
                <ActiveLink
                 handleDrawerToggle={handleDrawerToggle}
                  href={`${routes.private.profile}${loggedUser.id}`}
                >
                  <User strokeWidth='1' color='white' /> Perfil
                </ActiveLink>
                <a className={styles.navItemContainer}
                  onClick={() => {
                    sessionStorage.removeItem('user');
                    localStorage.removeItem('user');
                    if(!hasData(localStorage.getItem('user')) && !hasData(sessionStorage.getItem('user'))) Router.push(routes.public.signIn)

                  }}
                >
                  <LogOut strokeWidth='1' color='white' /> LogOut
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};
export default DrawerMobile;
