/* eslint-disable sort-keys */
const endpoints = {
  LOGIN: 'auth/token',
  ME: 'accounts/worker/me/',
  CUSTOMER: 'accounts/customer/',
  MECLIENT: 'accounts/customer/me/',
  PROJECTS: 'project/',
  FURNITURES: 'furniture/',
  BUDGETS: 'budget/',
  WORKERS: 'worker/',
  EXPEDITIONS: 'expedition/',
  CLIENTS: 'owner/',
  ADDCLIENT: 'accounts/signup/',
  ORGANIZATIONS: 'organization/',
  DJANGOWORKERS: 'accounts/worker/',
  PERMISSIONSLIST: 'perms/group/expanded/',
  PERMISSIONS: 'perms/group/',
  PARTS: 'part/',
  RESOURCES: 'perms/permission/no_pagination/',
  RESETPASSWORD1: 'accounts/reset-password.',
  RESETPASSWORD: 'accounts/reset-password/',
  EMAILSERVICE: 'email/service/',
  FOLDERS: 'storages/folder/',
  FILES: 'storages/file/',
  FILESBATCH: 'storages/file/batch_files/',
  CONSUMABLES: 'consumable/',
  ASSEMBLYS: 'assembly/',
  MACHINES: 'machine/',
  MESSAGES: 'chat/message/',
  LEFTOVERS: 'leftover/',
  ACTIVATE: 'accounts/activate/',
  WORKERTASKS: 'worker-task/',
  MACHINETASKS: 'machine-task/',
};

export default endpoints;
