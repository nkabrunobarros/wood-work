import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import { getUsers } from '../../../components/mock/Users';
import EditUserScreen from '../../../components/pages/editUser/editUser';
import routes from '../../../navigation/routes';

export async function getServerSideProps(context) {
  const res = await getUsers();
  return {
    props: { users: res }, // will be passed to the page component as props
  };
}
// eslint-disable-next-line react/prop-types
const EditUser = ({ users }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const id = router.query.Id;
  // eslint-disable-next-line react/prop-types
  const user = users.find((client) => client.id.toString() === id.toString());

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
      title: 'Editar Utilizador',
      href: `${routes.private.internal.editUser}`,
    },
  ];
  const props = {
    breadcrumbsPath,
    user,
  };

  return loaded ? <EditUserScreen {...props} /> : <Loader center={true} />;
};
export default EditUser;
