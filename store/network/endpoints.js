/* eslint-disable sort-keys */
const endpoints = {
  LOGIN: 'auth/token',
  ME: 'accounts/worker/me/',
  MECLIENT: 'accounts/customer/me/',
  PROJECTS: 'project/',
  BUDGETS: 'budget/',
  WORKERS: 'worker/',
  EXPEDITIONS: 'expedition/',
  CLIENTS: 'owner/',
  ORGANIZATIONS: 'organization/',
  ADDCLIENT: 'accounts/signup/',
  DJANGOWORKERS: 'accounts/worker/',
  PERMISSIONSLIST: 'perms/group/expanded/',
  PERMISSIONS: 'perms/group/',
  PARTS: 'part/',
  RESOURCES: 'perms/permission/no_pagination/',
  EMAILS: 'accounts/reset-password.',
  FOLDERS: 'storages/folder/',
  FILES: 'storages/file/',
};

export default endpoints;
