//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../../components/loader/loader'
import { getUsers } from '../../components/mock/Users'
import ProfileScreen from '../../components/pages/profile/profile'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import routes from '../../navigation/routes'

//  Page Component
export async function getServerSideProps (context) {
  const res = await getUsers()
  return {
    props: { users: res } // will be passed to the page component as props
  }
}

const Profile = ({ users }) => {
  const router = useRouter()
  const id = router.query.Id
  const [loaded, setLoaded] = useState(false)
  // eslint-disable-next-line react/prop-types
  const user = users.find(
    (user) => user.id.toString() === id.toString()
  );

  useEffect(() => {
    setTimeout(() => {
        setLoaded(true);
    }, 1500)
  }, [])

  const breadcrumbsPath = [
    {
      title: `Perfil`,
      href: `${routes.private.internal.user}`,
    },
  ];

  const props = {
    user,
    breadcrumbsPath
  }

  Profile.propTypes = {
    users: PropTypes.array,
    breadcrumbsPath: PropTypes.array,
  }

   return loaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Profile
