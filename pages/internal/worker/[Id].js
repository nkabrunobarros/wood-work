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
import * as WorkerActions from '../../api/actions/worker';

const User = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const id = router.query.Id;

  useEffect(() => {
    const getData = async () => {
      await WorkerActions
        .worker({ id })
        .then((res) => { setUser(res.data[0]); console.log(res); });
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Workers',
        href: `${routes.private.internal.workers}`,
      },
      {
        title: `${user.name.value}`,
        href: `${routes.private.internal.worker}`,
      },
    ];

    const props = {
      user,
      breadcrumbsPath,
      pageProps,
    };

    return <UserScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default User;
