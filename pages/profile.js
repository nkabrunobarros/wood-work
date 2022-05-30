//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import { getUsers } from '../components/mock/Users'
import ProfileScreen from '../components/pages/profile/profile'
import PropTypes from 'prop-types'

//  Page Component
export async function getServerSideProps (context) {
  const res = await getUsers()
  return {
    props: { users: res } // will be passed to the page component as props
  }
}

const Profile = ({ users }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const user = users.find(user => user.id === 1)
  const props = {
    user
  }

  Profile.propTypes = {
    users: PropTypes.array
  }
  return loaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Profile
