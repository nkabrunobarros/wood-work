//  Nodes
import React from 'react';
import TermsScreen from '../components/pages/terms/terms';
import { ensureAuth } from '../lib/auth';
import { storeWrapper } from '../store';
export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (ctx) => {
  await ensureAuth(store, ctx);
});

const Terms = ({ ...pageProps }) => {
  return <TermsScreen {...pageProps} />;
};

export default Terms;
