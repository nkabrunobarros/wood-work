import { Archive, LayoutDashboard, MessageCircle, Scan, Table, Users } from 'lucide-react';
import React from 'react';
import routes from '../../navigation/routes';

function getLinks() {
  const navLinks = [
    {
      title: 'Encomendas',
      url: routes.private.orders,
      icon: <Archive strokeWidth='1' size={20} />,
      allowed: 'orders',
    },
    {
      title: 'Encomendas',
      url: routes.private.internal.orders,
      icon: <Archive strokeWidth='1' size={20} />,
      allowed: 'orders',
    },
    {
      title: 'Mensagens',
      url: routes.private.messages,
      icon: <MessageCircle strokeWidth='1' size={20} />,
      allowed: 'cliente',
    },
    {
      title: 'Encomendas Similares',
      url: routes.private.internal.ordersSimilar,
      icon: <Archive strokeWidth='1' size={20} />,
      allowed: 'orders',
    },
    {
      title: 'Stock',
      url: routes.private.internal.stocks,
      icon: <Table strokeWidth='1' size={20} />,
      allowed: 'stocks',
    },
    {
      title: 'Clientes',
      url: routes.private.internal.clients,
      icon: <Users strokeWidth='1' size={20} />,
      allowed: 'clients',
    },
    {
      title: 'Utilizadores',
      url: routes.private.internal.users,
      icon: <Users strokeWidth='1' size={20} />,
      allowed: 'utilizadores',
    },
    {
      title: 'Sobrantes',
      url: routes.private.internal.leftovers,
      icon: <Scan strokeWidth='1' size={20} />,
      //  TODOS: FIX
      allowed: 'utilizadores',
    },
    {
      title: 'Painel de Controlo',
      url: routes.private.internal.dashboards,
      icon: <LayoutDashboard strokeWidth='1' size={20} />,
      allowed: 'dashboards',
    },
  ];

  return navLinks;
}

export default getLinks;
