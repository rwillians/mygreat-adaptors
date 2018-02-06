'use strict'

const { Schema } = require('mongoose')

const SCHEMA = {
  _id: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: [ String ]
  }
}

const getOptions = (collection) => ({
  autoIndex: true,
  collection,
  id: false,
  timestamps: false,
  strict: true,
  safe: true,
  versionKey: false
})

const factory = (connection, { collection = 'migrations' }) => {
  const schema = new Schema(SCHEMA, getOptions(collection))
  const model = connection.model('Migration', schema)

  return {
    all: async () => model.find().then(docs => {
      return docs.map(doc => ({ name: doc._id, content: doc.content }))
    }),
    add: async (name, content) => model.create({ _id: name, content }),
    remove: async (name) => model.deleteOne({ _id: name })
  }
}

const connect = (url, options = { }) => {
  return mongoose.createConnection(url, Object.assign({ promiseLibrary: Promise }, options))
}

module.exports = factory
module.exports.connect = connect
