'use strict'

const getSchema = (Schema) => ({
  _id: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: [ String ]
  }
})

const getOptions = (collection) => ({
  autoIndex: true,
  collection,
  id: false,
  timestamps: false,
  strict: true,
  safe: true,
  versionKey: false
})

module.exports = (connection, options = {}) => {
  Object.assign({ collection: 'migrations' }, options)
  const { base: { Schema } } = connection

  const schema = new Schema(getSchema(Schema), getOptions(options.collection))
  const model = connection.model('Migration', schema)

  return {
    all: async () => model.find().then(docs => {
      return docs.map(doc => ({ name: doc._id, content: doc.content }))
    }),
    add: async (name, content) => model.create({ _id: name, content }),
    remove: async (name) => model.deleteOne({ _id: name })
  }
}
