const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName: { type: String, default: ""},
  email: { type: String, default: ""},
  password: { type: String, default: ''},
  permissions: [{type: String, default: ''}]
})

module.exports = mongoose.model('user', userSchema)