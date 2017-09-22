'use strict'

const path = require('path')
const directory = require('../')

describe('mygreat-directory(path String): Object', () => {
  describe('.all(): Promise<Array[Object]>', () => {
    it('fetches all files and their content from a given directory', () => {
      return expect(directory('specs/stubs/migrations/*.js').all())
        .to.eventually.shallowDeepEqual([{
          name: '20170922002500',
          content: { up: async (db) => { }, down: async (db) => { } }
        }])
    })
  })
})
