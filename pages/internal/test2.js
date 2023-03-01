//  Nodes
// import Test from '../components/pages/test';

import Router from 'next/router';
//  Navigation
//  Styling

const Terms = () => {
    return <button onClick={() => Router.push('/internal/test')}>go test</button>;
    // return <Test />;
};

Terms.propTypes = {
};

export default Terms;
