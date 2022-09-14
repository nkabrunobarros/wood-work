/* eslint-disable react/prop-types */
//  Nodes
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import React, { useState } from 'react';

//  Material UI
import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  SwipeableDrawer
} from '@mui/material';

//  Utlis

//  Services
import getLinks from '../../mock/navLinks';

//  Icons
import { LogOut, User, X } from 'lucide-react';

//  Navigation
import routes from '../../../navigation/routes';

//  "Page" Component
import ActiveLink from './activeLink';

//  Styles
import styles from '../../../styles/components/navbar.module.css';

//  Image
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
import * as authActions from '../../../src/actions/auth';

const DrawerMobile = ({ mobileOpen, handleDrawerToggle, ...pageProps }) => {
  console.log(pageProps)
  const theme = useTheme();
  const navLinks = getLinks();
  const { loggedUser } = pageProps;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };
  const internalProfiles = ['Administrador'];
  let allowedPages;
  if (internalProfiles.find((element) => element === loggedUser?.perfil.descricao)) allowedPages = 'internal';
  else allowedPages = 'Client'
  return loggedUser && (
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
          <div style={{ width: '100px', height: '100px', margin: '1rem' }}>
            <Image
              src={companyLogo}
              style={{ margin: '1rem' }}
              width={100}
              height={100}
              layout='fixed'
            />
          </div>
          <ListItemButton onClick={handleClick} sx={{ color: 'white' }}>
            <ListItemText
              primary={loggedUser ? loggedUser.nome : 'user'}
              secondary={
                <a style={{ color: '#FFFFFF', fontSize: 'small' }}>
                  {loggedUser ? loggedUser.email : 'email'}
                </a>
              }
            />
          </ListItemButton>

          <Divider
            color='white'
            width='100%'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
        </div>
        <div className='scrollableZone'>
          {navLinks.map((item, i) => (
            <React.Fragment key={i}>
              {loggedUser ? (
                <React.Fragment key={i * 100}>
                  {allowedPages === item.allowed && (
                    <ActiveLink
                      key={i}
                      href={item.url}
                      handleDrawerToggle={handleDrawerToggle}
                      page={item.title}
                    >
                      {item.icon}
                      <div className='spacerBox' />
                      {item.title}
                    </ActiveLink>
                  )}
                </React.Fragment>
              ) : null}
            </React.Fragment>
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
                  page={'Perfil'}
                >
                  <User strokeWidth='1' size={20} color='white' />{' '}
                  <div className='spacerBox' />
                  Perfil
                </ActiveLink>
                <a
                  className={styles.navItemContainer}
                  onClick={() => {
                    authActions.logout()
                  }}
                >
                  <LogOut strokeWidth='1' size={20} />
                  <div className='spacerBox' /> LogOut
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
