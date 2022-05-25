// Node modules
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../../navigation/routes'
import Navbar from './navbar/navbar'

// Pages without layout (sidebar + navbar + footer)
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`
]

const Layout = ({ children }) => {
  const path = useRouter()

  if (noLayoutScreens.includes(path.route)) return <>{children}</>

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </>
  )
}
Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
