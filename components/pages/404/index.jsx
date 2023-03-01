import { Tooltip } from '@mui/material';
import Router from 'next/router';
import React from 'react';
import styles from '../../../styles/404.module.css';

const notFoundPage = (props) => {
  const { noAccess } = props;

  return (
    <div className={styles.main} target="_blank" rel="noreferrer">
      <header className={styles.topheader}></header>
      <div>
        <div className={styles.starsec}></div>
        <div className={styles.starthird}></div>
        <div className={styles.starfourth}></div>
        <div className={styles.starfifth}></div>
      </div>
      <section className={styles.error}>
        <div className={styles.error__content}>
          <div className={styles.error__message}>
            <h1 className={styles.message__title}> {noAccess ? 'Não tem acesso a esta página' : 'Página não encontrada' }</h1>
            <p className={styles.message__text}>
              {noAccess
                ? <>Se é suposto ter acesso a esta página, por favor entre em
                  <Tooltip title='Enviar email'>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_REPORT_EMAIL}`} className='link'> contacto </a>
                  </Tooltip>
                        com o responsavel
                </>
                : ' Desculpe, a página que você estava procurando não foi encontrada aqui. O link que você seguiu pode estar quebrado ou não existir mais.'}
            </p>
          </div>
          <div className={styles.error__nav}>
            <a onClick={() => Router.back()}className={styles.enav__link}>
              Voltar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default notFoundPage;
