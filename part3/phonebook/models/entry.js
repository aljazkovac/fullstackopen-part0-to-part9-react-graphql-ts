const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const entrySchema = new mongoose.Schema({
  name: String,
  number: Number,
})
entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Entry = mongoose.model('Entry', entrySchema)

module.exports = mongoose.model('Entry', entrySchema)