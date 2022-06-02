//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../../components/loader/loader'
import { getUsers } from '../../components/mock/Users'
import ProfileScreen from '../../components/pages/profile/profile'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

//  Page Component
export async function getServerSideProps (context) {
  const res = await getUsers()
  return {
    props: { users: res } // will be passed to the page component as props
  }
}

const Profile = ({ users }) => {
  const router = useRouter()
  const [user, setUser] = useState()
  const id = router.query.Id
  const [loaded, setLoaded] = useState(false)

  const res = users.find(user => user.id.toString() === id)
  console.log(res)
  
  useEffect(() => {
    setTimeout(() => {
      const getUser = async (id) => {
        setUser(res)
      }
      Promise.all([getUser(id)]).then(() => {
        setLoaded(true)
      })
    }, 1500)
  }, [])

  console.log(user)
  const props = {
    user
  }

  Profile.propTypes = {
    users: PropTypes.array
  }

   return loaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Profile
