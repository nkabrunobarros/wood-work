import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/loader'
import UsersScreen from '../components/pages/users/users'
import routes from '../navigation/routes'
import { getUsers } from '../components/mock/Users'

import PropTypes from 'prop-types'

export async function getServerSideProps (context) {
  const res = await getUsers()
  return {
    props: { users: res } // will be passed to the page component as props
  }
}
const Users = ({ users }) => {
  const [loaded, setLoaded] = useState(false)
  const items = users
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  const tableCols = [
    'nome',
    'email',
    'perfil',
    'ações'
  ]

  const breadcrumbsPath = [
    {
      title: 'Utilizadores',
      href: `${routes.private.users}`
    }
  ]
  const props = {
    items,
    breadcrumbsPath,
    tableCols
  }
  return loaded
    ? (
    <UsersScreen {...props} />
      )
    : (
    <div>
      <Loader center={true} />
    </div>
      )
}

Users.propTypes = {
  items: PropTypes.array,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array
}
export default Users
