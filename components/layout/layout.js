// Node modules
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import routes from '../../navigation/routes'
import Navbar from './navbar/navbar'
import Footer from './footer/footer'
import DrawerMobile from './drawer/drawer'

import {
  CssBaseline,
  Hidden
} from '@mui/material'

// Pages without layout (sidebar + navbar + footer)
const noLayoutScreens = [
  `${routes.public.signIn}`,
  `${routes.public.forgotPassword}`,
  `${routes.private.terms}`,
  `${routes.private.tos}`
]
const Layout = ({ children }) => {
  const path = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle () {
    setMobileOpen(!mobileOpen)
  }

  if (noLayoutScreens.includes(path.route)) return <>{children}</>
  return (
    <div >
      <CssBaseline />
       <Navbar openDrawer={handleDrawerToggle} />
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden implementation='css' >
          <DrawerMobile mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </Hidden>
      <div style={{ padding: '0rem 2rem 4rem 2rem' }}>
        {children}
      </div>
        <Footer section={'client'} />
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
