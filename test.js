import baretest from 'baretest';
import { doesNotReject } from 'assert';

import { createClient, useClient } from './index.js';

const test = baretest('aruba-netedit');

function requestGetImages(client) {
  return client
    .get('/images')
    .query({ size: 50 });
}

const client = createClient()
  .disableTLSCerts();

test('all works', () => doesNotReject(useClient({
  client,
  fn: requestGetImages,
})));

test.run();
