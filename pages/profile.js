//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import getUsers from '../components/mock/Users'
import ProfileScreen from '../components/pages/profile/profile'

//  Page Component

const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const users = getUsers()
  const user = users.find(user => user.id === 1)
  const props = {
    user
  }

  return loaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Profile
