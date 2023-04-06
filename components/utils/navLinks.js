import { Archive, Factory, MessageCircle, Network, Scan, Table, Users } from 'lucide-react';
import React from 'react';
import routes from '../../navigation/routes';

export const navLinks = [

  {
    title: 'Projetos',
    id: 'projectsInternal',
    url: routes.private.projects,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
    allowed_: 'access_projects',
  },
  {
    title: 'Projetos',
    id: 'projectsClient',
    url: routes.private.internal.projects,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
    allowed_: 'access_projects',
  },
  {
    title: 'Mensagens',
    id: 'messagesClient',
    url: routes.private.messages,
    icon: <MessageCircle strokeWidth='1' size={20} />,
    allowed: 'client',
    allowed_: 'access_messages',

  },
  // {
  //   title: 'Mensagens',
  //   id: 'messagesInteral',
  //   url: routes.private.internal.messages,
  //   icon: <MessageCircle strokeWidth='1' size={20} />,
  //   allowed: 'messages',
  // },
  {
    title: 'Projetos Similares',
    id: 'projectsSimilar',
    url: routes.private.internal.projectsSimilar,
    icon: <Archive strokeWidth='1' size={20} />,
    allowed: 'projects',
    allowed_: 'access_projects_similar',
    underline: true,

  },
  {
    title: 'Stock',
    id: 'stocks',
    url: routes.private.internal.stocks,
    icon: <Table strokeWidth='1' size={20} />,
    allowed: 'stocks',
    allowed_: 'access_stocks',
  },
  {
    title: 'Chão de Fabrica',
    id: 'fabrica',
    url: routes.private.internal.factoryLevel,
    icon: <Factory strokeWidth='1' size={20} />,
    allowed: 'factoryLevel',
    allowed_: 'access_factory',
  },
  {
    title: 'Montagens',
    id: 'assembly',
    url: routes.private.internal.assemblys,
    icon: <Network strokeWidth='1' size={20} />,
    allowed: 'assemblys',
    allowed_: 'access_assembly',
  },
  {
    title: 'Sobrantes',
    id: 'leftovers',
    url: routes.private.internal.leftovers,
    icon: <Scan strokeWidth='1' size={20} />,
    allowed: 'leftovers',
    allowed_: 'access_leftovers',
    underline: true
  },
  {
    title: 'Clientes',
    id: 'clients',
    url: routes.private.internal.clients,
    icon: <Users strokeWidth='1' size={20} />,
    allowed: 'clients',
    allowed_: 'access_clients',
  },
  {
    title: 'Utilizadores',
    id: 'workers',
    url: routes.private.internal.workers,
    icon: <Users strokeWidth='1' size={20} />,
    allowed: 'workers',
    allowed_: 'access_workers',
  },
  // {
  //   title: 'Painel de Controlo',
  //   id: 'dashboards',
  //   url: routes.private.internal.dashboards,
  //   icon: <LayoutDashboard strokeWidth='1' size={20} />,
  //   allowed: 'dashboards',
  // },
];
