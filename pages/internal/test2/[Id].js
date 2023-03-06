import Router from 'next/router';
import React from 'react';

const Test2 = () => {
    return <>
        <button onClick={() => Router.push('/internal/test3')} >GO TO TEST3</button>
        TEST 2!

    </>;
    // return <Test />;
};

export default Test2;
