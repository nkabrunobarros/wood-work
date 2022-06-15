//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import EditUserScreen from '../../../components/pages/editUser/editUser';

//  Utils
import hasData from '../../../components/utils/hasData';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import countryService from '../../../services/countries/country-service';
import userService from '../../../services/user/user-service';

const EditUser = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();
  const [user, setUser] = useState();
  const router = useRouter();
  const userId = router.query.Id;

  useEffect(() => {
    const getAll = async () => {
      await userService.getAllUsers().then((res) => {
        const user = res.data.data.find(
          (user) => user.id.toString() === userId.toString()
        );
        setUser(user);
      });
      await countryService
        .getAllCountries()
        .then((res) => setCountries(res.data.data));
    };
    Promise.all([getAll()]).then(setLoaded(true));
  }, []);
  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.internal.users}`,
      },
      {
        title: 'Editar Utilizador',
        href: `${routes.private.internal.editUser}`,
      },
    ];
    const props = {
      breadcrumbsPath,
      user,
      pageProps,
      countries,
    };
    if (hasData(user) && hasData(countries)) pageProps.hasFullyLoaded = true;
    return loaded && pageProps.hasFullyLoaded ? (
      <EditUserScreen {...props} />
    ) : (
      <Loader center={true} />
    );
  }
  return <Loader center={true} />;
};
export default EditUser;
