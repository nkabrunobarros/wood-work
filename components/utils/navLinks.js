import { Archive, LayoutDashboard, MessageCircle, Network, Scan, Table, Users } from 'lucide-react';
import React from 'react';
import routes from '../../navigation/routes';

export const navLinks = [
  {
    title: 'Encomendas',
    id: 'projectsInternal',
    url: routes.private.projects,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
  },
  {
    title: 'Projetos/Orçamentos',
    id: 'projectsClient',
    url: routes.private.internal.projects,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
  },
  {
    title: 'Mensagens',
    id: 'messagesClient',
    url: routes.private.messages,
    icon: <MessageCircle strokeWidth='1' size={20} />,
    allowed: 'client',
  },
  {
    title: 'Mensagens',
    id: 'messagesInteral',
    url: routes.private.internal.messages,
    icon: <MessageCircle strokeWidth='1' size={20} />,
    allowed: 'messages',
  },
  {
    title: 'Projetos Similares',
    id: 'projectsSimilar',
    url: routes.private.internal.projectsSimilar,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
  },
  {
    title: 'Stock',
    id: 'stocks',
    url: routes.private.internal.stocks,
    icon: <Table strokeWidth='1' size={20} />,
    allowed: 'stocks',
  },
  {
    title: 'Chão de Fabrica',
    id: 'fabrica',
    url: routes.private.internal.factoryLevel,
    icon: <Network strokeWidth='1' size={20} />,
    allowed: 'factoryLevel',
  },
  {
    title: 'Clientes',
    id: 'clients',
    url: routes.private.internal.clients,
    icon: <Users strokeWidth='1' size={20} />,
    allowed: 'clients',
  },
  {
    title: 'Utilizadores',
    id: 'workers',
    url: routes.private.internal.workers,
    icon: <Users strokeWidth='1' size={20} />,
    allowed: 'workers',
  },
  {
    title: 'Sobrantes',
    id: 'leftovers',
    url: routes.private.internal.leftovers,
    icon: <Scan strokeWidth='1' size={20} />,
    //  TODOS: FIX
    allowed: 'leftovers',
  },
  {
    title: 'Painel de Controlo',
    id: 'dashboards',
    url: routes.private.internal.dashboards,
    icon: <LayoutDashboard strokeWidth='1' size={20} />,
    allowed: 'dashboardss',
  },
];
