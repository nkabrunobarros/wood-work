//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';
import UsersScreen from '../../components/pages/users/users';

//  Navigation
import routes from '../../navigation/routes';

//  Proptypes
import PropTypes from 'prop-types';

//  Utils
import hasData from '../../components/utils/hasData';

//  Services
import countryService from '../../services/countries/country-service';
import userService from '../../services/user/user-service';

const Users = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState();
  const [countries, setCountries] = useState();
  const items = users;

  useEffect(() => {
    const getData = async () => {
      await userService.getAllUsers().then((res) => {
        setUsers(res);
      });
      await countryService
        .getAllCountries()
        .then((res) => setCountries(res.data.data));
    };
    Promise.all([getData()]).then(setLoaded(true));
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  const breadcrumbsPath = [
    {
      title: 'Utilizadores',
      href: `${routes.private.users}`,
    },
  ];

  const headCells = [
    {
      id: 'nome',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    },
    {
      id: 'perfil',
      numeric: true,
      disablePadding: false,
      label: 'Perfil',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];
  const editRoute = routes.private.internal.editUser;
  const detailRoute = routes.private.internal.user;
  const newRoute = routes.private.internal.newUser;
  const props = {
    items,
    breadcrumbsPath,
    countries,
    editRoute,
    detailRoute,
    headCells,
    newRoute,
  };
  console.log(typeof items)
  if (hasData(items) && hasData(countries)) pageProps.hasFullyLoaded = true;
  return !pageProps.hasFullyLoaded && loaded ? (
    <UsersScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};

Users.propTypes = {
  items: PropTypes.array,
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array,
  countries: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
};
export default Users;
