import { Archive, MessageCircle, Table, Users } from 'lucide-react';
import routes from '../../navigation/routes';
import React from 'react';

function getLinks() {
  const navLinks = [
    {
      title: 'Encomendas',
      url: routes.private.orders,
      icon: <Archive color='white' strokeWidth='1' />,
      allowed: 'Client',
    },
    {
      title: 'Encomendas',
      url: routes.private.internal.orders,
      icon: <Archive color='white' strokeWidth='1' />,
      allowed: 'internal',
    },
    {
      title: 'Mensagens',
      url: routes.private.messages,
      icon: <MessageCircle color='white' strokeWidth='1' />,
      allowed: 'Client',
    },
    {
      title: 'Encomendas Similares',
      url: routes.private.internal.ordersSimilar,
      icon: <Archive color='white' strokeWidth='1' />,
      allowed: 'internal',
    },
    {
      title: 'Stock',
      url: routes.private.internal.stocks,
      icon: <Table color='white' strokeWidth='1' />,
      allowed: 'internal',
    },
    {
      title: 'Clientes',
      url: routes.private.internal.clients,
      icon: <Users color='white' strokeWidth='1' />,
      allowed: 'internal',
    },
    {
      title: 'Utilizadores',
      url: routes.private.internal.users,
      icon: <Users color='white' strokeWidth='1' />,
      allowed: 'internal',
    },
  ];
  return navLinks;
}
export default getLinks;
