# mygreat-directory

```js
const mygreat = require('@haoc-labs/mygreat')
const directory = require('@haoc-labs/mygreat-directory')
const memory = require('@haoc-labs/mygreat/adaptors/in-memory')

const migrate = mygreat.from(directory('./migrations'), memory([]))

;(async () => {
    await migrate.up()
})()
```
