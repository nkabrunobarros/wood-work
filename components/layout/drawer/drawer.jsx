/* eslint-disable react/prop-types */
//  Nodes
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import IsInternal from '../../utils/IsInternal';

//  Material UI
import {
  Box,
  Collapse,
  Divider,
  IconButton, MenuItem,
  SpeedDial,
  SpeedDialAction, SwipeableDrawer,
  Switch,
  Tooltip,
  Typography
} from '@mui/material';

//  Services
import { navLinks } from '../../utils/navLinks';

//  Icons
import { ChevronDown, ChevronUp, LogOut, Moon, Settings, Sun, Type, User, X } from 'lucide-react';

//  Navigation
import routes from '../../../navigation/routes';

//  "Page" Component
import ActiveLink from './activeLink';

//  Styles
import styles from '../../../styles/components/navbar.module.css';

//  Image
import { useDispatch, useSelector } from 'react-redux';
import companyLogo from '../../../public/Logotipo_Vetorizado.png';
// import * as authActions from '../../../pages/api/actions/auth';
import Router from 'next/router';
import Auth from '../../../lib/AuthData';
import * as appStatesActions from '../../../store/actions/appState';
import * as authActions from '../../../store/actions/auth';

const DrawerMobile = ({ mobileOpen, toggleTheme, toggleFontSize }) => {
  const theme = useTheme();
  const loggedUser = useSelector((state) => state.auth.me);
  const userPermissions = useSelector((state) => state.auth.userPermissions);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ecraOpen, setEcraOpen] = useState(false);
  const toggleDrawer = () => dispatch(appStatesActions.toggleDrawer());
  const logout = () => dispatch(authActions.logout());
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData () {
      Auth(dispatch);
    }

    Promise.all([getData()]);
  }, []);

  const actions = [
    { icon: <Typography variant='xs'>T</Typography>, name: 'Extra pequeno', value: 'xs' },
    { icon: <Typography variant='sm'>T</Typography>, name: 'Pequeno', value: 'sm' },
    { icon: <Typography variant='md'>T</Typography>, name: 'Normal', value: 'md' },
    { icon: <Typography variant='xl'>T</Typography>, name: 'Grande', value: 'xl' },
    { icon: <Typography variant='xxl'>T</Typography>, name: 'Maior', value: 'xxl' },
  ];

  return loggedUser && userPermissions && (
    <SwipeableDrawer
      disableSwipeToOpen={false}
      onOpen={() => toggleDrawer()}
      swipeAreaWidth={20}
      variant='temporary'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
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
            onClick={toggleDrawer}>
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
          {navLinks.map((item, i) => (
            <React.Fragment key={i}>
              {loggedUser
                ? (
                  <React.Fragment key={i * 100}>
                    {userPermissions?.permissions.find(ele => (ele.subject === item.allowed || item.allowed.toLowerCase() === userPermissions?.description.toLowerCase()) && ele.action === 'READ') &&
                    IsInternal(userPermissions?.description) === Object.values(routes.private.internal).includes(item.url.replace('[Id]', ''))
                      ? (
                        <MenuItem id={item.id} sx={{ padding: '0' }}>
                          <ActiveLink
                            key={i}
                            href={item.url}
                            handleDrawerToggle={toggleDrawer}
                            page={item.title}
                          >
                            {item.icon}
                            <div style={{ paddingRight: '.5rem' }} />
                            {item.title}
                          </ActiveLink>
                        </MenuItem>
                      )
                      : null}
                  </React.Fragment>
                )
                : null}
            </React.Fragment>
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
            <Collapse in={ecraOpen}>
              <Box sx={{ width: '100%', marginLeft: '1rem' }} >
                <Box >
                  <Tooltip title='Ajusta o aspeto da aplicação para reduzir o brilho excessivo e para descansares os olhos.'>
                    <a style={{ color: 'white' }} >Modo Escuro</a>
                  </Tooltip>
                  <Switch checked={localStorage.getItem('theme') === 'dark'} onClick={toggleTheme} />
                  {localStorage.getItem('theme') === 'light' ? <Sun color='yellow' size={16} /> : <Moon color={'white'} size={16} />}
                </Box>
                <Tooltip title='Ajusta o tamanho do tipo de letra para que possam aparecer mais ou menos conteúdos no ecrã.'>
                  <a style={{ color: 'white' }} >Modo Compacto</a>
                </Tooltip>
                <Tooltip title='Altere o tamanho de letra' placement="right">
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'fixed', bottom: 16, left: 225 }}

                    icon={<Type />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        disabled={localStorage.getItem('font') === action.value}
                        onClick={() => toggleFontSize(action.value)}
                      />
                    ))}
                  </SpeedDial>
                </Tooltip>
              </Box>
            </Collapse>
          </Collapse>
          <div style={{ position: 'relative', float: 'bottom', width: '100%' }}>
            {loggedUser
              ? (
                <>
                  <Divider
                    color='white'
                    width='100%'
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                  />
                  <MenuItem sx={{ padding: '0' }}>

                    <ActiveLink
                      handleDrawerToggle={toggleDrawer}
                      href={IsInternal(userPermissions?.description) ? `${routes.private.internal.profile}` : `${routes.private.profile}`}
                      page={'Conta'}
                    >
                      <User strokeWidth='1' size={20} color='white' />{' '}
                      <div style={{ paddingRight: '.5rem' }} />
                    Conta
                    </ActiveLink>
                  </MenuItem>
                  <MenuItem sx={{ padding: '0' }}>
                    <a
                      className={styles.navItemContainer}
                      onClick={() => {
                        toggleDrawer();
                        Router.push(userPermissions.type === 'client' ? '/' : '/signin');
                        logout();
                      }}
                    >
                      <LogOut strokeWidth='1' size={20} />
                      <div style={{ paddingRight: '.5rem' }} /> Sair
                    </a>
                  </MenuItem>
                </>
              )
              : null}
          </div>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerMobile;
