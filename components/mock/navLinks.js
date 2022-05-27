import { Archive, MessageCircle } from 'lucide-react'
import routes from '../../navigation/routes'
import React from 'react'

function getLinks () {
  const navLinks = [
    {
      title: 'Encomendas',
      url: routes.private.orders,
      icon: <Archive color='white' />
    },
    {
      title: 'Mensagens',
      url: routes.private.messages,
      icon: <MessageCircle color='white' />
    }
  ]
  return navLinks
}
export default getLinks
