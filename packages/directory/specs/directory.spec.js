'use strict'

const path = require('path')
const directory = require('../')

describe('mygreat-directory(path String): Object', () => {
  describe('.all(): Promise<Array[Object]>', () => {
    it('fetches all files and their content from a given directory', () => {
      return expect( directory('specs/stubs/migrations').all() )
        .to.eventually.shallowDeepEqual([{
          name: '20170922002500',
          content: { up: async (db) => { }, down: async (db) => { } }
        }])
    })
  })

  describe('.create(name String, content Object): Promise<Array[Object]>', () => {
    it('creates a file with the given content', () => {
      const name = Date.now().toString()
      const content = [ '20170922002500' ]
      const adaptor = directory('specs/blackhole')

      return expect(
        adaptor.create(name, content)
               .then(() => adaptor.all())
               .then(all => all.map(file => file.name))
      ).to.eventually.includes(name)
    })
  })
})
