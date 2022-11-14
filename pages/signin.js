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

    const props = {
        login: authActions.loginClient,
        me: authActions.me
    };

    return loaded ? <SignIn {...props} /> : <Loader center={true} />;
};

export default Home;
