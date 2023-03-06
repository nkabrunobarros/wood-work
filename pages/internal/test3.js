import Router from 'next/router';
import React from 'react';

const Test2 = () => {
    return <>
        <button onClick={() => Router.push('/internal/test')} >GO TO TEST</button>

        TEST 3!
    </>;
    // return <Test />;
};

export default Test2;
