import { Box, Breadcrumbs, IconButton, Tooltip, Typography } from '@mui/material';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../navigation/routes';

import styles from '../../styles/components/navbar.module.css';

const CustomBreadcrumbs = ({ path }) => {
  const isInternalPage = Object.values(routes.private.internal).includes(Router.route.replace('[Id]', ''));

  const style = {
    color: 'var(--grayLight) !important',
    pointerEvents: 'all',
    textDecoration: 'none !important',
  };

  const output = Object.keys(path)?.sort((a, b) => b - a);
  const arrayLenght = parseInt(output[0]);

  return (
    <Box
      bgcolor={'default.main'}
      style={{
        marginTop: '2rem',
        borderRadius: '8px',
        padding: '6px',
        boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Breadcrumbs id='align' aria-label='breadcrumb' separator={<ChevronRight />}>
        <IconButton onClick={() => Router.push(isInternalPage ? routes.private.internal.projects : routes.private.projects)}>
          <Tooltip title={'Ir para Pedidos'}>
            <Home strokeWidth={1} size={18} />
          </Tooltip>
        </IconButton>
        {path.map((crumb, i) => (
          <Link
            key={i}
            // onClick={() => Router.push(crumb.href)}
            href={crumb.href}
            className={styles.breadcrumb}
          >
            <Typography color='link.main' sx={i < arrayLenght && { ...style }}> {crumb.title}</Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </Box >
  );
};

CustomBreadcrumbs.propTypes = {
  children: PropTypes.any,
  path: PropTypes.any,
};

export default CustomBreadcrumbs;
