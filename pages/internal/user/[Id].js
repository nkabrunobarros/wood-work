//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import UserScreen from '../../../components/pages/profile/profile';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as UserActions from '../../../pages/api/actions/user';

const User = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const id = router.query.Id;

  useEffect(() => {
    const getData = async () => {
      await UserActions
      .userById({id})
      .then((res) =>  setUser(res.data.payload))
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
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
      pageProps,
    };

    return <UserScreen {...props} />
     
  } else return  <Loader center={true} />

};

export default User;
