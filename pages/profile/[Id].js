//  Nodes
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

//  Custom Components
import Loader from '../../components/loader/loader'

//  Page Component
import ProfileScreen from '../../components/pages/profile/profile'

//  Proptypes
import PropTypes from 'prop-types'

//  Navigation
import routes from '../../navigation/routes'

//  Services
import userService from '../../services/user/user-service';

//  Utils
import hasData from '../../components/utils/hasData'


const Profile = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState()
  const router = useRouter()
  const id = router.query.Id

  useEffect(() => {
    const getData = async () => {
      await userService
        .getUserById(id)
        .then((res) => setUser(res.data.data));
    };
    Promise.all([getData()]).then(setLoaded(true));
  }, []);
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
  
    Profile.propTypes = {
      users: PropTypes.array,
      breadcrumbsPath: PropTypes.array,
    }
    if (hasData(user)) pageProps.hasFullyLoaded = true;
     return pageProps.hasFullyLoaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
  }

  
}
export default Profile
