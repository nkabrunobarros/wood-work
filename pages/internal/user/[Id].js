//  Nodes
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import UserScreen from '../../../components/pages/profile/profile';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../../navigation/routes';

//  Utlis
import hasData from '../../../components/utils/hasData';

//  Services
import userService from '../../../services/user/user-service';

const User = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const id = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await userService.getUserById(id).then((res) => {
        setUser(res.data.data);
      });
    };
    Promise.all([getAll()]).then(setLoaded(true));
  }, []);
  
  if (hasData(user)) {
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
    if (hasData(user)) pageProps.hasFullyLoaded = true;
    return pageProps.hasFullyLoaded && loaded ? (
      <UserScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default User;
