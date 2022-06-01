import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/loader'
import UsersScreen from '../../components/pages/users/users'
import routes from '../../navigation/routes'
import { getUsers } from '../../components/mock/Users'
import getCountries from '../../components/mock/Countries'

import PropTypes from 'prop-types'

export async function getServerSideProps (context) {
  const res = await getUsers()
  const res2 = await getCountries()
  return {
    props: { users: res, countries: res2 } // will be passed to the page component as props
  }
}
const Clients = ({ users, countries }) => {
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
    'ações'
  ]

  const breadcrumbsPath = [
    {
      title: 'Clientes',
      href: `${routes.private.users}`
    }
  ]
  const props = {
    items,
    breadcrumbsPath,
    tableCols,
    countries
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

Clients.propTypes = {
  items: PropTypes.array,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array,
  countries: PropTypes.array
}
export default Clients
