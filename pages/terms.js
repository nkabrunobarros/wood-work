//  Nodes
import TermsScreen from '../components/pages/terms/terms';
/* eslint-disable array-callback-return */
//  Nodes
import React, { useEffect, useState } from 'react';

//  Icons
import { useDispatch, useSelector } from 'react-redux';
import AuthData from '../lib/AuthData';

const Terms = ({ ...pageProps }) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const [loaded, setLoaded] = useState(false);

  async function fetchData (dispatch) {
    let errors = false;

    try {
      (!reduxState.auth.me || !reduxState.auth.userPermissions) && AuthData(dispatch);
    } catch (err) { errors = true; }

    return !errors;
  }

  useEffect(() => {
    async function loadData () {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);

  return loaded && <TermsScreen {...pageProps} />;
};

export default Terms;
