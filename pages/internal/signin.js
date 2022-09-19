import React from 'react'
import SignInScreen from '../../components/pages/signin/signin'

const SignIn = () => {
  const client = true

  const props = {
    client
  }

  return <SignInScreen { ...props } />
}

export default SignIn
