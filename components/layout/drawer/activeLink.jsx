import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../styles/components/navbar.module.css';

import routes from '../../../navigation/routes';

function ActiveLink({ children, href, handleDrawerToggle, page }) {
  const path = useRouter();
  const orderSimilarPages = [`${routes.private.internal.ordersSimilar}`];
  const messagesPages = [`${routes.private.messages}`];

  const projectsPages = [
    `${routes.private.orders}`,
    `${routes.private.order}[Id]`,
    `${routes.private.internal.projects}`,
    `${routes.private.internal.project}[Id]`,
    `${routes.private.internal.newProject}`,
    `${routes.private.internal.editProject}[Id]`,
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

  const workersPages = [
    `${routes.private.internal.workers}`,
    `${routes.private.internal.worker}[Id]`,
    `${routes.private.internal.editWorker}[Id]`,
    `${routes.private.internal.newWorker}`,
  ];

  const leftoversPages = [
    `${routes.private.internal.leftovers}`,
  ];

  const factoryPages = [
    `${routes.private.internal.factoryLevel}`,
  ];

  const profilePages = [`${routes.private.profile}[Id]`];
  const dashboardPages = [`${routes.private.internal.dashboards}`];
  let currentSection = '';

  if (projectsPages.includes(path.route)) currentSection = 'Encomendas';

  if (orderSimilarPages.includes(path.route)) currentSection = 'Encomendas Similares';

  if (stockPages.includes(path.route)) currentSection = 'Stock';

  if (clientsPages.includes(path.route)) currentSection = 'Clientes';

  if (workersPages.includes(path.route)) currentSection = 'Workers';

  if (profilePages.includes(path.route)) currentSection = 'Perfil';

  if (messagesPages.includes(path.route)) currentSection = 'Mensagens';

  if (dashboardPages.includes(path.route)) currentSection = 'Painel de Controlo';

  if (leftoversPages.includes(path.route)) currentSection = 'Sobrantes';

  if (factoryPages.includes(path.route)) currentSection = 'Chão de Fabrica';

  const style = {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
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
  handleDrawerToggle: PropTypes.func,
  page: PropTypes.string,
};

export default ActiveLink;
