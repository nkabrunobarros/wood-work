/* eslint-disable react/prop-types */
//  Nodes
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import React, { useState } from 'react';
import IsInternal from '../../utils/IsInternal';

//  Material UI
import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  SwipeableDrawer
} from '@mui/material';

//  Utlis

//  Services
import getLinks from '../../utils/navLinks';

//  Icons
import { LogOut, User, X } from 'lucide-react';

//  Navigation
import routes from '../../../navigation/routes';

//  "Page" Component
import ActiveLink from './activeLink';

//  Styles
import styles from '../../../styles/components/navbar.module.css';

//  Image
import * as authActions from '../../../pages/api/actions/auth';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
// import * as authActions from '../../../pages/api/actions/auth';

const DrawerMobile = ({ mobileOpen, handleDrawerToggle, ...pageProps }) => {
  const theme = useTheme();
  const navLinks = getLinks();
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };
  
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
      <Box
        style={{
          backgroundColor: 'var(--primary-dark)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        {/* Sidebar Items List here */}
        <Box
          style={{
            backgroundColor: 'var(--primary-dark)',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <IconButton
            style={{ color: 'var(--white)', position: 'absolute', right: '0%' }}
            onClick={handleDrawerToggle}>
            <X />
          </IconButton>
          <Box style={{ width: '100px', height: '100px', margin: '1rem' }}>
            <Image
              src={companyLogo}
              style={{ margin: '1rem' }}
              width={100}
              height={100}
              layout='fixed'
            />
          </Box>
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
        </Box>
        <Box className='scrollableZone'>
          {navLinks.map((item, i) => (
            <React.Fragment key={i}>
              {loggedUser ? (
                <React.Fragment key={i * 100}>
                  {/* {console.log(item.url)} */}
                  {loggedUser.perfil.permissoes.find(ele => ele.sujeito === item.allowed && ele.accao === 'READ') 
                  &&  
                  IsInternal(pageProps.loggedUser.perfil.descricao) === Object.values(routes.private.internal).includes(item.url.replace('[Id]', ''))
                  ? (
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
                  ) : null}
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
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerMobile;
