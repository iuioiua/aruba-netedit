# aruba-netedit
Superagent utilities for interacting with the Aruba NetEdit REST API

* Super lightweight
* Simple API
* Based on [superagent's `Agent` class](https://visionmedia.github.io/superagent/#agents-for-global-state)
* Works with environment variables by default

## Installation

```bash
$ npm install aruba-netedit
```

## Usage

```javascript
import { useClient } from 'aruba-netedit';

function requestGetImages(client) {
  return client
    .get('/images')
    .query({ size: 50 });
}

const response = await useClient({ fn: requestGetImages });
```

## Testing

Tests are performed on an actual Aruba NetEdit server whose credentials are defined by environment variables.

```bash
$ ARUBA_NETEDIT_HOST=... npm test
```