import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/loader'
import SignIn from '../components/pages/signin/signin'
const Home = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  return loaded ? <SignIn /> : <div><Loader center /></div>
}
export default Home
