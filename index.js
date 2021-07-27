import { agent } from 'superagent';

const {
  ARUBA_NETEDIT_HOST,
  ARUBA_NETEDIT_USERNAME,
  ARUBA_NETEDIT_PASSWORD,
} = process.env;

const DEFAULT_HOST = ARUBA_NETEDIT_HOST;
const DEFAULT_USERNAME = ARUBA_NETEDIT_USERNAME || 'admin';
const DEFAULT_PASSWORD = ARUBA_NETEDIT_PASSWORD || '';

export function getRequestPrefix(host = DEFAULT_HOST) {
  return `https://${host}`;
}

export function createClient(host = DEFAULT_HOST) {
  return agent()
    .use((request) => { request.url = getRequestPrefix(host) + request.url; });
}

export function getXSRFToken({ headers }) {
  return headers['set-cookie']
    .find((cookie) => cookie.startsWith('XSRF-TOKEN'))
    .split(';')[0]
    .split('=')[1];
}

export function loginClient({
  host = DEFAULT_HOST,
  client = createClient(host),
  username = DEFAULT_USERNAME,
  password = DEFAULT_PASSWORD,
}) {
  return client
    .post('/login')
    .type('form')
    .send({ username, password })
    .then(getXSRFToken)
    .then((xsrfToken) => client.set('X-XSRF-TOKEN', xsrfToken));
}

export function logoutClient(client) {
  return client
    .post('/logout');
}

export function useClient({
  fn,
  host = DEFAULT_HOST,
  client = createClient(host),
  username = DEFAULT_USERNAME,
  password = DEFAULT_PASSWORD,
}) {
  return loginClient({ client, username, password })
    .then(() => fn(client))
    .finally(() => logoutClient(client));
}
