import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';
import { ChevronRight, Home } from 'lucide-react';
import routes from '../../navigation/routes';
import Router from 'next/router';

import styles from '../../styles/components/navbar.module.css';

const CustomBreadcrumbs = ({ children, path }) => {
  const style = {
    fontWeight: 600,
    color: 'var(--primary)',
    pointerEvents: 'none',
  };

  const output = Object.keys(path).sort((a, b) => b - a);
  const arrayLenght = parseInt(output[0]);

  return (
    <div
      style={{
        background: 'white',
        marginTop: '2rem',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Breadcrumbs aria-label='breadcrumb' separator={<ChevronRight />}>
        <Link
          underline='hover'
          color='inherit'
          href={`${routes.private.orders}`}
        >
            <Home size={18} />
        </Link>
        {path.map((crumb, i) => (
          <a
            key={i}
            onClick={() => Router.push(crumb.href)}
            className={styles.breadcrumb}
            style={i < arrayLenght ? null : style}
          >
            {crumb.title}
          </a>
        ))}
      </Breadcrumbs>
    </div>
  );
};
CustomBreadcrumbs.propTypes = {
  children: PropTypes.any,
  path: PropTypes.any,
};
export default CustomBreadcrumbs;
