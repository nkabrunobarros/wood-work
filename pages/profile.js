//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import ProfileScreen from '../components/pages/profile/profile'

//  Page Component

const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  return loaded ? <ProfileScreen /> : <div> <Loader center={true} /></div>
}
export default Profile
