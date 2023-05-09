import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../styles/components/navbar.module.css';

import routes from '../../../navigation/routes';

function ActiveLink ({ children, href, handleDrawerToggle, page }) {
  const path = useRouter();

  const pageSections = {
    projects: 'Projetos',
    project: 'Projetos',
    budget: 'Projetos',
    newProject: 'Projetos',
    editProject: 'Projetos',
    editBudget: 'Projetos',
    orders: 'Projetos',
    stocks: 'Stock',
    stock: 'Stock',
    editStock: 'Stock',
    clients: 'Clientes',
    client: 'Clientes',
    editClient: 'Clientes',
    newClient: 'Clientes',
    workers: 'Utilizadores',
    worker: 'Utilizadores',
    editWorker: 'Utilizadores',
    newWorker: 'Utilizadores',
    leftovers: 'Sobrantes',
    factoryLevel: 'Chão de Fabrica',
    packing: 'Embalamentos',
    assemblys: 'Montagens',
    profile: 'Conta',
    messages: 'Mensagens',
    dashboards: 'Painel de Controlo',
  };

  const currentSection = Object.entries(pageSections).find(([page]) => {
    const regex = new RegExp(`^${routes.private.internal[page]}(\\[.+\\])?$`);

    return regex.test(path.route);
  })?.[1] ?? '';

  const style = {
    borderLeft: '5px solid',
    borderColor: page === currentSection ? 'var(--white)' : 'transparent',
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
