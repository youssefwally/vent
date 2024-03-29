const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  problemType: {
    type: String,
    default: 'N/A'
  },
  paired: {
    type: String,
    default: 'No'
  }

})

module.exports = mongoose.model('User', UserSchema)
