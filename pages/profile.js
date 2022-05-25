//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import HomeScreen from '../components/pages/home/home'

//  Page Component

const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  return loaded ? <HomeScreen /> : <div> <Loader center={true} /></div>
}
export default Profile
