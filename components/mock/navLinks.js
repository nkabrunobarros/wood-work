import { Archive, MessageCircle, Table, Users } from 'lucide-react'
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
      url: routes.private.ordersSimilar,
      icon: <Archive color='white' />
    },
    {
      title: 'Stock',
      url: routes.private.stock,
      icon: <Table color='white' />
    },
    {
      title: 'Clientes',
      url: routes.private.clients,
      icon: <Users color='white' />
    },
    {
      title: 'Utilizadores',
      url: routes.private.users,
      icon: <Users color='white' />
    }
  ]
  return navLinks
}
export default getLinks
