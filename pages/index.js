import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/loader/loader';
import SignIn from '../components/pages/signin/signin';
import * as authActions from '../pages/api/actions/auth';

const Home = () => {
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);


  const config = {
    method: 'GET',
    url: 'http://woodwork4.ddns.net/api/ngsi-ld/v1/entities?type=Organization',
    headers: {
      'access-control-allow-headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-origin': '*'
    }
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });




  const client = true;

  const props = {
    client,
    login: authActions.login,
    me: authActions.me
  };

  return loaded ? <SignIn {...props} /> : <div> <Loader center={true} /></div>;
};

export default Home;
