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
  problem: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('User', UserSchema)
