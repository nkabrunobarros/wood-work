//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import MessagesScreen from '../components/pages/messages/messages'

//  Page Component

const Messages = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  return loaded ? <MessagesScreen /> : <div> <Loader center={true} /></div>
}
export default Messages
