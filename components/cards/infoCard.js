//  Nodes
import React from 'react';

//  PropTypes
import PropTypes from 'prop-types';
//  Material Ui
import { Grid, Typography } from '@mui/material';

//  Styles
import { useRouter } from 'next/router';
import routes from '../../navigation/routes';
import styles from '../../styles/components/infoCard.module.css';


const InfoCard = ({ title, icon, amount, color }) => {
  const path = useRouter();
  const isInternalPage = Object.values(routes.private.internal).includes(path.route.replace('[Id]', ''));

  const style = {
    color: `${color}`,
  };

  return (
    <Grid bgcolor={"default.main"} md={12} className={styles.card} style={style}>
      <Grid container item md={2}>{icon}</Grid>
      <Grid container item md={10} className='fullCenter'>
        <Grid><Typography variant='md' className={styles.cardTitle}>{title}</Typography></Grid>
        <Grid><Typography variant='xxl'>{amount} {isInternalPage ? 'Projetos' : 'Encomendas'}</Typography></Grid>
      </Grid>
    </Grid>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  amount: PropTypes.number,
  color: PropTypes.string
};

export default InfoCard;
