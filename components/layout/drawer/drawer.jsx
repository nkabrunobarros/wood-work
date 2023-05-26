/* eslint-disable react/prop-types */
//  Nodes
import Image from 'next/image';
import React, { useState } from 'react';
import IsInternal from '../../utils/IsInternal';

//  Material UI
import {
  Box,
  Collapse,
  Divider,
  IconButton, MenuItem, SwipeableDrawer
} from '@mui/material';

//  Services
import { navLinks } from '../../utils/navLinks';

//  Icons
import { ChevronDown, ChevronUp, LogOut, Moon, Settings, User, X } from 'lucide-react';

//  Navigation
import routes from '../../../navigation/routes';

//  "Page" Component
import ActiveLink from './activeLink';

//  Styles
import styles from '../../../styles/components/navbar.module.css';

//  Image
import companyLogo from '../../../public/Logotipo_Vetorizado.png';

// import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import Router from 'next/router';
import { destroyCookie } from 'nookies';

const DrawerMobile = ({ logout, toggleDrawer, state }) => {
  const loggedUser = state.auth.me;
  const userPermissions = state.auth.userPermissions;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ecraOpen, setEcraOpen] = useState(false);

  async function destroySessionCookie () {
    destroyCookie(null, 'auth_token');
  }

  function onLogout () {
    destroySessionCookie().then(() => {
      toggleDrawer();
      logout();
      Router.push(userPermissions.type === 'client' ? '/' : '/signin');
    });
  }

  return (
    <SwipeableDrawer
      disableSwipeToOpen={false}
      onOpen={() => toggleDrawer()}
      swipeAreaWidth={20}
      variant='temporary'
      anchor={'left'}
      open={state.appStates.drawerOpen}
      onClose={() => toggleDrawer()}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box
        sx={{ backgroundColor: 'default.sides' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          maxWidth: '250px'
        }}
      >
        {/* Sidebar Items List here */}
        <Box
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <IconButton
            style={{ color: 'var(--white)', position: 'absolute', right: '0%' }}
            onClick={() => toggleDrawer()}>
            <X />
          </IconButton>
          <Box style={{ margin: '1rem' }}>
            <Image
              src={companyLogo}
              alt='company logo'
              width={75}
              height={75}
            />
          </Box>
          <Divider
            color='white'
            width='100%'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
        </Box>
        <Box className='scrollableZone'>
          {navLinks
            .filter(item => {
              if (!loggedUser) return false;

              if (!userPermissions) return false;

              const canAccess = userPermissions?.permissions_orion.find(
                ele => ele === item.allowed_ || item.allowed_.toLowerCase() === userPermissions?.description.toLowerCase()
              );

              const isInternal = IsInternal(userPermissions?.description);
              const isInternalUrl = Object.values(routes.private.internal).includes(item.url.replace('[Id]', ''));

              return canAccess && isInternal === isInternalUrl;
            })
            .map((item, i) => (
              <Box key={i}>
                <MenuItem id={item.id} sx={{ padding: '0', width: '100%' }}
                  onClick={() => { toggleDrawer(); Router.push(item.url); }}>
                  <ActiveLink
                    href={item.url}
                    // handleDrawerToggle={toggleDrawer}
                    page={item.title}
                  >
                    {item.icon}
                    <div style={{ paddingRight: '.5rem' }} />
                    {item.title}
                  </ActiveLink>
                </MenuItem>
                {item.underline && (
                  <Divider color='white' width='100%' />
                )}
              </Box>
            ))}
          {/* Definições */}
          <MenuItem sx={{ padding: '0', display: 'none' }}>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderLeft: '5px solid transparent',
              }}
              className={styles.navItemContainer}
              onClick={() => setSettingsOpen(!settingsOpen)}>
              <Box id='align'>
                <Settings strokeWidth='1' size={20} color='white' />
                <span style={{ paddingLeft: '.5rem', cursor: 'pointer' }}>
                  Definições
                </span>

              </Box>
              {settingsOpen ? <ChevronUp strokeWidth='1' size={20} /> : <ChevronDown strokeWidth='1' size={20} />}

            </Box>
          </MenuItem>
          <Collapse in={settingsOpen} sx={{ backgroundColor: localStorage.getItem('theme') === 'light' ? 'primary.light' : '#121212' }}>
            <MenuItem sx={{ padding: '0' }}>
              <a className={styles.navItemContainer} onClick={() => setEcraOpen(!ecraOpen)}>
                <Box id='align'>
                  <Moon color={'white'} size={16} />
                  <span style={{ paddingLeft: '.5rem', cursor: 'pointer' }}>
                    Ecrã e acessibilidade
                  </span>
                  {ecraOpen ? <ChevronUp strokeWidth='1' size={20} /> : <ChevronDown strokeWidth='1' size={20} />}
                </Box>
              </a>
            </MenuItem>
          </Collapse>
          <Box style={{ position: 'relative', float: 'bottom', width: '100%' }}>
            {loggedUser
              ? (
                <>
                  <Divider
                    color='white'
                    width='100%'
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                  />
                  <MenuItem sx={{ padding: '0' }} onClick={() => {
                    toggleDrawer();
                    Router.push(IsInternal(userPermissions?.description) ? `${routes.private.internal.account}` : `${routes.private.account}`);
                  }} >
                    <ActiveLink
                      // handleDrawerToggle={toggleDrawer}
                      href={IsInternal(userPermissions?.description) ? `${routes.private.internal.account}` : `${routes.private.account}`}
                      page={'Conta'}
                    >
                      <User strokeWidth='1' size={20} color='white' />{' '}
                      <div style={{ paddingRight: '.5rem' }} />
                    Conta
                    </ActiveLink>
                  </MenuItem>
                  <MenuItem sx={{ padding: '0' }} onClick={() => {
                    onLogout();
                  }}>
                    <a
                      className={styles.navItemContainer}
                    >
                      <LogOut strokeWidth='1' size={20} />
                      <div style={{ paddingRight: '.5rem' }} /> Sair
                    </a>
                  </MenuItem>
                </>
              )
              : null}
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerMobile;
