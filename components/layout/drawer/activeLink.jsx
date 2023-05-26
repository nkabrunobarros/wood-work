import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../../styles/components/navbar.module.css';

import routes from '../../../navigation/routes';
export const pageSections = {
  projects: 'Projetos',
  project: 'Projetos',
  budget: 'Projetos',
  newProject: 'Projetos',
  editProject: 'Projetos',
  editBudget: 'Projetos',
  projectsSimilar: 'Projetos Similares',
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
  factorys: 'Chão de Fabrica',
  factory: 'Chão de Fabrica',
  packages: 'Embalamentos',
  newPackage: 'Embalamentos',
  package: 'Embalamentos',
  projectPackages: 'Embalamentos',
  assemblys: 'Montagens',
  account: 'Conta',
  messages: 'Mensagens',
  newProfile: 'Perfis',
  editProfile: 'Perfis',
  profiles: 'Perfis',
  profile: 'Perfis',
  machines: 'Máquinas',
  machine: 'Máquinas',
  newMachine: 'Máquinas',
  editMachine: 'Máquinas',
};

function ActiveLink ({ children, url, handleDrawerToggle, page }) {
  const path = useRouter();

  const currentSection = Object.entries(pageSections).find(([page]) => {
    const regex = new RegExp(`^${routes.private.internal[page]}(\\[.+\\])?$`);
    const regex2 = new RegExp(`^${routes.private[page]}(\\[.+\\])?$`);

    return regex.test(path.route) || regex2.test(path.route);
  })?.[1] ?? '';

  const style = {
    borderLeft: '5px solid',
    borderColor: page === currentSection ? 'var(--white)' : 'transparent',
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <a
      key={url}
      onClick={(e) => {
        handleDrawerToggle && handleDrawerToggle();
        handleClick(e);
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
  url: PropTypes.string,
  handleDrawerToggle: PropTypes.func,
  page: PropTypes.string,
};

export default ActiveLink;
