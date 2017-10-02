
'use strict'

const glob = require('glob')
const path = require('path')
const fse = require('fs-extra')

module.exports = (dir) => ({
  all: async () => {
    return glob.sync(path.join(dir, '*.{es6,js,json}'))
      .map(relative => path.resolve(relative))
      .map(absolute => [ path.parse(absolute).name, require(absolute) ])
      .map(([ name, content ]) => ({ name, content }))
  },
  add: async (name, content) => {
    return fse.outputFile(
      path.join(dir, name) + '.json',
      JSON.stringify(content, null, '    ')
    )
  },
  remove: async (name, content) => {
    return fse.remove(path.join(dir, name) + '.json')
  }
})
