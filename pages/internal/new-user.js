import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import getCountries from '../../components/mock/Countries';
import NewUserScreen from '../../components/pages/newUser/newUser';
import routes from '../../navigation/routes';
export async function getServerSideProps(context) {
  const res2 = await getCountries();
  return {
    props: { countries: res2 }, // will be passed to the page component as props
  };
}
// eslint-disable-next-line react/prop-types
const NewOrder = ({ countries }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
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
    countries
  };

  return loaded ? <NewUserScreen {...props} /> : <Loader center={true} />;
};
export default NewOrder;
