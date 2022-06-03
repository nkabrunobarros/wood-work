// Node modules
import { IconButton, Menu, MenuItem } from '@mui/material';
import { ChevronDown, LogOut, User } from 'lucide-react';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import routes from '../../../navigation/routes';

import styles from '../../../styles/components/navbar.module.css';
import ActiveLink from './activeLink';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import getLinks from '../../mock/navLinks';
import { getUser } from '../../mock/Users';

const Navbar = ({ openDrawer }) => {
  const navLinks = getLinks();
  const [loggedUser, setLoggedUser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

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
  return (
    <div className={styles.main}>
      <div className={styles.navigationButtons}>
        <div className='mobile'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ ml: 2, ...(open && { display: 'none' }) }}
          >
            <MenuOutlinedIcon
              onClick={openDrawer}
              style={{ fontSize: '4vh', color: 'var(--white)' }}
            />
          </IconButton>
        </div>
        <div className='mobileView flex'>
          <div className='logoImg' style={{width: '80px', height: '80px'}}></div>
          {/* <img
            className={styles.logoImg}
            src='https://media-exp1.licdn.com/dms/image/C4E0BAQG1luLQFqx-kg/company-logo_200_200/0/1595435482155?e=2147483647&v=beta&t=-gV-ZtIZb3EOpic3RkbD_91VgMu2ttGyIREm8xh5KNc'
          /> */}
          {navLinks.map((item, i) => (
            <>
              {loggedUser ? (
                <>
                  {loggedUser.perfil === item.allowed ? (
                    <ActiveLink key={i} href={item.url}>
                      {item.icon} {item.title}
                    </ActiveLink>
                  ) : null}
                </>
              ) : null}
            </>
          ))}
        </div>
        <a className={styles.userDropdown} onClick={handleClick}>
          <User stroke-width="1"/>
          {loggedUser ? <>{loggedUser.nome}</> : 'User'}
          <ChevronDown />
        </a>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              Router.push(`${routes.private.profile}${loggedUser.id}`);
              handleClose();
            }}
          >
            <User stroke-width="1"/> Perfil
          </MenuItem>
          <MenuItem
            onClick={() => {
              Router.push(routes.public.signIn);
              handleClose();
            }}
          >
            <LogOut stroke-width="1" onClick={ logout} /> Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  openDrawer: PropTypes.any,
};

export default Navbar;
