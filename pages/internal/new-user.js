import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import getCountries from '../../components/mock/Countries';
import NewUserScreen from '../../components/pages/newUser/newUser';
import hasData from '../../components/utils/hasData';
import routes from '../../navigation/routes';
export async function getServerSideProps(context) {
  const res2 = await getCountries();
  return {
    props: { countries: res2 }, // will be passed to the page component as props
  };
}
// eslint-disable-next-line react/prop-types
const NewOrder = ({ countries, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
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
