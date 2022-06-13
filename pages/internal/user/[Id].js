//  Nodes
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';
import { getUsers } from '../../../components/mock/Users';
import UserScreen from '../../../components/pages/profile/profile';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import routes from '../../../navigation/routes';
import hasData from '../../../components/utils/hasData';

//  Page Component
export async function getServerSideProps(context) {
  const res = await getUsers();
  return {
    props: { users: res }, // will be passed to the page component as props
  };
}

// eslint-disable-next-line react/prop-types
const User = ({ users, ...pageProps }) => {
  const router = useRouter();
  const id = router.query.Id;
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line react/prop-types
  const user = users.find((user) => user.id.toString() === id.toString());

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  const breadcrumbsPath = [
    {
      title: 'Utilizadores',
      href: `${routes.private.internal.users}`,
    },
    {
      title: `${user.nome}`,
      href: `${routes.private.internal.user}`,
    },
  ];

  const props = {
    user,
    breadcrumbsPath,
  };

  UserScreen.propTypes = {
    users: PropTypes.array,
    breadcrumbsPath: PropTypes.array,
  };
  if (hasData(users) && hasData(user)) pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? (
    <UserScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
export default User;
