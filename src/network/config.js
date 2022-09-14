import hosts from '../../hosts.json';

export function buildURL(env, endpoint) {
  // buildURL() -> returns always dev env.
  if (env === undefined) return hosts.dev;

  // buildURL(<ENV>).
  if (env && (endpoint === undefined || !endpoint)) return hosts[env];

  // buildURL(<ENV>, <ENDPOINT>).
  if (env && endpoint && endpoint !== undefined) return `${hosts[env]}${endpoint}`;

  return `${hosts.dev}${endpoint}`;
}

export function getApiURL(endpoint) {
  const trimEndpoint = endpoint.replace(/^\//, '');

  return `/${trimEndpoint}`;
}
