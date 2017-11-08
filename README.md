# PouchDB Triplesec

Plugin to encrypt a PouchDB/CouchDB database.

## Installation

Node.js

```bash
npm install pouchdb-triplesec
```

```js
var pouchdb = require('pouchdb');
pouchdb.plugin(require('pouchdb-triplesec'));
```

Browser

```html
<script src="pouchdb.js"></script>
<script src="pouchdb.pouchdb-triplesec.min.js"></script>
```

## API

```js
var db = new PouchDB('my_database');

db.enableCrypto(password);

// Docs are transparently encrypted/decrypted.
```
