//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import NewUserScreen from '../../components/pages/newUser/newUser';

//  Utils
import hasData from '../../components/utils/hasData';

//  Navigation
import routes from '../../navigation/routes';

//  Services
import countryService from '../../services/countries/country-service';

const NewOrder = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState();

  useEffect(() => {
    const getData = async () => {
      await countryService
      .getAllCountries()
      .then((res) => setCountries(res.data.data));
    }
    Promise.all([getData()]).then(setLoaded(true));

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
      title: 'Novo Utilizador',
      href: `${routes.private.internal.newUser}`,
    },
  ];
  const props = {
    breadcrumbsPath,
    countries,
  };
  if (hasData(countries)) pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded ? (
    <NewUserScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
export default NewOrder;
