# mygreat-mongodb

```js
const directory = require('@haoc-labs/mygreat-directory')
const mongodb = require('@haoc-labs/mygreat-mongodb')
const mongoose = require('mongoose')
mongoose.Promise = Promise

module.exports = (environment) => {
  const conn = mongoose.createConnection('mongodb://localhost:27017/foobar')
  return {
    local: directory('./migrations'),
    remote: mongodb(conn),
    setup: async () => conn,
    shutdown: async () => { mongoose.disconnect() }
  }
}
```
