//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import MessagesScreen from '../components/pages/messages/messages'

import PropTypes from 'prop-types'
import routes from '../navigation/routes'

//  Page Component

const Messages = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const dummy = [
    {
      id: 1234,
      sentBy: 'me',
      content: 'Hi, i would like to know the Eta of my order please? Thank you',
      createdAt: '03/02/2022'
    },
    {
      id: 123,
      sentBy: 'other',
      content: 'Hi, the expected time of arrivel for your order is within 1 week, thank you',
      createdAt: '03/02/2022'
    },
    {
      id: 12345,
      sentBy: 'me',
      content:
        'Ok thank you',
      createdAt: '03/02/2022'
    }
  ]

  const breadcrumbsPath = [
    {
      title: 'Mensagens',
      href: `${routes.private.messages}`
    }
  ]

  const props = {
    dummy,
    breadcrumbsPath
  }

  return loaded ? <MessagesScreen { ...props } /> : <div> <Loader center={true} /></div>
}
Messages.propTypes = {
  dummy: PropTypes.array,
  breadcrumbsPath: PropTypes.array
}
export default Messages
