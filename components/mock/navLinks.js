import { Archive, MessageCircle, Table, Users } from 'lucide-react'
import routes from '../../navigation/routes'
import React from 'react'

function getLinks () {
  const navLinks = [
    {
      title: 'Encomendas',
      url: routes.private.orders,
      icon: <Archive color='white' />,
      allowed: 'Client'
    },
    {
      title: 'Encomendas',
      url: routes.private.internal.orders,
      icon: <Archive color='white' />,
      allowed: 'internal'
    },
    {
      title: 'Mensagens',
      url: routes.private.messages,
      icon: <MessageCircle color='white' />,
      allowed: 'Client'
    },
    {
      title: 'Encomendas Similares',
      url: routes.private.internal.ordersSimilar,
      icon: <Archive color='white' /> ,
      allowed: 'internal'
    },
    {
      title: 'Stock',
      url: routes.private.internal.stock,
      icon: <Table color='white' />,
      allowed: 'internal'
    },
    {
      title: 'Clientes',
      url: routes.private.internal.clients,
      icon: <Users color='white' />,
      allowed: 'internal'
    },
    {
      title: 'Utilizadores',
      url: routes.private.internal.users,
      icon: <Users color='white' />,
      allowed: 'internal'
    }
  ]
  return navLinks
}
export default getLinks
