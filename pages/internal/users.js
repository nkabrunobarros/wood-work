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
const Users = ({ users, countries }) => {
  const [loaded, setLoaded] = useState(false)
  const items = users
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const breadcrumbsPath = [
    {
      title: 'Utilizadores',
      href: `${routes.private.users}`
    }
  ]

  const headCells = [
    {
      id: 'nome',
      numeric: false,
      disablePadding: false,
      label: 'Nome',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];
  const editRoute = routes.private.internal.editClient;
  const detailRoute = routes.private.internal.client;
  const newRoute = routes.private.internal.newClient
  const props = {
    items,
    breadcrumbsPath,
    countries,
    editRoute,
    detailRoute,
    headCells,
    newRoute    
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
  headCells: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  users: PropTypes.array,
  countries: PropTypes.array,
  editRoute: PropTypes.string,
  detailRoute: PropTypes.string,
  newRoute: PropTypes.string,
}
export default Users
