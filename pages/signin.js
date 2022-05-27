import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/loader'
import SignInScreen from '../components/pages/signin/signin'
const SignIn = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const client = true

  const props = {
    client
  }

  return loaded ? <SignInScreen { ...props } /> : <div> <Loader center={true} /></div>
}
export default SignIn
