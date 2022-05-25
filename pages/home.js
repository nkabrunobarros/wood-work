//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import HomeScreen from '../components/pages/home/home'

import PropTypes from 'prop-types'

import axios from 'axios'
//  Page Component

const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const [dummy, setDummy] = useState([])
  useEffect(() => {
    const getData = async () => {
      await axios.get('https://gorest.co.in/public/v2/users').then((res) => setDummy(res.data))
    }
    getData()
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const props = {
    dummy
  }

  return loaded ? <HomeScreen { ...props } /> : <div> <Loader center={true} /></div>
}
Home.propTypes = {
  dummy: PropTypes.any
}

export default Home
