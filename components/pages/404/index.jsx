import Router from 'next/router';
import React from 'react';
import styles from '../../../styles/404.module.css';

const notFoundPage = () => {
  return (
    <div className={styles.main} target="_blank" rel="noreferrer">
      <header className={styles.topheader}></header>

      <div>
        <div className={styles.starsec}></div>
        <div className={styles.starthird}></div>
        <div className={styles.starfourth}></div>
        <div className={styles.starfifth}></div>
      </div>
      {/*
    <div className={styles.lamp__wrap}>
      <div className={styles.lamp}>
        <div className={styles.cable}></div>
        <div className={styles.cover}></div>
        <div className={styles.in}>
          <div className={styles.bulb}></div>
        </div>
        <div className={styles.light}></div>
      </div>
    </div> */}
      <section className={styles.error}>
        <div className={styles.error__content}>
          <div className={styles.error__message}>
            <h1 className={styles.message__title}>Página não encontrada</h1>
            <p className={styles.message__text}>
              Desculpe, a página que você estava procurando não foi encontrada aqui. O link que você seguiu pode estar quebrado ou não existir mais.
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
