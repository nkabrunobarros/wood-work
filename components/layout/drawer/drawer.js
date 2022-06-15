/* eslint-disable react/prop-types */
//  Nodes
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

//  Material UI
import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';

//  Utlis
import hasData from '../../utils/hasData';

//  Services
import authService from '../../../services/auth-service';
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

const DrawerMobile = ({ mobileOpen, handleDrawerToggle, ...pageProps }) => {
  const theme = useTheme();
  const navLinks = getLinks();
  const [loggedUser, setLoggedUser] = useState(pageProps.loggedUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const handleClick = (event) => {
    if (anchorEl === null) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };
  useEffect(() => {
    const load = async () => {
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        const res = await authService.getCurrentUser();
        if (hasData(res.data.data)) {
          if (res.data.data === null) Router.push(routes.public.signIn);
          else setLoggedUser(res.data.data);
        } else Router.push(routes.public.signIn);
      }
    };
    load();
  }, [router.asPath]);
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
                  {loggedUser.perfil === item.allowed ? (
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
                    sessionStorage.removeItem('user');
                    localStorage.removeItem('user');
                    if (
                      !hasData(localStorage.getItem('user')) &&
                      !hasData(sessionStorage.getItem('user'))
                    )
                      Router.push(routes.public.signIn);
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
