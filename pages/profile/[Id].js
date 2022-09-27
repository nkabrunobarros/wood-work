//  Nodes
import React from 'react'

//  Custom Components
import Loader from '../../components/loader/loader'

//  Page Component
import ProfileScreen from '../../components/pages/profile/profile'

//  Proptypes
import PropTypes from 'prop-types'

//  Navigation
import routes from '../../navigation/routes'

//  Services


const Profile = ({ ...pageProps }) => {
  let loaded = false;
  const user = JSON.parse(localStorage.getItem('user'));
  // const router = useRouter()
  // const id = router.query.Id

  if (user) loaded = true

  if (loaded) {
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

    return loaded && <ProfileScreen {...props} />
  } else return <Loader center={true} />

};

Profile.propTypes = {
  users: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
}

export default Profile
