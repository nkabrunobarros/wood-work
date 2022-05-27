import { Archive, MessageCircle } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    },
    {
      title: 'Encomendas Similares',
      url: '#',
      icon: <Archive color='white' />
    },
    {
      title: 'Stock',
      url: '#',
      icon: <MessageCircle color='white' />
    },
    {
      title: 'Clientes',
      url: '#',
      icon: <FontAwesomeIcon icon="fa-solid fa-cubes-stacked" color='white' />
    },
    {
      title: 'Utilizadores',
      url: '#',
      icon: <MessageCircle color='white' />
    }
  ]
  return navLinks
}
export default getLinks
