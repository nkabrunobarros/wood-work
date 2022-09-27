import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/loader'
import SignIn from '../components/pages/signin/signin'

const Home = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [])
 
  return loaded ? <SignIn /> : <div> <Loader center={true} /></div>
}

export default Home
