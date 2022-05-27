// Node modules
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../../navigation/routes'
import Navbar from './navbar/navbar'
import Footer from './footer/footer'

// Pages without layout (sidebar + navbar + footer)
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`
]

const Layout = ({ children }) => {
  const path = useRouter()

  if (noLayoutScreens.includes(path.route)) return <>{children}</>

  return (
    <>
      <div>
        <main>
          <Navbar />
          <div style={{ padding: '0rem 2rem 5rem 2rem' }}>{children}</div>
        </main>
        <Footer section='client' />
      </div>
    </>
  )
}
Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
