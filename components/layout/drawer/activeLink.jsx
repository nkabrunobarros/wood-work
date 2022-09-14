import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../styles/components/navbar.module.css';

import routes from '../../../navigation/routes';

function ActiveLink({ children, href, handleDrawerToggle, page }) {
  const path = useRouter();

  const orderSimilarPages = [`${routes.private.internal.ordersSimilar}`];
  const messagesPages = [`${routes.private.messages}`];

  const ordersPages = [
    `${routes.private.orders}`,
    `${routes.private.order}[Id]`,
    `${routes.private.internal.orders}`,
    `${routes.private.internal.order}[Id]`,
    `${routes.private.internal.newOrder}`,
    `${routes.private.internal.editOrder}[Id]`,
  ];

  const stockPages = [
    `${routes.private.internal.stocks}`,
    `${routes.private.internal.stockId}[Id]`,
  ];

  const clientsPages = [
    `${routes.private.internal.clients}`,
    `${routes.private.internal.client}[Id]`,
    `${routes.private.internal.editClient}[Id]`,
    `${routes.private.internal.newClient}`,
  ];

  const usersPages = [
    `${routes.private.internal.users}`,
    `${routes.private.internal.user}[Id]`,
    `${routes.private.internal.editUser}[Id]`,
    `${routes.private.internal.newUser}`,
  ];
  const profilePages = [`${routes.private.profile}[Id]`];

  let currentSection = '';
  if (ordersPages.includes(path.route)) currentSection = 'Encomendas';
  if (orderSimilarPages.includes(path.route)) currentSection = 'Encomendas Similares';
  if (stockPages.includes(path.route)) currentSection = 'Stock';
  if (clientsPages.includes(path.route)) currentSection = 'Clientes';
  if (usersPages.includes(path.route)) currentSection = 'Utilizadores';
  if (profilePages.includes(path.route)) currentSection = 'Perfil';
  if (messagesPages.includes(path.route)) currentSection = 'Mensagens';
  
  const style = {
    borderLeft:
    page === currentSection
        ? '5px solid var(--white)'
        : '5px solid transparent',
  };

  const handleClick = (e) => {
    e.preventDefault();
    path.push(href);
  };

  return (
    <a
      key={href}
      href={href}
      onClick={(e) => {
        handleClick(e);
        handleDrawerToggle();
      }}
      className={styles.navItemContainer}
      style={style}
    >
      {children}
    </a>
  );
}
ActiveLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  handleDrawerToggle: PropTypes.any,
  page: PropTypes.string,
};

export default ActiveLink;
